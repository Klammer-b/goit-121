import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/gender.js';

export const updateStudentValidationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    age: Joi.number().integer().min(6).max(18),
    gender: Joi.string().valid(...Object.values(GENDERS)),
    avgMark: Joi.number().min(1).max(12),
    onDuty: Joi.bool(),
  }).min(1),
};
