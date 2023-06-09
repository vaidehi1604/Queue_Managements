var supertest = require("supertest");

describe("TicketsController", () => {
  let userToken;
  let placeId;
  let ticketId;
  let adminToken;
  let userId;

  //create admin
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

  //admin login
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
        adminToken = res.body.token;
        done();
      });
  });

  //create user
  it("create User", (done) => {
    supertest(sails.hooks.http.app)
      .post("/user/signup")
      .send({
        username: "khushal",
        email: "khushal@gmail.com",
        password: "1604",
        role: "u",
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
        email: "khushal@gmail.com",
        password: "1604",
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);
        userToken = res.body.token;
        done();
      });
  });
  //
  it("add place", (done) => {
    supertest(sails.hooks.http.app)
      .post("/admin/place")
      .set("Authorization", `Bearer ${adminToken}`)
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

  //add tickets
  it("add tickets", (done) => {
    supertest(sails.hooks.http.app)
      .post("/addticket/" + placeId)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        placeId: placeId,
        unprocessTicket: 2,
        processed: false,
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);
        ticketId = res.body.newTicket.id;
        console.log(ticketId);
        done();
      });
  });

  //get current user ticket
  it("get all tickets", (done) => {
    supertest(sails.hooks.http.app)
      .get("/user/ticket?processed=false")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res.body);

        done();
      });
  });

  //get placeId to ticket
  it("get place vise tickets", (done) => {
    supertest(sails.hooks.http.app)
      .get("/user/ticket?processed=false")
      .set("Authorization", `Bearer ${userToken}`)
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
