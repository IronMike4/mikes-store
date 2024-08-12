import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import {
  removeItem,
  clearCart,
  setShippingMethod,
  decrementItemQuantity,
  incrementItemQuantity,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function CartPage() {
  // Access cart items and shipping method from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const shippingMethod = useSelector((state) => state.cart.shippingMethod);
  const dispatch = useDispatch(); // For dispatching actions
  const [showHelp, setShowHelp] = useState(false); // State to manage help modal visibility
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility
  const navigate = useNavigate(); // For navigation

  // Handler for removing an item from the cart
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    setShowAlert(true);
  };

  // Handler for decrementing the quantity of an item
  const handleDecrementItemQuantity = (id) => {
    dispatch(decrementItemQuantity(id));
    setShowAlert(true);
  };

  // Handler for incrementing the quantity of an item
  const handleIncrementItemQuantity = (id) => {
    dispatch(incrementItemQuantity(id));
    setShowAlert(true);
  };

  // Handler for clearing all items in the cart
  const handleClearCart = () => {
    dispatch(clearCart());
    setShowAlert(true);
  };

  // Handler for changing the shipping method
  const handleShippingMethodChange = (e) => {
    dispatch(setShippingMethod(e.target.value));
  };

  // Function to calculate the total cost including shipping
  const calculateTotal = () => {
    const cartTotal = cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    let shippingCost = 0;

    // Determine shipping cost based on selected method
    switch (shippingMethod) {
      case "standard":
        shippingCost = 5.0;
        break;
      case "express":
        shippingCost = 15.0;
        break;
      case "overnight":
        shippingCost = 25.0;
        break;
      default:
        shippingCost = 0;
    }

    return (cartTotal + shippingCost).toFixed(2);
  };

  // Handler for proceeding to the payment page
  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 fs-4">Your Cart</h2>

      {/* Display success alert if showAlert is true */}
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <Alert.Heading className="fs-6">Action Successful</Alert.Heading>
          <p className="fs-6">Your cart has been updated successfully.</p>
        </Alert>
      )}

      {/* Display message if cart is empty */}
      {cartItems.length === 0 ? (
        <p className="fs-6">Your cart is empty.</p>
      ) : (
        <>
          {/* Display cart items in a table */}
          <div className="table-responsive">
            <Table striped bordered hover className="shadow-sm mb-3 fs-6">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th className="d-none d-md-table-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td className="d-flex flex-column flex-sm-row align-items-start">
                      <span>{item.quantity}</span>
                      <div className="d-flex flex-column flex-sm-row mt-2">
                        {/* Buttons for adjusting item quantity */}
                        <Button
                          variant="warning"
                          size="sm"
                          className="mx-1 mb-2 mb-sm-0"
                          onClick={() => handleDecrementItemQuantity(item.id)}
                          disabled={item.quantity === 1}
                          style={{ padding: "2px 6px", minWidth: "24px" }}
                        >
                          -
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          className="mx-1"
                          onClick={() => handleIncrementItemQuantity(item.id)}
                          style={{ padding: "2px 6px", minWidth: "24px" }}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.totalPrice.toFixed(2)}</td>
                    <td className="d-none d-md-table-cell">
                      {/* Button for removing item from the cart */}
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Shipping method selection and help button */}
          <Row className="mb-3">
            <Col xs={12} md={8} className="d-flex align-items-center">
              <Form.Group
                controlId="shippingMethod"
                className="d-flex align-items-center w-100"
              >
                <Form.Label className="mb-0 mr-3 fs-6">
                  Shipping Method:
                </Form.Label>
                <div className="d-flex flex-grow-1 align-items-center">
                  <Form.Control
                    as="select"
                    value={shippingMethod}
                    onChange={handleShippingMethodChange}
                    className="flex-grow-1 fs-6"
                    style={{ fontSize: "1rem" }}
                  >
                    <option value="">Select...</option>
                    <option value="standard">Standard - $5.00</option>
                    <option value="express">Express - $15.00</option>
                    <option value="overnight">Overnight - $25.00</option>
                  </Form.Control>
                  {/* Help button to show shipping information */}
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => setShowHelp(true)}
                    className="ms-3"
                  >
                    Help
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Display total cost and buttons for clearing the cart and proceeding to payment */}
          <Row className="d-flex flex-column flex-sm-row align-items-start">
            <Col
              xs={12}
              sm={6}
              className="d-flex align-items-center mb-3 mb-sm-0"
            >
              <h4 className="mr-3 text-nowrap fs-6">
                Total: ${calculateTotal()}
              </h4>
            </Col>
            <Col
              xs={12}
              sm={6}
              className="d-flex flex-column flex-sm-row align-items-start"
            >
              <Button
                variant="danger"
                className="mb-3 mb-sm-0 mr-sm-3 w-100 fs-6"
                onClick={handleClearCart}
                style={{ marginRight: "10px" }}
              >
                Clear Cart
              </Button>
              <Button
                variant="primary"
                className="w-100 fs-6"
                onClick={handlePayment}
              >
                Proceed to Payment
              </Button>
            </Col>
          </Row>
        </>
      )}

      {/* Modal to show shipping information */}
      <Modal show={showHelp} onHide={() => setShowHelp(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Standard Shipping:</strong> $5.00 - Delivered in 5-7
            business days.
          </p>
          <p>
            <strong>Express Shipping:</strong> $15.00 - Delivered in 2-3
            business days.
          </p>
          <p>
            <strong>Overnight Shipping:</strong> $25.00 - Delivered the next
            business day.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHelp(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CartPage;
