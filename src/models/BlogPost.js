module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
      },
      published: {
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updated: {
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      tableName: 'blog_posts',
      underscored: true,
    }
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: models.PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  BlogPost.addHook('beforeCreate', (post) => {
    post.published = new Date();
  });

  return BlogPost;
};
