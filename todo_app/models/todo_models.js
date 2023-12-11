const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // assuming you configure your Sequelize instance in a separate file

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.VARCHAR,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Todo;
