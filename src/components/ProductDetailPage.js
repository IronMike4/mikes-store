import React, { useState } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Toast,
} from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import productData from "../data/productData";
import { selectUser } from "../store/userSlice";

function ProductDetailPage() {
  const { id } = useParams(); // Get the product ID from URL parameters
  const dispatch = useDispatch(); // Hook to dispatch actions
  const user = useSelector(selectUser); // Get user data from the Redux store
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
  const [showToast, setShowToast] = useState(false); // State to control toast notification visibility
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  const product = productData[id]; // Get product details from the data based on the ID

  // Render if product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  // Handle the "Add to Cart" button click
  const handleAddToCart = () => {
    if (user.username) {
      // Check if user is logged in
      // Dispatch action to add item to the cart
      dispatch(
        addItem({ id, name: product.name, quantity: 1, price: product.price })
      );
      setShowToast(true); // Show success toast notification
    } else {
      // Save the redirection action in session storage
      sessionStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({
          type: "ADD_TO_CART",
          productId: id,
        })
      );
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">{product.name}</h2>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-light">
            <Card.Img variant="top" src={product.image} alt={product.name} />
            <Card.Body>
              <Card.Title className="mb-3">{product.name}</Card.Title>
              <Card.Text className="mb-3">{product.description}</Card.Text>
              <Card.Text className="mb-4">
                <strong>Price:</strong> ${product.price}
              </Card.Text>
              <Button
                onClick={handleAddToCart}
                variant="primary"
                className="w-100"
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button as={Link} to="/" variant="secondary" className="w-auto">
            Back to Home
          </Button>
        </Col>
      </Row>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to log in to add items to your cart. Please log in to
          continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Button variant="primary" as={Link} to="/login">
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Body>Item added to cart!</Toast.Body>
      </Toast>
    </Container>
  );
}

export default ProductDetailPage;
