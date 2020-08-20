'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faveplayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.faveplayer.belongsToMany(models.user, {through: "users_faveplayers", onDelete: "CASCADE"});
    }
  };
  faveplayer.init({
    username: DataTypes.STRING,
    accountId: DataTypes.STRING,
    summonerId: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'faveplayer',
  });
  return faveplayer;
};