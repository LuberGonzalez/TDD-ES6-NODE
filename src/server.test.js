import sinon from "sinon";
import request from "supertest";
import { expect } from "chai";
import * as db from "./db.js";
import { getUserByUsername } from "./db.js";
import { app } from "./server.js";
import proxyquire from "proxyquire";

describe("GET /users/:username", function () {
  let sandbox;
  let getUserByUsernameStub;
  let db;

  // beforeEach(function () {
  //   sandbox = sinon.createSandbox();
  //   getUserByUsernameStub = sandbox.stub();

  //   db = proxyquire("./db", {
  //     "./db": { getUserByUsername: getUserByUsernameStub },
  //   });
  // });

  // afterEach(function () {
  //   sandbox.restore();
  // });

  // it("sends the correct response when a user with the username is found", async function () {
  //   const fakeUser = {
  //     id: "123",
  //     username: "abc",
  //     email: "abc@abc.com",
  //   };

  //   // Configura el stub para que devuelva el usuario falso
  //   getUserByUsernameStub.resolves(fakeUser);

  //   // Realiza la solicitud y verifica la respuesta
  //   const response = await request(app)
  //     .get("/users/abc")
  //     .expect(200)
  //     .expect("Content-Type", /json/);

  //   expect(response.body).to.deep.equal(fakeUser);

  //   // Verifica si la función fue llamada con los argumentos correctos
  //   expect(getUserByUsernameStub.getCall(0).args[0]).to.equal("abc");
  // });

  it("sends the correct response when there is an error", async () => {
    const fakeError = { message: "Something went wrong!" };
    const stub = sinon
      .stub(getUserByUsername, "getUserByUsername")
      .throws(fakeError);

    await request(app)
      .get("/users/abc")
      .expect(500)
      .expect("Content-Type", /json/)
      .expect(fakeError);

    stub.restore();
  });

  it("return the appropriate response when the user is not found", async () => {
    const stub = sinon
      .stub(getUserByUsername, "getUserByUsername")
      .resolves(null);

    await request(app).get("/users/def").expect(404);

    stub.restore();
  });
});
