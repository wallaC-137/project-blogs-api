module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        primaryKey: true,
        field: 'post_id',
        type: DataTypes.INTEGER,
      },
      categoryId: {
        primaryKey: true,
        field: 'category_id',
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      tableName: 'Post_Categories',
      underscored: true,
    }
  );

  PostCategory.associate = (models) => {
    PostCategory.belongsTo(models.BlogPost, {
      foreignKey: 'postId',
      as: 'blogPost',
    });
    PostCategory.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category',
    });
  };

  return PostCategory;
};
