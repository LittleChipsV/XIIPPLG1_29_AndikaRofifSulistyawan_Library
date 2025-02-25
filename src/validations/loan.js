const Joi = require("joi");

const loanSchema = {
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

    loan_date: Joi.date().iso().max("now").required().messages({
      "date.base": "{{#label}} harus berupa tanggal",
      "date.iso": "{{#label}} harus dalam format ISO (YYYY-MM-DD)",
      "date.max": "{{#label}} tidak valid",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    return_date: Joi.date()
      .iso()
      .greater(Joi.ref("loan_date"))
      .allow(null)
      .messages({
        "date.base": "{{#label}} harus berupa tanggal",
        "date.iso": "{{#label}} harus dalam format ISO (YYYY-MM-DD)",
        "date.greater": "nilai {{#label}} harus setelah loan_date",
      }),

    status: Joi.string()
      .trim()
      .valid("Dipinjam", "Dikembalikan", "Terlambat")
      .messages({
        "string.base": "{{#label}} harus berupa string",
        "any.only": "nilai {{#label}} harus antara 'Dipinjam', 'Dikembalikan', atau 'Terlambat'",
        "any.required": "{{#label}} tidak boleh kosong",
      }),
  }),
};

module.exports = loanSchema;
