module.exports = (sequelize, DataTypes)=>{
    const Review = sequelize.define('reviews',{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  tableName: 'reviews',
  underscored: true

})

return Review
}