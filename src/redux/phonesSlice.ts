import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPhones = createAsyncThunk("phones/fetchPhones", async () => {
  const response = await axios.get(
    "https://6571c86ed61ba6fcc0138e16.mockapi.io/car-rental/MobilePhones"
  );
  return response.data;
});

export type PhoneState = {
  phones: [];
  error: string | null;
};
const phonesSlice = createSlice({
  name: "phones",
  initialState: {
    phones: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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

export default phonesSlice.reducer;
