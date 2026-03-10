import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { celebrate } from 'celebrate';
import { registerUserValidationSchema } from '../validation/registerUserValidagionSchema.js';
import { VALIDATION_OPTIONS } from '../constants/validationOptions.js';
import { loginUserValidationSchema } from '../validation/loginUserValidagionSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerUserValidationSchema, VALIDATION_OPTIONS),
  registerUserController,
);
authRouter.post(
  '/auth/login',
  celebrate(loginUserValidationSchema, VALIDATION_OPTIONS),
  loginUserController,
);
authRouter.post('/auth/logout', logoutUserController);

authRouter.post('/auth/refresh-session', refreshSessionController);

export default authRouter;
