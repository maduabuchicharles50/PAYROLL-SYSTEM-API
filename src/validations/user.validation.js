const Joi = require("joi");

const joiValidator = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
  companyName: Joi.string().required(),
  companyMail: Joi.string().email().required(),
  phoneNumber: Joi.number().required(),
  address: Joi.string().required(),
  zipCode: Joi.number().required(),
  cacNumber: Joi.number().required(),
  industry: Joi.string().required(),
  wallet: Joi.string().required(),
});

module.exports = joiValidator;
