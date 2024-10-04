const chai = require('chai');
const { createProducts } = require('../../functions/products/createProduct')
const { registerUser } = require('../../functions/signup/registerUser');
const { form } = require('../../functions/login/login');

const data = require('../../fixtures/products/products.json')
//const userData = require('../../fixtures/users/users.json')

const expect = chai.expect;

describe('Products', () => {
    let user;

    beforeEach(async () => {
        user = {
            nome: "Teste QA",
            email: "admin@admin.com",
            password: "qa123",
            administrador: 'true'
          }

          const response = await registerUser(user)
          expect(response).to.has.status(201)
    });

    it('Create product with success', async () => {
        const product = data.success
        
        const login = await form(user)
        expect(login).to.has.status(200)
        expect(login.body.authorization).to.be.not.empty
        let token = login.body.authorization

        const response = await createProducts(product, token)
        expect(response).to.has.status(201)
        expect(response.body._id).to.be.not.empty
        expect(response.body.message).to.eql("Cadastro realizado com sucesso")
    })
});