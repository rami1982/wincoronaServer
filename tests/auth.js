var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;
it('signup existing', function(done) { 
    chai.request('http://localhost:3001')
    .post('/auth/signup')
    .set('Content-Type', 'application/json')
    .send({ email: 'test@mail.com', password: '1234567890' })
    .then(function (res) {
        expect(res).to.have.status(401);
        expect(res.body.name).to.deep.equal('ValidationError');
        done();
     });
  });
