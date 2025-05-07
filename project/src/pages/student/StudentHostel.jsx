import React from 'react';
import Card from '../../components/common/Card';

const StudentHostel = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Hostel Booking</h1>
      <Card title="Available Rooms">
        <p className="text-gray-600">Hostel booking form will appear here</p>
      </Card>
    </div>
  );
};

export default StudentHostel;