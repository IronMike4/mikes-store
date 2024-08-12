import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

function Header() {
  // State to manage the expanded/collapsed state of the navbar
  const [expanded, setExpanded] = useState(false);

  // Get the username from the Redux store
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    dispatch(setUser("")); // Clear the username in the Redux store
    setExpanded(false); // Collapse the navbar
    navigate("/"); // Redirect to the homepage
  };

  // Handle navigation link clicks to collapse the navbar
  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={expanded}
    >
      <Container>
        {/* Brand name with a link to the homepage */}
        <Navbar.Brand as={Link} to="/">
          Mike's Store
        </Navbar.Brand>
        {/* Toggle button for collapsing/expanding the navbar */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* Navigation links */}
            <Nav.Link as={Link} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={handleNavClick}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" onClick={handleNavClick}>
              Cart
            </Nav.Link>
            {/* Conditional links based on whether the user is logged in */}
            {!username && (
              <>
                <Nav.Link as={Link} to="/register" onClick={handleNavClick}>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={handleNavClick}>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
          {/* User info and logout button if logged in */}
          {username ? (
            <div className="d-flex align-items-center ms-auto">
              <Navbar.Text className="me-3">
                Logged in as: <strong>{username}</strong>
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
