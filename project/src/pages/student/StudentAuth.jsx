<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import API from '../../api/axios';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/profile', { withCredentials: true });
        
        if (response.status === 200) {
          setProfile(response.data);
        } else {
          setError('Failed to fetch profile');
        }
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Your Profile
        </h1>

        {loading && <Loader className="animate-spin w-6 h-6 mx-auto text-indigo-600 mb-4" />}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {profile && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Profile Details</h2>
            <div className="mb-4">
              <img
                src={profile.profile_picture || '/idefault-avatar.png'}
                alt="Profile"
                className="w-auto h-auto rounded-full mx-auto mb-4"
              />
              <p className="text-gray-800 font-medium">Name: {profile.name}</p>
              <p className="text-gray-800 font-medium">Email: {profile.email}</p>
    
            </div>
          </div>
        )}
      </div>
>>>>>>> 83fafbbf366acda14318c843712b6255be9990d4
    </div>
  );
};

<<<<<<< HEAD
export default StudentAuth;
=======
export default Profile;
>>>>>>> 83fafbbf366acda14318c843712b6255be9990d4
