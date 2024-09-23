const chai = require('chai');
const { registerUser } = require('../../functions/signup/registerUser');
const { form } = require('../../functions/login/login');

const expect = chai.expect;

describe('Sign up', () => {
    it('Register non-admin user successfully', async () => {
        const user = {
            nome: "Teste QA_1",
            email: "testes11130@teste.com",
            password: "qa123",
            administrador: 'false'
          }

         const response = await registerUser(user)
         expect(response).to.has.status(201)
         expect(response.body._id).to.be.not.empty
         expect(response.body.message).to.eq("Cadastro realizado com sucesso")
         
         const login = await form(user)
         expect(login).to.has.status(200)
         expect(login.body.authorization).to.be.not.empty
         expect(login.body.message).to.eq("Login realizado com sucesso")
    });
});
