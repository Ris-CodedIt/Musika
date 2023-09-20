const Joi = require('joi');

const product_details_schema = Joi.object({
    title: Joi.string().alphanum().min(3).pattern(new RegExp('/^[a-z\d\-_\s]+$/i')).required(),
    quantity: Joi.number().positive().required(),
    unit_price: Joi.number().positive().required(),
    description: Joi.string().min(10).max(2500).required(),
    image : Joi.string().required()
})


const product_review_schema = Joi.object({
    review: Joi.string().min(30).required(),
    rating: Joi.number().positive().min(1).max(5).required(),
})
