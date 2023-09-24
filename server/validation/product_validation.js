const Joi = require('joi');

const product_details_schema = Joi.object({
    title: Joi.string().pattern(new RegExp(/^[a-zA-Z][-a-zA-Z\d_\s]{2,20}$/)).required().messages({"string.pattern.base": `"" must be between 3 and 20 character, starting with an alphabet character and may contain digits, _, - characters`}),
    quantity: Joi.number().positive().required(),
    unit_price: Joi.number().positive().required(),
    description: Joi.string().min(10).max(2500).required(),
    category: Joi.number().positive().required(),
    image : Joi.string().required()

})


const product_update_details_schema = Joi.object({
    title: Joi.string().pattern(new RegExp(/^[a-zA-Z][-a-zA-Z\d_\s]{2,20}$/)).required().messages({"string.pattern.base": `"" must be between 3 and 20 character, starting with an alphabet character and may contain digits, _, - characters`}),
    quantity: Joi.number().positive().required(),
    unit_price: Joi.number().positive().required(),
    description: Joi.string().min(10).max(2500).required(),
})


const product_review_schema = Joi.object({
    review: Joi.string().min(3).required(),
    rating: Joi.number().positive().min(1).max(5).required(),
})
const product_category_schema = Joi.object({
    title: Joi.string().min(3).required(),
})



module.exports = {
    product_details_schema,
    product_review_schema,
    product_update_details_schema,
    product_category_schema
}