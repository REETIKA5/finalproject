import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const validEmail = 'usertest1@gmail.com';
    const validPassword = 'user123';

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
    } else if (email === validEmail && password === validPassword) {
      setSuccessMessage('Login successful! ');
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className="login-page">
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="circle3"></div>
      <div className="logo">MoneyTrail</div>
      <div className="login-container">
        <h1>Log In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-footer">
          <a href="/forgot-password">Forgot Password?</a>
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;