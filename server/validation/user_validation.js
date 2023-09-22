const Joi = require('joi');


const user_registration_schema = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    username: Joi.string().pattern(new RegExp(/^[A-Za-z]{3}[A-Za-z0-9_@.#-]{0,9}$/)).required().messages({"string.pattern.base": `"" must be between 3 and 12 characters long, starting with 3 alphabet characters and may or may not contain any of @._-# and digit characters`}),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+-=|\\]).{8,32}$/)).required().messages({
        "string.pattern.base": `"" must contain at least 1 digit,1 lowercase , 1 uppercase , any special character and must be at least 8 characters long `,
    })
})



const update_names_schema = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
})



const update_email_schema = Joi.object({
    email: Joi.string().email().required(),
})


const update_username_schema = Joi.object({
    username: Joi.string().pattern(new RegExp(/^[A-Za-z]{3}[A-Za-z0-9_@.#-]{0,9}$/)).required().messages({"string.pattern.base": `"" must be between 3 and 12 characters long, starting with 3 alphabet characters and may or may not contain any of @._-# and digit characters`}),
})


const update_password_schema = Joi.object({
    password: Joi.string().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+-=|\\]).{8,32}$/)).required().messages({
        "string.pattern.base": `"" must contain at least 1 digit,1 lowercase , 1 uppercase , any special character and must be at least 8 characters long `,
    })
})


module.exports  = {
    user_registration_schema,
    update_email_schema,
    update_names_schema,
    update_password_schema,
    update_username_schema
}