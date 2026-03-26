import { useState } from 'react';

export default function SecretMessage() {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Secret Message</h3>
      <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input 
          type="checkbox" 
          checked={showSecret} 
          onChange={(e) => setShowSecret(e.target.checked)} 
        />
        Reveal Secret
      </label>
      {showSecret && (
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '5px' }}>
          <p style={{ margin: 0, color: '#b91c1c', fontWeight: 'bold' }}>
            React conditional rendering is powerful! 🤫
          </p>
        </div>
      )}
    </div>
  );
}
