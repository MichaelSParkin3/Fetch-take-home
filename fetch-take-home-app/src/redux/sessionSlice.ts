import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Utility functions for local storage
const saveAuthState = (state: boolean) => {
  localStorage.setItem('isAuthenticated', JSON.stringify(state));
};

const loadAuthState = (): boolean => {
  const savedState = localStorage.getItem('isAuthenticated');
  return savedState ? JSON.parse(savedState) : false;
};

interface SessionState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
}

const initialState: SessionState = {
  isAuthenticated: loadAuthState(),
  user: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      saveAuthState(true);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      saveAuthState(false);
      console.log('logged out');
    }
  }
});

export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;