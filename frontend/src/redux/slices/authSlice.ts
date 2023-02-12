import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Interface should match Server's session payload.
 */
export type AuthSlice = {
  id: string | null;
  username: string | null;
  email: string | null;
  verified: boolean | null;
  role: string | string[] | null;
  isAuthed: boolean;
};

const initialState: AuthSlice = {
  id: null,
  username: null,
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
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.verified = action.payload.verified;
      state.isAuthed = true;
    },
    logoutUser(state) {
      state.username = initialState.username;
      state.email = initialState.email;
      state.role = initialState.role;
      state.id = initialState.id;
      state.verified = initialState.verified;
      state.isAuthed = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.currentUser;

export default authSlice.reducer;
