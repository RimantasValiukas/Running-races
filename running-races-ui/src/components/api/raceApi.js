import HTTP from "./index";
import competitor from "../forms/Competitor";
import comment from "../forms/Comment";

const createRace = (race) => HTTP.post('/races', race);
const getRaces = () => HTTP.get('/races');
const getRaceById = (raceId) => HTTP.get(`/races/${raceId}`);
const updateRace = (race, raceId) => HTTP.put(`/races/${raceId}`, race);
const deleteRace = (raceId) => HTTP.delete(`/races/${raceId}`);
const createCompetitor = (competitor) => HTTP.post('/competitors', competitor);
const getCompetitors = () => HTTP.get('/competitors');
const getCompetitorsByRaceId = (raceId) => HTTP.get(`/competitors/${raceId}`);
const getCompetitor = (competitorId) => HTTP.get(`/competitors/${competitorId}/result`);
const updateCompetitor = (competitor, competitorId) => HTTP.put(`/competitors/${competitorId}`, competitor);
const createComment = (comment) => HTTP.post('/comments', comment);

export {
    createRace,
    getRaces,
    getRaceById,
    updateRace,
    deleteRace,
    createCompetitor,
    getCompetitors,
    getCompetitorsByRaceId,
    getCompetitor,
    updateCompetitor,
    createComment
}