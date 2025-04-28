// src/App.jsx
import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Workspace/Dashboard';

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

  // If not logged in, show either the login or register view based on the current view state
  if (!currentUser) {
    return view === 'login' ? (
      <Login onLogin={handleLogin} switchToRegister={switchToRegister} />
    ) : (
      <Register onRegister={handleRegister} switchToLogin={switchToLogin} />
    );
  }

  // If a user is logged in, render the main application dashboard
  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}
