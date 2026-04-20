import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './DashboardLayout.css';

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [toasts, setToasts] = useState([]);

  // Global button click listener to simulate functionality
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const btn = e.target.closest('button');
      if (btn && !btn.classList.contains('menu-toggle') && !btn.classList.contains('header-theme-toggle')) {
        let text = btn.innerText.trim();
        if (!text) text = 'Action Executed';
        
        // Exclude some common icon text if they leak through
        text = text.replace(/^(add|edit|delete|download|print|cancel|arrow_circle_up|arrow_circle_down|save|content_copy|check)\s*/i, '').trim();
        if (!text) text = 'Action Executed';

        const id = Date.now();
        setToasts(prev => [...prev, { id, message: `${text} clicked!` }]);
        
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="dashboard-container">
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2 className="brand-name">{isSidebarCollapsed ? 'R' : 'Revanta'}</h2>
          {!isSidebarCollapsed && <p className="brand-subtitle">The Grand Accra Hotel</p>}
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">speed</span>
            <span>Overview</span>
          </Link>
          <Link to="/dashboard/reviews" className={`nav-item ${location.pathname === '/dashboard/reviews' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">chat_bubble_outline</span>
            <span>Reviews</span>
          </Link>
          <Link to="/dashboard/departments" className={`nav-item ${location.pathname === '/dashboard/departments' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">domain</span>
            <span>Departments</span>
          </Link>
          <Link to="/dashboard/insights" className={`nav-item ${location.pathname === '/dashboard/insights' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">bar_chart</span>
            <span>Insights</span>
          </Link>
          <Link to="/dashboard/qrcodes" className={`nav-item ${location.pathname === '/dashboard/qrcodes' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">qr_code_2</span>
            <span>QR Codes</span>
          </Link>
          <Link to="/dashboard/settings" className={`nav-item ${location.pathname === '/dashboard/settings' ? 'active' : ''}`}>
            <span className="material-symbols-outlined nav-icon">settings</span>
            <span>Settings</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/signin" className="nav-item">
            <span className="material-symbols-outlined nav-icon">logout</span>
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
              <span className="material-symbols-outlined">
                {isSidebarCollapsed ? 'menu' : 'menu_open'}
              </span>
            </button>
            <h1 className="header-title">Overview</h1>
          </div>
          <div className="header-right">
            <button 
              onClick={toggleTheme} 
              className="header-theme-toggle"
              aria-label="Toggle Theme"
            >
              <span className="material-symbols-outlined">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <div className="avatar-circle">
              GM
            </div>
          </div>
        </header>
        
        <div className="page-content">
          <Outlet />
        </div>
      </main>

      {/* Global Toasts Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast-notification">
            <span className="material-symbols-outlined">check_circle</span>
            {toast.message}
          </div>
        ))}
      </div>

    </div>
  );
}
