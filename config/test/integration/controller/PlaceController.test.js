var supertest = require("supertest");
// var tokens;

describe("PlaceController", () => {
  let tokens;
  var placeId;

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

  //   add place
  it("add place", (done) => {
    supertest(sails.hooks.http.app)
      .post("/admin/place")
      .set("Authorization", `Bearer ${tokens}`)
      .send({
        place: "himmatnagar",
        unprocessTicket: 2,
        prefix: "H",
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);
        placeId = res.body.newPlace.id;
        done();
      });
  });
  //update place
  it("update place", (done) => {
    supertest(sails.hooks.http.app)
      .patch("/place/update/" + placeId)
      .field("place", "Himmatnagar")
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
  //get place
  it("get all place", (done) => {
    supertest(sails.hooks.http.app)
      .get("/place/get")
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
  //delete place
  it("delete  place", (done) => {
    supertest(sails.hooks.http.app)
      .delete("/place/delete/" + placeId)
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
