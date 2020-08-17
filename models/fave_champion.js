'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave_champion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fave_champion.belongsToMany(models.player, {through: "players_favematches", onDelete: "CASCADE"});
    }
  };
  fave_champion.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fave_champion',
  });
  return fave_champion;
};