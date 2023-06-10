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

  it("Should return an error if the email is already used", async () => {
    const payload = {
      email: "existing_email@example.com",
      name: "John",
      password: "password123",
    };

    await User.create(payload);

    const response = await post({ params: payload, path: "/user" });

    expect(response.statusCode).toEqual(401);
    expect(response.body).toEqual("Email already used!");
  });

  it("Should return an error if required fields are missing", async () => {
    const payload = {
      email: "john@example.com",
      password: "password123",
    };

    const response = await post({ params: payload, path: "/user" });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual("Invalid request params!");
  });

  it("Should create a valid new user with valid input", async () => {
    const payload = {
      email: "john@example.com",
      name: "John",
      password: "password123",
    };

    const response = await post({ params: payload, path: "/user" });

    expect(response.body.name).toEqual(payload.name);
    expect(response.body.email).toEqual(payload.email);
  });

  it("Should hash the user's password before saving", async () => {
    const payload = {
      email: "john@example.com",
      name: "John",
      password: "password123",
    };

    const response = await post({ params: payload, path: "/user" });

    expect(response.statusCode).toEqual(200);
    expect(response.body.name).toEqual(payload.name);
    expect(response.body.email).toEqual(payload.email);

    const createdUser = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    expect(createdUser).toBeDefined();
    expect(createdUser?.password).not.toEqual(payload.password);
  });
});
