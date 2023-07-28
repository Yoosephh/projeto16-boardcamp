import Joi from "joi";

export const newCustomerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).max(11).min(10).required(),
  cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
  birthday: Joi.string().pattern(/^[0-9/-]+$/).length(10).required()
})
export const updateCustomerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).max(11).min(10).required(),
  birthday: Joi.string().pattern(/^[0-9/-]+$/).length(10).required()
})