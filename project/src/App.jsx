import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import UnitRegistration from './pages/student/UnitRegistration';
import StudentFees from './pages/student/StudentFees';
import StudentHostel from './pages/student/StudentHostel';
import DocumentSubmission from './pages/student/DocumentSubmission';
import StudentAuth from './pages/student/StudentAuth';
import LecturerDashboard from './pages/lecturer/LecturerDashboard';
import LecturerCourses from './pages/lecturer/LecturerCourses';
import GradesSubmission from './pages/lecturer/GradesSubmission';
import LecturerAnnouncements from './pages/lecturer/LecturerAnnouncements';
import Assignments from './pages/lecturer/Assignments';
import LecturerAuth from './pages/lecturer/LecturerAuth';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import FeesManagement from './pages/admin/FeesManagement';
import HostelManagement from './pages/admin/HostelManagement';
import LecturerAssignment from './pages/admin/LecturerAssignment';
import StudentRegistrationApproval from './pages/admin/StudentRegistrationApproval';
import FeeClearanceStatus from './pages/admin/FeeClearanceStatus';
import AdminAuth from './pages/admin/AdminAuth';
import CoursePage from './pages/CoursePage';
import UnitRegistrationForm from './forms/UnitRegistrationForm';
// Layout components
import StudentLayout from './layouts/StudentLayout';
import LecturerLayout from './layouts/LecturerLayout';
import AdminLayout from './layouts/AdminLayout';

// Login page
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/registration" element={<UnitRegistrationForm />} />
        

          {/* Student routes */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="register-units" element={<UnitRegistration />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="hostel" element={<StudentHostel />} />
            <Route path="documents" element={<DocumentSubmission />} />
            <Route path="auth" element={<StudentAuth />} />
          </Route>

          {/* Lecturer routes */}
          <Route
            path="/lecturer/*"
            element={
              <ProtectedRoute allowedRole="lecturer">
                <LecturerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<LecturerDashboard />} />
            <Route path="courses" element={<LecturerCourses />} />
            <Route path="grades" element={<GradesSubmission />} />
            <Route path="announcements" element={<LecturerAnnouncements />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="auth" element={<LecturerAuth />} />
          </Route>

          {/* Redirect from /admin_dashboard to /admin/dashboard */}
          <Route path="/admin_dashboard" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="announcements" element={<AdminAnnouncements />} />
            <Route path="fees" element={<FeesManagement />} />
            <Route path="hostels" element={<HostelManagement />} />
            <Route path="assign-lecturers" element={<LecturerAssignment />} />
            <Route path="student-registration" element={<StudentRegistrationApproval />} />
            <Route path="fee-status" element={<FeeClearanceStatus />} />
            <Route path="auth" element={<AdminAuth />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
