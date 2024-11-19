import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from './Login';
import Aboutus from './Aboutus';
import SignUp from './SignUp'; 
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import Admin from './Admin'; // Admin page
import { UserAuthContextProvider } from './UserAuthContext';

const App = () => {
  return (
    <UserAuthContextProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </UserAuthContextProvider>
  );
};

export default App;
