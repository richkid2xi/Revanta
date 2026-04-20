import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    navigate('/dashboard');
  };

  return (
    <div className="auth-card">
      <h2>Sign in to your account</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@hotel.com" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <div className="input-with-icon">
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="••••••••" 
            />
            <button 
              type="button" 
              className="icon-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="material-symbols-outlined">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        <div className="form-actions">
          <label className="checkbox-container">
            <input type="checkbox" />
            <span className="checkmark"></span>
            Remember me
          </label>
          
          <Link to="/forgot-password" className="text-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="btn-primary">
          Sign In
        </button>
        
        <button type="button" className="btn-outline">
          Demo Account
        </button>
      </form>

      <div className="auth-footer">
        No account? <Link to="/signup" className="text-link">Sign up free</Link>
      </div>
    </div>
  );
}
