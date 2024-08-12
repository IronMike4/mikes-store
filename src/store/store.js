import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer, // Set up the cart reducer to manage cart-related state
    user: userReducer, // Set up the user reducer to manage user-related state
  },
});

export default store;
