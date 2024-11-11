import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
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
  );
};

export default Navigation;
