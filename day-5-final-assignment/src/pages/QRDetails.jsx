import React, { useState } from 'react';

export default function QRDetails() {
  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState('500');
  const [remarks, setRemarks] = useState('');
  const [displayAmount, setDisplayAmount] = useState('500');

  const handleGenerate = () => {
    setDisplayAmount(amount);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">QR Details</h1>
      </div>

      <div className="metrics-grid">
        <div className="metric-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
          <h3>Static QR</h3>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=IDBI_STATIC_QR" alt="Static QR" style={{ borderRadius: '8px' }} />
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Standard merchant receiving QR</p>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--idbi-green)' }}>Download Static QR</button>
        </div>

        <div className="metric-card" style={{ flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3>Dynamic QR Generation</h3>
          </div>
          
          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Enter Amount (₹)</label>
            <input 
              type="number" 
              className="search-input" 
              style={{ width: '100%', marginBottom: '1rem' }} 
              placeholder="e.g. 500" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Remarks (Optional)</label>
            <input 
              type="text" 
              className="search-input" 
              style={{ width: '100%', marginBottom: '1rem' }} 
              placeholder="Invoice 102" 
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--idbi-green)' }} onClick={handleGenerate}>
              Generate Dynamic QR
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="metric-card" style={{ flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '300px' }}>
            <h3 style={{ margin: 0 }}>Scan to Pay ₹{displayAmount}</h3>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=IDBI_DYNAMIC_PAYMENT_${displayAmount}_${encodeURIComponent(remarks)}`} 
              alt="Dynamic QR" 
              style={{ borderRadius: '8px' }} 
            />
            <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>{remarks ? `Remarks: ${remarks}` : 'Direct payment QR'}</p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', backgroundColor: '#ef4444' }} onClick={() => setModalOpen(false)}>
              Close Terminal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
