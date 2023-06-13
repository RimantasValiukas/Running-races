import {createSlice} from "@reduxjs/toolkit";
import {addToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "../../storage/localStorage";

const initialState = {
    user: null,
    jwtToken: null
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            addUser(state, {payload: user}) {
                console.log(user);
                addToLocalStorage('user', user);
                return user;
            },
            removeUser() {
                removeFromLocalStorage('user');
                return initialState;
            }
        }
    }
);

const getUserFromLocalStorage = () => getFromLocalStorage('user') || initialState;

export default userSlice.reducer;
export const {
    addUser,
    removeUser
} = userSlice.actions;

export {
    getUserFromLocalStorage
}