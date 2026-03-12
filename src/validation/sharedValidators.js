import { Joi } from 'celebrate';
import { GENDERS } from '../constants/gender.js';
import { isValidObjectId } from 'mongoose';

const isValidObjectIdValidator = (value, helpers) => {
  const isValid = isValidObjectId(value);

  if (!isValid) {
    return helpers.error('mongoId.invalid');
  }

  return value;
};

export const ageValidator = Joi.number().integer().min(6).max(18);

export const avgMarkValidator = Joi.number().min(1).max(12);

export const genderValidator = Joi.string().valid(...Object.values(GENDERS));

export const onDutyValidator = Joi.bool();

export const nameValidator = Joi.string().min(2).max(30);

export const mongoIdValidator = Joi.string()
  .custom(isValidObjectIdValidator)
  .message({
    'mongoId.invalid': '"{#value}" must be a valid mongo id!',
  });

export const emailValidator = Joi.string().email();

export const passwordValidator = Joi.string().regex(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;"'<>,.?~`-]).{8,}$/,
);
