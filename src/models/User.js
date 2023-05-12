module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      displayName: {
        allowNull: false,
        field: 'display_name',
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    }
  );

  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts',
    });
  };

  return user;
};
