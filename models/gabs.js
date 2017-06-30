'use strict';
module.exports = function (sequelize, DataTypes) {
  var gabs = sequelize.define('gabs', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });

  gabs.associate = function (models) {
    gabs.belongsTo(models.users, { foreignKey: 'userId' });
  }

  return gabs;
};