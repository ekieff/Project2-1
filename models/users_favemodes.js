'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_favemodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users_favemodes.init({
    userId: DataTypes.INTEGER,
    fave_modeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_favemodes',
  });
  return users_favemodes;
};