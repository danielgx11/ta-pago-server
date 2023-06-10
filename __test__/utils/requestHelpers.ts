import request from "supertest";

export const requestHelper = (app: any) => {
  const server = app.listen();

  return {
    server,
    post: ({ path = "/", params = {}, headers = {}, auth = "" }) =>
      request(app)
        .post(path)
        .set(headers || {})
        .send(params || {}),
  };
};
