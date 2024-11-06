// App.js
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from './Login';
import SignUp from './SignUp';
import Aboutus from './Aboutus';






function App() {
  return (
    <Router>

      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
