import { createSlice } from "@reduxjs/toolkit";

import { fetchPhones } from "./operations";

export type PhoneState = {
  phones: [];
  error: string | null;
  cart: number;
};
const phonesSlice = createSlice({
  name: "phones",
  initialState: {
    phones: [],
    status: "idle",
    error: null,
    carts: 0,
  },
  reducers: {
    addCart(state, { payload }) {
      state.carts = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhones.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPhones.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.phones = action.payload;
        state.error = null;
      })
      .addCase(fetchPhones.rejected, (state, action) => {
        state.status = "failed";
        state.error = null;
      });
  },
});
export const { addCart } = phonesSlice.actions;
export default phonesSlice.reducer;
