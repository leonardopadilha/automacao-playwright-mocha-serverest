const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);
require('dotenv').config()

BASE_URL = process.env.BASE_URL
const request = chai.request(BASE_URL);

async function deleteUser(userId) {
    return request.delete(`/usuarios/${userId}`)
}

module.exports = {
    deleteUser
}