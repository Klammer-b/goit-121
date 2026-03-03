import { Joi, Segments } from 'celebrate';

export const loginUserValidationSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};
