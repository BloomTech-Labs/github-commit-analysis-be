const repository = (sequelize, DataTypes) => {
  const Repository = sequelize.define(
    'repository',
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      homepageUrl: {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nameWithOwner: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
    },
  );

  Repository.associate = (models) => {
    Repository.belongsTo(models.user);
  };

  return Repository;
};

module.exports = repository;
