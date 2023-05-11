'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostCategories = await queryInterface.createTable(
      'posts_categories',
      {
        postId: {
          primaryKey: true,
          field: 'post_id',
          type: Sequelize.INTEGER,
          references: {
            model: 'blog_posts',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        categoryId: {
          primaryKey: true,
          field: 'category_id',
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      }
    );
    return PostCategories;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_Categories');
  },
};
