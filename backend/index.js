// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { knex } = require('./src/models/userModel'); // add this line

const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/tasks', taskRoutes);

// ===== Admin User Creation =====
const createAdminUser = async () => {
  try {
    const existingAdmin = await knex('users').where({ email: 'admin@example.com' }).first();
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await knex('users').insert({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
};

createAdminUser();

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
