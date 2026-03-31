import React, { useState } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TransactionReports() {
  const [filterType, setFilterType] = useState(null); // 'today', 'monthly', 'custom' or null
  
  // API State Payloads
  const [subscriptionId, setSubscriptionId] = useState(''); // Stores queryId for polling
  const [reportData, setReportData] = useState([]); // Stores dynamic transaction data
  const [isFetchingStatus, setIsFetchingStatus] = useState(false); // Status polling
  const [isReporting, setIsReporting] = useState(false); // Initial submission loading
  const [monthlySelection, setMonthlySelection] = useState('Last 3 Month Report');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // API Integration function
  const fetchTransactions = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    let finalStartDate = '';
    let finalEndDate = '';

    // Helper to format Date object to DD/MM/YYYY
    const formatDate = (date) => {
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();
      const year = date.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [day, month, year].join('/');
    };

    if (filterType === 'today') {
      const today = new Date();
      finalStartDate = formatDate(today);
      finalEndDate = formatDate(today);
    } else if (filterType === 'monthly') {
      const match = monthlySelection.match(/Last (\d+) Month/);
      const months = match ? parseInt(match[1], 10) : 1;
      
      const today = new Date();
      const endD = new Date(today);
      endD.setDate(today.getDate() - 1); // n - 1
      
      const startD = new Date(endD);
      startD.setDate(endD.getDate() - (months * 30)); // n - 1 - (30 * months)
      
      finalEndDate = formatDate(endD);
      finalStartDate = formatDate(startD);
    } else if (filterType === 'custom') {
      if (!startDate || !endDate) return alert('Please select both start and end dates');
      // Input date format is YYYY-MM-DD
      const [sy, sm, sd] = startDate.split('-');
      finalStartDate = `${sd}/${sm}/${sy}`;
      const [ey, em, ed] = endDate.split('-');
      finalEndDate = `${ed}/${em}/${ey}`;
    }

    const payload = {
      startDate: finalStartDate,
      endDate: finalEndDate,
      vpa_id: "sahil1.iserveu@idbi",
      mode: "excel"
    };

    console.log('Executing API Call with payload:', payload);

    setIsReporting(true);
    setReportData([]);
    setSubscriptionId('');

    try {
      const res = await fetch('https://api-dev-stage.iserveu.online/idbi/sb/reports/querysubmit_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      console.log('Query Submission Response:', data);

      if (data && data.query_id) {
        setSubscriptionId(data.query_id);
        setIsFetchingStatus(true); // Initiate polling
      } else {
        alert('Report query submitted, but no query_id returned.');
        setIsReporting(false);
      }
    } catch (err) {
      console.error('API Error:', err);
      alert('Failed to execute report query.');
      setIsReporting(false);
    }
  };

  // Status Polling Effect (Checks until READY)
  React.useEffect(() => {
    let intervalId;
    
    if (isFetchingStatus && subscriptionId) {
      const checkStatus = async () => {
        try {
          const res = await fetch(`https://api-dev-stage.iserveu.online/idbi/sb/reports/get_report_status/${subscriptionId}`);
          const result = await res.json();
          console.log('Report Status Response:', result);

          // We check the 'data.status' field for the "READY" state
          if (result && result.status === 'SUCCESS' && result.data) {
            if (result.data.status === 'READY') {
              setReportData([result.data]);
              setIsFetchingStatus(false); 
              setIsReporting(false); // Complete loading
            } else {
              console.log('Report still pending (READY not yet reached)...');
            }
          } else if (result && result.status === 'FAILED') {
            setIsFetchingStatus(false);
            setIsReporting(false);
            console.error('Report Generation Failed');
          }
        } catch (err) {
          console.error('Polling Error:', err);
          setIsFetchingStatus(false);
          setIsReporting(false);
        }
      };

      // Poll every 3 seconds
      intervalId = setInterval(checkStatus, 3000);
      checkStatus(); // Initial call
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isFetchingStatus, subscriptionId]);

  // Auto-fetch Today Report on selection
  React.useEffect(() => {
    if (filterType === 'today') {
      fetchTransactions();
    }
  }, [filterType]);

  // Clear data when changing filters
  React.useEffect(() => {
    // We only clear if it's not a 'today' fetch (which is handled by its own effect/function)
    // Actually, it's safer to clear everything whenever the type changes to a new selection
    setReportData([]);
    setSubscriptionId('');
    setIsFetchingStatus(false);
  }, [filterType]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Loading Screen Overlay */}
      {isReporting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="loading-spinner" style={{ 
            width: '50px', 
            height: '50px', 
            border: '5px solid #f3f3f3', 
            borderTop: '5px solid var(--idbi-green)', 
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '1rem', color: 'var(--idbi-green)', fontWeight: 600 }}>
            Generating your report...
          </p>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
            Please wait while we prepare the transaction data.
          </p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="page-header">
        <h1 className="page-title">Transaction Reports</h1>
      </div>

      <div className="data-table-container">
        
        {/* Dynamic Report Filter Section */}
        <div style={{ padding: '1.5rem', borderBottom: filterType ? '1px solid var(--border-color)' : 'none' }}>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 1rem 0' }}>Select a Report Filter</p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontSize: '0.95rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="filter" 
                checked={filterType === 'today'} 
                onChange={() => setFilterType('today')} 
              /> Today
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="filter" 
                checked={filterType === 'monthly'} 
                onChange={() => setFilterType('monthly')} 
              /> Monthly
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="filter" 
                checked={filterType === 'custom'} 
                onChange={() => setFilterType('custom')} 
              /> Custom Range
            </label>
          </div>

          {/* Conditional Dropdowns based on Radio Selection */}
          <div style={{ 
            marginTop: filterType && filterType !== 'today' ? '1.5rem' : '0', 
            maxHeight: filterType && filterType !== 'today' ? '200px' : '0',
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out'
          }}>
            
            {filterType === 'monthly' && (
              <form onSubmit={fetchTransactions} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Monthly</span>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <select 
                    className="search-input" 
                    value={monthlySelection} 
                    onChange={e => setMonthlySelection(e.target.value)}
                    style={{ width: '250px', cursor: 'pointer', appearance: 'auto' }}
                  >
                    <option value="Last 1 Month Report">Last 1 Month Report</option>
                    <option value="Last 2 Month Report">Last 2 Month Report</option>
                    <option value="Last 3 Month Report">Last 3 Month Report</option>
                    <option value="Last 4 Month Report">Last 4 Month Report</option>
                    <option value="Last 5 Month Report">Last 5 Month Report</option>
                    <option value="Last 6 Month Report">Last 6 Month Report</option>
                    <option value="Last 7 Month Report">Last 7 Month Report</option>
                    <option value="Last 8 Month Report">Last 8 Month Report</option>
                    <option value="Last 9 Month Report">Last 9 Month Report</option>
                    <option value="Last 10 Month Report">Last 10 Month Report</option>
                  </select>
                  <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--idbi-green)' }}>Submit</button>
                </div>
              </form>
            )}

            {filterType === 'custom' && (
              <form onSubmit={fetchTransactions} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Start Date</span>
                  <input 
                    type="date" 
                    className="search-input" 
                    value={startDate} 
                    onChange={e => setStartDate(e.target.value)} 
                    required 
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#64748b' }}>End Date</span>
                  <input 
                    type="date" 
                    className="search-input" 
                    value={endDate} 
                    onChange={e => setEndDate(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--idbi-green)' }}>Submit</button>
              </form>
            )}

          </div>
        </div>

        {/* Existing Table Search & Controls - Only show after filter is selected */}
        {filterType && (
          <>
            <div className="table-controls" style={{ borderBottom: 'none' }}>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '10px', top: '12px', color: '#94a3b8' }} />
                <input type="text" placeholder="Search here..." className="search-input" style={{ paddingLeft: '2.25rem', width: '300px' }} />
              </div>
              <button className="download-btn" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                backgroundColor: 'var(--idbi-green)',
                color: 'white',
                padding: '0.6rem 1rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}>
                <Download size={18} /> Download All
              </button>
            </div>

            {/* Scaled Figma Data Table */}
            <table style={{ borderTop: '1px solid var(--border-color)' }}>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>S. No. ↕</th>
                  <th>Transaction ID ↕</th>
                  <th>Amount ↕</th>
                  <th>Date ↕</th>
                  <th>Status ↕</th>
                </tr>
              </thead>
              <tbody>
                {isFetchingStatus ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>
                      <div style={{ color: 'var(--idbi-green)', fontWeight: 600 }}>Fetching live report data...</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Polling queryId: {subscriptionId}</div>
                    </td>
                  </tr>
                ) : reportData.length > 0 ? (
                  reportData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.query_id || 'N/A'}</td>
                      <td>NA</td>
                      <td>{item.created_at || 'N/A'}</td>
                      <td>
                        {item.signed_url ? (
                          <a 
                            href={item.signed_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="status-badge status-success"
                            style={{ textDecoration: 'none', display: 'inline-block' }}
                          >
                            {item.status || 'READY'} (Download)
                          </a>
                        ) : (
                          <span className={`status-badge ${
                            (item.status === 'READY' || item.status === 'SUCCESS') ? 'status-success' : 'status-failed'
                          }`}>
                            {item.status || 'PENDING'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                      No transaction records found for this period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Footer Pagination Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderTop: '1px solid var(--border-color)', color: '#64748b', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span>Row per page</span>
                <select className="search-input" style={{ width: '70px', padding: '0.4rem', color: '#1e293b' }}>
                  <option>10</option>
                  <option>20</option>
                </select>
                <span style={{ marginLeft: '1rem' }}>Go to</span>
                <input type="text" defaultValue="9" className="search-input" style={{ width: '50px', padding: '0.4rem', textAlign: 'center', color: '#1e293b' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem' }} disabled><ChevronLeft size={16} /></button>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem 0.6rem', color: '#1e293b' }}>1</button>
                <span style={{ margin: '0 0.5rem' }}>...</span>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem 0.6rem', color: '#1e293b' }}>4</button>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem 0.6rem', color: '#1e293b' }}>5</button>
                <button className="icon-btn" style={{ border: '1px solid #1d4ed8', borderRadius: '4px', padding: '0.25rem 0.6rem', color: '#1d4ed8', backgroundColor: '#eff6ff' }}>6</button>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem 0.6rem', color: '#1e293b' }}>7</button>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem 0.6rem', color: '#1e293b' }}>8</button>
                <span style={{ margin: '0 0.5rem' }}>...</span>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem 0.6rem', color: '#1e293b' }}>50</button>
                <button className="icon-btn" style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.25rem' }}><ChevronRight size={16} /></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
