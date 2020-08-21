'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favechampion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favechampion.belongsToMany(models.user, {through: "users_favechampions", onDelete: "CASCADE"});
    }
  };
  favechampion.init({
    name: DataTypes.STRING,
    champKey: DataTypes.STRING,
    topFive: DataTypes.STRING,
    user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favechampion',
  });
  return favechampion;
};