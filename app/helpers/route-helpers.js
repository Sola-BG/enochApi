const Joi = require("joi");

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req["params"][name] }, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["params"]) req.value["params"] = {};
        req.value["params"][name] = result.value.param;
        next();
      }
    };
  },
  validateBody: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["body"]) req.value["body"] = {};
        req.value["body"] = result.value;
        next();
      }
    };
  },

  schemas: {
    userSchema: Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }),
    userOptionalSchema: Joi.object().keys({
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string()
    }),
    authenticationSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required()
    }),
    userInvoiceSchema: Joi.object().keys({
      invoiceReference: Joi.string().required(),
      clientName: Joi.string().required()
    }),
    invoiceSchema: Joi.object().keys({
      owner: Joi.string()
        .regex(/^[0-9a-zA-Z]{24}$/)
        .required(),
      invoiceReference: Joi.string().required(),
      clientName: Joi.string().required()
    }),
    putInvoiceSchema: Joi.object().keys({
      invoiceReference: Joi.string().required(),
      clientName: Joi.string().required()
    }),
    patchInvoiceSchema: Joi.object().keys({
      invoiceReference: Joi.string(),
      clientName: Joi.string()
    }),
    idSchema: Joi.object().keys({
      param: Joi.string()
        .regex(/^[0-9a-zA-Z]{24}$/)
        .required()
    })
  }
};
