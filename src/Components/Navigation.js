import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {  Link } from "react-router-dom";

 const Navigation = (props) => (
    <Navbar bg="success" variant="dark" expand="lg">
    <Navbar.Brand as={Link} to="/">MoneyMaker</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {props.userId===0 ? <Nav.Link as={Link} to="/signup">Signup</Nav.Link> : 
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/sports">Sports</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/cashier">Cashier</NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/rules">Rules</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={props.logout} as={Link} to="/">Logout</NavDropdown.Item>
        </NavDropdown>}
        
        {props.userId===0 ? <Nav.Link as={Link} to="/login">Login</Nav.Link> : 
        <Nav.Link as={Link} to="/account">My Account</Nav.Link>}

      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Navigation