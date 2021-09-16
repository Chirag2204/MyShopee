import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { Route } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../actions/userActions";
import { SearchBox } from "./SearchBox";

const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapeOnSelect>
        <Container>

          <LinkContainer to="/">
            <Navbar.Brand className="brandName"><i className="fab fa-shopify"></i>MyShopee</Navbar.Brand>

          </LinkContainer>


          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="xyz" >
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav>
              {userInfo ?
                (
                  <NavDropdown title={userInfo.name}>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
                  </NavDropdown>
                )
                : (<>
                  <LinkContainer to="/login">
                    <Nav.Link ><i class="fas fa-sign-in-alt"></i>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link to="/register"><i className="fas fa-user"></i>Register</Nav.Link>
                  </LinkContainer>
                </>)}

              <LinkContainer to="/cart">
                <Nav.Link to="/cart"><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header >
  )
}

export default Header;
