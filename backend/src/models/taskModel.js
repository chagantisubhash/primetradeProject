// src/models/taskModel.js
const knex = require('../config/database');

const createTasksTable = async () => {
  const exists = await knex.schema.hasTable('tasks');
  if (!exists) {
    await knex.schema.createTable('tasks', (t) => {
      t.increments('id').primary();
      t.string('title');
      t.text('description');
      t.integer('user_id');
      t.timestamps(true, true);
    });
  }
};

module.exports = { knex, createTasksTable };
