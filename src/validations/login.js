const Joi = require("joi");

const loginSchema = {
  body: Joi.object({
    email: Joi.string().trim().required().messages({
      "string.base": "{{#label}} harus berupa string",
      "string.empty": "{{#label}} tidak boleh kosong",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    password: Joi.string().trim().required().messages({
      "string.base": "{{#label}} harus berupa string",
      "string.empty": "{{#label}} tidak boleh kosong",
      "any.required": "{{#label}} tidak boleh kosong",
    }),
  }),
};

module.exports = loginSchema;
