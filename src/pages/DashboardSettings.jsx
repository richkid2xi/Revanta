import { useState } from 'react';
import './DashboardSettings.css';

export default function DashboardSettings() {
  const [sliderValue, setSliderValue] = useState(3.5);

  // Calculate percentage for the custom slider track fill
  const sliderPercentage = ((sliderValue - 1) / 4) * 100;

  return (
    <div className="dashboard-settings">
      
      {/* Hotel Details Card */}
      <div className="content-card settings-card">
        <div className="settings-header">
          <h3 className="card-title">Hotel Details</h3>
        </div>
        <div className="settings-body">
          
          <div className="logo-upload-section">
            <div className="logo-preview">
               <span className="material-symbols-outlined logo-icon">monitoring</span>
            </div>
            <div className="logo-text">
              <span className="change-logo">Change Logo</span>
              <span className="logo-hint">PNG or JPG, max 2MB</span>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>HOTEL NAME</label>
              <input type="text" defaultValue="The Grand Accra Hotel" />
            </div>
            <div className="form-group">
              <label>HOTEL TYPE</label>
              <select defaultValue="luxury">
                <option value="luxury">Luxury Hotel</option>
                <option value="boutique">Boutique Hotel</option>
                <option value="resort">Resort</option>
              </select>
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

      {/* Branch Management Card */}
      <div className="content-card settings-card">
        <div className="settings-header flex-between">
          <h3 className="card-title">Branch Management</h3>
          <button className="add-branch-btn">
            <span className="material-symbols-outlined">add</span> Add Branch
          </button>
        </div>
        <div className="branch-list">
          
          <div className="branch-item border-bottom">
            <div className="branch-info">
              <span className="branch-name">Main Branch</span>
              <span className="branch-loc">Airport Residential, Accra</span>
            </div>
            <div className="branch-actions">
              <button className="icon-btn"><span className="material-symbols-outlined">edit</span></button>
              <button className="icon-btn"><span className="material-symbols-outlined">delete</span></button>
            </div>
          </div>

          <div className="branch-item border-bottom">
            <div className="branch-info">
              <span className="branch-name">Cantonments Branch</span>
              <span className="branch-loc">Cantonments, Accra</span>
            </div>
            <div className="branch-actions">
              <button className="icon-btn"><span className="material-symbols-outlined">edit</span></button>
              <button className="icon-btn"><span className="material-symbols-outlined">delete</span></button>
            </div>
          </div>

          <div className="branch-item">
            <div className="branch-info">
              <span className="branch-name">Osu Branch</span>
              <span className="branch-loc">Osu, Accra</span>
            </div>
            <div className="branch-actions">
              <button className="icon-btn"><span className="material-symbols-outlined">edit</span></button>
              <button className="icon-btn"><span className="material-symbols-outlined">delete</span></button>
            </div>
          </div>

        </div>
      </div>

      {/* Subscription Card */}
      <div className="content-card settings-card">
        <div className="settings-header">
          <h3 className="card-title">Subscription</h3>
        </div>
        <div className="settings-body">
          
          <div className="subscription-top flex-between">
            <div className="plan-info">
              <div className="plan-name-row">
                <span className="plan-name">Premium Plan</span>
                <span className="badge-active-trial">Active Trial</span>
              </div>
              <div className="plan-details">
                GH₵450/branch &middot; 3 branches
              </div>
              <div className="plan-dates">
                <span className="trial-end">Trial ends: <span className="text-orange">2026-04-29</span></span>
                <br />
                <span className="renewal-info">Renewal: 2026-05-29 &middot; Total: <span className="text-white">GH₵1350</span></span>
              </div>
            </div>
            <button className="manage-plan-btn">Manage Plan</button>
          </div>

          <div className="subscription-actions">
            <button className="sub-action-btn upgrade-btn">
              <span className="material-symbols-outlined">arrow_circle_up</span> Upgrade
            </button>
            <button className="sub-action-btn downgrade-btn">
              <span className="material-symbols-outlined">arrow_circle_down</span> Downgrade
            </button>
            <button className="sub-action-btn cancel-btn">
              <span className="material-symbols-outlined">cancel</span> Cancel
            </button>
          </div>

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
        <button className="save-changes-btn">
          <span className="material-symbols-outlined">save</span> Save Changes
        </button>
      </div>

    </div>
  );
}
