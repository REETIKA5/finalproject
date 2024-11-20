import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from './Login';
import Aboutus from './Aboutus';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';

import Admin from './Admin'; // Admin page
import Feedback from './Feedback';
import AccountantDashboard from './AccountantDashboard';
import { UserAuthContextProvider } from './UserAuthContext'; 
import ProtectedRoute from './ProtectedRoute';


const App = () => {
  return (
    <UserAuthContextProvider> {/* Wrap your app with the context provider */}
      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<Aboutus />} />
           <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
           <Route path="/admin" element={<Admin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/AccountantDashboard" element={<AccountantDashboard />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        
          <Route
            path="/accountant"
            element={
              <ProtectedRoute>
                <AccountantDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/feedback" element={<Feedback />} />
        </Routes>

      </Router>
    </UserAuthContextProvider> 
  );
};

export default App;
