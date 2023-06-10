import User from "../../src/database/models/user";

afterAll(async () => {
  if (process.env.NODE_ENV === 'test') {
    await User.destroy({ truncate: true, force: true });
  }
});
