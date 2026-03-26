// src/components/Dashboard.jsx
import UserProfile from './UserProfile';

export default function Dashboard() {
  return (
    <div style={{ marginTop: '20px', padding: '16px', border: '2px dashed #ccc', borderRadius: '10px' }}>
      <h2>User Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <UserProfile username="Alice" age={28} isAdmin={true} />
        <UserProfile username="Bob" age={34} isAdmin={false} />
        {/* Charlie relies on the default value for isAdmin (false) */}
        <UserProfile username="Charlie" age={22} />
      </div>
    </div>
  );
}
