import { Request, Response } from "express";

const mockRequest = <T>(body: T, headers?: any): Partial<Request> => ({
  body, headers
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

export { mockRequest, mockResponse }