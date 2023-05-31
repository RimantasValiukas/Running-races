import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import Race from "../forms/Race";
import Races from "../page/Races";

const Content = () => {

    return (
        <Container maxWidth="xl">
            <Routes>
                <Route path="/races/create" element={<Race/>}/>
                <Route path="/" element={<Races/>}/>
            </Routes>
        </Container>
    );
}

export default Content;