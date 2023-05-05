import { Request, Response } from 'express';
import { CreateExerciseRequest } from '../../ports/requests';
import { mockRequest, mockResponse } from '../../tests/helpers';

import { createExercise } from './create';

jest.mock('../../../database/models/exercise');


describe('createExercise', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 400 status if the req does not match Auth attributes', async () => {
    const req = mockRequest<CreateExerciseRequest>(
      {
        name: 'test',
        weight: "10",
        repetitions: "10",
        breakTime: "10"
      },
      { invalidAuthParam: 'xxx' }
    );
    const res = mockResponse();

    await createExercise(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ "error": "Invalid auth params" });
    expect(res.end).toHaveBeenCalled();
  });
});
