import { configureStore } from "@reduxjs/toolkit";
import phonesReducer from "./phonesSlice";

const store = configureStore({
  reducer: {
    phones: phonesReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
