import { RootState } from "./store";
export const getPhones = (state: RootState) => state.phones.phones;
