const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      avatarUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      githubUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      isHireable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      websiteUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.repository, { onDelete: 'CASCADE' });
  };

  return User;
};

module.exports = user;
