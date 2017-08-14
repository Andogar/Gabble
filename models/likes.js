'use strict';
module.exports = function (sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    gabId: DataTypes.INTEGER
  });

  likes.associate = function (models) {
    likes.belongsTo(models.users, { foreignKey: 'userId' });
    likes.belongsTo(models.gabs, { foreignKey: 'gabId' });
  }
  return likes;
};