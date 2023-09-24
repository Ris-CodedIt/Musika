const db = require("./models")
const { DataTypes, Op } = require("sequelize");
const User = require("./models/users")(db.sequelize, DataTypes)




const get_single_user = async()=>{


    const id = 2
   
    const user = await User.findByPk(id)
    if (user === null){
        console.log("no user")
        
      }
     
    console.log(user)
   
  


   console.log ("this was done ")
   console.log ("this was done ")
   console.log ("this was done ")
   console.log ("this was done ")
   console.log ("this was done ")

}



get_single_user()