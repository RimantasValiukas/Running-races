import HTTP from "./index"

const login = (data) => HTTP.post('/login', data);
const createUser = (data) => HTTP.post('/users', data);
const getCompetitorsByUserId = (userId) => HTTP.get(`/competitors/${userId}/races`);
const updateUser = (user, userId) => HTTP.put(`/users/${userId}`, user);
const getUser = (userId) => HTTP.get(`/users/${userId}`);

export {
    login,
    createUser,
    getCompetitorsByUserId,
    updateUser,
    getUser
}