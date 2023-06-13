import {logger} from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";
import user, {getUserFromLocalStorage} from './slices/userSlice';


const createNewStore = () => {
    const store =  configureStore(
        {
            reducer: {
                user
            },
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
            preloadedState :{
                user: getUserFromLocalStorage()
            }
        }
    );

    return store;
}

const store = createNewStore();

export default store;