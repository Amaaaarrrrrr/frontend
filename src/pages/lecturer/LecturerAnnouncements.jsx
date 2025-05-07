import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LecturerAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/announcements', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // 👉 assuming you store JWT in localStorage
        },
      })
      .then((response) => {
        setAnnouncements(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching announcements:', err);
        setError('Failed to load announcements.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading announcements...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          announcements.map((a, index) => (
            <div key={index} className="border rounded p-4 shadow-sm">
              <h2 className="text-xl font-semibold">{a.title}</h2>
              <p className="text-gray-700">{a.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                Posted by {a.posted_by} on {new Date(a.date_posted).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LecturerAnnouncements;
