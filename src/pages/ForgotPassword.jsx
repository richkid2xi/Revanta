import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="auth-card forgot-password-card">
        {step === 1 ? (
          <>
            <h2>Reset your password</h2>
            <p className="subtitle">Enter your email and we'll send a reset link.</p>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hotel.com" 
                  required 
                />
              </div>
              
              <button type="submit" className="btn-primary reset-btn">
                Send Reset Link
              </button>

              <div className="form-actions-centered">
                <Link to="/signin" className="text-link back-link">
                  &larr; Back to Sign In
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="inbox-check-container">
            <div className="inbox-icon-wrapper">
              <span className="material-symbols-outlined">forward_to_inbox</span>
            </div>
            <h2 className="inbox-title">Check your inbox</h2>
            <p className="subtitle inbox-subtitle">
              We sent a reset link to <span className="email-highlight">{email}</span>
            </p>
            
            <button 
              type="button" 
              className="text-link resend-link"
              onClick={() => alert("Reset link resent!")}
            >
              Resend link
            </button>
            
            <button type="button" className="btn-primary" onClick={() => setStep(1)} style={{ width: '100%', marginTop: '16px' }}>
              Enter New Password
            </button>
            
            <div className="form-actions-centered">
              <Link to="/signin" className="text-link back-link">
                &larr; Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
