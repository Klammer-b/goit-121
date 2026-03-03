import { Joi } from 'celebrate';
import { GENDERS } from '../constants/gender.js';

export const ageValidator = Joi.number().integer().min(6).max(18);

export const avgMarkValidator = Joi.number().min(1).max(12);

export const genderValidator = Joi.string().valid(...Object.values(GENDERS));

export const onDutyValidator = Joi.bool();

export const nameValidator = Joi.string().min(2).max(30);
