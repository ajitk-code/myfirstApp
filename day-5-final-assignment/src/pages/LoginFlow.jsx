import React from 'react';
import { useDispatch } from 'react-redux';
import { performLogin } from '../store/authSlice';
import AuthentikLogo from '../components/AuthentikLogo';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginFlow() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(performLogin());
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <div className="idbi-icon-circle" style={{ margin: '0 auto 1rem', width: '48px', height: '48px' }}>
            <div className="idbi-icon-inner" style={{ width: '20px', height: '20px' }}></div>
          </div>
          <h1>IDBI Merchant</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Secure Merchant Portal Access
          </p>
        </div>

        <div style={{ margin: '2.5rem 0', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            padding: '0.75rem 1.25rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            marginBottom: '2rem'
          }}>
            <ShieldCheck size={20} color="var(--idbi-green)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-main)' }}>
              Enterprise Grade Security Enabled
            </span>
          </div>

          <button 
            className="login-btn" 
            onClick={handleLogin}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 135, 113, 0.2)' 
            }}
          >
            <AuthentikLogo size={22} />
            <span>Login with Authentik</span>
            <ArrowRight size={18} style={{ marginLeft: 'auto' }} />
          </button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <p>By logging in, you agree to IDBI Bank Terms & Conditions</p>
          <p style={{ marginTop: '0.5rem' }}>© 2024 IDBI Merchant Services. Powered by Authentik.</p>
        </div>
      </div>
    </div>
  );
}
