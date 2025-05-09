import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GradeSubmission = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semester, setSemester] = useState(null);
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    grade: '',
    semester_id: ''
  });
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchActiveSemester();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data.students);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const fetchActiveSemester = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/semesters/active');
      setSemester(res.data);
      setFormData(prev => ({ ...prev, semester_id: res.data.id }));
    } catch (err) {
      console.error('Failed to fetch active semester:', err);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/grades', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message || 'Grade submitted successfully!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error submitting grade');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Submit Grades</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Dropdown */}
        <div>
          <label className="block mb-1">Student</label>
          <select
            name="student_id"
            onChange={handleChange}
            value={formData.student_id}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.user.name} ({s.user.email})
              </option>
            ))}
          </select>
        </div>

        {/* Course Dropdown */}
        <div>
          <label className="block mb-1">Course</label>
          <select
            name="course_id"
            onChange={handleChange}
            value={formData.course_id}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* Semester (read-only since it's active only) */}
        <div>
          <label className="block mb-1">Semester</label>
          <input
            type="text"
            value={semester?.name || 'Loading...'}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Grade Input */}
        <div>
          <label className="block mb-1">Grade</label>
          <input
            type="text"
            name="grade"
            onChange={handleChange}
            value={formData.grade}
            placeholder="e.g., A, B+, 85"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Submit Grade
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div className="mt-4 text-center text-sm text-blue-600 font-medium">{message}</div>
      )}
    </div>
  );
};

export default GradeSubmission;
