import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Search Bar</h3>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Type here..."
        style={{ padding: '8px', width: '250px' }}
      />
      <div style={{ marginTop: '10px' }}>
        <label style={{ fontWeight: 'bold', display: 'block' }}>
          Uppercase Result:
        </label>
        <span style={{ fontSize: '18px', color: '#007bff' }}>
          {query.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
