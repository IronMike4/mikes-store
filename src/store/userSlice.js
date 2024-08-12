import { createSlice } from "@reduxjs/toolkit";

// Define user slice
export const userSlice = createSlice({
  name: "user", // Slice name
  initialState: {
    username: "", // Initial username state
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload; // Update username
    },
    clearUser: (state) => {
      state.username = ""; // Clear username
    },
  },
});

// Export actions and selector
export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;

// Export reducer
export default userSlice.reducer;
