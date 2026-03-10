import { Joi, Segments } from 'celebrate';
import { mongoIdValidator } from './sharedValidators.js';

export const studentIdValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: mongoIdValidator.required(),
  }),
};
