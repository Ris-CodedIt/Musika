module.exports = (sequelize, DataTypes)=>{
    const OrderItem = sequelize.define('order_items',{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      unit_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: 'id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        }
    },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "orders",
            key: 'id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        }
    }


    }, {
  tableName: 'order_items',
  underscored: true

})

return OrderItem
}