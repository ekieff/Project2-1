'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class players_favePlayers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  players_favePlayers.init({
    playerId: DataTypes.INTEGER,
    fave_playerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'players_favePlayers',
  });
  return players_favePlayers;
};