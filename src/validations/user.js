const Joi = require("joi");

const userSchema = {
  body: Joi.object({
    username: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9_]+$/)
      .min(3)
      .max(255)
      .required()
      .messages({
        "string.base": "{{#label}} harus berupa string",
        "string.pattern.base": "{{#label}} hanya boleh berisi huruf, angka, atau underscore (_)",
        "string.empty": "{{#label}} tidak boleh kosong",
        "string.min": "{{#label}} harus memiliki setidaknya {#limit} karakter",
        "string.max": "{{#label}} tidak boleh melebihi {#limit} karakter",
        "any.required": "{{#label}} tidak boleh kosong",
      }),

    name: Joi.string().trim().min(3).max(255).required().messages({
      "string.base": "{{#label}} harus berupa string",
      "string.empty": "{{#label}} tidak boleh kosong",
      "string.min": "{{#label}} harus memiliki setidaknya {#limit} karakter",
      "string.max": "{{#label}} tidak boleh melebihi {#limit} karakter",
      "any.required": "{{#label}} tidak boleh kosong",
    }),

    email: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": "{{#label}} harus berupa string",
        "string.email": "format {{#label}} tidak valid",
        "string.empty": "{{#label}} tidak boleh kosong",
        "any.required": "{{#label}} tidak boleh kosong",
      }),

    password: Joi.string()
      .trim()
      .min(8)
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
      .required()
      .messages({
        "string.base": "{{#label}} harus berupa string",
        "string.empty": "{{#label}} tidak boleh kosong",
        "string.min": "{{#label}} harus memiliki setidaknya {#limit} karakter",
        "string.pattern.base":
          "{{#label}} harus memiliki setidaknya 1 huruf kapital, 1 huruf nonkapital, 1 nomor, dan 1 karakter spesial",
        "any.required": "{{#label}} tidak boleh kosong",
      }),

    phone: Joi.string()
      .trim()
      .pattern(new RegExp("^[+]?[(]?[0-9]{1,4}[)]?[-s./0-9]*$"))
      .allow(null, "")
      .messages({
        "string.base": "{{#label}} harus berupa string",
        "string.pattern.base": "format {{#label}} tidak valid",
      }),
  }),
};

module.exports = userSchema;
