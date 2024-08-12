import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const LoginForm = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage error messages
  const [error, setError] = useState(null);

  // Redux dispatch and navigation hook
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const { username, password } = formData;

    // Retrieve users from local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user with matching username and password
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    // Handle invalid credentials
    if (!user) {
      setError("Invalid username or password.");
    } else {
      // Clear error and set user in the Redux store
      setError(null);
      dispatch(setUser(username));

      // Redirect to the landing page after login
      navigate("/");
    }
  };

  return (
    <Container className="mt-5 mb-5">
      {" "}
      {/* Container for layout and spacing */}
      <Row className="justify-content-md-center">
        <Col md={6}>
          {" "}
          {/* Center column with medium width */}
          <h2>Login</h2>
          {/* Display error message if exists */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* Username input field */}
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </Form.Group>
            {/* Password input field with visibility toggle */}
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            {/* Submit button */}
            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
