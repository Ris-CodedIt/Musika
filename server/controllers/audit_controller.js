const db = require("../models")
const { DataTypes, Op } = require("sequelize");
const Audit = require("../models/audit_trail")(db.sequelize, DataTypes)
const errorLogger = require("../other_config/error_logger")



const createAuditTrail = async(auditObj)=>{
       
    const newAudit = await Audit.create({
                                      username:auditObj.username,
                                      user_id:auditObj.user_id,
                                      action:auditObj.action,
                                      message: auditObj.message,
                                      type: auditObj.type
                                    })
    .then(resp=>{
        return
    })
    .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}, AuditObject: ${auditObj}`
        errorLogger.error(emsg)
        return
    })

}


const getAllAudittrails = async(req,res)=>{
  if(!req.body.startDate || !req.body.endDate) return res.status(400).json({success:false, data:[], message: "please select valid dates"})
  let startDate= req.body.startDate
  let endDate = req.body.endDate
      await Audit.findAll({
        where:{
          created_at: {
              [Op.lt]: endDate,
              [Op.gt]: startDate
            }
      }
      })
      .then(trails=>{
        if (trails.length > 0){
          return res.status(200).json({success:true, data: trails})
        }
        let msg = "No data was found in the selected date range"
        return res.status(200).json({success:false, data: [], message : msg})
      })
      .catch(err=>{
        let emsg = `Error: ${err}, Request:${req.originalUrl}`
        errorLogger.error(emsg)

        let msg = `there was an error: connection failed while collecting the data`
        return res.status(200).json({success:false, data:[], message: msg})
      })
    }


const getUserAudittrails = async(req,res)=>{
      if(!req.params.id) return res.status(400).json({success: false, message: "Please provide a valid user"})
      const id = req.params.id

      await Audit.findAll({where : {user_id:id}})
      .then(trails=>{
        return res.status(200).json({success: true, data: trails})
      })
      .catch(err=>{
         let emsg = `Error: ${err}, Request:${req.originalUrl}`
        errorLogger.error(emsg)
        let msg = `there was an error: ${err}`
        return res.status(200).json({success:false, data:[], message: msg})
      })
    }




    module.exports = {
       createAuditTrail,
       getAllAudittrails,
       getUserAudittrails
    }