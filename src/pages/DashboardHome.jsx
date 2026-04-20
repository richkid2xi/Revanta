import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import './DashboardHome.css';

const data = [
  { date: 'Mar 22', score: 4.0 },
  { date: 'Mar 25', score: 4.1 },
  { date: 'Mar 28', score: 4.0 },
  { date: 'Mar 31', score: 4.2 },
  { date: 'Apr 03', score: 4.1 },
  { date: 'Apr 06', score: 4.2 },
  { date: 'Apr 09', score: 4.3 },
  { date: 'Apr 12', score: 4.2 },
  { date: 'Apr 15', score: 4.3 },
  { date: 'Apr 18', score: 4.2 },
];

const reviewsData = [
  {
    id: 1,
    author: "Kwame Asante",
    date: "2026-04-18",
    branch: "Main Branch",
    rating: 5.0,
    tags: ["Rooms", "Restaurant", "Spa"],
    text: "Absolutely phenomenal stay. The staff went above and beyond. Special mention to Emmanuel at the front desk — truly exceptional service."
  },
  {
    id: 2,
    author: "Abena Mensah",
    date: "2026-04-17",
    branch: "Main Branch",
    rating: 4.0,
    tags: ["Restaurant", "WiFi"],
    text: "Great food and comfortable rooms. WiFi was terrible throughout my stay — kept dropping every hour. Please fix this urgently."
  },
  {
    id: 3,
    author: "James Osei",
    date: "2026-04-16",
    branch: "Cantonments Branch",
    rating: 3.0,
    tags: ["Rooms"],
    text: "Decent stay overall, but the air conditioning in my room was quite noisy. The location is excellent though."
  },
  {
    id: 4,
    author: "Grace Afriyie",
    date: "2026-04-15",
    branch: "Airport Branch",
    rating: 5.0,
    tags: ["Conference", "Restaurant"],
    text: "Hosted a 3-day corporate seminar here. The catering team was fantastic, and the audiovisual setup was flawless."
  },
  {
    id: 5,
    author: "Kofi Annan",
    date: "2026-04-14",
    branch: "Main Branch",
    rating: 4.0,
    tags: ["Spa", "Rooms"],
    text: "Very relaxing spa experience. The room was pristine, though the check-in process took slightly longer than expected."
  },
  {
    id: 6,
    author: "Esi Boateng",
    date: "2026-04-14",
    branch: "Cantonments Branch",
    rating: 2.0,
    tags: ["Rooms", "Housekeeping"],
    text: "Found the bed linens slightly stained upon arrival. Housekeeping replaced them immediately when called, but still disappointing."
  },
  {
    id: 7,
    author: "Daniel Kwarteng",
    date: "2026-04-12",
    branch: "Airport Branch",
    rating: 5.0,
    tags: ["Restaurant", "Bar"],
    text: "The rooftop bar has the best cocktails in the city! Bartender was extremely knowledgeable and friendly."
  },
  {
    id: 8,
    author: "Ama Serwaa",
    date: "2026-04-11",
    branch: "Main Branch",
    rating: 4.0,
    tags: ["WiFi", "Conference"],
    text: "Good business hotel. Internet speeds are excellent in the lobby but decent in the rooms. Conference facilities are top-notch."
  },
  {
    id: 9,
    author: "Samuel Yeboah",
    date: "2026-04-10",
    branch: "Cantonments Branch",
    rating: 3.0,
    tags: ["Restaurant"],
    text: "Breakfast buffet lacked variety for a 4-star hotel. Hot items were sometimes cold. Needs improvement."
  },
  {
    id: 10,
    author: "Akua Danso",
    date: "2026-04-09",
    branch: "Airport Branch",
    rating: 5.0,
    tags: ["Rooms", "Spa"],
    text: "Perfect transit stay. They offer a great quick massage service for tired travelers and the blackout curtains ensure good sleep."
  }
];

export default function DashboardHome() {
  const [chartPeriod, setChartPeriod] = useState('30d');

  return (
    <div className="dashboard-home">
      {/* Summary Metrics Grid */}
      <div className="metrics-grid">
        
        {/* Metric 1 */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">OVERALL SCORE</span>
            <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(251, 146, 60, 0.1)' }}>
              <span className="material-symbols-outlined" style={{ color: '#fb923c' }}>star</span>
            </div>
          </div>
          <div className="metric-body">
            <div className="metric-value-row">
              <div className="stars-container">
                <span className="material-symbols-outlined star-filled">star</span>
                <span className="material-symbols-outlined star-filled">star</span>
                <span className="material-symbols-outlined star-filled">star</span>
                <span className="material-symbols-outlined star-filled">star</span>
                <span className="material-symbols-outlined star-half">star_half</span>
              </div>
              <span className="metric-value">4.2</span>
            </div>
            <p className="metric-subtitle">Based on 47 reviews</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">TOTAL REVIEWS</span>
            <div className="metric-icon-wrapper">
              <span className="material-symbols-outlined">chat</span>
            </div>
          </div>
          <div className="metric-body">
            <span className="metric-value large">47</span>
            <p className="metric-subtitle">Across all 3 branches</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">RESPONSE RATE</span>
            <div className="metric-icon-wrapper">
              <span className="material-symbols-outlined">reply</span>
            </div>
          </div>
          <div className="metric-body">
            <span className="metric-value large">68%</span>
            <p className="metric-subtitle">Staff responses to reviews</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">TOP DEPARTMENT</span>
            <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <span className="material-symbols-outlined" style={{ color: '#3b82f6' }}>restaurant</span>
            </div>
          </div>
          <div className="metric-body">
            <span className="metric-value large">Restaurant</span>
            <p className="metric-subtitle">Score 4.6 this month</p>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">MOST FLAGGED ISSUE</span>
            <div className="metric-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>error</span>
            </div>
          </div>
          <div className="metric-body">
            <span className="metric-value large">WiFi Connectivity</span>
            <p className="metric-subtitle">Mentioned in 38% of reviews</p>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-label">WEEKLY TREND</span>
            <div className="metric-icon-wrapper">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
          </div>
          <div className="metric-body">
            <span className="metric-value large">+0.3</span>
            <p className="metric-subtitle">Score change vs last week</p>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="chart-section">
        <div className="chart-header">
          <h3 className="chart-title">Guest Satisfaction Trend</h3>
          <div className="period-selector">
            <button 
              className={`period-btn ${chartPeriod === '7d' ? 'active' : ''}`}
              onClick={() => setChartPeriod('7d')}
            >
              7d
            </button>
            <button 
              className={`period-btn ${chartPeriod === '30d' ? 'active' : ''}`}
              onClick={() => setChartPeriod('30d')}
            >
              30d
            </button>
            <button 
              className={`period-btn ${chartPeriod === '90d' ? 'active' : ''}`}
              onClick={() => setChartPeriod('90d')}
            >
              90d
            </button>
          </div>
        </div>
        
        <div className="chart-container" style={{ position: 'relative', width: '100%', height: 300, minWidth: 0 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }}
                  itemStyle={{ color: 'var(--primary-color)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--primary-color)" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: 'var(--primary-color)', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department Scores */}
      <div className="content-card dept-scores-card">
        <h3 className="card-title">Department Scores</h3>
        <div className="dept-grid">
          
          <div className="dept-item">
            <div className="dept-header">
              <span className="material-symbols-outlined dept-icon" style={{ color: 'var(--primary-color)' }}>bed</span>
              <span className="dept-name">Rooms</span>
            </div>
            <div className="dept-stats">
              <div className="dept-score-col">
                <span className="dept-score">3.8</span>
                <span className="dept-trend text-red">
                  ↓ 0.2
                </span>
              </div>
              <div className="sparkline">
                <svg width="48" height="16" viewBox="0 0 48 16">
                  <path d="M0,8 L12,8 L24,12 L36,14 L48,15" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="dept-item">
            <div className="dept-header">
              <span className="material-symbols-outlined dept-icon" style={{ color: 'var(--primary-color)' }}>restaurant</span>
              <span className="dept-name">Restaurant</span>
            </div>
            <div className="dept-stats">
              <div className="dept-score-col">
                <span className="dept-score">4.6</span>
                <span className="dept-trend text-green">
                  ↑ 0.4
                </span>
              </div>
              <div className="sparkline">
                <svg width="48" height="16" viewBox="0 0 48 16">
                  <path d="M0,14 L12,14 L24,10 L36,6 L48,4" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="dept-item">
            <div className="dept-header">
              <span className="material-symbols-outlined dept-icon" style={{ color: 'var(--primary-color)' }}>meeting_room</span>
              <span className="dept-name">Conference</span>
            </div>
            <div className="dept-stats">
              <div className="dept-score-col">
                <span className="dept-score">4.1</span>
                <span className="dept-trend text-green">
                  ↑ 0.1
                </span>
              </div>
              <div className="sparkline">
                <svg width="48" height="16" viewBox="0 0 48 16">
                  <path d="M0,12 L12,12 L24,10 L36,8 L48,7" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="dept-item">
            <div className="dept-header">
              <span className="material-symbols-outlined dept-icon" style={{ color: 'var(--primary-color)' }}>spa</span>
              <span className="dept-name">Spa</span>
            </div>
            <div className="dept-stats">
              <div className="dept-score-col">
                <span className="dept-score">4.4</span>
                <span className="dept-trend text-green">
                  ↑ 0.2
                </span>
              </div>
              <div className="sparkline">
                <svg width="48" height="16" viewBox="0 0 48 16">
                  <path d="M0,10 L12,10 L24,8 L36,5 L48,4" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Recent Reviews */}
      <div className="content-card reviews-card">
        <div className="reviews-header">
          <h3 className="card-title">Recent Reviews</h3>
          <span className="reviews-count">10 total</span>
        </div>
        
        <div className="reviews-list">
          
          {reviewsData.map((review) => (
            <div className="review-item" key={review.id}>
              <div className="review-top-row">
                <div className="review-author">
                  <span className="author-name">{review.author}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <span className="review-branch">{review.branch}</span>
              </div>
              
              <div className="review-stars-row">
                <div className="stars-container small">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`material-symbols-outlined ${star <= review.rating ? 'star-filled' : 'star-empty'}`}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="review-rating-num">{review.rating.toFixed(1)}</span>
              </div>
              
              {review.tags && review.tags.length > 0 && (
                <div className="review-tags">
                  {review.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
              
              <p className="review-text">
                {review.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
