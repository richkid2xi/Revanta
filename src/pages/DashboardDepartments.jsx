import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import './DashboardDepartments.css';

const departmentData = [
  {
    id: 1,
    name: "Rooms",
    icon: "bed",
    score: 3.8,
    reviews: 42,
    trend: -0.2,
    posTags: ["spacious", "clean", "comfortable"],
    negTags: ["noisy", "musty", "outdated"]
  },
  {
    id: 2,
    name: "Restaurant",
    icon: "restaurant",
    score: 4.6,
    reviews: 38,
    trend: 0.4,
    posTags: ["delicious", "buffet", "attentive"],
    negTags: ["slow service", "limited menu", "pricey"]
  },
  {
    id: 3,
    name: "Conference",
    icon: "co_present",
    score: 4.1,
    reviews: 15,
    trend: 0.1,
    posTags: ["well-equipped", "spacious", "AV quality"],
    negTags: ["parking", "catering", "booking process"]
  },
  {
    id: 4,
    name: "Spa",
    icon: "eco",
    score: 4.4,
    reviews: 22,
    trend: 0.2,
    posTags: ["relaxing", "professional", "world-class"],
    negTags: ["wait time", "booking", "pricing"]
  },
  {
    id: 5,
    name: "WiFi",
    icon: "wifi",
    score: 2.6,
    reviews: 35,
    trend: -0.5,
    posTags: ["fast in lobby", "good signal", "easy connect"],
    negTags: ["drops", "slow", "unreliable"]
  },
  {
    id: 6,
    name: "Front Desk",
    icon: "headset_mic",
    score: 4.3,
    reviews: 40,
    trend: 0.1,
    posTags: ["friendly", "helpful", "efficient"],
    negTags: ["wait time", "language barrier", "slow check-in"]
  }
];

const GreenSparkline = () => (
  <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 10C12 10 18 5 24 6C30 7 36 2 46 2" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RedSparkline = () => (
  <svg width="48" height="12" viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2C12 2 16 3 24 5C32 7 36 10 46 10" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const generateChartData = (baseScore) => {
  return [
    { name: '2026-03-22', score: Math.min(5, baseScore + 0.3) },
    { name: '2026-03-29', score: Math.min(5, baseScore + 0.1) },
    { name: '2026-04-05', score: Math.max(1, baseScore - 0.1) },
    { name: '2026-04-12', score: Math.min(5, baseScore + 0.0) },
    { name: '2026-04-19', score: baseScore },
  ];
};

function DepartmentDetailView({ dept, onClose }) {
  if (!dept) return null;

  const chartData = generateChartData(dept.score);

  return (
    <div className="dept-detail-view">
      <div className="detail-header">
        <div className="detail-header-left">
          <span className="material-symbols-outlined dept-icon">{dept.icon}</span>
          <h2>{dept.name} &mdash; Detail View</h2>
        </div>
        <button className="detail-close-btn" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="detail-top-grid">
        <div className="detail-chart-section">
          <h4 className="section-title">SCORE HISTORY</h4>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--text-muted)" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  dy={10}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  stroke="var(--text-muted)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--primary-color)" 
                  strokeWidth={2} 
                  dot={{ fill: 'var(--primary-color)', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="detail-words-section">
          <h4 className="section-title">WORD FREQUENCY</h4>
          
          <div className="word-freq-group">
            <div className="word-freq-label text-green">POSITIVE</div>
            <div className="word-bars">
              {dept.posTags.map((tag, idx) => (
                <div className="word-bar-row" key={tag}>
                  <div className="word-bar-container">
                    <div className="word-bar-fill bg-green" style={{ width: `${100 - (idx * 20)}%` }}></div>
                  </div>
                  <span className="word-text">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="word-freq-group">
            <div className="word-freq-label text-red">NEGATIVE</div>
            <div className="word-bars">
              {dept.negTags.map((tag, idx) => (
                <div className="word-bar-row" key={tag}>
                  <div className="word-bar-container">
                    <div className="word-bar-fill bg-red" style={{ width: `${80 - (idx * 25)}%` }}></div>
                  </div>
                  <span className="word-text">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="detail-reviews-section">
        <h4 className="section-title">RELATED REVIEWS</h4>
        <div className="related-reviews-list">
          <div className="related-review-card">
            <div className="related-review-header">
              <div className="related-author-info">
                <span className="author-name">Kwame Asante</span>
                <div className="stars-container micro">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`material-symbols-outlined ${star <= Math.floor(dept.score) ? 'star-filled' : 'star-empty'}`}>star</span>
                  ))}
                  <span className="rating-num-inline">{dept.score.toFixed(1)}</span>
                </div>
              </div>
              <span className="review-date">2026-04-18</span>
            </div>
            <p className="review-text">Absolutely phenomenal stay. The staff went above and beyond. Special mention to Emmanuel at the front desk — truly exceptional service.</p>
          </div>
          
          <div className="related-review-card">
            <div className="related-review-header">
              <div className="related-author-info">
                <span className="author-name">James Osei</span>
                <div className="stars-container micro">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`material-symbols-outlined ${star <= 3 ? 'star-filled' : 'star-empty'}`}>star</span>
                  ))}
                  <span className="rating-num-inline">3.0</span>
                </div>
              </div>
              <span className="review-date">2026-04-16</span>
            </div>
            <p className="review-text">Room was noisy due to construction next door. WiFi barely worked. Restaurant saved the experience.</p>
          </div>
          
          <div className="related-review-card">
            <div className="related-review-header">
              <div className="related-author-info">
                <span className="author-name">Ama Boateng</span>
                <div className="stars-container micro">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`material-symbols-outlined ${star <= 5 ? 'star-filled' : 'star-empty'}`}>star</span>
                  ))}
                  <span className="rating-num-inline">5.0</span>
                </div>
              </div>
              <span className="review-date">2026-04-15</span>
            </div>
            <p className="review-text">Perfect in every way. Always at the top, was incredible. Will definitely return.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardDepartments() {
  const [selectedDept, setSelectedDept] = useState(null);

  return (
    <div className="dashboard-departments">
      <div className="page-header">
        <h1 className="page-title">Departments Overview</h1>
        <p className="page-subtitle">Granular sentiment analysis across all hotel services</p>
      </div>

      <div className="dept-grid">
        {departmentData.map(dept => {
          const isPositive = dept.trend > 0;
          const isSelected = selectedDept?.id === dept.id;
          return (
            <div 
              className={`dept-card hover-lift ${isSelected ? 'selected' : ''}`} 
              key={dept.id}
              onClick={() => setSelectedDept(isSelected ? null : dept)}
            >
              <div className="dept-header">
                <div className="dept-title">
                  <span className="material-symbols-outlined dept-icon">{dept.icon}</span>
                  <h3>{dept.name}</h3>
                </div>
                <div className={`dept-trend ${isPositive ? 'trend-up' : 'trend-down'}`}>
                  <span className="trend-val">
                    {isPositive ? '+' : ''}{dept.trend.toFixed(1)}
                  </span>
                  <div className="trend-sparkline">
                    {isPositive ? <GreenSparkline /> : <RedSparkline />}
                  </div>
                </div>
              </div>
              
              <div className="dept-score-area">
                <div className="dept-score-val">{dept.score.toFixed(1)}</div>
                <div className="dept-reviews-count">{dept.reviews} reviews</div>
              </div>
              
              <div className="dept-tags">
                <div className="tags-row positive">
                  {dept.posTags.map(tag => (
                    <span className="tag-pos" key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="tags-row negative">
                  {dept.negTags.map(tag => (
                    <span className="tag-neg" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedDept && (
        <DepartmentDetailView 
          dept={selectedDept} 
          onClose={() => setSelectedDept(null)} 
        />
      )}
    </div>
  );
}
