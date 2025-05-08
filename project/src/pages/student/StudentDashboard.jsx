import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import axios from 'axios';

const StudentDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/student/dashboard');
      setStats(res.data);
    } catch (err) {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Current Semester">
            <p className="text-gray-700">{stats.current_semester}</p>
          </Card>
          <Card title="Enrolled Courses">
            <p className="text-gray-700">{stats.course_count} Active Course{stats.course_count !== 1 && 's'}</p>
          </Card>
          <Card title="GPA">
            <p className="text-gray-700">{stats.gpa}</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
