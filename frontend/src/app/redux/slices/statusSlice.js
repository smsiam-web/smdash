import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const statusCountSlice = createSlice({
  name: "statusCount",
  initialState,
  reducers: {
    setStatusCount: (state, action) => {
      state.items = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStatusCount } = statusCountSlice.actions;

export const selectStatusCount = (state) => state.statusCount.items;

export default statusCountSlice.reducer;
