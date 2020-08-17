'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave_match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fave_match.belongsToMany(models.player, {through: "players_favematches", onDelete: "CASCADE"});
    }
  };
  fave_match.init({
    gameId: DataTypes.INTEGER,
    region: DataTypes.STRING,
    season: DataTypes.INTEGER,
    champion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'fave_match',
  });
  return fave_match;
};