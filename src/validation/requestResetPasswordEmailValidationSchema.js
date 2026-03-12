import { Joi, Segments } from 'celebrate';
import { emailValidator } from './sharedValidators.js';

export const requestResetPasswordEmailValidationSchema = {
  [Segments.BODY]: Joi.object({
    email: emailValidator.required(),
  }),
};
