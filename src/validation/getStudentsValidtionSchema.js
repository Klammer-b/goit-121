import { Joi, Segments } from 'celebrate';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  SORT_BY,
  SORT_ORDERS,
} from '../constants/getStudentsDefaultQueryParams.js';
import {
  ageValidator,
  avgMarkValidator,
  genderValidator,
  onDutyValidator,
} from './sharedValidators.js';

export const getStudentsValidationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(DEFAULT_PAGE),
    perPage: Joi.number().integer().min(1).max(10).default(DEFAULT_PER_PAGE),
    sortOrder: Joi.string()
      .valid(...Object.values(SORT_ORDERS))
      .default(DEFAULT_SORT_ORDER),
    sortBy: Joi.string()
      .valid(...Object.values(SORT_BY))
      .default(DEFAULT_SORT_BY),
    minAge: ageValidator,
    maxAge: ageValidator,
    minAvgMark: avgMarkValidator,
    maxAvgMark: avgMarkValidator,
    gender: genderValidator,
    onDuty: onDutyValidator,
    search: Joi.string().allow(''),
  }),
};
