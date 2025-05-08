import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import axios from 'axios';

const StudentHostel = () => {
  const [rooms, setRooms] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchHostelData = async () => {
    try {
      const res = await axios.get('/api/student/hostel');
      setRooms(res.data.available_rooms);
      setCurrentBooking(res.data.current_booking);
    } catch (err) {
      setError('Failed to load hostel data.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await axios.post('/api/student/hostel/book', {
        room_id: selectedRoomId
      });
      setMessage('Room booked successfully!');
      setCurrentBooking(res.data);
    } catch (err) {
      setError('Booking failed. Try again.');
    }
  };

  useEffect(() => {
    fetchHostelData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Hostel Booking</h1>

      <Card title="Available Rooms">
        {loading ? (
          <p className="text-gray-500">Loading rooms...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {currentBooking ? (
              <p className="text-green-700">
                You have already booked: <strong>{currentBooking.room_name}</strong>
              </p>
            ) : (
              <div className="space-y-4">
                <select
                  className="w-full p-2 border rounded"
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                >
                  <option value="">-- Select a room --</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} ({room.capacity} beds, {room.available_beds} available)
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleBooking}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  disabled={!selectedRoomId}
                >
                  Book Room
                </button>
              </div>
            )}
            {message && <p className="text-green-600">{message}</p>}
          </>
        )}
      </Card>
    </div>
  );
};

export default StudentHostel;
