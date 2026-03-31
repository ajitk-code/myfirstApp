import React from 'react';

export default function LanguageUpdate() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Language Update</h1>
        <p className="page-subtitle">Select your preferred localized portal language.</p>
      </div>

      <div className="data-table-container" style={{ padding: '2rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--idbi-green)' }}>Available Languages</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="radio" name="lang" defaultChecked /> English (Default)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="radio" name="lang" /> Hindi (हिंदी)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input type="radio" name="lang" /> Marathi (मराठी)
          </label>
        </div>
        
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <button className="btn-primary">Save Language Preferences</button>
        </div>
      </div>
    </div>
  );
}
