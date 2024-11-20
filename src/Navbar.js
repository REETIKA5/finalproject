import React from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logOut, role } = useUserAuth();

  return (

    <Navbar style={{ backgroundColor: '#61CE70', transition: 'background-color 0.3s ease', zIndex: 100, padding: '5px 20px', height: '60px' }} variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ color: "WHITE", fontWeight: 'bold', fontSize: '1.5rem' }}>MoneyTrail</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" style={({ isActive }) => ({ color: isActive ? 'White' : 'Black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login" style={({ isActive }) => ({ color: isActive ? 'WHITE' : 'Black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Aboutus" style={({ isActive }) => ({ color: isActive ? 'White' : 'Black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
            About Us
          </Nav.Link>
        
        </Nav>
      </Container>
    </Navbar>

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
