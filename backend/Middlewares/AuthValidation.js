const Joi = require('joi');

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(1).max(120).required(), 
    location: Joi.string().min(3).max(250).required(), 
    email: Joi.string().email().required(), 
    password: Joi.string().min(1).max(50).required(), 
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation error", details: error.details });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(), 
    password: Joi.string().min(1).max(50).required(), 
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation error", details: error.details });
  }
  next();
};

const todoValidation = (req, res, next) => {
  const Schema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    title: Joi.string().required().min(1).max(50),
    description: Joi.string().required().min(1).max(50)
  })
  const {error} = Schema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: "Validation error", details: error.details });
  }
  next()
}

module.exports = {
  signupValidation,
  loginValidation,
  todoValidation
}
