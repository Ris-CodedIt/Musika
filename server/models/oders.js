module.exports = (sequelize, DataTypes)=>{
    const Order = sequelize.define('orders',{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      placed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
        validate: {
          isIn: [['PENDING', 'COMPLETE', 'CANCLED']]
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
  tableName: 'orders',
  underscored: true

})

return Order
}