import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const steps = [
  { id: 1, label: 'Hotel Info' },
  { id: 2, label: 'Branches' },
  { id: 3, label: 'Plan' },
  { id: 4, label: 'Account' },
  { id: 5, label: 'Payment' },
];

const ghanaRegions = {
  "Ahafo": ["Goaso", "Hwidiem", "Kenyasi", "Kukuom"],
  "Ashanti": ["Kumasi", "Obuasi", "Mampong", "Ejisu", "Konongo"],
  "Bono": ["Sunyani", "Berekum", "Dormaa Ahenkro", "Wenchi"],
  "Bono East": ["Techiman", "Kintampo", "Nkoranza", "Atebubu"],
  "Central": ["Cape Coast", "Winneba", "Kasoa", "Elmina", "Saltpond"],
  "Eastern": ["Koforidua", "Nsawam", "Nkawkaw", "Suhum", "Akropong"],
  "Greater Accra": ["Accra", "Tema", "Madina", "Ashaiman", "Teshie", "Osu", "Dodowa"],
  "North East": ["Nalerigu", "Walewale", "Bunkpurugu", "Chereponi"],
  "Northern": ["Tamale", "Yendi", "Savelugu", "Bimbilla"],
  "Oti": ["Dambai", "Jasikan", "Kadjebi", "Kete Krachi"],
  "Savannah": ["Damongo", "Salaga", "Bole", "Sawla"],
  "Upper East": ["Bolgatanga", "Navrongo", "Bawku", "Paga"],
  "Upper West": ["Wa", "Lawra", "Tumu", "Jirapa"],
  "Volta": ["Ho", "Keta", "Hohoe", "Aflao", "Kpandu"],
  "Western": ["Sekondi-Takoradi", "Tarkwa", "Axim", "Elubo"],
  "Western North": ["Sefwi Wiawso", "Bibiani", "Enchi", "Juabeso"]
};

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [showPassword, setShowPassword] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('momo');

  // Step 2 state
  const [numBranches, setNumBranches] = useState(1);
  const [branches, setBranches] = useState([{ name: 'Main Branch', location: '' }]);

  const handleAddBranch = () => {
    setNumBranches((prev) => prev + 1);
    setBranches((prev) => [...prev, { name: '', location: '' }]);
  };

  const handleRemoveBranch = () => {
    if (numBranches > 1) {
      setNumBranches((prev) => prev - 1);
      setBranches((prev) => prev.slice(0, -1));
    }
  };

  const handleBranchChange = (index, field, value) => {
    const newBranches = [...branches];
    newBranches[index][field] = value;
    setBranches(newBranches);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (currentStep === 6) {
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14);
    const formattedDate = trialEndDate.toISOString().split('T')[0];

    return (
      <div className="success-container">
        <div className="success-icon-wrapper">
          <span className="material-symbols-outlined">domain</span>
        </div>
        <h1 className="success-title">Welcome to Staymark!</h1>
        <p className="success-subtitle">Your hotel is all set up and ready to collect feedback.</p>
        
        <div className="success-summary-card">
          <div className="success-row">
            <span className="success-label">Hotel</span>
            <span className="success-value">The Grand Accra Hotel</span>
          </div>
          <div className="success-row">
            <span className="success-label">Branches</span>
            <span className="success-value">{numBranches}</span>
          </div>
          <div className="success-row">
            <span className="success-label">Plan</span>
            <span className="success-value text-teal" style={{ textTransform: 'capitalize' }}>{selectedPlan}</span>
          </div>
          <div className="success-row">
            <span className="success-label">Trial ends</span>
            <span className="success-value text-orange">{formattedDate}</span>
          </div>
        </div>

        <Link to="/dashboard" className="btn-primary go-dashboard-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="stepper-container">
        <div className="stepper-steps">
          {steps.map((step) => (
            <div key={step.id} className={`step ${currentStep >= step.id ? 'active' : ''}`}>
              <div className="step-circle">{step.id}</div>
              <div className="step-label">{step.label}</div>
            </div>
          ))}
        </div>
        <div className="stepper-progress-bar">
          <div 
            className="stepper-progress-fill" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="auth-card signup-card">
        {currentStep === 1 && (
          <>
            <div className="auth-header-left">
              <h2>Hotel Information</h2>
            </div>
            <form onSubmit={handleNext} className="auth-form">
              <div className="form-group">
                <label htmlFor="hotelName">HOTEL NAME</label>
                <input 
                  type="text" 
                  id="hotelName" 
                  placeholder="The Grand Accra Hotel" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="hotelType">HOTEL TYPE</label>
                <div className="select-wrapper">
                  <select id="hotelType" defaultValue="">
                    <option value="" disabled hidden>Select hotel type</option>
                    <option value="luxury">Luxury Hotel</option>
                    <option value="boutique">Boutique Hotel</option>
                    <option value="resort">Resort</option>
                    <option value="budget">Budget Hotel</option>
                  </select>
                  <span className="material-symbols-outlined select-icon">expand_more</span>
                </div>
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label htmlFor="country">COUNTRY</label>
                  <input 
                    type="text" 
                    id="country" 
                    value="Ghana" 
                    readOnly 
                    className="readonly-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="region">REGION</label>
                  <div className="select-wrapper">
                    <select 
                      id="region" 
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setSelectedCity('');
                      }}
                    >
                      <option value="" disabled hidden>Select Region</option>
                      {Object.keys(ghanaRegions).map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined select-icon">expand_more</span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="city">CITY</label>
                  <div className="select-wrapper">
                    <select 
                      id="city" 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedRegion}
                    >
                      <option value="" disabled hidden>
                        {selectedRegion ? 'Select City' : 'Select Region'}
                      </option>
                      {selectedRegion && ghanaRegions[selectedRegion].map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined select-icon">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>LOGO (OPTIONAL)</label>
                <div className="file-upload-box">
                  <input type="file" id="logo" accept="image/png, image/jpeg" hidden />
                  <label htmlFor="logo" className="upload-label">
                    <span className="material-symbols-outlined">image</span>
                    <span>Click to upload PNG or JPG</span>
                  </label>
                </div>
              </div>

              <div className="form-actions-row">
                <Link to="/signin" className="text-link back-link">
                  &larr; Sign In
                </Link>
                <button type="submit" className="btn-primary next-btn">
                  Continue &rarr;
                </button>
              </div>
            </form>
          </>
        )}

        {currentStep === 2 && (
          <>
            <div className="auth-header-left">
              <h2>Branch Setup</h2>
              <p className="subtitle">Each branch gets its own unique QR code for guest feedback collection.</p>
            </div>
            
            <form onSubmit={handleNext} className="auth-form">
              <div className="branches-header">
                <span className="branches-label">Number of branches</span>
                <div className="counter-control">
                  <button type="button" className="counter-btn" onClick={handleRemoveBranch} disabled={numBranches <= 1}>
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="counter-value">{numBranches}</span>
                  <button type="button" className="counter-btn" onClick={handleAddBranch}>
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              <div className="branches-list">
                {branches.map((branch, index) => (
                  <div key={index} className="branch-box">
                    <h4 className="branch-title">Branch {index + 1} {index === 0 ? '(Main)' : ''}</h4>
                    <div className="form-group no-label">
                      <input 
                        type="text" 
                        placeholder={`Branch ${index + 1} Name`}
                        value={branch.name}
                        onChange={(e) => handleBranchChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="form-group no-label">
                      <input 
                        type="text" 
                        placeholder="Location / address"
                        value={branch.location}
                        onChange={(e) => handleBranchChange(index, 'location', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-actions-row">
                <button type="button" onClick={handlePrev} className="text-link back-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>
                  &larr; Back
                </button>
                <button type="submit" className="btn-primary next-btn">
                  Continue &rarr;
                </button>
              </div>
            </form>
          </>
        )}

        {currentStep === 3 && (
          <>
            <div className="auth-header-left">
              <h2>Choose Your Plan</h2>
            </div>
            
            <form onSubmit={handleNext} className="auth-form">
              <div className="plans-container">
                <div 
                  className={`plan-card ${selectedPlan === 'starter' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('starter')}
                >
                  <h3 className="plan-name">Starter</h3>
                  <div className="plan-price">
                    <span className="price-amount">GH&cent;200</span>
                    <span className="price-period">/branch</span>
                  </div>
                  <ul className="plan-features">
                    <li><span className="material-symbols-outlined check-icon">check</span> Up to 3 branches</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> Basic analytics</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> QR code generation</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> Email reports</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> CSV export</li>
                  </ul>
                </div>

                <div 
                  className={`plan-card ${selectedPlan === 'premium' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('premium')}
                >
                  <div className="popular-badge">Most Popular</div>
                  <h3 className="plan-name">Premium</h3>
                  <div className="plan-price">
                    <span className="price-amount">GH&cent;450</span>
                    <span className="price-period">/branch</span>
                  </div>
                  <ul className="plan-features">
                    <li><span className="material-symbols-outlined check-icon">check</span> Unlimited branches</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> Advanced analytics</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> QR code generation</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> Real-time alerts</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> Staff mentions</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> Priority support</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> Custom branding</li>
                    <li><span className="material-symbols-outlined check-icon">check</span> API access</li>
                  </ul>
                </div>
              </div>

              <div className="plan-summary-box">
                <span className="summary-calc">
                  {numBranches} branch{numBranches > 1 ? 'es' : ''} &times; GH&cent;{selectedPlan === 'starter' ? '200' : '450'}
                </span>
                <span className="summary-total">
                  GH&cent;{numBranches * (selectedPlan === 'starter' ? 200 : 450)}
                </span>
              </div>

              <div className="form-actions-row">
                <button type="button" onClick={handlePrev} className="text-link back-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>
                  &larr; Back
                </button>
                <button type="submit" className="btn-primary next-btn">
                  Continue &rarr;
                </button>
              </div>
            </form>
          </>
        )}

        {currentStep === 4 && (
          <>
            <div className="auth-header-left">
              <h2>Your Account</h2>
            </div>
            
            <form onSubmit={handleNext} className="auth-form">
              <div className="form-group">
                <label htmlFor="fullName">FULL NAME</label>
                <input type="text" id="fullName" placeholder="Kwame Asante" />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="jobTitle">JOB TITLE</label>
                  <div className="select-wrapper">
                    <select id="jobTitle" defaultValue="">
                      <option value="" disabled hidden>General Manager</option>
                      <option value="gm">General Manager</option>
                      <option value="owner">Owner / Proprietor</option>
                      <option value="front_desk">Front Desk Manager</option>
                      <option value="it">IT Administrator</option>
                    </select>
                    <span className="material-symbols-outlined select-icon">expand_more</span>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">PHONE</label>
                  <input type="text" id="phone" placeholder="+233 XX XXX XXXX" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="accountEmail">EMAIL</label>
                <input type="email" id="accountEmail" placeholder="you@hotel.com" />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="accountPassword">PASSWORD</label>
                  <div className="input-with-icon">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="accountPassword" 
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
                  <div className="password-strength">
                    <div className="strength-bar active"></div>
                    <div className="strength-bar active"></div>
                    <div className="strength-bar"></div>
                    <div className="strength-bar"></div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
                  <input type="password" id="confirmPassword" placeholder="••••••••" />
                </div>
              </div>

              <div className="form-actions" style={{ marginTop: '12px', marginBottom: '8px', justifyContent: 'flex-start' }}>
                <label className="checkbox-container">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)', userSelect: 'none' }}>
                    I agree to the <Link to="/terms" className="text-link">Terms of Service</Link> and <Link to="/privacy" className="text-link">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <div className="form-actions-row">
                <button type="button" onClick={handlePrev} className="text-link back-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>
                  &larr; Back
                </button>
                <button type="submit" className="btn-primary next-btn">
                  Continue &rarr;
                </button>
              </div>
            </form>
          </>
        )}

        {currentStep === 5 && (
          <>
            <div className="auth-header-left">
              <h2>Payment</h2>
            </div>
            
            <form onSubmit={handleNext} className="auth-form">
              <div className="payment-summary-box">
                <div className="summary-row">
                  <span className="summary-label">Plan</span>
                  <span className="summary-value" style={{ fontWeight: 600 }}>{selectedPlan === 'premium' ? 'Premium' : 'Starter'}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Branches</span>
                  <span className="summary-value">{numBranches} &times; GH&cent;{selectedPlan === 'starter' ? '200' : '450'}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span className="summary-label">Total</span>
                  <span className="summary-total-price">GH&cent;{numBranches * (selectedPlan === 'starter' ? 200 : 450)}</span>
                </div>
              </div>

              <div className="form-group">
                <label>PAYMENT METHOD</label>
                <div className="payment-methods">
                  <div 
                    className={`payment-method-btn ${paymentMethod === 'momo' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('momo')}
                  >
                    MoMo
                  </div>
                  <div 
                    className={`payment-method-btn ${paymentMethod === 'telecel' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('telecel')}
                  >
                    Telecel Cash
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="momoNumber">
                  {paymentMethod === 'momo' ? 'MTN MOMO NUMBER' : 'TELECEL CASH NUMBER'}
                </label>
                <input 
                  type="text" 
                  id="momoNumber" 
                  placeholder={paymentMethod === 'momo' ? "024 XXX XXXX" : "020 XXX XXXX"} 
                />
              </div>

              <button type="submit" className="btn-primary pay-btn" style={{ width: '100%', marginTop: '8px', padding: '14px', fontSize: '15px' }}>
                Pay & Activate &mdash; GH&cent;{numBranches * (selectedPlan === 'starter' ? 200 : 450)}
              </button>

              <div className="form-actions-row" style={{ marginTop: '24px' }}>
                <button type="button" onClick={handlePrev} className="text-link back-link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>
                  &larr; Back
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
