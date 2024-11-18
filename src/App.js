import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from './Login';
import Aboutus from './Aboutus';
import SignUp from './SignUp'; 
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';
import TransactionHistory from './TransactionHistory';
import GenerateReport from './GenerateReport';
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/generate-report" element={<GenerateReport />} />
            <Route path="/dashboard" element={<Dashboard />} />

          </Routes>
        </div>
      </Router>
    </UserAuthContextProvider>
  );
};

export default App;
