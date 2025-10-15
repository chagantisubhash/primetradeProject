import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = ({ setToken }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      setSuccess('Registered successfully! You can login now.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '5px' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
