import React from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logOut, role } = useUserAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MoneyTrail</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Feedback">Feedback</Link></li>
        

        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            {role === 'admin' && <li><Link to="/admin">Admin Dashboard</Link></li>}
            {role === 'accountant' && <li><Link to="/accountant">Accountant Dashboard</Link></li>}
            <li><button onClick={logOut} className="logout-button">Log Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
