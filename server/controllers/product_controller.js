const db = require("../models")
const { DataTypes, Op } = require("sequelize");
const Product = require("../models/product")(db.sequelize, DataTypes)
const Audit_controller = require("./audit_controller")
const error_logger = require("../other_config/error_logger")



const create_product = async(req, res)=>{

    // this is waiting fo multer in order to save images
}


const update_product = async(req,res)=>{
    if(!req.params.product_id) return res.status(200).json({success: false, message : "please provide a valid product" })

    if(!req.body.title || !req.body.quantity || !req.body.unit_price || !req.body.description){
        return res.status(200).json({success: false, message : "please provide all the requested details" })
    }

    const id = req.params.product_id
    const title = req.body.title
    const quantity = req.body.quantity
    const unit_price = req.body.unit_price
    const description = req.body.description

    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    // this area is waiting for joi validations

    const product =  await Product.findByPk(id)
    if (product === null){
      let msg = "please select a valid product"
      return res.status(200).json({success: false, message: msg})
    }

    product.set({
        title : title,
        quantity: quantity,
        unit_price: unit_price,
        description: description
    })

    await product.save()
    .then(response=>{
           
        // this is the audit trail section
        const auditObj = {
            username: actionby.username,
            user_id:actionby.user_id,
            action:"Product Update",
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
                    action:"Product Update",
                    message: `Attempted to update the details of product with title ${product.title}`,
                    type: "Failed"
                }
                
                Audit_controller.createAuditTrail(auditObj)

                let emsg = `Error: ${err}, Request:${req.originalUrl}`
                error_logger.error(emsg)
        
                let msg = `an error occured: ${err}`
                return res.status(200).json({success: true, message: msg})
    })
    
}


const update_product_category = async(req,res)=>{
    if(!req.params.product_id) return res.status(200).json({success: false, message : "please provide a valid product" })

    if(!req.body.category_id) return res.status(200).json({success: false, message : "please provide all the requested details" })

    const id = req.params.product_id
    const category_id = req.body.category_id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    // this area is waiting for joi validations

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
    
}


// The function below must be fine tuned to accept an image update
const update_product_image = async(req,res)=>{
    if(!req.params.product_id) return res.status(200).json({success: false, message : "please provide a valid product" })

    if(!req.body.category_id) return res.status(200).json({success: false, message : "please provide all the requested details" })

    const id = req.params.product_id
    const image = req.body.category_id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


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
    
}



const publish_product= async(req,res)=>{
    if(!req.params.product_id) return res.status(200).json({success: false, message : "please provide a valid product" })

    const id = req.params.product_id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


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
    
}



const unpublish_product= async(req,res)=>{
    if(!req.params.product_id) return res.status(200).json({success: false, message : "please provide a valid product" })

    const id = req.params.product_id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


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
    
}








const publish_all_products= async(req,res)=>{
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    // logic to publish all products at once should come here

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