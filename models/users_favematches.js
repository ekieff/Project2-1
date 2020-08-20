'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_favematches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_favematches.init({
    userId: DataTypes.INTEGER,
    favematchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_favematches',
  });
  return users_favematches;
};