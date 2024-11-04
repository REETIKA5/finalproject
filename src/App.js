import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import { UserAuthContextProvider } from './UserAuthContext';
const App = () => {
  return (
    <UserAuthContextProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
    </UserAuthContextProvider>
  );
};

export default App;
