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

const generalAreas = [
  { id: 'staff', label: 'Staff Friendliness' },
  { id: 'checkin', label: 'Check-in & Check-out' },
  { id: 'clean', label: 'Cleanliness' },
  { id: 'value', label: 'Value for Money' }
];

const getSentiment = (val) => {
  if (!val || val === 0) return null;
  if (val === 1) return { label: 'Poor', color: '#ef4444' };
  if (val === 2) return { label: 'Fair', color: '#f97316' };
  if (val === 3) return { label: 'Average', color: '#f59e0b' };
  if (val === 4) return { label: 'Good', color: '#14b8a6' };
  if (val === 5) return { label: 'Excellent', color: '#10b981' };
  return null;
};

const getOverallSentiment = (score) => {
  const s = parseFloat(score);
  if (!s || s === 0) return null;
  if (s < 2) return { label: 'Poor', color: '#ef4444' };
  if (s < 3) return { label: 'Fair', color: '#f97316' };
  if (s < 3.5) return { label: 'Average', color: '#f59e0b' };
  if (s < 4.5) return { label: 'Good', color: '#14b8a6' };
  return { label: 'Excellent', color: '#10b981' };
};

// SVG Components
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

function StarRating({ value, onChange, size = 'normal' }) {
  const [hovered, setHovered] = useState(null);
  const active = hovered || value;
  const sentiment = getSentiment(value);
  return (
    <div className="star-rating-group">
      <div className={`star-row ${size === 'large' ? 'star-row-large' : ''}`}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            className={`star-btn ${active >= star ? 'filled' : ''}`}
            style={active >= star ? { color: getSentiment(active)?.color || '#f59e0b' } : {}}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(star)}
            aria-label={`Rate ${star} star`}
          >
            ★
          </button>
        ))}
      </div>
      {sentiment && (
        <span className="sentiment-label" style={{ color: sentiment.color }}>
          {sentiment.label}
        </span>
      )}
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

  // Info step state
  const [shareContact, setShareContact] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

  const removeCustomService = (id) => {
    setCustomServices(prev => prev.filter(s => s.id !== id));
    setSelectedServices(prev => prev.filter(s => s !== id));
  };

  const handleAddCustomService = () => {
    if (customServiceName.trim() && customServices.length < 3) {
      const newId = `custom_${Date.now()}`;
      const newService = { id: newId, label: customServiceName.trim(), icon: 'stars', isCustom: true };
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
  const overallSentiment = getOverallSentiment(overallScore);
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

        {/* LEFT PANEL */}
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

        {/* RIGHT PANEL */}
        <div className="right-panel">

          {/* Mobile-only brand header strip */}
          <div className="mobile-form-header">
            <HotelLogo className="mobile-form-logo" />
            <div>
              <p className="mobile-form-hotel-name">{branch.hotel}</p>
              <span className="mobile-form-branch">{branch.name}</span>
            </div>
          </div>

          <div className="rp-top-bar">
            {step > 0 && step < STEPS.length - 1 ? (
              <div className="rp-progress-header">
                <div className="rp-progress-dots">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className={`progress-dot ${step === num ? 'active' : step > num ? 'completed' : ''}`}></div>
                  ))}
                </div>
                <div className="rp-progress-text">
                  <span className="text-teal">{step}</span><span className="text-muted">/{STEPS.length - 2}</span>
                </div>
              </div>
            ) : (
              <div className="top-teal-line"></div>
            )}
          </div>

          <div className="rp-content-area">

            {/* WELCOME STEP */}
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

            {/* EXPERIENCE STEP */}
            {currentStep === 'experience' && (
              <div className="step-form fade-in step-experience">
                <h2 className="form-title align-left">What did you experience?</h2>
                <p className="form-subtitle align-left">Select all the services you used during your visit</p>

                <div className="services-grid">
                  {allServicesList.map(srv => {
                    const isSelected = selectedServices.includes(srv.id);
                    return (
                      <div
                        key={srv.id}
                        className={`service-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleService(srv.id)}
                      >
                        {srv.isCustom && (
                          <button
                            className="service-remove-btn"
                            onClick={(e) => { e.stopPropagation(); removeCustomService(srv.id); }}
                            aria-label="Remove service"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        )}
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
                    Continue <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* GENERAL EXPERIENCE STEP */}
            {currentStep === 'general' && (
              <div className="step-form fade-in step-general">
                <h2 className="form-title align-left">General Experience</h2>
                <p className="form-subtitle align-left">Rate each area — your overall score is calculated automatically</p>

                <div className="overall-score-card">
                  <div className="overall-score-left">
                    <span className="overall-score-label">OVERALL SCORE</span>
                    <span className="overall-score-desc">Auto-calculated from your ratings below</span>
                  </div>
                  <div className="overall-score-right">
                    <div className="read-only-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          className="material-symbols-outlined"
                          style={{
                            color: overallScore > 0 && Math.round(parseFloat(overallScore)) >= star
                              ? (overallSentiment?.color || '#f59e0b')
                              : '#334155',
                            fontVariationSettings: overallScore > 0 && Math.round(parseFloat(overallScore)) >= star
                              ? "'FILL' 1" : "'FILL' 0"
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span
                      className="score-badge"
                      style={{ background: overallScore > 0 ? (overallSentiment?.color || '#f59e0b') : '#334155' }}
                    >
                      {overallScore > 0 ? Math.round(parseFloat(overallScore)) : '-'}
                    </span>
                  </div>
                </div>

                {overallSentiment && (
                  <div className="overall-sentiment-label" style={{ color: overallSentiment.color }}>
                    {overallSentiment.label}
                  </div>
                )}

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
                      rows={4}
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

            {/* SPECIFIC SERVICES STEP */}
            {currentStep === 'specific' && (
              <div className="step-form fade-in">
                <h2 className="form-title align-left">Specific Services</h2>
                <p className="form-subtitle align-left">Rate the specific services you experienced during your visit.</p>

                <div className="dept-ratings-list">
                  {selectedServices.map(srvId => {
                    const srv = allServicesList.find(s => s.id === srvId) || { id: srvId, label: 'Other Service' };
                    return (
                      <div className="dept-rating-row" key={srv.id}>
                        <span className="dept-label">{srv.label}</span>
                        <StarRating
                          value={serviceRatings[srv.id] || 0}
                          onChange={val => setServiceRatings(prev => ({ ...prev, [srv.id]: val }))}
                          size="large"
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

            {/* YOUR DETAILS STEP */}
            {currentStep === 'info' && (
              <div className="step-form fade-in">
                <h2 className="form-title align-left">Your Details</h2>
                <p className="form-subtitle align-left">Optionally share your contact info if you'd like us to follow up</p>

                {/* Contact Info Toggle Card */}
                <div className="contact-toggle-card">
                  <div className="contact-toggle-left">
                    <span className="material-symbols-outlined contact-toggle-icon">person</span>
                    <div>
                      <p className="contact-toggle-title">Share Contact Info</p>
                      <p className="contact-toggle-sub">Optional — only if you'd like the hotel to follow up with you</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={shareContact}
                      onChange={e => setShareContact(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                {!shareContact ? (
                  <div className="anonymous-info-box">
                    <span className="material-symbols-outlined anonymous-info-icon">verified_user</span>
                    <div>
                      <p>Your review will be submitted <strong>anonymously</strong>.</p>
                      <p>Toggle the option above if you'd like the hotel to be able to reach you.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="contact-consent-box">
                      <span className="material-symbols-outlined consent-icon">info</span>
                      <p>By sharing your contact details, you agree that the hotel team may reach out to you regarding your feedback or to resolve any concerns from your stay. Your information will not be shared with third parties.</p>
                    </div>

                    <div className="form-fields">
                      <div className="input-group">
                        <label>Full Name <span className="required-tag">(required to submit with contact)</span></label>
                        <div className="input-with-icon">
                          <span className="material-symbols-outlined input-icon">person</span>
                          <input
                            type="text"
                            placeholder="Your full name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label>Email Address <span className="required-tag">(required to submit with contact)</span></label>
                        <div className="input-with-icon">
                          <span className="material-symbols-outlined input-icon">mail</span>
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <label>Phone Number <span className="optional-tag">(optional)</span></label>
                        <div className="input-with-icon">
                          <span className="material-symbols-outlined input-icon">call</span>
                          <input
                            type="tel"
                            placeholder="e.g. 0200000000"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="sticky-footer-btn split-footer">
                  <button className="btn-secondary" onClick={handleBack}>Back</button>
                  <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={submitting || (shareContact && (!name.trim() || !email.trim()))}
                  >
                    {submitting
                      ? <span className="spinner"></span>
                      : shareContact
                        ? <><span className="material-symbols-outlined">send</span> Submit Review</>
                        : <><span className="material-symbols-outlined">send</span> Submit Anonymously</>
                    }
                  </button>
                </div>
                {!shareContact && (
                  <p className="rp-disclaimer" style={{ textAlign: 'center', marginTop: 8 }}>
                    Add your name &amp; email above to submit with contact info instead
                  </p>
                )}
              </div>
            )}

            {/* DONE STATE */}
            {currentStep === 'done' && (
              <div className="step-form fade-in done-state">
                <div className="success-circle">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <h2 className="done-title">Thank You!</h2>
                <p className="done-sub">
                  Your review has been submitted to{' '}
                  <span className="done-hotel-name">{branch.hotel}</span>
                </p>
                <p className="done-desc">
                  Your feedback has been sent directly to the hotel management team and will help improve the experience for future guests.
                </p>

                <div className="done-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 28,
                        color: Math.round(parseFloat(overallScore)) >= star ? '#f59e0b' : '#334155',
                        fontVariationSettings: Math.round(parseFloat(overallScore)) >= star ? "'FILL' 1" : "'FILL' 0"
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>

                <div className="done-hotel-card">
                  <HotelLogo className="done-hotel-logo" />
                  <div className="done-hotel-info">
                    <p className="done-hotel-card-name">{branch.hotel}</p>
                    <p className="done-hotel-card-branch">{branch.name}</p>
                    <div className="done-hotel-card-meta">
                      <span>Overall rating</span>
                      <span className="done-hotel-rating">
                        {overallScore > 0 ? overallScore : '—'}/5
                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#f59e0b', fontVariationSettings: "'FILL' 1" }}>star</span>
                      </span>
                    </div>
                    {shareContact && name && (
                      <div className="done-hotel-card-meta">
                        <span>Submitted by</span>
                        <span className="done-hotel-submitter">{name.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button className="btn-primary done-btn" onClick={() => setStep(0)}>
                  <span className="material-symbols-outlined">home</span>
                  Done
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
