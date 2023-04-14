import { Router } from 'express';
import { Request, Response } from 'express';
import User from '../../../database/models/user';
import { loginAdapter } from '../../adapters/auth/auth-adapter';
import { login } from '../../controllers';

const authRoutes = Router();

authRoutes.post('/login', loginAdapter, login);

export default authRoutes;