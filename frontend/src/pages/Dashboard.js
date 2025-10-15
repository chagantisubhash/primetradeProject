import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from '../services/api';
import jwt_decode from 'jwt-decode';

const Dashboard = ({ setToken }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({ role: '', id: '' });

  const token = localStorage.getItem('token');

  // Decode JWT to get user info
  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUserInfo({ role: decoded.role, id: decoded.id });
    }
  }, [token]);

  // Fetch tasks whenever token or user role changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks(token);
        setTasks(res.data);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to fetch tasks');
      }
    };
    if (token) fetchTasks();
  }, [token]);

  // Create task
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description }, token);
      setMessage('Task created successfully');
      setTitle('');
      setDescription('');
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create task');
    }
  };

  // Delete task
  const handleDelete = async (taskId, taskUserId) => {
    try {
      if (userInfo.role !== 'admin' && taskUserId !== userInfo.id) {
        setMessage('You are not allowed to delete this task');
        return;
      }
      await deleteTask(taskId, token);
      setMessage('Task deleted successfully');
      const res = await getTasks(token);
      setTasks(res.data);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to delete task');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Welcome, {userInfo.role.toUpperCase()}</h2>
      <button
        onClick={handleLogout}
        style={{ float: 'right', backgroundColor: '#f87171', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px' }}
      >
        Logout
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {/* Only admin or user can create tasks */}
      <form onSubmit={handleCreate} style={{ margin: '2rem 0' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
        <button
          type="submit"
          style={{ padding: '0.5rem 1rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          Add Task
        </button>
      </form>

      <h3>Tasks:</h3>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '5px' }}>
          <strong>{task.title}</strong> - <em>{task.description}</em>
          <p>User ID: {task.user_id}</p>
          {/* Delete button shown only for admin or owner */}
          {(userInfo.role === 'admin' || task.user_id === userInfo.id) && (
            <button
              onClick={() => handleDelete(task.id, task.user_id)}
              style={{ marginTop: '0.5rem', backgroundColor: '#f87171', color: '#fff', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '3px' }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
