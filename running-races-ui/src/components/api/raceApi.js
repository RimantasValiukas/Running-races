import HTTP from "./index";

const createRace = (race) => HTTP.post('/races', race);
const getRaces = () => HTTP.get("/races");

export {
    createRace,
    getRaces
}