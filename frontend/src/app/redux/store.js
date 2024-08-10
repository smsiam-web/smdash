// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Import the userSlice

export const store = configureStore({
  reducer: {
    user: userReducer, // Add userSlice to the store
  },
});
