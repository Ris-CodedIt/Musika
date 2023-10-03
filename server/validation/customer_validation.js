const Joi = require('joi');

const customer_details_schema = Joi.object({
    phone: Joi.string().min(10).required(),
    birth_date: Joi.date().required(),
    national_id: Joi.string().required(),
    address: Joi.string().required(),
    user_id: Joi.string().required(),
})
const customer_update_details_schema = Joi.object({
    phone: Joi.string().min(10).required(),
    birth_date: Joi.date().required(),
    national_id: Joi.string().required(),
    address: Joi.string().required(),
})


module.exports = {
    customer_details_schema,
    customer_update_details_schema
}