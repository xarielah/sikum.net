import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    currentUser: authReducer,
  },
  devTools: import.meta.env.PROD ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
