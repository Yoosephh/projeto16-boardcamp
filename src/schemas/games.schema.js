import Joi from "joi";

export const newGameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi./*any().required()*/string().uri({ scheme: ['http', 'https'] }).required(),
  stockTotal: Joi.number().required().integer().greater(0),
  pricePerDay: Joi.number().required().integer().greater(0)
})