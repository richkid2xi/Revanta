import { useState } from 'react';
import './DashboardReviews.css';

const allReviews = [
  {
    id: 1,
    author: "Kwame Asante",
    initials: "KA",
    date: "2026-04-18",
    branch: "Main Branch",
    rating: 5.0,
    tags: ["Rooms", "Restaurant", "Spa"],
    text: "Absolutely phenomenal stay. The staff went above and beyond. Special mention to Emmanuel at the front desk — truly exceptional service.",
    staffMentioned: "Emmanuel",
    breakdown: {
      Rooms: 5.0,
      Restaurant: 5.0,
      Wifi: 4.0,
      Spa: 5.0
    }
  },
  {
    id: 2,
    author: "Abena Mensah",
    initials: "AM",
    date: "2026-04-17",
    branch: "Main Branch",
    rating: 4.0,
    tags: ["Restaurant", "WiFi"],
    text: "Great food and comfortable rooms. WiFi was terrible throughout my stay — kept dropping every hour. Please fix this urgently."
  },
  {
    id: 3,
    author: "James Osei",
    initials: "JO",
    date: "2026-04-16",
    branch: "Cantonments Branch",
    rating: 3.0,
    tags: ["Rooms", "WiFi"],
    text: "Room was noisy due to construction next door. WiFi barely worked. Restaurant saved the experience."
  },
  {
    id: 4,
    author: "Grace Afriyie",
    initials: "GA",
    date: "2026-04-15",
    branch: "Airport Branch",
    rating: 5.0,
    tags: ["Conference", "Restaurant"],
    text: "Hosted a 3-day corporate seminar here. The catering team was fantastic, and the audiovisual setup was flawless."
  },
  {
    id: 5,
    author: "Kofi Annan",
    initials: "KA",
    date: "2026-04-14",
    branch: "Main Branch",
    rating: 4.0,
    tags: ["Spa", "Rooms"],
    text: "Very relaxing spa experience. The room was pristine, though the check-in process took slightly longer than expected."
  },
  {
    id: 6,
    author: "Esi Boateng",
    initials: "EB",
    date: "2026-04-14",
    branch: "Cantonments Branch",
    rating: 2.0,
    tags: ["Rooms", "Housekeeping"],
    text: "Found the bed linens slightly stained upon arrival. Housekeeping replaced them immediately when called, but still disappointing."
  },
  {
    id: 7,
    author: "Daniel Kwarteng",
    initials: "DK",
    date: "2026-04-12",
    branch: "Airport Branch",
    rating: 5.0,
    tags: ["Restaurant", "Bar"],
    text: "The rooftop bar has the best cocktails in the city! Bartender was extremely knowledgeable and friendly."
  },
  {
    id: 8,
    author: "Ama Serwaa",
    initials: "AS",
    date: "2026-04-11",
    branch: "Main Branch",
    rating: 4.0,
    tags: ["WiFi", "Conference"],
    text: "Good business hotel. Internet speeds are excellent in the lobby but decent in the rooms. Conference facilities are top-notch."
  },
  {
    id: 9,
    author: "Samuel Yeboah",
    initials: "SY",
    date: "2026-04-10",
    branch: "Cantonments Branch",
    rating: 3.0,
    tags: ["Restaurant"],
    text: "Breakfast buffet lacked variety for a 4-star hotel. Hot items were sometimes cold. Needs improvement."
  },
  {
    id: 10,
    author: "Akua Danso",
    initials: "AD",
    date: "2026-04-09",
    branch: "Airport Branch",
    rating: 5.0,
    tags: ["Rooms", "Spa"],
    text: "Perfect transit stay. They offer a great quick massage service for tired travelers and the blackout curtains ensure good sleep."
  },
  {
    id: 11,
    author: "John Doe",
    initials: "JD",
    date: "2026-04-08",
    branch: "Main Branch",
    rating: 4.5,
    tags: ["Rooms"],
    text: "Loved the view from the balcony. Overall great experience."
  },
  {
    id: 12,
    author: "Jane Smith",
    initials: "JS",
    date: "2026-04-07",
    branch: "Cantonments Branch",
    rating: 3.5,
    tags: ["Restaurant", "Bar"],
    text: "Service was a bit slow in the evenings, but the ambiance made up for it."
  }
];

function ReviewModal({ review, onClose, onMarkReviewed }) {
  if (!review) return null;

  const renderHighlightedText = (text, staffName) => {
    if (!staffName) return text;
    const parts = text.split(new RegExp(`(${staffName})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === staffName.toLowerCase() 
        ? <span key={index} className="highlighted-staff">{part}</span> 
        : part
    );
  };

  const breakdown = review.breakdown || {
    Rooms: review.rating,
    Restaurant: Math.max(1, review.rating - 0.5),
    Wifi: Math.max(1, review.rating - 1.0),
    Spa: review.rating
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container custom-scrollbar" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="author-avatar">{review.initials}</div>
            <div className="modal-author-info">
              <span className="author-name">{review.author}</span>
              <span className="review-meta">{review.date} &middot; {review.branch}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-section">
            <h4 className="section-title">OVERALL RATING</h4>
            <div className="overall-rating-row">
              <div className="rating-huge">{review.rating.toFixed(1)}</div>
              <div className="rating-middle">
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`material-symbols-outlined ${star <= Math.floor(review.rating) ? 'star-filled' : 'star-empty'}`}
                    >
                      {star <= review.rating ? 'star' : (star - 0.5 === review.rating ? 'star_half' : 'star')}
                    </span>
                  ))}
                  <span className="rating-num-inline">{review.rating.toFixed(1)}</span>
                </div>
                {review.rating >= 4 && <span className="positive-badge">Positive</span>}
              </div>
              <div className="modal-tags">
                {review.tags.map(tag => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-section">
            <h4 className="section-title">SCORE BREAKDOWN</h4>
            <div className="score-breakdown-box">
              {Object.entries(breakdown).map(([category, score]) => (
                <div className="breakdown-row" key={category}>
                  <div className="breakdown-label">
                    <span className="material-symbols-outlined breakdown-icon">
                      {category === 'Rooms' ? 'bed' : category === 'Restaurant' ? 'restaurant' : category === 'Wifi' ? 'wifi' : 'spa'}
                    </span>
                    <span>{category}</span>
                  </div>
                  <div className="breakdown-bar-container">
                    <div className="breakdown-bar-fill" style={{ width: `${(score / 5) * 100}%` }}></div>
                  </div>
                  <div className="breakdown-score-info">
                    <span className="breakdown-score">{score.toFixed(1)}</span>
                    <div className="stars-container micro">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`material-symbols-outlined ${star <= Math.floor(score) ? 'star-filled' : 'star-empty'}`}>star</span>
                      ))}
                      <span className="rating-num-inline">{score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4 className="section-title">GUEST COMMENT</h4>
            <div className="guest-comment-box">
              <p>{renderHighlightedText(review.text, review.staffMentioned)}</p>
            </div>
          </div>

          {review.staffMentioned && (
            <div className="modal-section">
              <h4 className="section-title">STAFF MENTIONED</h4>
              <div className="staff-mentioned-badge">
                <span className="material-symbols-outlined">person</span>
                {review.staffMentioned}
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button className="btn-primary" onClick={() => onMarkReviewed(review.id)}>
              <span className="material-symbols-outlined">done_all</span>
              Mark as Reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardReviews() {
  const [reviewsData, setReviewsData] = useState(allReviews);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [hasCommentFilter, setHasCommentFilter] = useState(false);
  
  // Modal State
  const [selectedReview, setSelectedReview] = useState(null);
  
  const clearFilters = () => {
    setSearchTerm('');
    setRatingFilter('');
    setServiceFilter('');
    setHasCommentFilter(false);
    setCurrentPage(1);
  };
  
  const handleMarkReviewed = (id) => {
    setReviewsData(prev => prev.filter(r => r.id !== id));
    setSelectedReview(null);
  };
  
  const filteredReviews = reviewsData.filter(review => {
    const matchesSearch = searchTerm === '' || 
      review.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.text.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesRating = ratingFilter === '' || 
      Math.floor(review.rating).toString() === ratingFilter;
      
    const matchesService = serviceFilter === '' || 
      review.tags.some(tag => tag.toLowerCase() === serviceFilter);
      
    const matchesComment = !hasCommentFilter || review.text.trim().length > 0;
    
    return matchesSearch && matchesRating && matchesService && matchesComment;
  });

  const totalItems = filteredReviews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const hasActiveFilters = searchTerm !== '' || ratingFilter !== '' || serviceFilter !== '' || hasCommentFilter;

  return (
    <div className="dashboard-reviews">
      <div className="reviews-page-header">
        <div className="header-text">
          <h1 className="page-title">Guest Reviews</h1>
          <p className="page-subtitle">{filteredReviews.length} matching reviews</p>
        </div>
        <button className="btn-primary export-btn">
          <span className="material-symbols-outlined">download</span>
          Export CSV
        </button>
      </div>

      <div className="filter-bar hover-lift">
        <div className="search-box">
          <span className="material-symbols-outlined search-icon">search</span>
          <input 
            type="text" 
            placeholder="Search by guest name or comment..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="filter-actions">
          <div className="custom-select">
            <select 
              value={ratingFilter} 
              onChange={(e) => { setRatingFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <span className="material-symbols-outlined select-icon">expand_more</span>
          </div>
          <div className="custom-select">
            <select 
              value={serviceFilter}
              onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Services</option>
              <option value="rooms">Rooms</option>
              <option value="restaurant">Restaurant</option>
              <option value="spa">Spa</option>
              <option value="wifi">WiFi</option>
            </select>
            <span className="material-symbols-outlined select-icon">expand_more</span>
          </div>
          <label className="checkbox-container has-comment-filter">
            <input 
              type="checkbox" 
              checked={hasCommentFilter}
              onChange={(e) => { setHasCommentFilter(e.target.checked); setCurrentPage(1); }}
            />
            <span className="checkmark"></span>
            Has comment
          </label>
          
          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="reviews-grid">
        {currentReviews.map(review => (
          <div className="review-card-full hover-lift" key={review.id} onClick={() => setSelectedReview(review)}>
            <div className="review-card-left">
              <div className="author-avatar">{review.initials}</div>
            </div>
            
            <div className="review-card-middle">
              <div className="review-author-info">
                <span className="author-name">{review.author}</span>
                <span className="review-meta">{review.date} &middot; {review.branch}</span>
              </div>
              
              <div className="review-stars-row">
                <div className="stars-container small">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`material-symbols-outlined ${star <= Math.floor(review.rating) ? 'star-filled' : 'star-empty'}`}
                    >
                      {star <= review.rating ? 'star' : (star - 0.5 === review.rating ? 'star_half' : 'star')}
                    </span>
                  ))}
                </div>
                <span className="review-rating-num">{review.rating.toFixed(1)}</span>
              </div>
              
              <div className="review-tags">
                {review.tags.map(tag => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
              
              <p className="review-text">{review.text}</p>
            </div>
            
            <div className="review-card-right">
              <span className={`big-rating ${review.rating >= 4 ? 'text-green' : 'text-orange'}`}>
                {review.rating.toFixed(1)}
              </span>
              <span className="material-symbols-outlined chevron-right">chevron_right</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <span className="material-symbols-outlined">chevron_left</span>
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({length: totalPages}, (_, i) => i + 1).map(num => (
              <button 
                key={num} 
                className={`page-num ${currentPage === num ? 'active' : ''}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
          </div>

          <button 
            className="page-btn" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            Next
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}

      <ReviewModal 
        review={selectedReview} 
        onClose={() => setSelectedReview(null)} 
        onMarkReviewed={handleMarkReviewed}
      />
    </div>
  );
}
