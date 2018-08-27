require('dotenv').config()
const chai = require('chai')
const expect = chai.expect;
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const mongoose = require('mongoose')
mongoose.connect('mongodb://riza:20Agustus1987@ds125602.mlab.com:25602/tes-tdd',{ useNewUrlParser: true })

ddescribe("check CRUD", function() {
  after(function(done) {
    mongoose.connect(
      "mongodb://riza:20Agustus1987@ds125602.mlab.com:25602/tes-tdd",
      { useNewUrlParser: true },
      function() {
        Article.collection.drop();
        Article.remove({}, function() {});
        done();
      }
    );
  });

  it("get/articles/findAll should return all articles ", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/articles/findAll")
      .end(function(err, res) {
        expect(res).to.be.a("object");
        done();
      });
  });

  it("get/articles/comment/:articleid should comments from one article ", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/users/getComment/5b8202ba5540a450c8038690")
      .end(function(err, res) {
        expect(res).to.be.a("object");
        done();
      });
  });
  it("get/articles/findOne/:id should return one article ", function(done) {
    chai
      .request("http://localhost:3000")
      .get("/users/showArticle/5b8202ba5540a450c8038690")
      .end(function(err, res) {
        expect(res).to.be.a("object");
        done();
      });
  });

  it("post/articles/create should create an article", function(done) {
    chai
      .request("http://localhost:3000")
      .post("/articles/create")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )
      .send({
        title: "hantu",
        description: "seram",
      })
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });


  it("put/articles/update/:articleId should return create an article", function(done) {
    chai
      .request("http://localhost:3000")
      .put("/articles/update/5b8202ba5540a450c8038690")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )
      .send({
        title: "mantab",
        description: "Jalan-jalan"
      })
      .end(function(err, res) {

        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });

  it("delete/articles/:id should delete an Article created from authen User", function(done) {
    chai
      .request("http://localhost:3000")
      .del("/articles/5b8202ba5540a450c8038690")
      .set(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViN2Q1NTg3NjE4OTk3Y2M5YzY0ZDQ1NyIsInVzZXJuYW1lIjoib2tpIiwiaWF0IjoxNTM1MjA3NDk5fQ.swhjFmGzJ7o4nDdVD3_yuQesjrh_V4t-5dQAe8ww3WY"
      )

      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.a("object");
        done();
      });
  });
});
