// SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './SignUp.css'; // You can create this CSS file similarly to your login.css

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      setSuccessMessage('Signup successful! Please log in.');
      // Reset fields after successful signup if needed
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="login-page">
      <div className="logo">MoneyTrail</div>
      <div className="login-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <div className="login-footer">
          <p>
            Already have an account? <Link to="/">Log In</Link> {/* Link to Login */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
