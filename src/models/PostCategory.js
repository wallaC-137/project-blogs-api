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
      tableName: 'posts_categories',
      underscored: true,
    }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'category',
      through: PostCategory,
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      as: 'blogPost',
      through: PostCategory,
    });
  };

  return PostCategory;
};
