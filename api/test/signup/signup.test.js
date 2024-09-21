const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp);
const expect = chai.expect;

const request = chai.request('https://front.serverest.dev');

// Exemplo de teste
describe('Testes de API', () => {
    it('deve retornar 200 ao acessar a raiz', (done) => {
        request
            .get('/') // Método GET
            .end((err, res) => {
                expect(res).to.have.status(200);
                done(); // Indica que o teste terminou
            });
    });
});
