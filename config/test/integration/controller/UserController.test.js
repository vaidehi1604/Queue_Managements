var supertest = require("supertest");
var tokens;

describe("UserController", () => {
    
  //create user
  it("create User", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/signup")
      .send({
        username: "vaidehi",
        email: "vaidehi@gmail.com",
        password: "1604",
        role: "a",
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);

        done();
      });
  });

  //user login
  it("User logging", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/login")
      .send({
        email: "vaidehi@gmail.com",
        password: "1604",
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);
        tokens = res.body.token;
        done();
      });
  });

  //user logout
  it("User logout", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/logout")
      .set("Authorization", `Bearer ${tokens}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);
        done();
      });
  });
});
