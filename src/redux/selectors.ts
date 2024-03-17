import { RootState } from "./store";
export const getPhones = (state: RootState) => state.phones.phones;
export const getCarts = (state: RootState) => state.phones.carts;
