const { ValidationError } = require("sequelize")
const ProductValidator = require("./validation/product_validation")
const UserValidation = require("./validation/user_validation")



const {error, value} = ProductValidator.product_details_schema.validate({
    title: "id_",
    quantity: "12",
    unit_price: 12,
    description:"kifikdkdkdkdkdkd",
    image : ".."
},{ abortEarly: false })


console.log(error)
console.log(value)