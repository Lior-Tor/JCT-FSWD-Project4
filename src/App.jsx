// src/App.jsx
import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' | 'register'

  const handleLogin = user => {
    setCurrentUser(user);
  };

  const handleRegister = user => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('login');
  };

  const switchToLogin = () => setView('login');
  const switchToRegister = () => setView('register');

  if (!currentUser) {
    return view === 'login' ? (
      <Login onLogin={handleLogin} switchToRegister={switchToRegister} />
    ) : (
      <Register onRegister={handleRegister} switchToLogin={switchToLogin} />
    );
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}
