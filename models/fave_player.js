'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fave_player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fave_player.belongsToMany(models.user, {through: "users_faveplayers", onDelete: "CASCADE"});
    }
  };
  fave_player.init({
    username: DataTypes.STRING,
    accountId: DataTypes.INTEGER,
    summonerId: DataTypes.INTEGER,
    region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fave_player',
  });
  return fave_player;
};