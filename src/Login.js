import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import GoogleButton from 'react-google-button';
import { useUserAuth } from './UserAuthContext';
import { db } from './firebase'; // Import your Firestore database
import { doc, getDoc } from 'firebase/firestore';
 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { logIn, googleSignIn, user } = useUserAuth();
 
  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
 
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
 
    try {
      // Log in the user via Firebase Authentication
      await logIn(email, password);
 
      // Fetch user data from Firestore to check role or admin status
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
 
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setSuccessMessage('Login successful!');
       
        // Log the fetched user data to verify the role
        console.log("Fetched user data: ", userData);
 
        // Check if the user is an admin (based on the role in Firestore)
        if (userData.role === 'admin' && userData.email === 'admin@gmail.com') {
          navigate('/admin'); // Navigate to the admin page
        } else if (userData.role === 'accountant') {
          navigate('/accountantDashboard'); // Navigate to the accountant dashboard
        } else {
          navigate('/dashboard'); // Navigate to the user dashboard
        }
      } else {
        setErrorMessage('User data not found.');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };
 
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setSuccessMessage('Google Sign-In successful!');
 
      // Redirect based on user's role or admin status
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
 
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
 
          <button
            type="submit"
            className="login-button"
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
            Login
          </button>
        </form>
 
        <div className="login-footer">
          <GoogleButton className="google-button" onClick={handleGoogleSignIn} />
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default Login;