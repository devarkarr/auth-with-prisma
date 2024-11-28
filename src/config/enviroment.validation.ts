import * as Joi from 'joi';

export default Joi.object({
  //   NODE_ENV: Joi.string().valid('development', 'production', 'test'),
  PORT: Joi.number().required(),
  API_VERSION: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.string().required(),
  DB_AUTOLOADENTITIES: Joi.string().required(),
  // JWT_AUDIENCE:Joi.string().required(),
  // JWT_ISSUER:Joi.string().required(),
  // JWT_SECRET:Joi.string().required(),
  // JWT_EXPIRESIN:Joi.number().required(),
  // JWT_REFRESHTOKENTTL:Joi.number().required(),
});
