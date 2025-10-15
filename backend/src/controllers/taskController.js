// src/controllers/taskController.js
const { knex, createTasksTable } = require('../models/taskModel');

// Ensure tasks table exists
createTasksTable();

const getTasks = async (req, res) => {
  try {
    // ✅ If admin → return all tasks
    if (req.user.role === 'admin') {
      const tasks = await knex('tasks');
      return res.json(tasks);
    }

    // ✅ If normal user → return only their tasks
    const tasks = await knex('tasks').where({ user_id: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const [id] = await knex('tasks').insert({
      title,
      description,
      user_id: req.user.id
    });

    res.status(201).json({ message: 'Task created', taskId: id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await knex('tasks').where({ id }).first();
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // ✅ Only admin or owner can update
    if (req.user.role !== 'admin' && task.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await knex('tasks').where({ id }).update({ title, description });
    res.json({ message: 'Task updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await knex('tasks').where({ id }).first();
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // ✅ Only admin or owner can delete
    if (req.user.role !== 'admin' && task.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await knex('tasks').where({ id }).del();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

