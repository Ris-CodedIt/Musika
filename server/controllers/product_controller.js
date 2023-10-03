const db = require("../models")
const { DataTypes, Op, BelongsTo } = require("sequelize");
const Product = require("../models/product")(db.sequelize, DataTypes)
const {Category} = require("../models")
const Audit_controller = require("./audit_controller")
const error_logger = require("../other_config/error_logger")
const ProductValidator = require("../validation/product_validation")




const create_product = async(req, res)=>{
    if(!req.body.title || !req.body.quantity || !req.body.unit_price || !req.body.description){
        return res.status(400).json({success: false, message : "please provide all the requested details" })
    }
    const product_details = {
        title : req.body.title,
        quantity : req.body.quantity,
        unit_price : req.body.unit_price,
        description : req.body.description,
        category : req.body.category,
        image : req.file.path
    }
 
    
    // validate inputs
    const {error, value} = ProductValidator.product_details_schema.validate(product_details, { abortEarly: false })
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})

    // check if product title already exists

    const oldproduct = await Product.findOne({ where: {title :product_details.title}})
    if(oldproduct !== null) return res.status(400).json({success:false, message : `that product title already exists`})

    await Product.create(product_details)
    .then(response=>{
           
        // this is the audit trail section
        const auditObj = {
            username: actionby.username,
            user_id:actionby.user_id,
            action:"Create Product",
            message: `Successfull created a product with title ${product.title} `,
            type: "Success"
        }
        
        Audit_controller.createAuditTrail(auditObj)

        let msg = `you have successfully added a product`
        return res.status(200).json({success: true, message: msg})
    })

    .catch(err=>{
                // this is the audit trail section
                const auditObj = {
                    username: actionby.username,
                    user_id:actionby.user_id,
                    action:" Create Product",
                    message: `Attempted to create product with title ${product.title}`,
                    type: "Failed"
                }
                
                Audit_controller.createAuditTrail(auditObj)

                let emsg = `Error: ${err}, Request:${req.originalUrl}`
                error_logger.error(emsg)
        
                let msg = `an error occured: ${err}`
                return res.status(200).json({success: true, message: msg})
    })


}


const update_product = async(req,res)=>{
    if(!req.params.product_id) return res.status(400).json({success: false, message : "please provide a valid product" })

    if(!req.body.title || !req.body.quantity || !req.body.unit_price || !req.body.description){
        return res.status(400).json({success: false, message : "please provide all the requested details" })
    }

    const id = req.params.product_id
    const product_details = {
        title : req.body.title,
        quantity : req.body.quantity,
        unit_price : req.body.unit_price,
        description : req.body.description,
    }

    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    // validate inputs
    const {error, value} = ProductValidator.product_update_details_schema.validate(product_details, { abortEarly: false })
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})

    // this area is waiting for joi validations

    try{
        const product =  await Product.findByPk(id)
        if (product === null){
          let msg = "please select a valid product"
          return res.status(200).json({success: false, message: msg})
        }
    
        product.set(product_details)
    
        await product.save()
        .then(response=>{
               
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Update Product",
                message: `Successfull updated the details of product with title ${product.title} `,
                type: "Success"
            }
            
            Audit_controller.createAuditTrail(auditObj)
    
            let msg = `you have successfully updated a product`
            return res.status(200).json({success: true, message: msg})
        })
    
        .catch(err=>{
                    // this is the audit trail section
                    const auditObj = {
                        username: actionby.username,
                        user_id:actionby.user_id,
                        action:"Update Product",
                        message: `Attempted to update the details of product with title ${product.title}`,
                        type: "Failed"
                    }
                    
                    Audit_controller.createAuditTrail(auditObj)
    
                    let emsg = `Error: ${err}, Request:${req.originalUrl}`
                    error_logger.error(emsg)
            
                    let msg = `an error occured: ${err}`
                    return res.status(200).json({success: true, message: msg})
        })

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `an error occured: ${err}`
        return res.status(200).json({success: true, message: msg})
    }

    
}


const update_product_category = async(req,res)=>{
    if(!req.params.product_id) return res.status(400).json({success: false, message : "please provide a valid product" })

    if(!req.body.category_id) return res.status(400).json({success: false, message : "please provide all the requested details" })

    const id = req.params.product_id
    const category_id = req.body.category_id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    try{
        const product =  await Product.findByPk(id)
        if (product === null){
          let msg = "please select a valid product"
          return res.status(200).json({success: false, message: msg})
        }
    
        product.set({ category_id : category_id})
    
        await product.save()
        .then(response=>{
               
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Product Category Update",
                message: `Successfull updated the category of product with title ${product.title} `,
                type: "Success"
            }
            
            Audit_controller.createAuditTrail(auditObj)
    
            let msg = `you have successfully updated a product category`
            return res.status(200).json({success: true, message: msg})
        })
    
        .catch(err=>{
                    // this is the audit trail section
                    const auditObj = {
                        username: actionby.username,
                        user_id:actionby.user_id,
                        action:"Product Category Update",
                        message: `Attempted to update the category of product with title ${product.title}`,
                        type: "Failed"
                    }
                    
                    Audit_controller.createAuditTrail(auditObj)
    
                    let emsg = `Error: ${err}, Request:${req.originalUrl}`
                    error_logger.error(emsg)
            
                    let msg = `an error occured: ${err}`
                    return res.status(200).json({success: true, message: msg})
        })

    }catch(err){
            
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `an error occured: ${err}`
        return res.status(200).json({success: true, message: msg})

    }


    
}


// The function below must be fine tuned to accept an image update
const update_product_image = async(req,res)=>{
    if(!req.params.product_id) return res.status(400).json({success: false, message : "please provide a valid product" })

    if(!req.body.category_id) return res.status(400).json({success: false, message : "please provide all the requested details" })

    const id = req.params.product_id
    const image = req.file.path
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

   try{
            const product =  await Product.findByPk(id)
            if (product === null){
            let msg = "please select a valid product"
            return res.status(200).json({success: false, message: msg})
            }

            product.set({ image : image})

            await product.save()
            .then(response=>{
                
                // this is the audit trail section
                const auditObj = {
                    username: actionby.username,
                    user_id:actionby.user_id,
                    action:"Product Image Update",
                    message: `Successfull updated the image of product with title ${product.title} `,
                    type: "Success"
                }
                
                Audit_controller.createAuditTrail(auditObj)

                let msg = `you have successfully updated a product image`
                return res.status(200).json({success: true, message: msg})
            })

            .catch(err=>{
                        // this is the audit trail section
                        const auditObj = {
                            username: actionby.username,
                            user_id:actionby.user_id,
                            action:"Product Image Update",
                            message: `Attempted to update the image of product with title ${product.title}`,
                            type: "Failed"
                        }
                        
                        Audit_controller.createAuditTrail(auditObj)

                        let emsg = `Error: ${err}, Request:${req.originalUrl}`
                        error_logger.error(emsg)
                
                        let msg = `an error occured: ${err}`
                        return res.status(200).json({success: true, message: msg})
            })
            

   }catch(err){
    let emsg = `Error: ${err}, Request:${req.originalUrl}`
    error_logger.error(emsg)

    let msg = `an error occured: ${err}`
    return res.status(200).json({success: true, message: msg})
   }
  
}



const publish_product= async(req,res)=>{
    if(!req.params.product_id) return res.status(400).json({success: false, message : "please provide a valid product" })

    const id = req.params.product_id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


    try{
        const product =  await Product.findByPk(id)
        if (product === null){
          let msg = "please select a valid product"
          return res.status(200).json({success: false, message: msg})
        }
    
        product.set({ published : true})
    
        await product.save()
        .then(response=>{
               
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Product Publishing",
                message: `Successfull published product with title ${product.title} `,
                type: "Success"
            }
            
            Audit_controller.createAuditTrail(auditObj)
    
            let msg = `you have successfully published a product`
            return res.status(200).json({success: true, message: msg})
        })
    
        .catch(err=>{
                    // this is the audit trail section
                    const auditObj = {
                        username: actionby.username,
                        user_id:actionby.user_id,
                        action:"Product Publishing",
                        message: `Attempted to publish product with title ${product.title}`,
                        type: "Failed"
                    }
                    
                    Audit_controller.createAuditTrail(auditObj)
    
                    let emsg = `Error: ${err}, Request:${req.originalUrl}`
                    error_logger.error(emsg)
            
                    let msg = `an error occured: ${err}`
                    return res.status(200).json({success: true, message: msg})
        })

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)

        let msg = `an error occured: ${err}`
        return res.status(200).json({success: true, message: msg})

    }
    
}



const unpublish_product= async(req,res)=>{
    if(!req.params.product_id) return res.status(400).json({success: false, message : "please provide a valid product" })

    const id = req.params.product_id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


     try{
        const product =  await Product.findByPk(id)
        if (product === null){
          let msg = "please select a valid product"
          return res.status(200).json({success: false, message: msg})
        }
    
        product.set({ published : false})
    
        await product.save()
        .then(response=>{
               
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Product Unublishing",
                message: `Successfull unpublished product with title ${product.title} `,
                type: "Success"
            }
            
            Audit_controller.createAuditTrail(auditObj)
    
            let msg = `you have successfully published a product`
            return res.status(200).json({success: true, message: msg})
        })
    
        .catch(err=>{
                    // this is the audit trail section
                    const auditObj = {
                        username: actionby.username,
                        user_id:actionby.user_id,
                        action:"Product Unpublishing",
                        message: `Attempted to unpublish product with title ${product.title}`,
                        type: "Failed"
                    }
                    
                    Audit_controller.createAuditTrail(auditObj)
    
                    let emsg = `Error: ${err}, Request:${req.originalUrl}`
                    error_logger.error(emsg)
            
                    let msg = `an error occured: ${err}`
                    return res.status(200).json({success: true, message: msg})
        })

     }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)

        let msg = `an error occured: ${err}`
        return res.status(200).json({success: true, message: msg})

     }
    
}



const publish_all_products= async(req,res)=>{
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    await Product.update({ published : true})


    .then(response=>{
           
        // this is the audit trail section
        const auditObj = {
            username: actionby.username,
            user_id:actionby.user_id,
            action:"Product Publishing All",
            message: `Successfull published all products`,
            type: "Success"
        }
        
        Audit_controller.createAuditTrail(auditObj)

        let msg = `you have successfully published a product`
        return res.status(200).json({success: true, message: msg})
    })

    .catch(err=>{
                // this is the audit trail section
                const auditObj = {
                    username: actionby.username,
                    user_id:actionby.user_id,
                    action:"Product Publishing ALL",
                    message: `Attempted to publish all product`,
                    type: "Failed"
                }
                
                Audit_controller.createAuditTrail(auditObj)

                let emsg = `Error: ${err}, Request:${req.originalUrl}`
                error_logger.error(emsg)
        
                let msg = `an error occured: ${err}`
                return res.status(200).json({success: true, message: msg})
    })
    
}


const unpublish_all_products= async(req,res)=>{
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    await Product.update({ published : false})


    .then(response=>{
           
        // this is the audit trail section
        const auditObj = {
            username: actionby.username,
            user_id:actionby.user_id,
            action:"Product Unublishing All",
            message: `Successfull unpublished all products`,
            type: "Success"
        }
        
        Audit_controller.createAuditTrail(auditObj)

        let msg = `you have successfully unpublished all products`
        return res.status(200).json({success: true, message: msg})
    })

    .catch(err=>{
                // this is the audit trail section
                const auditObj = {
                    username: actionby.username,
                    user_id:actionby.user_id,
                    action:"Product Unpublishing ALL",
                    message: `Attempted to unpublish all product`,
                    type: "Failed"
                }
                
                Audit_controller.createAuditTrail(auditObj)

                let emsg = `Error: ${err}, Request:${req.originalUrl}`
                error_logger.error(emsg)
        
                let msg = `an error occured: ${err}`
                return res.status(200).json({success: true, message: msg})
    })
    
}



// this section is for fetching product data

const get_all_products = async(req,res)=>{
    await Product.findAll({
        where: {is_deleted: false},
        include:[{
            model: Category,
            association: new BelongsTo(Product, Category, { foreignKey: 'category_id'})
        }]})
        .then((prod)=>{
            if (prod.length > 0){
                return res.status(200).json({success:true, data: prod})
              }
              let msg = "No data was found"
              return res.status(200).json({success:false, data: [], message : msg})
        })
        .catch((err)=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            let msg = `there was an error: conection failed while collecting data`
            return res.status(200).json({success:false, data:[], message: msg})
        })


}


const get_single_product = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "Please Submint A Valid product"})
    const id = req.params.id

    try{
        const product =  await Product.findOne({
            where:{id : id},
            include:[{
                model: Category,
                association: new BelongsTo(Product, Category, { foreignKey: 'category_id'})
            }]})
    
        if (product === null){
                let msg = "No product was found"
                return res.status(200).json({success:false, message : msg})
        }
        return res.status(200).json({success:true, data: product})

    }
    catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `there was an error: conection failed while collecting data`
        return res.status(200).json({success:false, data:[], message: msg})
    }


}


const get_published_products = async(req,res)=>{
    await Product.findAll({
        where: {published : true, is_deleted: false},
        include:[{
            model: Category,
            association: new BelongsTo(Product, Category, { foreignKey: 'category_id'})
        }]})
        .then((prod)=>{
            if (prod.length > 0){
                return res.status(200).json({success:true, data: prod})
              }
              let msg = "No data was found"
              return res.status(200).json({success:false, data: [], message : msg})
        })
        .catch((err)=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            let msg = `there was an error: conection failed while collecting data`
            return res.status(200).json({success:false, data:[], message: msg})
        })

}


const get_unpublished_products = async(req,res)=>{
    await Product.findAll({
        where: {published : false, is_deleted: false},
        include:[{
            model: Category,
            association: new BelongsTo(Product, Category, { foreignKey: 'category_id'})
        }]})
        .then((prod)=>{
            if (prod.length > 0){
                return res.status(200).json({success:true, data: prod})
              }
              let msg = "No data was found"
              return res.status(200).json({success:false, data: [], message : msg})
        })
        .catch((err)=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            let msg = `there was an error: conection failed while collecting data`
            return res.status(200).json({success:false, data:[], message: msg})
        })

}



const get_deleted_products = async(req,res)=>{
    await Product.findAll({
        where:{is_deleted: false },
        include:[{
            model: Category,
            association: new BelongsTo(Product, Category, { foreignKey: 'category_id'})
        }]})
        .then((prod)=>{
            if (prod.length > 0){
                return res.status(200).json({success:true, data: prod})
              }
              let msg = "No data was found"
              return res.status(200).json({success:false, data: [], message : msg})
        })
        .catch((err)=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            let msg = `there was an error: conection failed while collecting data`
            return res.status(200).json({success:false, data:[], message: msg})
        })

}



module.exports = {
    create_product,
    update_product,
    update_product_category,
    update_product_image,
    publish_all_products,
    unpublish_all_products,
    publish_product,
    unpublish_product,
    get_all_products,
    get_single_product,
    get_published_products,
    get_unpublished_products,
    get_deleted_products
}