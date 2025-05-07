import React from 'react';
import Card  from '../../components/common/Card';

const StudentCourses = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
      <div className="grid gap-6">
        <Card title="Enrolled Courses">
          <p className="text-gray-600">Course list will appear here</p>
        </Card>
      </div>
    </div>
  );
};

export default StudentCourses;