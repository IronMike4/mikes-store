import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Toast,
  Modal,
} from "react-bootstrap";
import { addItem } from "../store/cartSlice";
import { selectUser, setUser } from "../store/userSlice";
import { Link } from "react-router-dom";

function ProductPage() {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const user = useSelector(selectUser); // Hook to get the current user from the Redux store
  const [showToast, setShowToast] = useState(false); // State to control toast notification visibility
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
  const [pendingAction, setPendingAction] = useState(null); // State to store a pending action if user is not logged in

  // Example products list
  const products = [
    {
      id: 1,
      name: "BEATS Solo 4 Wireless Bluetooth Headphones ",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1491024579037-7484729a4420?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "APPLE AirPods with Lightning Charging Case (3rd generation)",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1632079387568-644c8030b6b2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Logitech Wireless Combo Keyboard and Mouse Wireless QWERTY Black MK270",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1585314614250-d213876625e1?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Apple Magic Mouse",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1496878632226-93afc36151ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Lumix DC-FZ82D Bridge Camera",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1616423641454-caa695af6a0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      name: "Apple iPad 2022 10.9 Inch",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1525101238777-8878781fc06d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      name: 'Apple iMac 24", M3, 8-Core GPU, 256 GB - 2023',
      price: 80,
      image:
        "https://images.unsplash.com/photo-1511975634005-8f73acab9525?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 8,
      name: "Vintage Olivetti Lettera 32 Portable Manual Typewriter",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1461218821725-ec98ac649fab?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 9,
      name: "CHUBORY Durable Brushless Motor Drone",
      price: 70,
      image:
        "https://images.unsplash.com/photo-1515982068348-4e5ce8f0d601?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Handle the addition of a product to the cart
  const handleAddToCart = (product) => {
    if (user.username) {
      // Check if user is logged in
      // Create a cart item object
      const cartItem = {
        id: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
      };
      // Dispatch the addItem action to add the item to the cart
      dispatch(addItem(cartItem));
      setShowToast(true); // Show success toast notification
    } else {
      // If user is not logged in, save the product for later and show login modal
      setPendingAction(product);
      setShowLoginModal(true);
    }
  };

  // Handle the login action

  return (
    <Container className="my-5">
      <h2 className="mb-4">Product Page</h2>
      <Row>
        {/* Map through the products and render a card for each */}
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card className="shadow-sm border-light">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="primary"
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

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
    </Container>
  );
}

export default ProductPage;
