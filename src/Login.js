import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import GoogleButton from 'react-google-button';
import { useUserAuth } from './UserAuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';  // Import your Firestore database
import { doc, getDoc } from 'firebase/firestore';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const { logIn, googleSignIn,role, user } = useUserAuth(); // Fetch role from context


  // handleLogin function (with the updated logic)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {

      // First, login the user via Firebase Authentication
      await logIn(email, password);

      // Fetch the user from Firestore to check if it's the admin
      const userRef = doc(db, 'users', user.uid); // Get user reference by UID
      const userDoc = await getDoc(userRef);
      
      // Check if user exists and if the email is the admin email
      if (userDoc.exists() && userDoc.data().email === 'admin@gmail.com' && userDoc.data().role === 'admin') {
        // If admin, redirect to admin page
        setSuccessMessage('Admin Login successful!');
        navigate('/admin'); // Navigate to the admin page
      } else {
        // For regular users, redirect to user dashboard
        setSuccessMessage('Login successful!');
        navigate('/Admin'); // Navigate to the regular dashboard

      await logIn(email, password); // Log in user
      setSuccessMessage('Login successful!');
      
      // Redirect user based on role
      if (role === 'accountant') {
        navigate('/accountant'); // Redirect to accountant dashboard
      } else if (role === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        navigate('/dashboard'); // Redirect to user dashboard

      }
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(); // Handle Google sign-in
      setSuccessMessage('Google Sign-In successful!');

      // After Google login, check the user's email for admin status
      if (user?.email === 'admin@gmail.com') {
        navigate('/Admin');
      } else {
        navigate('/Admin');

      
      
      if (role === 'accountant') {
        navigate('/AccountantDashboard');
      } else if (role === 'admin') {
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
