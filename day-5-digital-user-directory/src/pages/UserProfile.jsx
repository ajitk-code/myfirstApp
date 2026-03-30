import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error('User not found or network error');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (loading) return <div className="state-message">Loading profile...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!user) return <div className="error-message">User not found.</div>;

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=200&rounded=true`;

  return (
    <div className="profile-page">
      <Link to="/" className="back-link">
        &larr; Back to Directory
      </Link>
      
      <div className="profile-card">
        <div className="profile-header">
          <img src={avatarUrl} alt={user.name} className="profile-avatar" />
          <div className="profile-title">
            <h2>{user.name}</h2>
            <p className="username">@{user.username}</p>
          </div>
        </div>
        
        <div className="profile-body">
          <div className="detail-section">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></p>
          </div>
          
          <div className="detail-section">
            <h3>Company</h3>
            <p><strong>Name:</strong> {user.company.name}</p>
            <p><strong>Catchphrase:</strong> <i>{user.company.catchPhrase}</i></p>
            <p><strong>BS:</strong> {user.company.bs}</p>
          </div>
          
          <div className="detail-section">
            <h3>Address</h3>
            <p>{user.address.suite} {user.address.street}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
