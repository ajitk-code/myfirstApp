import { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="login-wrapper">
      <div className={`login-glass-card ${isSubmitted ? 'submitted' : ''}`}>
        <div className="card-header">
          <h2>{isSubmitted ? 'Access Granted' : 'Welcome Back'}</h2>
          <p>{isSubmitted ? 'You have successfully logged in.' : 'Please enter your details to sign in.'}</p>
        </div>

        {isSubmitted && (
          <div className="success-message">
            <div className="checkmark-circle">
              <div className="checkmark"></div>
            </div>
            <h3>Welcome!</h3>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isSubmitted}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isSubmitted}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={isSubmitted || !email || !password}
          >
            {isSubmitted ? 'Logged In' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
