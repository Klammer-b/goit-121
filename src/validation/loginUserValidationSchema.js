import { Joi, Segments } from 'celebrate';
import { emailValidator, passwordValidator } from './sharedValidators.js';

export const loginUserValidationSchema = {
  [Segments.BODY]: Joi.object({
    email: emailValidator.required(),
    password: passwordValidator.required(),
  }),
};
