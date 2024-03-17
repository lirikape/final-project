import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPhones = createAsyncThunk("phones/fetchPhones", async () => {
  const response = await axios.get(
    "https://6571c86ed61ba6fcc0138e16.mockapi.io/car-rental/MobilePhones"
  );
  return response.data;
});

// export const fetchPhonesOperation = () => {
//   return fetchPhones;
// };
