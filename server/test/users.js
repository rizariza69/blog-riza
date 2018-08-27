require('dotenv').config()
const chai = require('chai')
const expect = chai.expect;
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const mongoose = require('mongoose')
mongoose.connect('mongodb://riza:20Agustus1987@ds125602.mlab.com:25602/tes-tdd',{ useNewUrlParser: true })

describe('users register and login check', function() {
    
  it('register check', function() {

    chai.request('http://localhost:3000')
        .post('/users/register')
        .send({
            username: 'al',
            email: 'al@mail.com',
            password: '123'
      })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a('object')
        done()
      });

    
  });

  it('login check', function(){

    chai.request('http://localhost:3000')
    .post('/users/login')
    .send({
      email: 'al@mail.com',
      password: '123'
    })
    .end(function(err,res){

      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.be.a('object')
      done()
    })
  })
});

describe('article', function(){

})