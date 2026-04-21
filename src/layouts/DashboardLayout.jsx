import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './DashboardLayout.css';

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: 'speed' },
  { path: '/dashboard/reviews', label: 'Reviews', icon: 'chat_bubble_outline' },
  { path: '/dashboard/departments', label: 'Departments', icon: 'domain' },
  { path: '/dashboard/insights', label: 'Insights', icon: 'bar_chart' },
  { path: '/dashboard/qrcodes', label: 'QR Codes', icon: 'qr_code_2' },
  { path: '/dashboard/settings', label: 'Settings', icon: 'settings' },
];

export default function DashboardLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [toasts, setToasts] = useState([]);
  const sidebarRef = useRef(null);

  const getPageTitle = () => {
    const match = navItems.find(n => n.path === location.pathname);
    return match ? match.label : 'Dashboard';
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (isMobileSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        const toggle = e.target.closest('.mobile-menu-toggle');
        if (!toggle) setIsMobileSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isMobileSidebarOpen]);

  // Global toast listener — only fires for main action buttons (.btn-primary)
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      // Only trigger for primary action buttons
      if (!btn.classList.contains('btn-primary')) return;

      let text = btn.innerText.trim();
      text = text.replace(/^(add|edit|delete|download|print|cancel|arrow_circle_up|arrow_circle_down|save|content_copy|check)\s*/i, '').trim();
      if (!text) text = 'Action Executed';

      const id = Date.now();
      setToasts(prev => [...prev, { id, message: `${text} clicked!` }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const SidebarContent = ({ mobile = false }) => (
    <>
      <div className="sidebar-header">
        {!isSidebarCollapsed || mobile ? (
          <>
            <h2 className="brand-name">Revanta</h2>
            <p className="brand-subtitle">The Grand Accra Hotel</p>
          </>
        ) : (
          <h2 className="brand-name brand-initial">R</h2>
        )}
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined nav-icon">{item.icon}</span>
            {(!isSidebarCollapsed || mobile) && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/signin" className="nav-item">
          <span className="material-symbols-outlined nav-icon">logout</span>
          {(!isSidebarCollapsed || mobile) && <span>Sign Out</span>}
        </Link>
      </div>
    </>
  );

  return (
    <div className="dashboard-container">

      {/* Desktop Sidebar */}
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="mobile-sidebar-backdrop" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside ref={sidebarRef} className={`mobile-sidebar ${isMobileSidebarOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-close-row">
          <button
            className="mobile-sidebar-close"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <SidebarContent mobile />
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            {/* Desktop collapse toggle */}
            <button
              className="menu-toggle desktop-only"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label="Toggle sidebar"
            >
              <span className="material-symbols-outlined">
                {isSidebarCollapsed ? 'menu' : 'menu_open'}
              </span>
            </button>
            {/* Mobile hamburger */}
            <button
              className="menu-toggle mobile-menu-toggle mobile-only"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="header-title">{getPageTitle()}</h1>
          </div>

          <div className="header-right">
            <button onClick={toggleTheme} className="header-theme-toggle" aria-label="Toggle Theme">
              <span className="material-symbols-outlined">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <div className="avatar-circle">GM</div>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>

      {/* Toast Container */}
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
