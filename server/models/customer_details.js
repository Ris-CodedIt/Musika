module.exports = (sequelize, DataTypes)=>{
    const CustomerDetails = sequelize.define('customer_details',{

        id:{
            type:DataTypes.INTEGER, 
            autoIncrement: true,
            unique:true,
            primaryKey: true,
            allowNull:false,

        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        birth_date:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        national_id:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
        },
        address:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        membership:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: "BRONZE",
            validators:{
                isIn: [['BRONZE', 'SILVER', "GOLD"]]
            }

        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: 'id',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            }
        }

    }, {
  tableName: 'customer_details',
  underscored: true

})

return CustomerDetails
}