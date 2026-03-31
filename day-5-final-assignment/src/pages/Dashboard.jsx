import React from 'react';
import { Activity, CreditCard } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">ID : Pabitra.hotai@idbibank.in</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <h3>Total No Of Transaction</h3>
            <p className="metric-value">20.7K</p>
          </div>
          <div className="metric-icon">
            <Activity size={24} />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-info">
            <h3>Total Amount</h3>
            <p className="metric-value">₹ 76,000</p>
          </div>
          <div className="metric-icon">
            <CreditCard size={24} />
          </div>
        </div>
      </div>
      
      {/* Placeholder for graphs or extended dashboard layout */}
      <div className="data-table-container" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
        <p>Interactive Activity Graphs integrating APIs will render here.</p>
      </div>
    </div>
  );
}
