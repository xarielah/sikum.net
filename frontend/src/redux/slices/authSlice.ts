import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Interface should match Server's session payload.
 */
export type AuthSlice = {
  id: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  verified: boolean | null;
  role: string | string[] | null;
  isAuthed: boolean;
};

const initialState: AuthSlice = {
  id: null,
  username: null,
  name: null,
  email: null,
  verified: null,
  role: null,
  isAuthed: false,
};

const authSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthSlice>) {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.verified = action.payload.verified;
      state.isAuthed = true;
    },
    logoutUser(state) {
      state.username = initialState.username;
      state.email = initialState.email;
      state.name = initialState.name;
      state.role = initialState.role;
      state.id = initialState.id;
      state.verified = initialState.verified;
      state.isAuthed = false;
    },
    verifyUserAsActive(state) {
      if (!state.verified) {
        state.verified = true;
      }
    },
  },
});

export const { setUser, logoutUser, verifyUserAsActive } = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.currentUser;

export default authSlice.reducer;
