const db = require("../models")
const { DataTypes, Op } = require("sequelize");
const Category = require("../models/category")(db.sequelize, DataTypes)
const error_logger = require("../other_config/error_logger")
const ProductValidator = require("../validation/product_validation");
const category = require("../models/category");



const create_category = async(req, res)=>{
    if(!req.body.title) return res.status(400).json({success: false, message: "Please provide all reqired details"})

    const title = req.body.title

    // validate input 
    const {error, value} = ProductValidator.product_category_schema.validate({title})
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})


    await Category.create({
        title:title
    })
    .then(resp=>{

        let msg = "you have successfully added a category"
        return res.status(200).json({success: true, message: msg})
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    })
} 



const update_category = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "Please provide a valid category"})
    if(!req.body.title) return res.status(400).json({success: false, message: "Please provide all reqired details"})

    const title = req.body.title
    const id = id

    // validate input 
    const {error, value} = ProductValidator.product_category_schema.validate({title})
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})
    
    try{
        const our_category = Category.findByPk(id)
        if(our_review === null){
            let msg = "There was an error finding the category"
            return res.status(200).json({success: false, message: msg})
          }

        our_category.set({
            title:title
        })
        
        await our_category.save()
        .then(resp=>{
    
            let msg = "you have successfully updated a category"
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            
            let msg = "Sorry we are having technical problems, Please try again later"
            return res.status(200).json({success: false, message: msg})
        })
    }
    catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    }

} 


const delete_category = async(req, res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "Please provide a valid category"})

    const id= req.params.id

    await Category.destroy({where: {id : id} })

    .then(resp=>{
        let msg = "you have successfully deleted a category"
        return res.status(200).json({success: true, message: msg})
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    })
} 



module.exports = {
    create_category,
    update_category,
    delete_category
}