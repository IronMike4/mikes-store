import React, { useState } from "react";
import { Container, Button, Row, Col, Form, Alert } from "react-bootstrap";

const PaymentPage = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // State to determine if the form has been submitted successfully
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to validate form input fields
  const validateForm = () => {
    const newErrors = {};

    // Validate name on card
    if (!formData.name) newErrors.name = "Name on card is required.";

    // Validate card number (must be 16 digits)
    if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Validate expiry date (must be in MM/YY format)
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    }

    // Validate CVV (must be 3 digits)
    if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(newErrors); // Set errors to state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle changes to input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validateForm()) {
      // Validate form data
      setIsSubmitted(true); // Set submission state to true if valid
    }
  };

  return (
    <Container className="my-5">
      {" "}
      {/* Container for layout and spacing */}
      <h2 className="mb-4">Payment Page</h2>
      {/* Show success alert if form is submitted and there are no errors */}
      {isSubmitted && !Object.keys(errors).length && (
        <Alert variant="success">Payment processed successfully!</Alert>
      )}
      <Row>
        <Col md={8}>
          {" "}
          {/* Column with medium width for the form */}
          <Form onSubmit={handleSubmit}>
            {/* Form group for cardholder's name */}
            <Form.Group controlId="name">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name} // Show error state if validation fails
              />
              <Form.Control.Feedback type="invalid">
                {errors.name} {/* Display error message */}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Form group for card number */}
            <Form.Group controlId="cardNumber" className="mt-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                isInvalid={!!errors.cardNumber} // Show error state if validation fails
              />
              <Form.Control.Feedback type="invalid">
                {errors.cardNumber} {/* Display error message */}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Form group for expiry date */}
            <Form.Group controlId="expiryDate" className="mt-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                isInvalid={!!errors.expiryDate} // Show error state if validation fails
              />
              <Form.Control.Feedback type="invalid">
                {errors.expiryDate} {/* Display error message */}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Form group for CVV */}
            <Form.Group controlId="cvv" className="mt-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                isInvalid={!!errors.cvv} // Show error state if validation fails
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvv} {/* Display error message */}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Submit button */}
            <Button variant="primary" type="submit" className="mt-4">
              Pay Now
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentPage;
