import { Router } from 'express';
import { Request, Response } from 'express';
import User from '../../../database/models/user';

const userRoutes = Router();

userRoutes.post('/user', async (req: Request, res: Response): Promise<Response> => {
  const user: User = await User.create({ ...req.body });
  return res.status(201).json(user);
});

export default userRoutes;