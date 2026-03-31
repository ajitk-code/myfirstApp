export const authConfig = {
  authority: import.meta.env.VITE_AUTH_ISSUER,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  post_logout_redirect_uri: 'http://localhost:5173/login',
  response_type: 'code',
  scope: 'adminName user_name goauthentik.io/api authorities bankCode email profile openid offline_access created privileges',
  loadUserInfo: false, 
  
  metadata: {
    issuer: import.meta.env.VITE_AUTH_ISSUER,
    authorization_endpoint: import.meta.env.VITE_AUTHORIZATION_ENDPOINT,
    token_endpoint: import.meta.env.VITE_TOKEN_ENDPOINT,
    end_session_endpoint: import.meta.env.VITE_END_SESSION_ENDPOINT,
  }
};
