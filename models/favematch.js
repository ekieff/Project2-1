'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favematch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.favematch.belongsToMany(models.user, {through: "users_favematches", onDelete: "CASCADE"});
    }
  };
  favematch.init({
    gameId: DataTypes.INTEGER,
    region: DataTypes.STRING,
    season: DataTypes.INTEGER,
    championKey: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'favematch',
  });
  return favematch;
};