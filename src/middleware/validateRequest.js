const validateRequest = (schema, requestProperty = "body") => {
  return (req, res, next) => {

    const { error, value } = schema[requestProperty].validate(req[requestProperty], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(error);
    }

    req[requestProperty] = value;

    next();
  };
};

module.exports = validateRequest;
