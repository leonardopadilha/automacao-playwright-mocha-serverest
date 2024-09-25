const chai = require('chai')
const chaiHttp = require('chai-http');
const { deleteUser } = require('../user/deleteUser');
const { searchUserByEmail } = require('../user/searchUser');

chai.use(chaiHttp);
require('dotenv').config()

BASE_URL = process.env.BASE_URL
const request = chai.request(BASE_URL);

async function registerUser(user) {
    const userData = await searchUserByEmail(user.email)
    let userRegister
    if (!!userData.body.quantidade) {
        await deleteUser(userData.body.usuarios[0]._id)
    }
    userRegister = await request.post('/usuarios').send(user)
    return userRegister
}

module.exports = {
    registerUser
}