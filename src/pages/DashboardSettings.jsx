import { useState, useRef } from 'react';
import './DashboardSettings.css';

const PLAN_DETAILS = {
  premium: { name: 'Premium Plan', price: 450, features: 'Unlimited reviews · Advanced analytics · Priority support' },
  basic: { name: 'Basic Plan', price: 200, features: 'Up to 100 reviews/mo · Standard analytics · Email support' },
  enterprise: { name: 'Enterprise Plan', price: 950, features: 'Unlimited everything · Dedicated manager · SLA guarantee' },
};

function ConfirmModal({ type, onConfirm, onCancel }) {
  if (!type) return null;

  const config = {
    upgrade: {
      title: 'Upgrade to Enterprise Plan',
      icon: 'arrow_circle_up',
      iconColor: '#10b981',
      message: 'You are about to upgrade your subscription to the Enterprise Plan at GH₵950/branch.',
      warning: 'This change will take effect immediately and you will be billed the prorated difference. There are no refunds for partial billing periods.',
      confirmText: 'Confirm Upgrade',
      confirmClass: 'confirm-btn-green',
    },
    downgrade: {
      title: 'Downgrade to Basic Plan',
      icon: 'arrow_circle_down',
      iconColor: '#8b5cf6',
      message: 'You are about to downgrade your subscription to the Basic Plan at GH₵200/branch.',
      warning: 'This change will take effect immediately. Some features may become unavailable and there are no refunds for the unused portion of your current plan.',
      confirmText: 'Confirm Downgrade',
      confirmClass: 'confirm-btn-purple',
    },
    cancel: {
      title: 'Cancel Subscription',
      icon: 'cancel',
      iconColor: '#ef4444',
      message: 'You are about to cancel your Revanta subscription.',
      warning: 'This action takes effect immediately. You will have 72 hours of continued access before your account is locked. There are absolutely no refunds for unused time. This cannot be undone.',
      confirmText: 'Yes, Cancel My Plan',
      confirmClass: 'confirm-btn-red',
    },
  };

  const c = config[type];

  return (
    <div className="settings-modal-overlay" onClick={onCancel}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-modal-header">
          <div className="settings-modal-icon" style={{ color: c.iconColor, borderColor: c.iconColor }}>
            <span className="material-symbols-outlined">{c.icon}</span>
          </div>
          <h3 className="settings-modal-title">{c.title}</h3>
        </div>
        <p className="settings-modal-message">{c.message}</p>
        <div className="settings-modal-warning">
          <span className="material-symbols-outlined warning-icon">warning</span>
          <p>{c.warning}</p>
        </div>
        <div className="settings-modal-actions">
          <button className="settings-cancel-action" onClick={onCancel}>Go Back</button>
          <button className={`settings-confirm-action ${c.confirmClass}`} onClick={onConfirm}>
            {c.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardSettings() {
  const [sliderValue, setSliderValue] = useState(3.5);
  const [logoPreview, setLogoPreview] = useState(null);
  const [hotelType, setHotelType] = useState('luxury');
  const [confirmModal, setConfirmModal] = useState(null); // 'upgrade' | 'downgrade' | 'cancel'
  const [currentPlan, setCurrentPlan] = useState('premium');
  const [planStatus, setPlanStatus] = useState('active_trial');
  const [actionDone, setActionDone] = useState(null);
  const fileInputRef = useRef(null);

  const sliderPercentage = ((sliderValue - 1) / 4) * 100;

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleConfirmAction = () => {
    if (confirmModal === 'upgrade') {
      setCurrentPlan('enterprise');
      setPlanStatus('active');
      setActionDone('upgraded');
    } else if (confirmModal === 'downgrade') {
      setCurrentPlan('basic');
      setPlanStatus('active');
      setActionDone('downgraded');
    } else if (confirmModal === 'cancel') {
      setPlanStatus('cancelled');
      setActionDone('cancelled');
    }
    setConfirmModal(null);
    setTimeout(() => setActionDone(null), 5000);
  };

  const plan = PLAN_DETAILS[currentPlan];

  return (
    <div className="dashboard-settings">

      {/* Hotel Details Card */}
      <div className="content-card settings-card">
        <div className="settings-header">
          <h3 className="card-title">Hotel Details</h3>
          <p className="card-subtitle">Manage your hotel's public-facing information</p>
        </div>
        <div className="settings-body">

          {/* Logo Upload */}
          <div className="logo-upload-section">
            <div
              className="logo-preview"
              onClick={() => fileInputRef.current?.click()}
              title="Click to upload logo"
            >
              {logoPreview
                ? <img src={logoPreview} alt="Hotel logo" className="logo-img" />
                : <span className="material-symbols-outlined logo-placeholder-icon">add_photo_alternate</span>
              }
              <div className="logo-overlay">
                <span className="material-symbols-outlined">upload</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              style={{ display: 'none' }}
              onChange={handleLogoChange}
            />
            <div className="logo-text">
              <span className="change-logo" onClick={() => fileInputRef.current?.click()}>
                {logoPreview ? 'Change Logo' : 'Upload Logo'}
              </span>
              <span className="logo-hint">PNG, JPG or WebP · max 2MB</span>
              {logoPreview && (
                <button
                  className="remove-logo-btn"
                  onClick={() => { setLogoPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>HOTEL NAME</label>
              <input type="text" defaultValue="The Grand Accra Hotel" />
            </div>
            <div className="form-group">
              <label>HOTEL TYPE</label>
              <div className="select-wrapper">
                <select value={hotelType} onChange={e => setHotelType(e.target.value)}>
                  <option value="luxury">Luxury Hotel</option>
                  <option value="boutique">Boutique Hotel</option>
                  <option value="resort">Resort</option>
                  <option value="business">Business Hotel</option>
                  <option value="budget">Budget Hotel</option>
                  <option value="motel">Motel</option>
                  <option value="hostel">Hostel</option>
                  <option value="guesthouse">Guest House</option>
                  <option value="other">Other</option>
                </select>
                <span className="material-symbols-outlined select-chevron">expand_more</span>
              </div>
            </div>
            <div className="form-group">
              <label>COUNTRY</label>
              <input type="text" defaultValue="Ghana" />
            </div>
            <div className="form-group">
              <label>CITY</label>
              <input type="text" defaultValue="Accra" />
            </div>
          </div>

        </div>
      </div>

      {/* Branch Management — read-only list, no add button */}
      <div className="content-card settings-card">
        <div className="settings-header">
          <div>
            <h3 className="card-title">Branch Management</h3>
            <p className="card-subtitle">Contact support to add or remove branches from your account</p>
          </div>
        </div>
        <div className="branch-list">
          {[
            { name: 'Main Branch', loc: 'Airport Residential, Accra' },
            { name: 'Cantonments Branch', loc: 'Cantonments, Accra' },
            { name: 'Osu Branch', loc: 'Osu, Accra' },
          ].map((branch, i, arr) => (
            <div className={`branch-item ${i < arr.length - 1 ? 'border-bottom' : ''}`} key={branch.name}>
              <div className="branch-info">
                <span className="branch-name">{branch.name}</span>
                <span className="branch-loc">{branch.loc}</span>
              </div>
              <div className="branch-actions">
                <button className="icon-btn" title="Edit branch">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="branch-support-note">
          <span className="material-symbols-outlined">info</span>
          To add or remove branches, please contact <span className="support-link">support@revanta.app</span>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="content-card settings-card">
        <div className="settings-header">
          <h3 className="card-title">Subscription</h3>
          <p className="card-subtitle">Manage your billing plan and subscription status</p>
        </div>
        <div className="settings-body">

          {/* Plan Banner */}
          <div className={`plan-banner ${planStatus === 'cancelled' ? 'plan-banner-cancelled' : ''}`}>
            <div className="plan-banner-left">
              <div className="plan-name-row">
                <span className="plan-name">{plan.name}</span>
                {planStatus === 'active_trial' && <span className="badge-active-trial">Active Trial</span>}
                {planStatus === 'active' && <span className="badge-active">Active</span>}
                {planStatus === 'cancelled' && <span className="badge-cancelled">Cancelled</span>}
              </div>
              <p className="plan-price">GH₵{plan.price}<span className="plan-price-unit">/branch · month</span></p>
              <p className="plan-features">{plan.features}</p>
              {planStatus === 'active_trial' && (
                <p className="plan-dates">Trial ends: <span className="text-orange">2026-04-29</span> · Renewal: 2026-05-29</p>
              )}
              {planStatus === 'cancelled' && (
                <p className="plan-dates cancelled-notice">
                  <span className="material-symbols-outlined" style={{fontSize:14}}>schedule</span>
                  Account locks in 72 hours · <span className="text-orange">2026-04-24</span>
                </p>
              )}
            </div>
            <div className="plan-banner-right">
              <span className="plan-price-total">
                GH₵{plan.price * 3}
                <span className="plan-total-label">/mo total</span>
              </span>
            </div>
          </div>

          {/* Action Feedback */}
          {actionDone && (
            <div className={`plan-action-feedback ${actionDone}`}>
              <span className="material-symbols-outlined">
                {actionDone === 'cancelled' ? 'info' : 'check_circle'}
              </span>
              {actionDone === 'upgraded' && 'Successfully upgraded to Enterprise Plan.'}
              {actionDone === 'downgraded' && 'Successfully downgraded to Basic Plan.'}
              {actionDone === 'cancelled' && 'Your plan has been cancelled. You have 72 hours of access remaining.'}
            </div>
          )}

          {/* Subscription Action Buttons */}
          {planStatus !== 'cancelled' && (
            <div className="subscription-actions">
              {currentPlan !== 'enterprise' && (
                <button className="sub-action-btn upgrade-btn" onClick={() => setConfirmModal('upgrade')}>
                  <span className="material-symbols-outlined">arrow_circle_up</span>
                  Upgrade
                </button>
              )}
              {currentPlan !== 'basic' && (
                <button className="sub-action-btn downgrade-btn" onClick={() => setConfirmModal('downgrade')}>
                  <span className="material-symbols-outlined">arrow_circle_down</span>
                  Downgrade
                </button>
              )}
              <button className="sub-action-btn cancel-btn" onClick={() => setConfirmModal('cancel')}>
                <span className="material-symbols-outlined">cancel</span>
                Cancel Plan
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Satisfaction Drop Alert */}
      <div className="content-card settings-card">
        <div className="settings-header border-bottom">
          <h3 className="card-title">Satisfaction Drop Alert</h3>
          <p className="card-subtitle">Get notified when any department score drops below this threshold</p>
        </div>
        <div className="settings-body">
          <div className="slider-container">
            <input
              type="range"
              min="1" max="5" step="0.1"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="styled-slider"
              style={{ backgroundSize: `${sliderPercentage}% 100%` }}
            />
            <span className="slider-value-display text-teal">{Number(sliderValue).toFixed(1)}</span>
          </div>
          <div className="slider-hint">
            Alert when score drops below <span className="text-orange">{Number(sliderValue).toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="settings-footer">
        <button className="save-changes-btn btn-primary">
          <span className="material-symbols-outlined">save</span>
          Save Changes
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        type={confirmModal}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmModal(null)}
      />

    </div>
  );
}
