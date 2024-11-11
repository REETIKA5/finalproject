// App.js
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Aboutus from './Aboutus';
import ForgotPassword from './ForgotPassword';
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
          <Route path="/Forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </div>

    </Router>
    </UserAuthContextProvider>
  );
}

export default App;
