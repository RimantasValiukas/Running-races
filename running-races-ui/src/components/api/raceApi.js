import HTTP from "./index";

const createRace = (race) => HTTP.post('/races', race);
const getRaces = () => HTTP.get("/races");
const getRaceById = (raceId) => HTTP.get(`/races/${raceId}`);
const updateRace = (race, raceId) => HTTP.put(`/races/${raceId}`, race);
const deleteRace = (raceId) => HTTP.delete(`/races/${raceId}`);

export {
    createRace,
    getRaces,
    getRaceById,
    updateRace,
    deleteRace
}