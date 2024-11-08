import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './login.css';
import GoogleButton from "react-google-button";
import { useUserAuth } from './UserAuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { logIn, googleSignIn } = useUserAuth();


  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');


    try {
      await logIn(email, password);
      setSuccessMessage('Login successful!');
    } catch (error) {

      setErrorMessage('Invalid email or password.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setSuccessMessage('Google Sign-In successful!');
    } catch (error) {
      setErrorMessage('Google Sign-In failed.');
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
          
          <button
            type="submit"
            className="login-button"
            style={{
              backgroundColor: isHovered ? '#28a0a7' : '#31bbc5',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Login
          </button>
        </form>
        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          <GoogleButton className="w-100" onClick={handleGoogleSignIn}/>
          <p>

          </p>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
