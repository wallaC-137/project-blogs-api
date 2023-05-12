module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'Category',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'Categories',
      underscored: true,
    }
  );

  categories.associate = (models) => {
    categories.hasMany(models.PostCategory, {
      foreignKey: 'categoryId',
      as: 'PostC',
    });
  };

  return categories;
};
