module.exports = (sequelize, DataTypes)=>{
    const Product = sequelize.define('products',{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: true
        }
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
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      published: {
        type:DataTypes.BOOLEAN ,
        allowNull:false,
        defaultValue: false,
      },
      is_deleted: {
        type:DataTypes.BOOLEAN ,
        allowNull:false,
        defaultValue: false,
      },
      image: {
        type: DataTypes.TEXT,
        unique: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "category",
            key: 'id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        }
    }


    }, {
  tableName: 'products',
  underscored: true

})

return Product
}