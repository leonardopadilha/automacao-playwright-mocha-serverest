const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);
require('dotenv').config()

BASE_URL = process.env.BASE_URL
const request = chai.request(BASE_URL);

async function form(user) {
    const response = request
                        .post('/login')
                        .set('content-type', 'application/json')
                        .send({ email: user.email, password: user.password })
    return response
}

module.exports = {
    form
}