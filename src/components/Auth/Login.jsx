// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { getUserByEmail } from '../../utils/storage';

export default function Login({ onLogin, switchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault(); // Prevent the default form submission behavior which would refresh the page
    // Retrieve the user from localStorage using the provided email. The storedUser object contains the user's fullName, email, and password.
    const storedUser = getUserByEmail(email);
    if (!storedUser) {
      alert('Account not registered. Please register first.');
    }
    else if (storedUser && storedUser.password === password) {
      onLogin({ fullName: storedUser.fullName, email: storedUser.email }); // Call the onLogin function (handleLogin) passed as a prop with the user's details
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className="auth-switch">
        <span>Don't have an account? </span>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={switchToRegister} // Call the switchToRegister function passed as a prop to switch to the registration view
        >
          Register
        </button>
      </div>
    </div>
  );
}
