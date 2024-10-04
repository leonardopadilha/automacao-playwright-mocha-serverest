const chai = require('chai');
const { registerUser } = require('../../functions/signup/registerUser');
const { form } = require('../../functions/login/login');
const { deleteUser } = require('../../functions/user/deleteUser');
const data = require('../../fixtures/users/users.json')

const expect = chai.expect;

describe('Login', () => {

    it('Login non-admin user successfully', async () => {
        const user = data.non_admin        
        const response = await registerUser(user)

        const login = await form(user)
        expect(login).to.has.status(200)
        expect(login.body.authorization).to.be.not.empty
        expect(login.body.message).to.eq("Login realizado com sucesso")

        const userDeleted = await deleteUser(response.body._id)
        expect(userDeleted).to.has.status(200)
        expect(userDeleted.body.message).to.eq("Registro excluído com sucesso")
    });

    it('Login admin user successfully', async () => {
        const user = data.admin        
        const response = await registerUser(user)

        const login = await form(user)
        expect(login).to.has.status(200)
        expect(login.body.authorization).to.be.not.empty
        expect(login.body.message).to.eq("Login realizado com sucesso")

        const userDeleted = await deleteUser(response.body._id)
        expect(userDeleted).to.has.status(200)
        expect(userDeleted.body.message).to.eq("Registro excluído com sucesso")
    });

    it('Field email is not to be empty', async () => {
        const user = data.admin  
        user.email = ""      
      
        const login = await form(user)
        expect(login).to.has.status(400)
        expect(login.body.email).to.eq("email não pode ficar em branco")
    });

    it('Field password is not to be empty', async () => {
        const user = data.admin  
        user.password = ""      
      
        const login = await form(user)
        expect(login).to.has.status(400)
        expect(login.body.password).to.eq("password não pode ficar em branco")
    });

    it('Field email should exists', async () => {
        const user = data.admin  
        delete user.email
      
        const login = await form(user)
        expect(login).to.has.status(400)
        expect(login.body.email).to.eq("email é obrigatório")
    });

    it('Field password should exists', async () => {
        const user = data.admin  
        delete user.password
      
        const login = await form(user)
        expect(login).to.has.status(400)
        expect(login.body.password).to.eq("password é obrigatório")
    });

    it('The Field email and password should exists', async () => {
        const user = data.admin  
        delete user.email
        delete user.password
        
        const login = await form(user)
        expect(login).to.has.status(400)
        expect(login.body.email).to.eq("email é obrigatório")
        expect(login.body.password).to.eq("password é obrigatório")
    });
});
