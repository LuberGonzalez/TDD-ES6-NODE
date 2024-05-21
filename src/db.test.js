import { expect } from "chai";
import { getUserByUsername } from "./db.js";
import { getDatabaseData, resetDatabase, setDatabaseData } from "./test-helper.js";

describe("getuserByUsername", () => {

  afterEach('reset the database', async () => {
    await resetDatabase();
  })

  it("get the correct user from the database given a username", async () => {
    const fakeData = [
      {
        id: "124",
        username: "wrong",
        email: "wrong@wrong.com",
      },
      {
        id: "123",
        username: "abc",
        email: "abc@abc.com",
      },
    ];

    await setDatabaseData('users', fakeData);

    const actual = await getUserByUsername("abc");

    const finalDBState = getDatabaseData('users')

    const expected = {
      id: "123",
      username: "abc",
      email: "abc@abc.com",
    };

    expect(actual).excludingEvery('_id').to.deep.equal(expected);
    // expect(finalDBState).excludingEvery('_id').to.deep.equal(fakeData);
  });

  it("return null when the user is not found", async () => {
    await setDatabaseData("users", [
      {
        id: "999",
        username: "XYZ",
        email: "nobody@gmail.com",
      },
    ]);
    const actual = await getUserByUsername('def');
    expect(actual).to.be.null;
  });
});
