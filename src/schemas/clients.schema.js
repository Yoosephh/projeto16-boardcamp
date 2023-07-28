import Joi from "joi";

export const newCustomerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().numeric().max(11).min(10).required(),
  cpf: Joi.string().numeric().positive().length(11).required(),
  birthday: Joi.string().min(8).max(10).required()
})