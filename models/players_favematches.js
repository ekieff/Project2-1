'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class players_faveMatches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  players_faveMatches.init({
    playerId: DataTypes.INTEGER,
    fave_matchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'players_faveMatches',
  });
  return players_faveMatches;
};