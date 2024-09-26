import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Slices/UserSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
