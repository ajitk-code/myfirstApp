import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleAuthCallback } from '../store/authSlice';

export default function AuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      try {
        await dispatch(handleAuthCallback()).unwrap();
        // Successfully exchanged codes for tokens, route back into the dashboard layout!
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Session Callback Failed', err);
        navigate('/login', { replace: true });
      }
    };
    
    processAuth();
  }, [dispatch, navigate]);

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--idbi-green)' }}>Authenticating...</h2>
        <p style={{ color: '#64748b' }}>Please wait while we verify your merchant credentials securely.</p>
      </div>
    </div>
  );
}
