// src/models/userModel.js
const knex = require('../config/database');
const bcrypt = require('bcrypt');

const createUsersTable = async () => {
  const exists = await knex.schema.hasTable('users');
  if (!exists) {
    await knex.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('name');
      t.string('email').unique();
      t.string('password');
      t.string('role').defaultTo('user'); // user or admin
      t.timestamps(true, true);
    });
  }

  // ✅ Create default admin if not exists
  const admin = await knex('users').where({ email: 'admin@example.com' }).first();
  if (!admin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await knex('users').insert({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });
    console.log('✅ Default admin created: admin@example.com / admin123');
  }
};

module.exports = { knex, createUsersTable };

