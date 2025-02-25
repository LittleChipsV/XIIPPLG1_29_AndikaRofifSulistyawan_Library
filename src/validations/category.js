const Joi = require("joi");

const categorySchema = {
  body: Joi.object({
    name: Joi.string().trim().min(1).required().messages({
      "string.base": "{{#label}} harus berupa string",
      "string.empty": "{{#label}} tidak boleh kosong",
      "any.required": "{{#label}} tidak boleh kosong",
    }),
  }),
};

module.exports = categorySchema;
