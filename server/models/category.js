module.exports = (sequelize, DataTypes)=>{
    const Category = sequelize.define('category',{
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
      }

    }, {
  tableName: 'category',
  underscored: true

})

return Category
}