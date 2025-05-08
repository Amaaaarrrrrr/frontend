<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import axios from 'axios';

const UnitRegistration = () => {
  const [availableUnits, setAvailableUnits] = useState([]);
  const [registeredUnits, setRegisteredUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchUnits = async () => {
    try {
      const res = await axios.get('/api/student/units');
      setAvailableUnits(res.data.available_units);
      setRegisteredUnits(res.data.registered_units);
    } catch (err) {
      setError('Failed to load unit data.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = (unitId) => {
    if (selectedUnits.includes(unitId)) {
      setSelectedUnits(selectedUnits.filter((id) => id !== unitId));
    } else {
      setSelectedUnits([...selectedUnits, unitId]);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('/api/student/units/register', {
        unit_ids: selectedUnits
      });
      setMessage('Units registered successfully!');
      setRegisteredUnits([...registeredUnits, ...res.data.newly_registered]);
      setSelectedUnits([]);
    } catch (err) {
      setError('Unit registration failed.');
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Unit Registration</h1>

      <Card title="Available Units">
        {loading ? (
          <p className="text-gray-500">Loading units...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {availableUnits.length > 0 ? (
              <div className="space-y-4">
                {availableUnits.map((unit) => (
                  <div key={unit.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`unit-${unit.id}`}
                      checked={selectedUnits.includes(unit.id)}
                      onChange={() => handleUnitToggle(unit.id)}
                      disabled={registeredUnits.some((r) => r.id === unit.id)}
                    />
                    <label htmlFor={`unit-${unit.id}`}>
                      {unit.code} - {unit.title}
                    </label>
                  </div>
                ))}
                <button
                  onClick={handleRegister}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  disabled={selectedUnits.length === 0}
                >
                  Register Selected Units
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No units available for registration.</p>
            )}
            {message && <p className="text-green-600 mt-2">{message}</p>}
          </>
        )}
      </Card>

      {registeredUnits.length > 0 && (
        <Card title="Registered Units">
          <ul className="list-disc list-inside text-gray-700">
            {registeredUnits.map((unit) => (
              <li key={unit.id}>
                {unit.code} - {unit.title}
              </li>
            ))}
          </ul>
        </Card>
      )}
=======
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from 'lucide-react';

const UnitRegistration= () => {
  const [courseCode, setCourseCode] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoursesAndSemesters = async () => {
      try {
        setLoading(true);
        const courseResponse = await axios.get('http://127.0.0.1:5000/api/courses');
        const semesterResponse = await axios.get('http://127.0.0.1:5000/api/semesters/active');

        setCourses(courseResponse.data);
        setSemesters(Array.isArray(semesterResponse.data) ? semesterResponse.data : [semesterResponse.data]);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesAndSemesters();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Get the token from localStorage (or wherever it's stored)
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setError('User is not logged in');
        return;
      }
  
      const response = await axios.post(
        'http://127.0.0.1:5000/api/registration', 
        {
          course_code: courseCode,
          semester_id: semesterId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      
      toast.success('Registration successful!');
      setCourseCode('');
      setSemesterId('');
      setRegistrations((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteRegistration = async (registrationId) => {
    try {
      setLoading(true);
      await axios.delete('http://127.0.0.1:5000/api/registration', {
        data: { registration_id: registrationId },
      });
      setRegistrations(registrations.filter((reg) => reg.id !== registrationId));
      toast.success('Registration deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Register for a Course
        </h1>

        {loading && <Loader className="animate-spin w-8 h-8 mr-2 text-blue-700" />}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">Course Code</label>
            <select
              id="courseCode"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.title || course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="semesterId" className="block text-sm font-medium text-gray-700">Semester</label>
            <select
              id="semesterId"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Select Semester</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            Register
          </button>
        </form>

        {/* Existing Registrations */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Your Current Registrations</h2>
          <ul className="mt-4">
            {registrations.length === 0 ? (
              <p className="text-gray-600">No registrations found.</p>
            ) : (
              registrations.map((reg) => (
                <li key={reg.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-800">{reg.course_code} - {reg.course_title}</p>
                      <p className="text-sm text-gray-500">Semester: {reg.semester_id}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteRegistration(reg.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
>>>>>>> 83fafbbf366acda14318c843712b6255be9990d4
    </div>
  );
};

export default UnitRegistration;
