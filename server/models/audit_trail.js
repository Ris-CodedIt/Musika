module.exports = (sequelize, DataTypes)=>{
    const Audit = sequelize.define('audit_trail',{

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
        },
        action:{
            type:DataTypes.STRING,
            allowNull:false,
        },

        message:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        type:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: "Failed",
            validators:{
                isIn: [['Success', 'Failed']]
            }

        },

    }, {
  tableName: 'audit_trail',
  underscored: true
})

return Audit
}