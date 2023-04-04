const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('notaty', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Note = sequelize.define('Note', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  createdDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  updatedDate: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

module.exports = Note;
