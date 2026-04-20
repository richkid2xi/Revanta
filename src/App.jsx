import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DashboardReviews from './pages/DashboardReviews';
import DashboardDepartments from './pages/DashboardDepartments';
import DashboardInsights from './pages/DashboardInsights';
import DashboardQRCodes from './pages/DashboardQRCodes';
import DashboardSettings from './pages/DashboardSettings';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import FeedbackForm from './pages/FeedbackForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="reviews" element={<DashboardReviews />} />
          <Route path="departments" element={<DashboardDepartments />} />
          <Route path="insights" element={<DashboardInsights />} />
          <Route path="qrcodes" element={<DashboardQRCodes />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        {/* Public Feedback Routes - standalone, no layout */}
        <Route path="/feedback/:branchId" element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
}

export default App;
