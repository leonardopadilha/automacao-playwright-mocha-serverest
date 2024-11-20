const chai = require('chai');
const { registerUser } = require('../../functions/signup/registerUser');
const { deleteUser } = require('../../functions/user/deleteUser');

const expect = chai.expect;

describe('Sign up', () => {
    let user

    beforeEach(async () => {
        user = {
            nome: "Teste QA_1",
            email: "user@user.com",
            password: "qa123",
            administrador: 'false'
          }
    });

    it('Register non-admin user successfully', async () => {
         const response = await registerUser(user)
         expect(response).to.has.status(201)
         expect(response.body._id).to.be.not.empty
         expect(response.body.message).to.eq("Cadastro realizado com sucesso")
         
        const userDeleted = await deleteUser(response.body._id)
        expect(userDeleted).to.has.status(200)
        expect(userDeleted.body.message).to.eq("Registro excluído com sucesso")
    });
});
