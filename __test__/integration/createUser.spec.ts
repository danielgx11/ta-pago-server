import { requestHelper } from "../utils/requestHelpers";
import User from "../../src/database/models/user";
import connection from "../../src/database/database";
import app from "../../src/app";

const { post, server } = requestHelper(app);

beforeAll(async () => {
  await User.sync({ force: true });
});

afterEach(async () => {
  await User.sync({ force: true });
});

afterAll(async () => {
  await server.close();
  await connection.close();
});

describe("[Integration Tests] Create User", () => {
  it("Should create a new User if its does not exists", async () => {
    const payload = {
      email: "teste_caio@gmail.com",
      name: "lucca",
      password: "123",
    };

    const response = await post({ params: payload, path: "/user" });

    expect(response.statusCode).toEqual(200);
  });
});
