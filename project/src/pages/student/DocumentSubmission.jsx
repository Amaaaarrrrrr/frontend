import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import axios from 'axios';

const DocumentSubmission = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocuments = async () => {
    try {
      const res = await axios.get('/api/documents');
      setDocuments(res.data);
    } catch (err) {
      setError('Failed to load submitted documents.');
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !documentType) {
      setError('Please select a document type and file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('type', documentType);

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSelectedFile(null);
      setDocumentType('');
      fetchDocuments();
    } catch (err) {
      setError('Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Document Submission</h1>

      <Card title="Upload Documents">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full mt-1 border rounded px-3 py-2"
              required
            >
              <option value="">Select a type</option>
              <option value="ID">National ID</option>
              <option value="KCSE">KCSE Certificate</option>
              <option value="ADMISSION">Admission Letter</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Choose File</label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={handleFileChange}
              className="mt-1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Submit Document'}
          </button>
        </form>
      </Card>

      <Card title="Submitted Documents">
        {documents.length === 0 ? (
          <p className="text-gray-600">No documents submitted yet.</p>
        ) : (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc.id} className="border-b pb-2">
                <strong>{doc.type}</strong> -{' '}
                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default DocumentSubmission;
