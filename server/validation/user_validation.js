const Joi = require('joi');


const user_registration_schema = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    username: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')).required(),
})



const update_names_schema = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
})



const update_email_schema = Joi.object({
    email: Joi.string().email(2).required(),
})


const update_username_schema = Joi.object({
    username: Joi.string().alphanum().min(3).required(),
})


const update_password_schema = Joi.object({
    password: Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$')).required(),
})


module.exports  = {
    user_registration_schema,
    update_email_schema,
    update_names_schema,
    update_password_schema,
    update_username_schema
}