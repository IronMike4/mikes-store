import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    user: userReducer, // Assign userReducer to handle user-related state
    cart: cartReducer, // Assign cartReducer to handle cart-related state
  },
});
