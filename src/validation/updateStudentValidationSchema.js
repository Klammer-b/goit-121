import { Joi, Segments } from 'celebrate';
import {
  ageValidator,
  avgMarkValidator,
  genderValidator,
  nameValidator,
  onDutyValidator,
} from './sharedValidators.js';

export const updateStudentValidationSchema = {
  [Segments.BODY]: Joi.object({
    name: nameValidator,
    age: ageValidator,
    gender: genderValidator,
    avgMark: avgMarkValidator,
    onDuty: onDutyValidator,
  }).min(1),
};
