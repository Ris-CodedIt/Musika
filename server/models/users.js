module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define('users',{

        id:{
            type:DataTypes.INTEGER, 
            autoIncrement: true,
            unique:true,
            primaryKey: true,
            allowNull:false,

        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validators:{
                is: /^[a-z\s\'.]+$/i
            }

        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validators:{
                is: /^[a-z\s\'.]+$/i
            }

        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
            validators:{
                is: /^\w+$/i,
                len:[3,10]
            }

        },
        email:{
            type:DataTypes.STRING,
            allowNull:false, 
            unique: true,
            validators:{ 
                isEmail:true
            }

        },
        password:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        is_admin: {
            type:DataTypes.BOOLEAN ,
            allowNull:false,
            defaultValue: false,
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: "Active",
            validators:{
                isIn: [['Active', 'Deactivated']]
            }

        },

    }, {
  tableName: 'users',
  underscored: true

})

return User
}