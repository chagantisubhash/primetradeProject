import React from 'react';

const Navbar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#4B5563', color: '#fff' }}>
      <h1 style={{ display: 'inline-block', marginRight: '2rem' }}>Task Manager</h1>
      <button onClick={logout} style={{ padding: '0.5rem 1rem', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
