import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';

  // Check if the user is logged in based on token in localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleLogout = () => {
    // Clear the login status from localStorage
    localStorage.removeItem('isLoggedIn');
    // Redirect the user to the home page or login page
    navigate('/');
  };

  return (
    <Navbar
      style={{
        backgroundColor: '#61CE70',
        transition: 'background-color 0.3s ease',
        zIndex: 100,
        padding: '5px 20px',
        height: '60px',
      }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ color: 'WHITE', fontWeight: 'bold', fontSize: '1.5rem' }}>
          MoneyTrail
        </Navbar.Brand>
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

          {/* Show the Dashboard link only if logged in */}
          {isLoggedIn && (
            <Nav.Link as={NavLink} to="/dashboard" style={({ isActive }) => ({ color: isActive ? 'White' : 'Black', fontWeight: isActive ? 'bold' : 'normal', fontSize: '1rem' })}>
              Dashboard
            </Nav.Link>
          )}

          {/* Display dropdown only if the user is on the dashboard */}
          {isDashboard && (
            <>
              <NavDropdown title="More" id="transactionDropdown">
                <NavDropdown.Item as={NavLink} to="/transaction-history">
                  Transaction History
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/generate-report">
                  Generate Report
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Users" id="roleDropdown">
                <NavDropdown.Item as={NavLink} to="/admin">
                  Admin Page
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/accountant">
                  Accountant Page
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>

        {isLoggedIn && (
          <Nav>
            <Nav.Link onClick={handleLogout} style={{ color: 'White', fontWeight: 'bold', fontSize: '1rem' }}>
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
