import { createSlice } from "@reduxjs/toolkit";

// Create a slice for the cart with actions and initial state
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array to store cart items
    shippingMethod: "", // Shipping method
  },
  reducers: {
    // Add or update item in the cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...newItem,
          totalPrice: newItem.quantity * newItem.price,
        });
      }
    },
    // Remove item from the cart
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    // Decrease item quantity or remove it if quantity is 1
    decrementItemQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    // Increase item quantity
    incrementItemQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }
    },
    // Clear all items and reset shipping method
    clearCart: (state) => {
      state.items = [];
      state.shippingMethod = "";
    },
    // Set the shipping method
    setShippingMethod: (state, action) => {
      state.shippingMethod = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  addItem,
  removeItem,
  clearCart,
  setShippingMethod,
  decrementItemQuantity,
  incrementItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
