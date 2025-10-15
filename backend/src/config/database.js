// src/config/database.js
const path = require('path');
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../database/dev.sqlite3'), // goes back to backend/database/
  },
  useNullAsDefault: true,
});

module.exports = knex;
