const db = require("../models")
const { DataTypes, Op } = require("sequelize");
const User = require("../models/user")(db.sequelize, DataTypes)
const bcrypt = require("bcrypt")
const Audit_controller = require("./audit_controller")
const error_logger = require("../other_config/error_logger")


const register_user = async(req, res)=>{
    if(!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.password){
        return res.status(200).json({success: false, message : "please provide all the requested details" })
    }
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    // check is username allready exist
    const old_username = await  User.findOne({ where: { username: username } })
    if (old_username !== null) return res.status(200).json({success:false, message : "that username already exists"})
    
    // check is email allready exist
    const old_useremail = await  User.findOne({ where: { email: email} })
    if (old_useremail !== null) return res.status(200).json({success:false, message : "that email already exists"})



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
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})

    if(!req.body.first_name || !req.body.last_name ){
        return res.status(200).json({success: false, message : "please provide all the requested details" })
    }
    const id = req.params.id
    const firstName = req.body.first_name
    const lastName = req.body.last_name

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

}


const update_username = async(req,res) =>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})

    if(!req.body.username ){
        return res.status(200).json({success: false, message : "please provide  a valid username" })
    }
    const id = req.params.id
    const username = req.body.username

    const ourUser =  await User.findByPk(id)
    if (ourUser === null){
      let msg = "There was an error finding your account"
      return res.status(200).json({success: false, message: msg})
    }

    //checking if the username is the same as the last one
    if(ourUser.username === username)  return res.status(200).json({success: true, message: "You just used the current username"})
    
    // now checking if the new username already exists
    const old_username = await  User.findOne({ where: { username: username } })
    if (old_username !== null) return res.status(200).json({success:false, message : "that username already exists"})
    
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

}


const update_email = async(req,res) =>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})

    if(!req.body.email ){
        return res.status(200).json({success: false, message : "please provide  a valid email" })
    }
    const id = req.params.id
    const email = req.body.email

    const ourUser =  await User.findByPk(id)
    if (ourUser === null){
      let msg = "There was an error finding your account"
      return res.status(200).json({success: false, message: msg})
    }

    //checking if the email is the same as the last one
    if(ourUser.email === email)  return res.status(200).json({success: true, message: "You just used the current email"})
    
    // now checking if the new email already exists
    const old_email = await  User.findOne({ where: { email: email } })
    if (old_email !== null) return res.status(200).json({success:false, message : "that email already exists"})
    
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

}



const update_is_admin = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})
    const id = req.params.id

    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


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

}


const revoke_is_admin = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})
    const id = req.params.id

    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


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

}



const deactivate_user = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})
    const id = req.params.id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


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

}



const activate_user = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})
    const id = req.params.id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }


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

const update_password = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submit a valid user"})
    const previousPassword = req.body.previous_password
    const newPassword = req.body.new_password

    const ourUser =  await User.findByPk(id)
    if (ourUser === null){
      let msg = "your acount was not found"
      return res.status(200).json({success: false, message: msg})
    }
     
    const match = await bcrypt.compare(previousPassword, ourUser.password);
    if(match){
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
        
        return
    }

    let msg = `you entered a wrong password`
    return res.status(200).json({success: false, message: msg})

}



const admin_reset_password = async(req,res)=>{
    if(!req.params.id) return res.status(200).json({success: false, message: "please submint a valid user"})
    const id = req.params.id
    const actionby = {
        username : req.username,
        user_id : req.user_id
    }

    const password = "#musika123$"


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



module.exports = {
    register_user,
    update_names,
    update_password,
    update_email,
    update_is_admin,
    update_username,
    revoke_is_admin,
    activate_user,
    deactivate_user,
    admin_reset_password
}