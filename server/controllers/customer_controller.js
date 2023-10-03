const db = require("../models")
const { DataTypes, Op } = require("sequelize");
const CustomerDetails = require("../models/customer_details")(db.sequelize, DataTypes)
const error_logger = require("../other_config/error_logger")
const CustomerValidator = require("../validation/customer_validation")



const create_customer_details = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "Please Select A Valid User"})

    if(!req.body.phone || !req.body.birth_date || !req.body.national_id || !req.body.address) return res.status(400).json({success: false, message: "Please provide all required data"})
    
    const customer_details = {
        phone: req.body.phone,
        birth_date: req.body.birth_date,
        national_id: req.body.national_id,
        address: req.body.address,
        user_id: req.params.id
    }

    
    // validate input 

    const {error, value} = CustomerValidator.customer_details_schema.validate(customer_details, { abortEarly: false })

    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})

    // create customer details
    await CustomerDetails.create(customer_details)
                        .then(resp=>{

                            let msg = "you have successfully added your details"
                            return res.status(200).json({success: true, message: msg})
                        })
                        .catch(err=>{
                            let emsg = `Error: ${err}, Request:${req.originalUrl}`
                            error_logger.error(emsg)
                            
                            let msg = "Sorry we are having technical problems, Please try again later"
                            return res.status(200).json({success: false, message: msg})
                        })


}

const update_customer_details = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "Please Select A Valid User"})

    if(!req.body.phone || !req.body.birth_date || !req.body.national_id || !req.body.address) return res.status(400).json({success: false, message: "Please provide all required data"})
    const id = req.params.id
    const customer_details = {
        phone: req.body.phone, 
        birth_date: req.body.birth_date,
        national_id: req.body.national_id,
        address: req.body.address,
    }
    
    // validate input 

    const {error, value} = CustomerValidator.customer_update_details_schema.validate(customer_details, { abortEarly: false })

    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})

    // fetch old details 
    try{
        const our_details =  await CustomerDetails.findByPk(id)
        if(our_details === null){
        let msg = "There was an error finding your details"
        return res.status(200).json({success: false, message: msg})
        }

        our_details.set(customer_details)

        await our_details.save()
                        .then(resp=>{
                            let msg = "you have successfully updatefd your details"
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



const update_membership = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "Please Select A Valid User"})

    if(!req.body.membership) return res.status(400).json({success: false, message: "Please provide all required data"})
    const id = req.params.id
    const membership = req.body.membership

    try{
        const our_details =  await CustomerDetails.findByPk(id)
        if(our_details === null){
        let msg = "There was an error finding your details"
        return res.status(200).json({success: false, message: msg})
        }

        our_details.set({membership: membership})

        await our_details.save()
                        .then(resp=>{
                            let msg = "you have successfully updated your membership"
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



module.exports = {
    create_customer_details,
    update_customer_details,
    update_membership,
}