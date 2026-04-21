import { useState } from 'react';
import './DashboardQRCodes.css';

const branches = [
  {
    id: 'main',
    name: 'Main Branch',
    location: 'Airport Residential, Accra',
    url: `${window.location.origin}/feedback/main`,
    displayUrl: 'feedback.revanta.app/main',
    scans: 312,
    reviews: 28,
    rate: 9.0
  },
  {
    id: 'cantonments',
    name: 'Cantonments Branch',
    location: 'Cantonments, Accra',
    url: `${window.location.origin}/feedback/cantonments`,
    displayUrl: 'feedback.revanta.app/cantonments',
    scans: 198,
    reviews: 12,
    rate: 6.1
  },
  {
    id: 'osu',
    name: 'Osu Branch',
    location: 'Osu, Accra',
    url: `${window.location.origin}/feedback/osu`,
    displayUrl: 'feedback.revanta.app/osu',
    scans: 87,
    reviews: 7,
    rate: 8.0
  }
];

export default function DashboardQRCodes() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="dashboard-qrcodes">
      
      {/* Header Section */}
      <div className="page-header">
        <h2 className="page-title">QR Codes</h2>
        <p className="page-subtitle">Each branch has a unique QR code linked to its feedback URL. Guests scan to leave a review.</p>
      </div>

      {/* QR Code Cards Grid */}
      <div className="qr-grid">
        {branches.map(branch => (
          <div className="content-card qr-card" key={branch.id}>
            
            <div className="qr-card-header">
              <h3 className="branch-name">{branch.name}</h3>
              <span className="branch-location">{branch.location}</span>
            </div>

            <div className="qr-image-wrapper">
              <div className="qr-image-box">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(branch.url)}&color=0f172a`} 
                  alt={`QR Code for ${branch.name}`} 
                  className="qr-img"
                />
              </div>
            </div>

            <div className="qr-url-box">
              <span className="material-symbols-outlined url-icon">link</span>
              <span className="url-text">{branch.displayUrl}</span>
              <button 
                className="copy-btn" 
                onClick={() => handleCopy(branch.id, branch.url)}
              >
                <span className="material-symbols-outlined">
                  {copiedId === branch.id ? 'check' : 'content_copy'}
                </span>
                {copiedId === branch.id ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="qr-stats-row">
              <div className="qr-stat">
                <span className="stat-value">{branch.scans}</span>
                <span className="stat-label">Scans</span>
              </div>
              <div className="stat-divider"></div>
              <div className="qr-stat">
                <span className="stat-value">{branch.reviews}</span>
                <span className="stat-label">Reviews</span>
              </div>
              <div className="stat-divider"></div>
              <div className="qr-stat text-teal">
                <span className="stat-value">{branch.rate.toFixed(1)}%</span>
                <span className="stat-label">Rate</span>
              </div>
            </div>

            <div className="completion-bar-container">
              <div className="completion-bar-bg">
                <div 
                  className="completion-bar-fill" 
                  style={{ width: `${branch.rate}%` }}
                ></div>
              </div>
              <div className="completion-bar-labels">
                <span>Completion rate</span>
                <span>{branch.rate.toFixed(1)}%</span>
              </div>
            </div>

            <div className="qr-actions">
              <button className="btn-primary">
                <span className="material-symbols-outlined">download</span>
                Download
              </button>
              <button className="btn-secondary">
                <span className="material-symbols-outlined">refresh</span>
                Refresh
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <div className="info-icon">
          <span className="material-symbols-outlined">info</span>
        </div>
        <div className="info-content">
          <h4 className="info-title">How QR Codes Work</h4>
          <p className="info-text">
            Each QR code encodes a unique branch feedback URL. When guests scan it, they're taken directly to the review form for that branch. Download the PNG to print on receipts, or use Print A5 to generate a ready-to-display card for your lobby.
          </p>
        </div>
      </div>

    </div>
  );
}
