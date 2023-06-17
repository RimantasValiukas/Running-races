import HTTP from "./index"

const login = (data) => HTTP.post('/login', data);
const createUser = (data) => HTTP.post('/users', data);
const getCompetitorsByUserId = (userId) => HTTP.get(`/competitors/${userId}/races`)

export {
    login,
    createUser,
    getCompetitorsByUserId
}