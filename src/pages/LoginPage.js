import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';

axios.defaults.baseURL = 'http://127.0.0.1:5000'; 

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert('Please provide both username and password.');
      return;
    }
    axios.post('/login', {
      username,
      password
    })
    .then(response => {
      const userId = response.data.userId;
      navigate(`/dashboard/${userId}`); 
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div className="input-container">
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <div>
        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
      <div>
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </div>
    </div>
  );
}
