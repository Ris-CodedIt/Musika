module.exports = (sequelize, DataTypes)=>{
    const AuthToken = sequelize.define('auth_tokens',{

        id:{
            type:DataTypes.INTEGER, 
            autoIncrement: true,
            unique:true,
            primaryKey: true,
            allowNull:false,

        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validators:{
                is: /^[a-z_]+$/i
            }

        },
        token:{
            type:DataTypes.TEXT,
            allowNull:false,
        },

    }, {
  tableName: 'auth_tokens',
  underscored: true

})

return AuthToken
}