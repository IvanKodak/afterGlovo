const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('/POST order', () => {
    it('it should return order amount with 20% discount', (done) => {
        const request = {
            fromAddress: "проспект Соборний, 186А, Запоріжжя, Запорізька область, 69035",
            toAddress: "проспект Соборний, 83/85, Запоріжжя, Запорізька область, 69000",
            name: "Ivan Kodak",
            desc: "Something"
        }
        
      chai.request(server)
          .post('/order')
          .send(request)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('orderEstimate');
              res.body.should.have.property('orderEstimateWithDiscount');
              res.body.orderEstimate.should.have.property('total');
              res.body.orderEstimateWithDiscount.should.have.property('total');
            done();
          });
    });

});