// SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      try {
        await signUp(email, password);
        setSuccessMessage('Signup successful! Please log in.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login'); 
      } catch (error) {
        setErrorMessage('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="sign-up-page">
      <div className="circle1-signup"></div>
      <div className="circle2-signup"></div>
      <div className="circle3-signup"></div>

      <div className="sign-up-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="input-group-signup">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group-signup">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group-signup">
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

          <button
            type="submit"
            className="sign-up-button"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
          >
            Sign Up
          </button>
        </form>
        <div className="sign-up-footer">
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;