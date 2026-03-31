import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../services/authService';

export const performLogin = createAsyncThunk(
  'auth/login',
  async (_, { rejectWithValue }) => {
    try {
      // Initiates the browser redirect to Authentik IDP
      await authService.login();
      // The browser navigates away, so code below won't strictly execute on this page load.
      // The actual auth success is handled on the /redirected callback route.
    } catch (err) {
      console.error('[Login] Error initiating login:', err);
      return rejectWithValue(err.message || 'Login initiation failed');
    }
  }
);

export const handleAuthCallback = createAsyncThunk(
  'auth/handleCallback',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.handleCallback();
      return {
        accessToken: user.access_token,
        idToken: user.id_token,
        profile: user.profile
      };
    } catch (err) {
      console.error('[Login] Callback processing failed:', err);
      return rejectWithValue(err.message || 'Callback failed');
    }
  }
);

export const performLogout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('[Logout] Logout failed:', err);
      return rejectWithValue(err.message || 'Logout failed');
    }
  }
);

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  accessToken: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLocal: (state, action) => {
      // Used to hydrate state from sessionStorage on page reload
      state.isAuthenticated = true;
      state.userProfile = action.payload.profile;
      state.accessToken = action.payload.accessToken;
    }
  },
  extraReducers: (builder) => {
    // Callback resolution
    builder.addCase(handleAuthCallback.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(handleAuthCallback.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.userProfile = action.payload.profile;
    });
    builder.addCase(handleAuthCallback.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Logout resolution
    builder.addCase(performLogout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.userProfile = null;
      state.accessToken = null;
    });
  }
});

export const { setAuthLocal } = authSlice.actions;
export default authSlice.reducer;
