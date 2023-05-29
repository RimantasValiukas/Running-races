import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Content from "./components/content/Content";
import {Experimental_CssVarsProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";


function App() {
    return (
        <Experimental_CssVarsProvider>
            <BrowserRouter>
                <Header/>
                <Content/>
                <Footer/>
            </BrowserRouter>
        </Experimental_CssVarsProvider>

    );
}

export default App;
