import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  // State to manage form input values
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    username: "",
    email: "",
    password: "",
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState({});

  // State to manage success message display
  const [successMessage, setSuccessMessage] = useState("");

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate password or entire form based on field
    if (name === "password") {
      validatePassword(value);
    } else {
      validateForm();
    }
  };

  // Handle input field blur events (e.g., trimming whitespace)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  // Toggle the visibility of the password input
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate email address using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password based on several criteria
  const validatePassword = (password) => {
    // Regular expressions for various password requirements
    const lengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    let errorMessage = "";

    if (!lengthRegex.test(password)) {
      errorMessage = "Password must be at least 8 characters long.";
    } else if (!uppercaseRegex.test(password)) {
      errorMessage = "Password must include at least one uppercase letter.";
    } else if (!lowercaseRegex.test(password)) {
      errorMessage = "Password must include at least one lowercase letter.";
    } else if (!digitRegex.test(password)) {
      errorMessage = "Password must include at least one number.";
    } else if (!specialCharRegex.test(password)) {
      errorMessage = "Password must include at least one special character.";
    }

    // Set error messages for the password field
    setErrors((prevErrors) => ({ ...prevErrors, password: errorMessage }));
  };

  // Validate the entire form and set errors
  const validateForm = () => {
    const newErrors = {};
    const { firstName, surname, username, email, password } = formData;

    // Check each field for validation
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!surname.trim()) newErrors.surname = "Surname is required.";
    if (!username.trim()) newErrors.username = "Username is required.";
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }

    // Update error state and return validity
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (validateForm()) {
      // Retrieve users from localStorage or initialize an empty array
      const users = JSON.parse(localStorage.getItem("users")) || [];
      // Add new user to the list
      users.push(formData);
      // Save updated users list to localStorage
      localStorage.setItem("users", JSON.stringify(users));
      setSuccessMessage("Registration successful!"); // Set success message
      setErrors({}); // Clear any existing errors
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after 1.5 seconds
      }, 1500);
    }
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">Register</h2>
      {/* Display success message if any */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          {/* Form group for first name */}
          <Col md={6}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.firstName}
                placeholder="Enter your first name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {/* Form group for surname */}
          <Col md={6}>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.surname}
                placeholder="Enter your surname"
              />
              <Form.Control.Feedback type="invalid">
                {errors.surname}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Form group for username */}
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.username}
            placeholder="Choose a username"
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Form group for email */}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.email}
            placeholder="Enter your email address"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Form group for password */}
        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password}
              placeholder="Enter your password"
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        {/* Submit button */}
        <Button variant="primary" type="submit" className="w-100">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
