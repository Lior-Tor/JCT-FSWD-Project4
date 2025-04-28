// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { getUserByEmail, saveUser } from '../../utils/storage';

export default function Register({ onRegister, switchToLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = e => {
    e.preventDefault(); // Prevent the default form submission behavior which would refresh the page
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    if (getUserByEmail(email)) {
      alert('A user with that email already exists');
      return;
    }
    saveUser({ fullName, email, password }); // Save the new user to localStorage
    onRegister({ fullName, email }); // Call the onRegister function (handleRegister) passed as a prop with the user's details
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="reg-fullName">Full Name</label>
        <input
          id="reg-fullName"
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
        />

        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="reg-password">Password</label>
        <input
          id="reg-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <label htmlFor="reg-confirm">Confirm Password</label>
        <input
          id="reg-confirm"
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      <div className="auth-switch">
        <span>Already have an account? </span>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={switchToLogin} // Call the switchToLogin function passed as a prop to switch to the login view
        >
          Login
        </button>
      </div>
    </div>
  );
}
