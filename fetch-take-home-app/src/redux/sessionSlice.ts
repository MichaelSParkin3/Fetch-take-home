import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

const initialState: SessionState = {
  isAuthenticated: false,
  user: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
