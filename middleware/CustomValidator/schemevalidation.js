const Joi = require("joi");
function validateUserRegister(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email()
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required()
      .messages({
        "string.pattern.base": "Email is invalid",
        "string.email": "Email is invalid",
      }),
    password: Joi.string().min(3).max(20).required().messages({
      "string.min": "Password must be at least 3 characters long",
      "string.max": "Password must be minimum then 20 characters",
    }),
    phoneNo: Joi.number().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.validateUserRegister = validateUserRegister;
module.exports.validateUserLogin = validateUserLogin;
