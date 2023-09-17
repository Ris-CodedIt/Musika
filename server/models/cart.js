module.exports = (sequelize, DataTypes)=>{
    const Cart = sequelize.define('carts',{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      placed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      }
    }, {
  tableName: 'carts',
  underscored: true

})

return Cart
}