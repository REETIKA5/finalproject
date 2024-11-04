import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
  return (
    <Navbar style={{ backgroundColor: '#61CE70', transition: 'background-color 0.3s ease', zIndex: 1000 }} variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={{ color: "WHITE", fontWeight: 'bold' }}>MoneyTrail</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" style={({ isActive }) => ({ color: isActive ? 'White' : 'Black', fontWeight: isActive ? 'bold' : 'normal' })}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login" style={({ isActive }) => ({ color: isActive ? 'WHITE' : 'Black', fontWeight: isActive ? 'bold' : 'normal' })}>
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Aboutus" style={({ isActive }) => ({ color: isActive ? 'White' : 'Black', fontWeight: isActive ? 'bold' : 'normal' })}>
            About Us
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
