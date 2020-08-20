'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_faveplayers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_faveplayers.init({
    userId: DataTypes.INTEGER,
    faveplayerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_faveplayers',
  });
  return users_faveplayers;
};