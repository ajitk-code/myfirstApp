import React from 'react';
import { PhoneCall, Mail } from 'lucide-react';

export default function HelpSupport() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Help & Support</h1>
        <p className="page-subtitle">We are here to assist you 24x7.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card" style={{ flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="metric-icon"><PhoneCall size={24} /></div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>Toll Free Number</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Available Monday - Saturday</p>
            </div>
          </div>
          <p className="metric-value" style={{ fontSize: '1.5rem' }}>1800-209-4324</p>
        </div>

        <div className="metric-card" style={{ flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="metric-icon"><Mail size={24} /></div>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>Email Support</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Response within 24 hours</p>
            </div>
          </div>
          <p className="metric-value" style={{ fontSize: '1.25rem' }}>customercare@idbi.co.in</p>
        </div>
      </div>

      <div className="data-table-container" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--idbi-green)' }}>Raise a Support Ticket</h3>
        <form onSubmit={(e) => { e.preventDefault(); alert('Ticket Submitted'); }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Subject</label>
            <input type="text" className="search-input" style={{ width: '100%', maxWidth: '400px' }} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
            <textarea className="search-input" style={{ width: '100%', minHeight: '100px', resize: 'vertical' }} required></textarea>
          </div>
          <button className="btn-primary" type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
