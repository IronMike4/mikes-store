import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ProductPage from "./components/ProductPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import PaymentPage from "./components/PaymentPage";
import { Container } from "react-bootstrap";
import "./styles.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { selectUser, setUser } from "./store/userSlice";

function App() {
  const user = useSelector(selectUser); // Get current user from Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Function to handle user login
  const handleLogin = (username) => {
    dispatch(setUser(username)); // Update Redux store with username
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header username={user.username} /> {/* Pass username to Header */}
        <Container as="main" className="flex-grow-1 mt-5 pt-5">
          <Routes>
            <Route
              path="/"
              element={<LandingPage isLoggedIn={!!user.username} />}
            />{" "}
            {/* Landing page with login status */}
            <Route path="/products" element={<ProductPage />} />{" "}
            {/* Product listing page */}
            <Route path="/products/:id" element={<ProductDetailPage />} />{" "}
            {/* Product details page */}
            <Route path="/cart" element={<CartPage />} />{" "}
            {/* Shopping cart page */}
            <Route path="/register" element={<RegistrationForm />} />{" "}
            {/* Registration form page */}
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />{" "}
            {/* Login form page */}
            <Route path="/payment" element={<PaymentPage />} />{" "}
            {/* Payment page */}
          </Routes>
        </Container>
        <Footer /> {/* Page footer */}
      </div>
    </Router>
  );
}

export default App;
