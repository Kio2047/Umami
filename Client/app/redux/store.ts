import { configureStore } from "@reduxjs/toolkit";
import isAuthenticatedReducer from "./slices/isAuthenticatedSlice";

export const store = configureStore({
  reducer: {
    isAuthenticated: isAuthenticatedReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch