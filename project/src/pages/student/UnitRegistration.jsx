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
    </div>
  );
};

export default UnitRegistration;
