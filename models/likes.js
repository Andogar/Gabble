'use strict';
module.exports = function (sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    gabId: DataTypes.INTEGER
  });

  likes.associate = function (models) {
    // associations can be defined here
  }

  return likes;
};