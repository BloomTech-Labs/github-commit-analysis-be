const session = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    'session',
    {
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true,
        },
      },
      jwt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      accessToken: {
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

  return Session;
};

module.exports = session;
