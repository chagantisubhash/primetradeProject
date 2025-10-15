import React, { useState } from 'react';
import { loginUser } from '../services/api';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} />
        <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#2563EB', color: '#fff', border: 'none', borderRadius: '5px' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
