import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      {/* Container for the footer content */}
      <Container>
        <Row className="text-center text-md-start">
          {/* About Us section */}
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              Welcome to Mike's Store, your number one source for all things
              tech. We're dedicated to providing you the very best of products,
              with an emphasis on quality, customer service, and innovation.
            </p>
          </Col>

          {/* Quick Links section */}
          <Col md={3} className="mb-3 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <Nav className="flex-column">
              {/* Use Link for navigation to avoid full page reload */}
              <Nav.Link as={Link} to="/" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products" className="text-white">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/cart" className="text-white">
                Cart
              </Nav.Link>
            </Nav>
          </Col>

          {/* Follow Us section with social media links */}
          <Col md={3}>
            <h5 className="text-uppercase">Follow Us</h5>
            <Nav className="justify-content-center justify-content-md-start">
              <Nav.Link href="https://facebook.com" className="text-white me-2">
                <FaFacebook size={24} /> {/* Facebook icon */}
              </Nav.Link>
              <Nav.Link href="https://twitter.com" className="text-white me-2">
                <FaTwitter size={24} /> {/* Twitter icon */}
              </Nav.Link>
              <Nav.Link
                href="https://instagram.com"
                className="text-white me-2"
              >
                <FaInstagram size={24} /> {/* Instagram icon */}
              </Nav.Link>
              <Nav.Link href="https://linkedin.com" className="text-white">
                <FaLinkedin size={24} /> {/* LinkedIn icon */}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>

        {/* Footer copyright section */}
        <Row className="text-center mt-4">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Mike's Store. All rights
              reserved.
            </p>{" "}
            {/* Dynamic year */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
