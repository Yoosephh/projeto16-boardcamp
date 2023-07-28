import Joi from "joi";

export const newCustomerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^[0-9]+$/).max(11).min(10).required(),
  cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
  birthday: Joi.string().pattern(/^[0-9/-]+$/).min(8).max(10).required()
})