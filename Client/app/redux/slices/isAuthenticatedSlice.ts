import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = false;

export const isAuthenticatedSlice = createSlice({
  name: "is authenticated",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state = action.payload;
    }
  }
});

const { setAuthentication } = isAuthenticatedSlice.actions;
export const selectIsAuthenticated = (state: RootState) => state.isAuthenticated;
export default isAuthenticatedSlice.reducer;