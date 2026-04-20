import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './FeedbackForm.css';

const branchInfo = {
  main: { name: 'Main Branch', hotel: 'The Grand Accra Hotel', location: 'Airport Residential, Accra' },
  cantonments: { name: 'Cantonments Branch', hotel: 'The Grand Accra Hotel', location: 'Cantonments, Accra' },
  osu: { name: 'Osu Branch', hotel: 'The Grand Accra Hotel', location: 'Osu, Accra' },
};

const servicesList = [
  { id: 'room', label: 'Room Stay', icon: 'bed' },
  { id: 'restaurant', label: 'Restaurant', icon: 'restaurant' },
  { id: 'conference', label: 'Conference Room', icon: 'meeting_room' },
  { id: 'pool_gym', label: 'Pool or Gym', icon: 'water_drop' },
  { id: 'spa', label: 'Spa', icon: 'spa' },
  { id: 'events', label: 'Events', icon: 'event' }
];

const STEPS = ['welcome', 'experience', 'general', 'specific', 'info', 'done'];
const ratingEmojis = ['', '😞', '😐', '🙂', '😊', '🤩'];

const generalAreas = [
  { id: 'staff', label: 'Staff Friendliness' },
  { id: 'checkin', label: 'Check-in & Check-out' },
  { id: 'clean', label: 'Cleanliness' },
  { id: 'value', label: 'Value for Money' }
];

// Reusable SVG Components
const HotelLogo = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="#FFFFFF"/>
    <circle cx="50" cy="30" r="16" fill="#F59E0B"/>
    <path d="M15,85 C15,55 45,60 50,85 Z" fill="#14B8A6"/>
    <path d="M85,85 C85,55 55,60 50,85 Z" fill="#14B8A6"/>
    <path d="M35,85 C35,60 65,60 65,85 Z" fill="#0F172A"/>
  </svg>
);

const SmileyStar = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    <path d="M9 14s1.5 2 3 2 3-2 3-2"/>
  </svg>
);

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          className={`star-btn ${(hovered || value) >= star ? 'filled' : ''}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function FeedbackForm() {
  const { branchId } = useParams();
  const branch = branchInfo[branchId] || branchInfo.main;

  const [step, setStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customServices, setCustomServices] = useState([]);
  const [addingService, setAddingService] = useState(false);
  const [customServiceName, setCustomServiceName] = useState('');
  
  const [generalRatings, setGeneralRatings] = useState({});
  const [serviceRatings, setServiceRatings] = useState({});
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const currentStep = STEPS[step];

  const allServicesList = [...servicesList, ...customServices];

  const handleNext = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleAddCustomService = () => {
    if (customServiceName.trim() && customServices.length < 3) {
      const newId = `custom_${Date.now()}`;
      const newService = { id: newId, label: customServiceName.trim(), icon: 'stars' };
      setCustomServices(prev => [...prev, newService]);
      setSelectedServices(prev => [...prev, newId]);
      setCustomServiceName('');
      setAddingService(false);
    }
  };

  const calculateOverallScore = () => {
    const ratings = Object.values(generalRatings);
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const overallScore = calculateOverallScore();
  const allGeneralRated = generalAreas.every(area => generalRatings[area.id] > 0);

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setStep(STEPS.indexOf('done'));
  };

  return (
    <div className="feedback-wrapper">
      <div className="split-layout">
        
        {/* LEFT PANEL (Sidebar) */}
        <div className="left-panel">
          <div className="lp-header">
            <HotelLogo className="lp-logo" />
            <div className="lp-hotel-info">
              <h2 className="lp-hotel-name">{branch.hotel}</h2>
              <span className="lp-hotel-branch">{branch.name}</span>
            </div>
          </div>

          <div className="lp-middle">
            <div className="lp-graphic-container">
              <div className="lp-glowing-circle">
                <SmileyStar className="lp-smiley-star" />
              </div>
              <div className="lp-orange-badge">
                <span className="material-symbols-outlined star-icon">star</span>
              </div>
            </div>

            <h1 className="lp-title">Share Your Experience</h1>
            <p className="lp-subtitle">Your feedback helps us serve you better.</p>

            <div className="lp-features">
              <div className="lp-feature-pill">
                <span className="material-symbols-outlined">gpp_good</span>
                Anonymous by default
              </div>
              <div className="lp-feature-pill">
                <span className="material-symbols-outlined">schedule</span>
                Takes about 2 minutes
              </div>
              <div className="lp-feature-pill">
                <span className="material-symbols-outlined">send</span>
                Sent directly to management
              </div>
            </div>
          </div>

          <div className="lp-footer">
            <span className="dot-green"></span>
            Powered by Staymark
          </div>
        </div>

        {/* RIGHT PANEL (Main Content) */}
        <div className="right-panel">
          
          <div className="rp-top-bar">
            {step > 0 && step < STEPS.length - 1 ? (
              <div className="rp-progress-header">
                <div className="rp-progress-dots">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className={`progress-dot ${step === num ? 'active' : step > num ? 'completed' : ''}`}></div>
                  ))}
                </div>
                <div className="rp-progress-text">
                  <span className="text-teal">{step}</span><span className="text-muted">/{STEPS.length - 1}</span>
                </div>
              </div>
            ) : (
              <div className="top-teal-line"></div>
            )}
            <button className="theme-toggle-btn">
              <span className="material-symbols-outlined">light_mode</span>
            </button>
          </div>

          <div className="rp-content-area">
            
            {currentStep === 'welcome' && (
              <div className="step-welcome fade-in">
                <HotelLogo className="rp-huge-logo" />
                <h1 className="rp-hotel-name">{branch.hotel}</h1>
                <span className="rp-hotel-branch">{branch.name}</span>

                <div className="rp-decorative-graphic">
                  <div className="rp-dark-circle">
                    <SmileyStar className="rp-smiley-star" />
                  </div>
                  <span className="floating-star fs-1">★</span>
                  <span className="floating-star fs-2">★</span>
                  <span className="floating-star fs-3">★</span>
                </div>

                <h2 className="rp-title">Your feedback helps us serve you better.</h2>
                <p className="rp-subtitle">Share your experience and help us improve for every guest.</p>

                <div className="rp-tags">
                  <span className="tag-teal">
                    <span className="material-symbols-outlined">schedule</span> ~2 minutes
                  </span>
                  <span className="tag-orange">
                    <span className="material-symbols-outlined">gpp_good</span> Anonymous
                  </span>
                </div>

                <button className="btn-primary start-btn" onClick={handleNext}>
                  Start Review <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <p className="rp-disclaimer">Your response is anonymous unless you choose to share your name.</p>
              </div>
            )}

            {currentStep === 'experience' && (
              <div className="step-form fade-in step-experience">
                <h2 className="form-title align-left">What did you experience?</h2>
                <p className="form-subtitle align-left">Select all that apply — you'll rate each one separately</p>

                <div className="services-grid">
                  {allServicesList.map(srv => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <div 
                        key={srv.id} 
                        className={`service-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleService(srv.id)}
                      >
                        <div className="service-icon-box">
                          <span className="material-symbols-outlined">{srv.icon}</span>
                        </div>
                        <span className="service-label">{srv.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="divider-with-text">
                  <span>Don't see your service?</span>
                </div>

                {addingService ? (
                  <div className="custom-service-input-row">
                    <input 
                      type="text" 
                      placeholder="e.g. Valet Parking" 
                      value={customServiceName} 
                      onChange={e => setCustomServiceName(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddCustomService()}
                      autoFocus
                    />
                    <button className="add-btn" onClick={handleAddCustomService} disabled={!customServiceName.trim()}>Add</button>
                    <button className="cancel-btn" onClick={() => { setAddingService(false); setCustomServiceName(''); }}>Cancel</button>
                  </div>
                ) : (
                  <button 
                    className="add-other-service-btn" 
                    onClick={() => setAddingService(true)}
                    disabled={customServices.length >= 3}
                  >
                    <span className="material-symbols-outlined">add</span>
                    Add Other Service <span className="remaining-text">({3 - customServices.length} remaining)</span>
                  </button>
                )}

                <div className="sticky-footer-btn">
                  <button 
                    className="btn-primary full-width" 
                    onClick={handleNext}
                    disabled={selectedServices.length === 0}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'general' && (
              <div className="step-form fade-in step-general">
                <h2 className="form-title align-left">General Experience</h2>
                <p className="form-subtitle align-left">Rate each area — your overall score is calculated automatically</p>

                <div className="overall-score-card">
                  <div className="overall-score-left">
                    <span className="overall-score-label">OVERALL SCORE</span>
                    <span className="overall-score-desc">Rate the areas below to generate your score</span>
                  </div>
                  <div className="overall-score-right">
                    <div className="read-only-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className={`material-symbols-outlined ${overallScore >= star ? 'filled' : ''}`}>
                          {overallScore >= star ? 'star' : 'star_rate'}
                        </span>
                      ))}
                    </div>
                    <span className="score-number">{overallScore > 0 ? overallScore : '-'}</span>
                  </div>
                </div>

                <div className="rating-areas-container">
                  <div className="rating-areas-header">RATE EACH AREA — ALL REQUIRED</div>
                  
                  {generalAreas.map(area => (
                    <div className="rating-area-row" key={area.id}>
                      <span className="rating-area-label">{area.label}</span>
                      <StarRating
                        value={generalRatings[area.id] || 0}
                        onChange={val => setGeneralRatings(prev => ({ ...prev, [area.id]: val }))}
                      />
                    </div>
                  ))}
                </div>

                <div className="comment-section">
                  <h3 className="comment-title">Describe Your Experience <span className="optional-text">(optional)</span></h3>
                  <p className="comment-subtitle">What stood out most during your stay? Any highlights or areas we can improve?</p>
                  
                  <div className="textarea-wrapper">
                    <textarea
                      className="form-textarea minimal-textarea"
                      placeholder="Share the details of your experience here..."
                      value={comment}
                      onChange={e => setComment(e.target.value.slice(0, 500))}
                      rows={5}
                    />
                    <div className="char-counter">{comment.length}/500</div>
                  </div>
                </div>

                <div className="sticky-footer-btn split-footer centered-footer">
                  {!allGeneralRated && <span className="required-warning">All 4 star ratings are required to continue</span>}
                  <div className="footer-actions">
                    <button className="btn-secondary" onClick={handleBack}>Back</button>
                    <button className="btn-primary" onClick={handleNext} disabled={!allGeneralRated}>Continue</button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'specific' && (
              <div className="step-form fade-in">
                <h2 className="form-title align-left">Specific Services</h2>
                <p className="form-subtitle align-left">Rate the specific services you experienced.</p>
                
                <div className="dept-ratings-list">
                  {selectedServices.map(srvId => {
                    const srv = allServicesList.find(s => s.id === srvId) || { id: srvId, label: 'Other Service' };
                    return (
                      <div className="dept-rating-row" key={srv.id}>
                        <span className="dept-label">{srv.label}</span>
                        <StarRating
                          value={serviceRatings[srv.id] || 0}
                          onChange={val => setServiceRatings(prev => ({ ...prev, [srv.id]: val }))}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="sticky-footer-btn split-footer">
                  <button className="btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn-primary" onClick={handleNext}>Continue</button>
                </div>
              </div>
            )}

            {currentStep === 'info' && (
              <div className="step-form fade-in">
                <h2 className="form-title align-left">Final Details</h2>
                <p className="form-subtitle align-left">Optionally leave your contact info for follow-up.</p>

                <div className="form-fields">
                  <div className="input-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Smith"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. john@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sticky-footer-btn split-footer">
                  <button className="btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? <span className="spinner"></span> : 'Submit Review'}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'done' && (
              <div className="step-form fade-in done-state">
                <div className="success-circle">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <h2 className="form-title">Thank you!</h2>
                <p className="form-subtitle">
                  Your feedback has been submitted successfully. We appreciate your time and hope to see you again at <strong>{branch.hotel}</strong>.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
