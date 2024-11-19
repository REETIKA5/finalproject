import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import './SignUp.css';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from './firebase'; 

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');  // Default role set to 'user'
  const [accountants, setAccountants] = useState([]);
  const [selectedAccountant, setSelectedAccountant] = useState('');
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch the list of accountants only once on component mount
  useEffect(() => {
    const fetchAccountants = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const accountantsList = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === 'accountant'); // Only filter accountants
      setAccountants(accountantsList);
    };
    fetchAccountants();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
    } else {
      // Automatically assign 'admin' role if the email matches a specific admin email
      const adminEmail = "admin@example.com";  // Set the admin email here
      const selectedRole = email === adminEmail ? 'admin' : role;  // Assign 'admin' role only for the specific email

      try {
        // Perform signup with the selected role and selected accountant if applicable
        await signUp(email, password, selectedRole, selectedAccountant);

        setSuccessMessage('Signup successful! Please log in.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('user');  // Reset to default role
        setSelectedAccountant('');
        navigate('/login');  // Navigate to login page after successful signup
      } catch (error) {
        setErrorMessage('Error signing up. Please try again.');
      }
    }
  };

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="input-group-signup">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group-signup">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-group-signup">
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <div className="input-group-signup">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="accountant">Accountant</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Conditionally render the "Assign Accountant" dropdown only if the role is not "Accountant" */}
          {role !== 'accountant' && (
            <div className="input-group-signup">
              <label>Assign Accountant</label>
              <select 
                value={selectedAccountant} 
                onChange={(e) => setSelectedAccountant(e.target.value)}
                required
              >
                <option value="">Select Accountant</option>
                {accountants.map(accountant => (
                  <option key={accountant.id} value={accountant.id}>{accountant.email}</option>
                ))}
              </select>
            </div>
          )}

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
