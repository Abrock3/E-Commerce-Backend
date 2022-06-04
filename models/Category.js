const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

// defines a table in our database, using a Class filled with properties that define the table's columns and their attributes.
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
