import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { authConfig } from '../config/authConfig';

// Initialize the OIDC User Manager to utilize standard browser Session Storage
const userManager = new UserManager({
  ...authConfig,
  userStore: new WebStorageStateStore({ store: window.sessionStorage })
});

export const authService = {
  // Triggers the browser redirect to Authentik
  login: () => {
    return userManager.signinRedirect({ prompt: 'login' });
  },

  // Handles the callback from Authentik at /redirected
  handleCallback: () => {
    return userManager.signinCallback();
  },

  // Logs the user out locally and globally
  logout: () => {
    return userManager.signoutRedirect();
  },

  // Fetches the current user state
  getUser: () => {
    return userManager.getUser();
  },
  
  // Clean up stale states
  clearStaleState: () => {
    return userManager.clearStaleState();
  }
};
