import { Router } from 'express';
import { createExerciseAdapter } from '../../adapters';
import { verifyJWT } from '../../adapters/auth/verifyJWT';
import { createExercise } from '../../controllers';

const exerciseRoutes = Router();

exerciseRoutes.post('/exercise', verifyJWT, createExerciseAdapter, createExercise);

export default exerciseRoutes;