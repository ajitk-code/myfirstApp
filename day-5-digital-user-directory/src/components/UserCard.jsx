import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=100&rounded=true`;

  return (
    <div className="user-card">
      <div className="card-avatar">
        <img src={avatarUrl} alt={user.name} />
      </div>
      <div className="card-info">
        <h3>{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <p className="user-company">{user.company.name}</p>
        
        <Link to={`/user/${user.id}`} className="view-btn">
          View Profile
        </Link>
      </div>
    </div>
  );
}
