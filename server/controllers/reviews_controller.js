const db = require("../models")
const { DataTypes, Op } = require("sequelize");
const Review = require("../models/users")(db.sequelize, DataTypes)
const error_logger = require("../other_config/error_logger")
const ProductValidator = require("../validation/product_validation")




const create_review = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "Please Submit A Valid product"})

    if(!req.body.review || !req.body.rating) return res.status(200).json({success: false, message: "Please provide all required data"})

    const review = req.body.review
    const rating = req.body.rating
    const user_id = req.user_id
    const product_id = req.params.id


    // validate input 

    const {error, value} = ProductValidator.product_review_schema.validate({review, rating})

    if(error) return res.status(200).json({success:false, message : `There was an error: ${error}`})

    // creating review 

    await Review.create({
        review: review,
        rating: rating,
        user_id: user_id,
        product_id: product_id
    })
    .then(resp=>{

        let msg = "you have successfully posted a review"
        return res.status(200).json({success: true, message: msg})
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    })

}



const update_review = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "Please Submit A Valid product"})

    if(!req.body.review || !req.body.rating) return res.status(200).json({success: false, message: "Please provide all required data"})

    const review = req.body.review
    const rating = req.body.rating
    const id = req.params.id


    // validate input 

    const {error, value} = ProductValidator.product_review_schema.validate({review, rating})

    if(error) return res.status(200).json({success:false, message : `There was an error: ${error}`})


    try{
            // finding a review 
        
            const our_review =  await Review.findByPk(id)
            if(our_review === null){
            let msg = "There was an error finding your review"
            return res.status(200).json({success: false, message: msg})
            }

            our_review.set({
                review: review,
                rating: rating,
            })

            await our_review.save()
            .then(resp=>{

                let msg = "you have successfully posted a review"
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



const delete_review = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "Please Submit A Valid product"})

    if(!req.body.review || !req.body.rating) return res.status(200).json({success: false, message: "Please provide all required data"})

    const id = req.params.id

    await Review.destroy({ where: {id: id }})
    .then(resp=>{

        let msg = "you have successfully deleted a review"
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
    create_review,
    update_review,
    delete_review
}