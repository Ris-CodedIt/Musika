const multer = require("multer")
const path = require("path")

const maxSize = 5 * 1024 * 1024
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/product_images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + `-`+ file.originalname)
    }
  })

  
const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            return cb(null, true)
        }
        else{
            cb(null, false)
            cb( new Error("only jpg, jpeg and png files are allowed"))
        }
       
    }
}).single('product_image')


module.exports = upload