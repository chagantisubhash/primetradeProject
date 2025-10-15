import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <div>
        {showRegister ? <Register setToken={setToken} /> : <Login setToken={setToken} />}
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          {showRegister ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setShowRegister(!showRegister)} style={{ marginLeft: '0.5rem', color: '#2563EB' }}>
            {showRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    );
  }

  return <Dashboard setToken={setToken} />;
};

export default App;
