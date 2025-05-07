import React from 'react';
import Card  from '../../components/common/Card';

const StudentFees = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Fees & Payments</h1>
      <Card title="Fee Statement">
        <p className="text-gray-600">Fee details will appear here</p>
      </Card>
    </div>
  );
};

export default StudentFees;