import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const isValidObjectIdValidator = (value, helpers) => {
  const isValid = isValidObjectId(value);

  if (!isValid) {
    return helpers.error('studentId.invalid');
  }

  return value;
};

export const studentIdValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string()
      .required()
      .custom(isValidObjectIdValidator)
      .message({
        'studentId.invalid': '"{#value}" must be a valid mongo id!',
      }),
  }),
};
