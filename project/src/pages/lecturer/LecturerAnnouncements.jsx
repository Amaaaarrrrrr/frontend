// src/pages/lecturer/LecturerAnnouncements.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LecturerAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/announcements');
        console.log('Fetched announcements:', response.data);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Failed to load announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>

      {loading ? (
        <p className="text-gray-600">Loading announcements...</p>
      ) : announcements.length === 0 ? (
        <p className="text-gray-500">No announcements available.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.id || index}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
              <p className="text-gray-700 mt-1">{announcement.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                Posted by <span className="font-medium">{announcement.posted_by}</span> on{' '}
                {new Date(announcement.date_posted).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LecturerAnnouncements;
