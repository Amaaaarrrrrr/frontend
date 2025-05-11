import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState({
    assignments: false,
    submitting: false,
    deleting: false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Axios instance with base URL
  const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(prev => ({ ...prev, assignments: true }));
        const assignmentsRes = await api.get('/assignments');
        setAssignments(assignmentsRes.data.assignments || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.error || 'Failed to load assignments');
      } finally {
        setLoading(prev => ({ ...prev, assignments: false }));
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newAssignment.title || !newAssignment.dueDate) {
      setError('Title and Due Date are required');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, submitting: true }));
      
      const payload = {
        title: newAssignment.title,
        description: newAssignment.description || '',
        due_date: new Date(newAssignment.dueDate).atnow
      };

      const response = await api.post('/assignments', payload);
      
      setAssignments(prev => [...prev, response.data.assignment]);
      setNewAssignment({
        title: '',
        description: '',
        dueDate: ''
      });
      setSuccess('Assignment created successfully!');
    } catch (error) {
      console.error('Error posting assignment:', error);
      setError(error.response?.data?.error || 'Failed to create assignment');
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (!window.confirm('Are you sure you want to delete this assignment?')) {
      return;
    }

    try {
      setLoading(prev => ({ ...prev, deleting: true }));
      await api.delete(`/assignments/${assignmentId}`);
      
      setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
      setSuccess('Assignment deleted successfully!');
    } catch (error) {
      console.error('Error deleting assignment:', error);
      setError(error.response?.data?.error || 'Failed to delete assignment');
    } finally {
      setLoading(prev => ({ ...prev, deleting: false }));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin - Manage Assignments</h1>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleAddAssignment} className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Create New Assignment</h2>
        
        <div>
          <label className="block font-semibold mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={newAssignment.title}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Assignment title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={newAssignment.description}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Assignment description"
            rows="3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Due Date *</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={newAssignment.dueDate}
            onChange={handleInputChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading.submitting}
          className={`px-4 py-2 rounded text-white ${loading.submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading.submitting ? 'Creating...' : 'Create Assignment'}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Assignments</h2>
        
        {loading.assignments ? (
          <p>Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p className="text-gray-500">No assignments have been created yet.</p>
        ) : (
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="border rounded p-4 shadow-sm bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{assignment.title}</h3>
                    {assignment.description && (
                      <p className="text-gray-600 mt-1">{assignment.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    disabled={loading.deleting}
                    className={`px-3 py-1 text-white rounded ${loading.deleting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {loading.deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Due: {new Date(assignment.due_date).toLocaleString()}
                  </span>
                  <span>
                    Created: {new Date(assignment.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAssignments;