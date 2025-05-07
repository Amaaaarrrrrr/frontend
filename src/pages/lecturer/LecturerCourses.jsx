import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LecturerCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/courses', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading courses...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="space-y-4">
        {courses.length === 0 ? (
          <p>No courses assigned.</p>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="p-4 border rounded shadow-sm">
              <h2 className="font-semibold text-lg">
                {course.code}: {course.title}
              </h2>
              <p className="text-sm text-gray-600">Semester: {course.semester}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LecturerCourses;
