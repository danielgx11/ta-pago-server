import { Router } from 'express';
import { Request, Response } from 'express';
import User from '../../../database/models/user';
import { createUserAdapter } from '../../adapters';
import { createUser } from '../../controllers';

const userRoutes = Router();

userRoutes.post('/user', createUserAdapter, createUser);

export default userRoutes;