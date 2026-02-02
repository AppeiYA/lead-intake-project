import Joi from 'joi'

export const LeadPostSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    website: Joi.string().allow('').optional()
})