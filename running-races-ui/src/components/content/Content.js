import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import Race from "../forms/Race";
import Races from "../page/Races";
import RaceDetail from "../page/RaceDetail";

const Content = () => {

    return (
        <Container maxWidth="xl">
            <Routes>
                <Route path="/races/create" element={<Race/>}/>
                <Route path="/" element={<Races/>}/>
                <Route path="/races/:raceId" element={<RaceDetail/>}/>
                <Route path="/races/:raceId/update" element={<Race key="update"/>}/>
            </Routes>
        </Container>
    );
}

export default Content;