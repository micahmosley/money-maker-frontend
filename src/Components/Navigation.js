import React from 'react';
import { Nav, Navbar, NavDropdown, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  
  state={
    show:false, 
    showSignup:false,
}

handleShow=()=>{
    this.setState({
        show:true
    })
}

handleShowSignup=()=>{
  this.setState({
      showSignup:true
  })
}

handleClose=()=>{
    this.setState({
        show:false,
        showSignup:false,
    })
}
  
  
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand as={Link} to="/">MoneyMaker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.props.userId === 0 ? <Nav.Link onClick={this.handleShowSignup}>Signup</Nav.Link> :
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/sports">Sports</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/rules">Rules</NavDropdown.Item>
                  {/* Allow Grading privileges for administrator only */}
                  {this.props.userId === 1 ? <NavDropdown.Item as={Link} to="/grade">Grade</NavDropdown.Item> : null}
                </NavDropdown>}
              {this.props.userId === 0 ? <Nav.Link onClick={this.handleShow} >Login</Nav.Link> :
                null}
            </Nav>
            <Nav>
              {this.props.userId === 0 ? null :
                <NavDropdown title={`${this.props.username}
       ($${this.props.balance.toFixed(2)})`} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/account">My Account</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/cashier">Cashier</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.props.getPlacedBets("Pending")} as={Link} to="/showBets">Pending Bets</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => this.props.getPlacedBets("Past")} as={Link} to="/showBets">Past Bets</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.props.logout} as={Link} to="/">Logout</NavDropdown.Item>
                </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* this modal shows login modal */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body><form onSubmit={(e) => {
            e.preventDefault()
            this.handleClose()
            this.props.userCreateOrLogin(e, "Log In")
          }}>
            <input placeholder="Username" name="username" /><br />
            <input type="password" placeholder="Password" name="password" /><br />
            <input type="submit" value="Log In" />
          </form></Modal.Body>
        </Modal>
        {/* this modal shows sign up modal */}
        <Modal show={this.state.showSignup} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body><form onSubmit={(e) => {
            e.preventDefault()
            this.handleClose()
            this.props.userCreateOrLogin(e, "Sign Up")
          }}>
            <input placeholder="Username" name="username" /><br />
            <input type="password" placeholder="Password" name="password" /><br />
            <input type="submit" value="Sign Up" />
          </form></Modal.Body>
        </Modal>
      </>
    )
  }
}

export default Navigation