import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/gender.js';

export const createStudentValidationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().required().integer().min(6).max(18),
    gender: Joi.string()
      .required()
      .valid(...Object.values(GENDERS)),
    avgMark: Joi.number().required().min(1).max(12),
    onDuty: Joi.bool(),
  }),
};
