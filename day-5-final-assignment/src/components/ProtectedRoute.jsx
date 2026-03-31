import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authService } from '../services/authService';
import { setAuthLocal, performLogin } from '../store/authSlice';

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // On app mount/refresh, check if oidc-client-ts still holds a valid token
    authService.getUser().then((user) => {
      if (user && !user.expired) {
        dispatch(setAuthLocal({ profile: user.profile, accessToken: user.access_token }));
        setIsChecking(false);
      } else {
        // Redirect to our branded /login page
        setIsChecking(false);
        navigate('/login', { replace: true });
      }
    });
  }, [dispatch, navigate]);

  if (isChecking || !isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--idbi-green)', marginBottom: '1rem' }}>Redirecting...</h2>
        <p style={{ color: '#64748b' }}>Transferring you directly to Authentik. Please wait.</p>
      </div>
    );
  }

  // Session exists! Render the App Layout
  return <Outlet />;
}
