const repository = (sequelize, DataTypes) => {
  // this defines the model and schema for this table
  const Repository = sequelize.define(
    'repository',
    {
      description: {
        type: DataTypes.TEXT,
      },
      homepageUrl: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.STRING,
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
      forkCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      watchCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      starCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isStarred: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
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
