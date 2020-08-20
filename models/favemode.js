'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favemode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favemode.belongsToMany(models.user, {through: "users_favemodes", onDelete: "CASCADE"});
    }
  };
  favemode.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'favemode',
  });
  return favemode;
};