import { Joi, Segments } from 'celebrate';

export const registerUserValidationSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    username: Joi.string(),
  }),
};
