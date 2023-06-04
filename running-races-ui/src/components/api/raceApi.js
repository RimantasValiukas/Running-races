import HTTP from "./index";
import competitor from "../forms/Competitor";

const createRace = (race) => HTTP.post('/races', race);
const getRaces = () => HTTP.get("/races");
const getRaceById = (raceId) => HTTP.get(`/races/${raceId}`);
const updateRace = (race, raceId) => HTTP.put(`/races/${raceId}`, race);
const deleteRace = (raceId) => HTTP.delete(`/races/${raceId}`);
const createCompetitor = (competitor) => HTTP.post('/competitors', competitor);
const getCompetitors = () => HTTP.get('/competitors');

export {
    createRace,
    getRaces,
    getRaceById,
    updateRace,
    deleteRace,
    createCompetitor,
    getCompetitors
}