import HTTP from "./index"

const login = (data) => HTTP.post('/login', data);
const createUser = (data) => HTTP.post('/users', data);

export {
    login,
    createUser
}