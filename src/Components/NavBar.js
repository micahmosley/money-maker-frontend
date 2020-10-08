import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar bg="dark" light expand="lg">
        <NavbarBrand className='d-inline p-2bg-dark text-white' href="/">MoneyMaker</NavbarBrand>
          <Nav className="mr-auto" navbar>
            {props.userId===0 ? 
            <NavItem>
              <NavLink className='d-inline p-2bg-dark text-white' href="/signup">Signup</NavLink>
            </NavItem> 
            : 
            <NavItem>
              <NavLink className='d-inline p-2bg-dark text-white' href="/account">My Account</NavLink>
            </NavItem> }
            {props.userId===0 ?
            <NavItem>
              <NavLink className='d-inline p-2bg-dark text-white' href="/login">Login</NavLink>
            </NavItem>
            :
            <NavItem>
              <NavLink className='d-inline p-2bg-dark text-white' href="/menu">Menu</NavLink>
            </NavItem> }
          </Nav>
          <NavbarText>Simple Text</NavbarText>
      </Navbar>
    </div>
  );
}

export default NavBar;