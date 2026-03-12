import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { celebrate } from 'celebrate';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { VALIDATION_OPTIONS } from '../constants/validationOptions.js';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { requestResetPasswordEmailValidationSchema } from '../validation/requestResetPasswordEmailValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';

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

authRouter.post(
  '/auth/request-reset-password-email',
  celebrate(requestResetPasswordEmailValidationSchema),
  requestResetPasswordEmailController,
);
authRouter.post(
  '/auth/reset-password',
  celebrate(resetPasswordValidationSchema),
  resetPasswordController,
);

export default authRouter;
