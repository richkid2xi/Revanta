import { Outlet } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './AuthLayout.css';

export default function AuthLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="auth-layout">
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <span className="material-symbols-outlined">
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
      <div className="auth-content">
        <header className="auth-header">
          <h1>Revanta</h1>
          <p>Hotel Guest Feedback & Analytics</p>
        </header>
        <main className="auth-card-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
