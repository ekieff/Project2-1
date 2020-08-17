'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class players_faveChampions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  players_faveChampions.init({
    playerId: DataTypes.INTEGER,
    fave_championId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'players_faveChampions',
  });
  return players_faveChampions;
};