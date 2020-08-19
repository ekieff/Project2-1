'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave_mode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fave_mode.belongsToMany(models.user, {through: "users_favemodes", onDelete: "CASCADE"});
    }
  };
  fave_mode.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fave_mode',
  });
  return fave_mode;
};