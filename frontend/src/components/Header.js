import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapeOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="brandName" >MyShopee</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" class="xyz" >
            <Nav>
              <LinkContainer to="/login">
                <Nav.Link ><i class="fas fa-sign-in-alt"></i>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link to="/signup"><i className="fas fa-user"></i>SignUp</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link to="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;
