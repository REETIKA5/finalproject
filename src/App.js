// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Login from './Login'; // Adjust the import path as necessary
import SignUp from './SignUp'; // Make sure to create this component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} /> {/* Use element prop */}
        <Route path="/" element={<Login />} /> {/* Use element prop */}
      </Routes>
    </Router>
  );
};

export default App;
