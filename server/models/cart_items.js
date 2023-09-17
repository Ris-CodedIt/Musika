module.exports = (sequelize, DataTypes)=>{
    const CartItem = sequelize.define('cart_items',{
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
      cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "carts",
            key: 'id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        }
    }


    }, {
  tableName: 'cart_items',
  underscored: true

})

return CartItem
}