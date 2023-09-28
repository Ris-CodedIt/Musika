
const upload = require("./file_upload")
const multer = require("multer")




const multer_error_handler = (req,res,next)=>{
    upload(req,res, function(err){
        if (err instanceof multer.MulterError) {
            return res.status(400).json({success: false, message : err.message })
          } else if (err) {
            return res.status(200).json({success: false, message : `An error occured : ${err}` })
          }
        next()
    })
}

module.exports = multer_error_handler