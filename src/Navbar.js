import React from 'react';
import { NavLink } from 'react-router-dom'; // Removed unused 'Link' import
import { useUserAuth } from './UserAuthContext';
import './Navbar.css';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap'; // Removed unused 'NavDropdown'
 
const Navbar = () => {
  const { user, logOut, role } = useUserAuth();
 
  return (
    <BootstrapNavbar
      style={{ backgroundColor: '#61CE70', transition: 'background-color 0.3s ease', zIndex: 100, padding: '5px 20px', height: '60px' }}
      variant="dark"
    >
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
          MoneyTrail
        </BootstrapNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
            Home
          </Nav.Link>
         
          {/* Show Login/Sign Up links if the user is not logged in */}
          {!user && (
            <>
              <Nav.Link as={NavLink} to="/login" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
                Sign Up
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Aboutus" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
                AboutUs
              </Nav.Link>
            </>
          )}
         
          {/* Show Feedback link only if the user is logged in */}
          {user && (
            <Nav.Link as={NavLink} to="/feedback" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
              Feedback
            </Nav.Link>
          )}
 
          {/* Show Dashboard links based on role */}
          {user && (
            <>
              <Nav.Link as={NavLink} to="/dashboard" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
                Dashboard
              </Nav.Link>
              {role === 'admin' && (
                <Nav.Link as={NavLink} to="/admin" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
                  Admin Dashboard
                </Nav.Link>
              )}
              {role === 'accountant' && (
                <Nav.Link as={NavLink} to="/accountant" style={({ isActive }) => ({ color: isActive ? 'white' : 'black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
                  Accountant Dashboard
                </Nav.Link>
              )}
              <Nav.Link as="button" onClick={logOut} style={{ color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                Log Out
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};
 
export default Navbar;