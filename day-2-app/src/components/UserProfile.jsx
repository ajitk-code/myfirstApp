// src/components/UserProfile.jsx
export default function UserProfile({ username, age, isAdmin = false }) {
  return (
    <div style={{
      border: '1px solid #10b981',
      padding: '12px',
      margin: '8px',
      borderRadius: '8px',
      backgroundColor: '#ecfdf5',
      color: '#065f46',
      minWidth: '150px'
    }}>
      <h4 style={{ marginTop: 0 }}>{username}</h4>
      <p style={{ margin: '4px 0' }}>Age: {age}</p>
      <p style={{ margin: '4px 0', fontWeight: 'bold' }}>
        {isAdmin ? '🛡️ Admin' : '👤 User'}
      </p>
    </div>
  );
}
