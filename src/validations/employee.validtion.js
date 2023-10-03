const Joi = require("joi");

const joiValidator = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  jobRole:Joi.string().required(),
  wallet: Joi.string().required(),
  paid:Joi.number().required(),
  salary:Joi.number().required(),
  bonus:Joi.number().required(),
  deducted:Joi.number().required(),
  earned: Joi.number().required(),
  phone:Joi.string().required()

});

module.exports = joiValidator;