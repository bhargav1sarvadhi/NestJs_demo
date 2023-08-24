import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
