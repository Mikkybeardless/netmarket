import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(8000),
});
