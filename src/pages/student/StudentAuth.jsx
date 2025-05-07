import React from 'react';
import Card  from '../../components/common/Card';

const StudentAuth = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <Card title="Profile Information">
        <p className="text-gray-600">Profile details will appear here</p>
      </Card>
    </div>
  );
};

export default StudentAuth;