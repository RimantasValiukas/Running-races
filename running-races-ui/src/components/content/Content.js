import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";
import Race from "../forms/Race";
import Races from "../page/Races";
import RaceDetail from "../page/RaceDetail";
import Competitor from "../forms/Competitor";
import Competitors from "../page/Competitors";
import {parseISO} from "date-fns";
import Login from "../forms/Login";

const Content = () => {

    const filterUpcomingRaces = (data) => {
        const currentDate = new Date();

        return data.filter(data => parseISO(data.dateTime) > currentDate);
    }

    const filterPreviousRaces = (data) => {
        const currentDate = new Date();

        return data.filter(data => parseISO(data.dateTime) < currentDate);
    }

    return (
        <Container maxWidth="xl">
            <Routes>
                <Route path="/races/create" element={<Race/>}/>
                <Route path="/" element={<Races filterFunction={filterUpcomingRaces} key="upcoming" keyProp="upcoming"/>}/>
                <Route path="/races/previous" element={<Races filterFunction={filterPreviousRaces} key="previous" keyProp="previous"/>}/>
                <Route path="/races/:raceId" element={<RaceDetail/>}/>
                <Route path="/races/:raceId/update" element={<Race key="update"/>}/>
                <Route path="/competitors/:raceId/create" element={<Competitor/>}/>
                <Route path="/competitors/:raceId" element={<Competitors/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Container>
    );
}

export default Content;