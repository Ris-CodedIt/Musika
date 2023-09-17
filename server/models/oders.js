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
      }


    }, {
  tableName: 'orders',
  underscored: true

})

return Order
}