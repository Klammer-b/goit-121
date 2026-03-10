import { Joi, Segments } from 'celebrate';
import {
  ageValidator,
  avgMarkValidator,
  genderValidator,
  mongoIdValidator,
  nameValidator,
  onDutyValidator,
} from './sharedValidators.js';

export const createStudentValidationSchema = {
  [Segments.BODY]: Joi.object({
    name: nameValidator.required(),
    age: ageValidator.required(),
    gender: genderValidator.required(),
    avgMark: avgMarkValidator.required(),
    onDuty: onDutyValidator,
    parentId: mongoIdValidator,
  }),
};
