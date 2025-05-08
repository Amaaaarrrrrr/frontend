import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import axios from 'axios';

const StudentAuth = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/profile'); // Adjust if endpoint is different
      setProfile(res.data);
    } catch (err) {
      setError('Failed to load profile information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

      <Card title="Profile Information">
        {loading ? (
          <p className="text-gray-500">Loading profile...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : profile ? (
          <div className="space-y-2 text-gray-700">
            <div><strong>Full Name:</strong> {profile.full_name}</div>
            <div><strong>Registration No:</strong> {profile.reg_no}</div>
            <div><strong>Email:</strong> {profile.email}</div>
            <div><strong>Course:</strong> {profile.course}</div>
            <div><strong>Phone:</strong> {profile.phone}</div>
            <div><strong>Year of Study:</strong> {profile.year}</div>
          </div>
        ) : (
          <p>No profile data available.</p>
        )}
      </Card>
    </div>
  );
};

export default StudentAuth;
