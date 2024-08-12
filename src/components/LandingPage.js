import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import productData from "../data/productData";

function LandingPage({ isLoggedIn }) {
  return (
    <Container className="my-5">
      {/* Hero section with a welcoming message */}
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Welcome to Our Store!</h1>
          <p className="lead">Discover amazing products and great deals.</p>
          {/* Conditional rendering of buttons based on login status */}
          {isLoggedIn ? (
            <Button as={Link} to="/products" variant="primary" size="lg">
              Shop Now
            </Button>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="primary"
                size="lg"
                className="mx-2"
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="secondary"
                size="lg"
                className="mx-2"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Product showcase section */}
      <Row className="my-5">
        {/* Iterate over product data and create a card for each product */}
        {Object.keys(productData).map((id) => (
          <Col md={4} key={id}>
            <Card className="h-100">
              {/* Display product image */}
              <Card.Img
                variant="top"
                src={productData[id].image}
                alt={`Product ${id}`}
              />
              <Card.Body>
                {/* Display product name and description */}
                <Card.Title>{productData[id].name}</Card.Title>
                <Card.Text>{productData[id].description}</Card.Text>
                {/* Link to product details page */}
                <Button as={Link} to={`/products/${id}`} variant="primary">
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default LandingPage;
