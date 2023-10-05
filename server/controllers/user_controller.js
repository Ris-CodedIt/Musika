const db = require("../models")
const { DataTypes, Op, BelongsTo, HasOne } = require("sequelize");
const User = require("../models/users")(db.sequelize, DataTypes)
const {CustomerDetails} = require("../models")
const bcrypt = require("bcrypt")
const Audit_controller = require("./audit_controller")
const error_logger = require("../other_config/error_logger")
const UserValidator = require("../validation/user_validation")


const register_user = async(req, res)=>{
    if(!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.password){
        return res.status(400).json({success: false, message : "please provide all the requested details" })
    }
    const user_details = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
    }
  

    //validate the input 
    const {error, value} = UserValidator.user_registration_schema.validate(user_details,{ abortEarly: false })
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})

    // check is username allready exist
    const old_username = await  User.findOne({ where: { username: user_details.username } })
    if (old_username !== null) return res.status(400).json({success:false, message : "that username already exists"})
    
    // check is email allready exist
    const old_useremail = await  User.findOne({ where: { email: user_details.email} })
    if (old_useremail !== null) return res.status(400).json({success:false, message : "that email already exists"})



    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await User.create({
                        first_name: first_name,
                        last_name: last_name,
                        username: username,
                        email: email,
                        password: hashedPassword
                    })

                    .then(resp=>{

                        let msg = "you have successfully registered an account"
                        return res.status(200).json({success: true, message: msg})
                    })
                    .catch(err=>{
                        let emsg = `Error: ${err}, Request:${req.originalUrl}`
                        error_logger.error(emsg)
                        
                        let msg = "Sorry we are having technical problems, Please try again later"
                        return res.status(200).json({success: false, message: msg})
                    })


}


const update_names = async(req,res) =>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})

    if(!req.body.first_name || !req.body.last_name ){
        return res.status(400).json({success: false, message : "please provide all the requested details" })
    }
    const id = req.params.id
    const firstName = req.body.first_name
    const lastName = req.body.last_name

    // validate inputs

    const {error, value} = UserValidator.update_names_schema.validate({first_name : firstName, last_name: lastName}, { abortEarly: false })
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})
    
    try{
         
        const ourUser =  await User.findByPk(id)
        if (ourUser === null){
        let msg = "There was an error finding your account"
        return res.status(200).json({success: false, message: msg})
        }

        ourUser.set({
                    first_name: firstName,
                    last_name: lastName,
                    username: userName,
                    email: email,
        })

        await ourUser.save()
        .then(resp=>{

            let msg = "you have successfully updated your detials"
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
    
            let msg = "We are having so technical issues, Please Try again later"
            return res.status(200).json({success: false, message: msg})
        })


    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)

        let msg = "We are having so technical issues, Please Try again later"
        return res.status(200).json({success: false, message: msg})
    }
}


const update_username = async(req,res) =>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})

    if(!req.body.username ){
        return res.status(400).json({success: false, message : "please provide  a valid username" })
    }
    const id = req.params.id
    const username = req.body.username

    // validate input
    const {error, value} = UserValidator.update_username_schema.validate({username})
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})


    try{
        const ourUser =  await User.findByPk(id)
        if (ourUser === null){
        let msg = "There was an error finding your account"
        return res.status(200).json({success: false, message: msg})
        }

        //checking if the username is the same as the last one
        if(ourUser.username === username)  return res.status(200).json({success: true, message: "You just used the current username"})
        
        // now checking if the new username already exists
        const old_username = await  User.findOne({ where: { username: username } })
        if (old_username !== null) return res.status(400).json({success:false, message : "that username already exists"})
        
        ourUser.set({username: username})

        await ourUser.save()
        .then(resp=>{

            let msg = "you have successfully updated your username"
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
        
            let msg = "We are having so technical issues, Please Try again later"
            return res.status(200).json({success: false, message: msg})
        })

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
    
        let msg = "We are having so technical issues, Please Try again later"
        return res.status(200).json({success: false, message: msg})

    }

}


const update_email = async(req,res) =>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})

    if(!req.body.email ){
        return res.status(400).json({success: false, message : "please provide  a valid email" })
    }
    const id = req.params.id
    const email = req.body.email

    // validate input
    const {error,value} = UserValidator.update_email_schema.validate({email})
    if(error) return res.status(400).json({success:false, message : `There was an error: ${error}`})

     try{
        const ourUser =  await User.findByPk(id)
        if (ourUser === null){
          let msg = "There was an error finding your account"
          return res.status(200).json({success: false, message: msg})
        }
    
        //checking if the email is the same as the last one
        if(ourUser.email === email)  return res.status(200).json({success: true, message: "You just used the current email"})
        
        // now checking if the new email already exists
        const old_email = await  User.findOne({ where: { email: email } })
        if (old_email !== null) return res.status(400).json({success:false, message : "that email already exists"})
        
        ourUser.set({email: email})
    
        await ourUser.save()
        .then(resp=>{
    
            let msg = "you have successfully updated your email"
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            
            let msg = "We are having so technical issues, Please Try again later"
            return res.status(200).json({success: false, message: msg})
        })
     }catch(err){

        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        
        let msg = "We are having so technical issues, Please Try again later"
        return res.status(200).json({success: false, message: msg})

     }


}



const set_is_admin = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})
    const id = req.params.id

    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


    try{
        const ourUser =  await User.findByPk(id)
        if (ourUser === null){
        let msg = "That user account does not exist"
        return res.status(200).json({success: false, message: msg})
        }

        ourUser.set({ is_admin: true})

        await ourUser.save()
        .then(resp=>{

            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Give Admin Rights",
                message: `Successfull gave Admin rights to user with username ${ourUser.username} `,
                type: "Success"
            }
            
            Audit_controller.createAuditTrail(auditObj)

            let msg = `you have successfully gave admin rights to user ${ourUser.username}`
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{

            // this is the audit trail section
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Give Admin Rights",
                message: `Attempted to give Admin rights to user with username ${ourUser.username}`,
                type: "Failed"
            }
            
            Audit_controller.createAuditTrail(auditObj)
            
            // this is the audit trail section

            let msg = `an error occured: connection failed while updating a role`
            return res.status(200).json({success: false, message: msg})
        })

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `an error occured: connection failed while updating a role`
        return res.status(200).json({success: false, message: msg})
    }

}


const revoke_is_admin = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})
    const id = req.params.id

    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


   try{
    const ourUser =  await User.findByPk(id)
    if (ourUser === null){
      let msg = "That user account does not exist"
      return res.status(200).json({success: false, message: msg})
    }

    ourUser.set({ is_admin: false})

    await ourUser.save()
    .then(resp=>{

        // this is the audit trail section
        const auditObj = {
            username: actionby.username,
            user_id:actionby.user_id,
            action:" Revoke Admin Rights",
            message: `Successfull revoked Admin rights for user with username ${ourUser.username} `,
            type: "Success"
        }
        
        Audit_controller.createAuditTrail(auditObj)

        let msg = `you have successfully revoked admin rights for user ${ourUser.username}`
        return res.status(200).json({success: true, message: msg})
    })
    .catch(err=>{

       
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
       // this is the audit trail section
        const auditObj = {
            username: actionby.username,
            user_id:actionby.user_id,
            action:"Revoke Admin Rights",
            message: `Attempted to revoke Admin rights for user with username ${ourUser.username}`,
            type: "Failed"
        }
        
        Audit_controller.createAuditTrail(auditObj)
        
        // this is the audit trail section

        let msg = `an error occured: connection failed while updating a role`
        return res.status(200).json({success: false, message: msg})
    })


   }catch(err){
    let emsg = `Error: ${err}, Request:${req.originalUrl}`
    error_logger.error(emsg)
    let msg = `an error occured: connection failed while updating a role`
    return res.status(200).json({success: false, message: msg})
   }
}



const deactivate_user = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})
    const id = req.params.id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


    try{

        const ourUser =  await User.findByPk(id)
        if (ourUser === null){
          let msg = "That user account does not exist"
          return res.status(200).json({success: false, message: msg})
        }
         
        ourUser.set({status:'Deactivated'})
    
        await ourUser.save()
        .then(resp=>{
    
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Deactivate User",
                message: `Successfully deactivated a user with username ${ourUser.username}`,
                type: "Success"
            }
    
            Audit_controller.createAuditTrail(auditObj)
            
    
            let msg = `you have successfully deactivated user with username ${ourUser.username}`
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Deactivate User",
                message: `Attempted to deactivate a user with username ${ourUser.username}`,
                type: "Failed"
            }
            
    
            Audit_controller.createAuditTrail(auditObj)
            
    
            let msg = `an error occured: connection failed while deactivating user`
            return res.status(200).json({success: false, message: msg})
        })

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `an error occured: connection failed while deactivating user`
        return res.status(200).json({success: false, message: msg})
    }

}



const activate_user = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})
    const id = req.params.id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    try{
        const ourUser =  await User.findByPk(id)
        if (ourUser === null){
          let msg = "That user account does not exist"
          return res.status(200).json({success: false, message: msg})
        }
         
        ourUser.set({status:'Active'})
    
        await ourUser.save()
        .then(resp=>{
    
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Activate User",
                message: `Successfully activated a user with username ${ourUser.username}`,
                type: "Success"
            }
    
            Audit_controller.createAuditTrail(auditObj)
            
    
            let msg = `you have successfully activated user with username ${ourUser.username}`
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Activate User",
                message: `Attempted to activate a user with username ${ourUser.username}`,
                type: "Failed"
            }
            
    
            Audit_controller.createAuditTrail(auditObj)
            
    
            let msg = `an error occured: connection failed while deactivating user`
            return res.status(200).json({success: false, message: msg})
        })

    }
    catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `an error occured: connection failed while deactivating user`
        return res.status(200).json({success: false, message: msg}) 

    }


}

const update_password = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submit a valid user"})
    const previousPassword = req.body.previous_password
    const newPassword = req.body.new_password

    try{
        const ourUser = await User.findByPk(id)
        if (ourUser === null){
          let msg = "your acount was not found"
          return res.status(200).json({success: false, message: msg})
        }
         
        const match = await bcrypt.compare(previousPassword, ourUser.password);
        if(match){
            // validate new password
            const {error, value} = UserValidator.update_password_schema.validate({password})
            if(error) return res.status(200).json({success:false, message : `There was an error: ${error}`})
    
            const hashedPassword = await bcrypt.hash(newPassword,10)
    
            ourUser.set({password:hashedPassword})
    
            await ourUser.save()
            .then(resp=>{
    
                let msg = `you have successfully updated your password`
                return res.status(200).json({success: true, message: msg})
            })
            .catch(err=>{
                let emsg = `Error: ${err}, Request:${req.originalUrl}`
                error_logger.error(emsg)
                
    
                let msg = `We are having so technical issues, Please Try again later`
                return res.status(200).json({success: false, message: msg})
            })
            
        }
    
        let msg = `you entered a wrong password`
        return res.status(200).json({success: false, message: msg})

    }catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        

        let msg = `We are having so technical issues, Please Try again later`
        return res.status(200).json({success: false, message: msg})

    }

}



const admin_reset_password = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "please submint a valid user"})
    const id = req.params.id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    const password = "#musika123$"
    
    try{
        const ourUser =  await User.findByPk(id)
        if (ourUser === null){
          let msg = "that account does not exist"
          return res.status(200).json({success: false, message: msg})
        }
        const hashedPassword = await bcrypt.hash(password,10)
    
        ourUser.set({password:hashedPassword})
        await ourUser.save()
        .then(resp=>{
    
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Admin Pasword Reset",
                message: `Successfully reset the password for a user with username ${ourUser.username}`,
                type: "Success"
            }
    
            Audit_controller.createAuditTrail(auditObj)
            
    
            let msg = `you have successfully reset the user's password`
            return res.status(200).json({success: true, message: msg})
        })
        .catch(err=>{
            let emsg = `Error: ${err}, Request:${req.originalUrl}`
            error_logger.error(emsg)
    
            // this is the audit trail section
            const auditObj = {
                username: actionby.username,
                user_id:actionby.user_id,
                action:"Admin Pasword Reset",
                message: `Attempted to reset the password a user with username ${ourUser.username}`,
                type: "Failed"
            }
            
            Audit_controller.createAuditTrail(auditObj)
            
            
    
            let msg = `an error occured: connection failed while trying to reset password`
            return res.status(200).json({success: false, message: msg})
        })

    }
    catch(err){
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `an error occured: connection failed while trying to reset password`
        return res.status(200).json({success: false, message: msg})

    }

   
}


// this section is for fetching user data

const get_all_users = async(req,res)=>{
     await User.findAll({   
         include:[{
            model:UserRoles,
            association: new HasOne(User, CustomerDetails, { foreignKey: 'user_id'})
         }]
    })
            .then((users)=>{
                if (users.length > 0){
                    return res.status(200).json({success:true, data: users})
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


const get_single_user = async(req,res)=>{
    if(!req.params.id) return res.status(400).json({success: false, message: "Please Submint A Valid User"})

    const id = req.params.id
    try{
        const user = await User.findOne({
            where: {id:id},
            include:[{
                model:UserRoles,
                association: new HasOne(User, CustomerDetails, { foreignKey: 'user_id'})
             }]
        })
        if (user === null){
           let msg = "No user was found"
           return res.status(200).json({success:false,data:[], message : msg})
         }
         return res.status(200).json({success:true,data:[], data: user})

    }catch(err){

        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `there was an error: conection failed while collecting data`
        return res.status(200).json({success:false, data:[], message: msg})
    }
 

}

const get_current_user = async(req,res)=>{
    if(!req.user_id) return res.status(400).json({success: false, message: "Please Submint A Valid User"})

    const id = req.user_id
    try{
        const user = await User.findByPk(id)
        if (user === null){
           let msg = "No user was found"
           return res.status(200).json({success:false,data:[], message : msg})
         }
         return res.status(200).json({success:true,data:[], data: user})

    }catch(err){

        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        error_logger.error(emsg)
        let msg = `there was an error: conection failed while collecting data`
        return res.status(200).json({success:false, data:[], message: msg})
    }
 

}


module.exports = {
    register_user,
    update_names,
    update_password,
    update_email,
    set_is_admin,
    update_username,
    revoke_is_admin,
    activate_user,
    deactivate_user,
    admin_reset_password,
    get_all_users,
    get_current_user,
    get_single_user
}