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
import './DashboardInsights.css';

const trendData = [
  { date: 'Mar 22', overall: 4.1, rooms: 4.0, restaurant: 4.2, spa: 4.3, wifi: 3.2 },
  { date: 'Mar 25', overall: 4.0, rooms: 3.9, restaurant: 4.3, spa: 4.2, wifi: 3.0 },
  { date: 'Mar 28', overall: 4.0, rooms: 3.8, restaurant: 4.4, spa: 4.5, wifi: 2.8 },
  { date: 'Mar 31', overall: 4.2, rooms: 3.9, restaurant: 4.5, spa: 4.6, wifi: 3.1 },
  { date: 'Apr 03', overall: 4.1, rooms: 3.7, restaurant: 4.4, spa: 4.4, wifi: 2.9 },
  { date: 'Apr 06', overall: 4.2, rooms: 3.8, restaurant: 4.5, spa: 4.6, wifi: 3.3 },
  { date: 'Apr 09', overall: 4.3, rooms: 3.8, restaurant: 4.6, spa: 4.7, wifi: 3.5 },
  { date: 'Apr 12', overall: 4.2, rooms: 3.8, restaurant: 4.6, spa: 4.6, wifi: 3.4 },
  { date: 'Apr 15', overall: 4.3, rooms: 3.9, restaurant: 4.7, spa: 4.8, wifi: 3.6 },
  { date: 'Apr 18', overall: 4.2, rooms: 3.8, restaurant: 4.6, spa: 4.7, wifi: 3.2 },
];

const complaintsData = [
  { issue: 'WiFi Connectivity', count: 18, percentage: 38 },
  { issue: 'Room Noise', count: 14, percentage: 30 },
  { issue: 'Slow Check-in', count: 9, percentage: 19 },
  { issue: 'Musty Smell', count: 7, percentage: 15 },
  { issue: 'Limited Menu', count: 5, percentage: 11 },
  { issue: 'Parking Issues', count: 4, percentage: 9 },
];

const staffData = [
  { initial: 'E', name: 'Emmanuel', dept: 'Front Desk', count: 8, sentiment: 'positive' },
  { initial: 'A', name: 'Akosua', dept: 'Spa', count: 6, sentiment: 'positive' },
  { initial: 'K', name: 'Kweku', dept: 'Restaurant', count: 5, sentiment: 'positive' },
  { initial: 'A', name: 'Abena', dept: 'Housekeeping', count: 4, sentiment: 'positive' },
  { initial: 'K', name: 'Kofi', dept: 'Front Desk', count: 3, sentiment: 'neutral' },
  { initial: 'Y', name: 'Yaw', dept: 'Restaurant', count: 2, sentiment: 'negative' },
];

// 7 time slots, 7 days
// Values between 0 and ~12 to match the heatmap image
const heatmapData = {
  times: ['12am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
  days: [
    { day: 'Mon', values: [0, 1, 3, 5, 4, 7, 2] },
    { day: 'Tue', values: [0, 0, 2, 4, 6, 8, 3] },
    { day: 'Wed', values: [1, 0, 3, 6, 5, 9, 4] },
    { day: 'Thu', values: [0, 1, 4, 7, 6, 8, 3] },
    { day: 'Fri', values: [1, 0, 2, 5, 8, 12, 6] },
    { day: 'Sat', values: [2, 1, 1, 3, 7, 11, 8] },
    { day: 'Sun', values: [3, 1, 2, 4, 5, 9, 5] },
  ]
};

// Heatmap color logic
const getHeatmapColor = (value) => {
  if (value === 0) return 'var(--heatmap-0)';
  if (value <= 2) return 'var(--heatmap-1)';
  if (value <= 4) return 'var(--heatmap-2)';
  if (value <= 7) return 'var(--heatmap-3)';
  return 'var(--heatmap-4)';
};

export default function DashboardInsights() {
  const [activeLines, setActiveLines] = useState({
    overall: true,
    rooms: true,
    restaurant: true,
    spa: false,
    wifi: false
  });

  const toggleLine = (line) => {
    setActiveLines(prev => ({ ...prev, [line]: !prev[line] }));
  };

  return (
    <div className="dashboard-insights">
      
      {/* Score Trends Section */}
      <div className="content-card trends-card">
        <div className="trends-header">
          <h3 className="card-title">Score Trends — All Departments</h3>
          
          <div className="legend-toggles">
            <button 
              className={`legend-btn overall ${activeLines.overall ? 'active' : ''}`}
              onClick={() => toggleLine('overall')}
            >
              {!activeLines.overall && <span className="dot"></span>}
              Overall
            </button>
            <button 
              className={`legend-btn rooms ${activeLines.rooms ? 'active' : ''}`}
              onClick={() => toggleLine('rooms')}
            >
              {!activeLines.rooms && <span className="dot"></span>}
              Rooms
            </button>
            <button 
              className={`legend-btn restaurant ${activeLines.restaurant ? 'active' : ''}`}
              onClick={() => toggleLine('restaurant')}
            >
              {!activeLines.restaurant && <span className="dot"></span>}
              Restaurant
            </button>
            <button 
              className={`legend-btn spa ${activeLines.spa ? 'active' : ''}`}
              onClick={() => toggleLine('spa')}
            >
              {!activeLines.spa && <span className="dot"></span>}
              Spa
            </button>
            <button 
              className={`legend-btn wifi ${activeLines.wifi ? 'active' : ''}`}
              onClick={() => toggleLine('wifi')}
            >
              {!activeLines.wifi && <span className="dot"></span>}
              Wifi
            </button>
          </div>
        </div>

        <div className="chart-container" style={{ position: 'relative', width: '100%', height: 320, minWidth: 0 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="rgba(255,255,255,0.05)" />
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
                />
                {activeLines.overall && (
                  <Line type="monotone" dataKey="overall" stroke="#14b8a6" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
                {activeLines.rooms && (
                  <Line type="monotone" dataKey="rooms" stroke="#8b5cf6" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
                {activeLines.restaurant && (
                  <Line type="monotone" dataKey="restaurant" stroke="#f59e0b" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
                {activeLines.spa && (
                  <Line type="monotone" dataKey="spa" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
                {activeLines.wifi && (
                  <Line type="monotone" dataKey="wifi" stroke="#ef4444" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Row: Complaints & Mentions */}
      <div className="insights-middle-row">
        
        {/* Common Complaints */}
        <div className="content-card complaints-card">
          <div className="card-header-flex">
            <h3 className="card-title">Common Complaints</h3>
            <button className="export-btn">
              <span className="material-symbols-outlined">download</span>
              Export
            </button>
          </div>
          
          <div className="complaints-list">
            {complaintsData.map((item, idx) => (
              <div className="complaint-item" key={idx}>
                <div className="complaint-info">
                  <span className="complaint-name">{item.issue}</span>
                  <span className="complaint-stats">
                    {item.count} &middot; <span className="text-red">{item.percentage}%</span>
                  </span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill red-fill" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Mentions */}
        <div className="content-card mentions-card">
          <h3 className="card-title">Staff Mentions</h3>
          <div className="mentions-list">
            {staffData.map((staff, idx) => (
              <div className="mention-item" key={idx}>
                <div className="mention-left">
                  <div className="staff-avatar">{staff.initial}</div>
                  <div className="staff-info">
                    <span className="staff-name">{staff.name}</span>
                    <span className="staff-dept">{staff.dept}</span>
                  </div>
                </div>
                <div className="mention-right">
                  <span className="mention-count">{staff.count}x</span>
                  <span className={`sentiment-badge ${staff.sentiment}`}>{staff.sentiment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Peak Review Times Heatmap */}
      <div className="content-card heatmap-card">
        <h3 className="card-title">Peak Review Times</h3>
        <div className="heatmap-container">
          
          <div className="heatmap-header">
            <div className="empty-corner"></div>
            {heatmapData.times.map(time => (
              <div className="heatmap-time" key={time}>{time}</div>
            ))}
          </div>

          {heatmapData.days.map((row, idx) => (
            <div className="heatmap-row" key={idx}>
              <div className="heatmap-day">{row.day}</div>
              {row.values.map((val, vIdx) => (
                <div 
                  className="heatmap-cell" 
                  key={vIdx}
                  style={{ backgroundColor: getHeatmapColor(val) }}
                >
                  {val > 0 ? val : ''}
                </div>
              ))}
            </div>
          ))}

          <div className="heatmap-legend">
            <span>Low</span>
            <div className="legend-boxes">
              <div className="l-box" style={{ backgroundColor: 'var(--heatmap-0)' }}></div>
              <div className="l-box" style={{ backgroundColor: 'var(--heatmap-1)' }}></div>
              <div className="l-box" style={{ backgroundColor: 'var(--heatmap-2)' }}></div>
              <div className="l-box" style={{ backgroundColor: 'var(--heatmap-3)' }}></div>
              <div className="l-box" style={{ backgroundColor: 'var(--heatmap-4)' }}></div>
            </div>
            <span>High</span>
          </div>
        </div>
      </div>

    </div>
  );
}
