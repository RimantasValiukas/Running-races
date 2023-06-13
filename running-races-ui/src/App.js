import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Content from "./components/content/Content";
import {Experimental_CssVarsProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";


function App() {
    return (
        <Provider store={store}>
            <Experimental_CssVarsProvider>
                <BrowserRouter>
                    <Header/>
                    <Content/>
                    <Footer/>
                </BrowserRouter>
            </Experimental_CssVarsProvider>
        </Provider>
    );
}

export default App;
