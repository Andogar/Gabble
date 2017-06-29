'use strict';
module.exports = function(sequelize, DataTypes) {
  var gabs = sequelize.define('gabs', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return gabs;
};