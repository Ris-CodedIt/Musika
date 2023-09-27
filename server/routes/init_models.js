const express = require("express");
const router = express.Router();
const db = require("../models")
const bcrypt = require("bcrypt")
const { DataTypes } = require("sequelize");
const User = require("../models/users")(db.sequelize, DataTypes)
const multer_error_handler = require("../middleware/multer_error_handler")


router.get('/sync_models',(req,res)=>{
    db.sequelize.sync({ force: true })
    .then((response)=>{
         return res.send("all done king")
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).send("The was an error")
    })

})


router.get('/seed_super_admin',async(req,res)=>{

    const hashedPassword = await bcrypt.hash("#password$",10)

    const newUser = await User.create({
                            first_name: "Ris",
                            last_name: "CodedIt", 
                            username: "Admin", 
                            email: "developerris@example.com",
                            password: hashedPassword,
                            is_admin: true 
                        })
    
    .then(resp=>{
        let msg = `you have successfully created a user with username Admin`
        return res.status(200).json({success: true, message: msg})
    })
    .catch(err=>{
        let msg = `an error occured: ${err}`
        return res.status(200).json({success: false, message: msg})
    })
})

router.post("/test", multer_error_handler, async(req,res)=>{
    if(!req.body.title){
        return res.status(400).json({success: false, message : "please provide all the requested details title is no that" })
    }
    console.log(`path: ${req.file.path}`)
    console.log(`title: ${req.body.title}`)
    return res.status(200).json({success: false, message : "image recieved" })

})

module.exports = router