const db = require("../models")
const { DataTypes, Op, HasMany, BelongsTo } = require("sequelize");
const Order = require("../models/oders")(db.sequelize, DataTypes)
const {OrderItem} = require("../models")
const error_logger = require("../other_config/error_logger")
const ProductValidator = require("../validation/product_validation");
const category = require("../models/category");





const create_order = async(req,res)=>{
    if(!req.body.order_items) return res.status(400).json({success: false, message: "Please provide all reqired details"})
    const user_id = req.user_id
    const order_items = req.body.order_items

    try{
        const ord = await Order.create({user_id: user_id})
        const new_order_items = order_items.map(item => item.user_id = ord.user_id) 
        await OrderItem.bulkCreate(new_order_items)
        .then(resp=>{
            let msg = "you have successfully placed an order"
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            
            let msg = "Sorry we are having technical problems, Please try again later"
            return res.status(200).json({success: false, message: msg})
        })
        

    
    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    }
    
}


const complete_order = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please Sselect a valid order"})
    const order_id = req.params.id
    
    try{
       const order = Order.findOne({
                where: {id:order_id},
                include:[{
                    model:OrderItem,
                    association: new HasMany(Order, OrderItem, { foreignKey: 'order_id'})
                }]
            })
        
        order.set({payment_status:'COMPLETE'})
        await order.save()
            // logic to subtract quantities 

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    }
     
} 


const cancell_order = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please Sselect a valid order"})
    const order_id = req.params.id
    
    try{
        const order = Order.findOne({ where: {id:order_id} })
        
        order.set({payment_status:'CANCLED'})
        await order.save()
        .then(resp=>{
            let msg = "you have successfully cancelled an order"
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            
            let msg = "Sorry we are having technical problems, Please try again later"
            return res.status(200).json({success: false, message: msg})
        })
            

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    }
     
} 



const get_single_order = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please select a valid order"})
    const order_id = req.params.id
    
    
        await Order.findOne({
            where: {id:order_id},
            include:[{
                model:OrderItem,
                association: new HasMany(Order, OrderItem, { foreignKey: 'order_id'})
            }]
        })
        
       
        .then(order=>{
            return res.status(200).json({success: true, data:order})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            
            let msg = "Sorry we are having technical problems, Please try again later"
            return res.status(200).json({success: false, message: msg})
        })
            
} 


const get_orders = async(req,res)=>{
    const order_id = req.params.id
    await Order.findAll({
        where: {id:order_id},
        include:[{
            model:OrderItem,
            association: new HasMany(Order, OrderItem, { foreignKey: 'order_id'})
        }]
    })
    
    
    .then(order=>{
        return res.status(200).json({success: true, data:order})
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    })
            
} 



const get_orders_by_product = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please select a valid order"})
    const id = req.params.id
    await OrderItem.findAll({
        where: {product_id:id},
        include:[{
            model:Order,
            association: new BelongsTo(OrderItem, Order, { foreignKey: 'order_id'})
        }]
    })
    
    
    .then(order_items=>{
        return res.status(200).json({success: true, data:order_items})
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    })
            
} 

const get_orders_by_user = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please select a valid order"})
    const id = req.params.id
    await Order.findAll({
        where: {user_id:id},
        include:[{
            model:Order,
            association: new HasMany(Order, OrderItem, { foreignKey: 'order_id'})
        }]
    })
    
    
    .then(orders=>{
        return res.status(200).json({success: true, data:orders})
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    })
            
} 



const get_single_order_item= async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please select a valid order"})
    const id = req.params.id
    await OrderItem.findOne({
        where: {id:id},
        include:[{
            model:Order,
            association: new BelongsTo(OrderItem, Order, { foreignKey: 'order_id'})
        }]
    })
    
    
    .then(order_items=>{
        return res.status(200).json({success: true, data:order_items})
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "Sorry we are having technical problems, Please try again later"
        return res.status(200).json({success: false, message: msg})
    })
            
} 


module.exports = {
        create_order,
        complete_order,
        cancell_order,
        get_orders,
        get_single_order,
        get_orders_by_product,
        get_orders_by_user,
        get_single_order_item
}