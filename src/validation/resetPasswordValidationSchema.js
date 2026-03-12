import { Joi, Segments } from 'celebrate';
import { passwordValidator } from './sharedValidators.js';

export const resetPasswordValidationSchema = {
  [Segments.BODY]: Joi.object({
    password: passwordValidator.required(),
    token: Joi.string(),
  }),
};
