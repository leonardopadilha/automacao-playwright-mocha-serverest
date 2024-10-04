const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);
require('dotenv').config()

BASE_URL = process.env.BASE_URL
const request = chai.request(BASE_URL);

async function createProducts(product, token) {
    const response = await request
                            .post('/produtos')
                            .set('authorization', token)
                            .send({ 
                                    nome: product.nome, 
                                    preco: product.preco, 
                                    descricao: product.descricao, 
                                    quantidade: product.quantidade
                                })
    return response

}

module.exports = {
    createProducts
}