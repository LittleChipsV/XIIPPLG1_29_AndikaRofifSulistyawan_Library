const Joi = require("joi");

const bookSchema = {
  body: Joi.object({
    user_id: Joi.number().integer().positive().allow(null).messages({
      "number.base": "{{#label}} harus berupa integer",
      "number.integer": "{{#label}} harus berupa integer",
      "number.positive": "{{#label}} harus berupa integer positif",
    }),

    category_id: Joi.number().integer().positive().required().messages({
      "number.base": "{{#label}} harus berupa integer",
      "number.integer": "{{#label}} harus berupa integer",
      "number.positive": "{{#label}} harus berupa integer positif",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    title: Joi.string().trim().max(255).required().messages({
      "string.base": "{{#label}} harus berupa string",
      "string.empty": "{{#label}} tidak boleh kosong",
      "string.max": "{{#label}} tidak boleh melebihi {#limit} karakter",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    writer: Joi.string().trim().max(255).required().messages({
      "string.base": "{{#label}} harus berupa string",
      "string.empty": "{{#label}} tidak boleh kosong",
      "string.max": "{{#label}} tidak boleh melebihi {#limit} karakter",
      "any.required": "{{#label}} dibutuhkan",
    }),

    publisher: Joi.string().trim().max(255).required().messages({
      "string.base": "{{#label}} harus berupa string",
      "string.empty": "{{#label}} tidak boleh kosong",
      "string.max": "{{#label}} tidak boleh melebihi {#limit} karakter",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    year: Joi.number()
      .integer()
      .max(new Date().getFullYear())
      .required()
      .messages({
        "number.base": "{{#label}} harus berupa integer",
        "number.integer": "{{#label}} harus berupa integer",
        "number.max": `{{#label}} tidak valid (max: ${new Date().getFullYear()})`,
        "any.required": "{{#label}} tidak boleh kosong",
      }),
  }),
};

module.exports = bookSchema;
