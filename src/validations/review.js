const Joi = require("joi");

const reviewSchema = {
  body: Joi.object({
    book_id: Joi.number().integer().positive().required().messages({
      "number.base": "{{#label}} harus berupa integer",
      "number.integer": "{{#label}} harus berupa integer",
      "number.positive": "{{#label}} harus berupa integer positif",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    user_id: Joi.number().integer().positive().required().messages({
      "number.base": "{{#label}} harus berupa integer",
      "number.integer": "{{#label}} harus berupa integer",
      "number.positive": "{{#label}} harus berupa integer positif",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    rating: Joi.number().integer().min(1).max(5).required().messages({
      "number.base": "{{#label}} harus berupa integer",
      "number.integer": "{{#label}} harus berupa integer",
      "number.min": "nilai {{#label}} harus setidaknya 1",
      "number.max": "nilai {{#label}} tidak boleh melebihi 5",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    comment: Joi.string().trim().allow(null, "").messages({
      "string.base": "{{#label}} harus berupa string",
    }),
  }),
};

module.exports = reviewSchema;
