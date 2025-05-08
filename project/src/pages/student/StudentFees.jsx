import React, { useEffect, useState } from 'react';
import Card from '../../components/common/Card';
import axios from 'axios';

const StudentFees = () => {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFees = async () => {
    try {
      const res = await axios.get('/api/student/fees');
      setFees(res.data);
    } catch (err) {
      setError('Failed to load fee statement.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Fees & Payments</h1>

      <Card title="Fee Statement">
        {loading ? (
          <p className="text-gray-500">Loading fees...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : fees ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-800">
              <div><strong>Total Fees:</strong> KES {fees.total_fees.toLocaleString()}</div>
              <div><strong>Amount Paid:</strong> KES {fees.amount_paid.toLocaleString()}</div>
              <div><strong>Balance:</strong> KES {fees.balance.toLocaleString()}</div>
            </div>

            <h3 className="text-lg font-semibold mt-4">Payment History</h3>
            {fees.payments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Reference</th>
                      <th className="p-2 border">Amount</th>
                      <th className="p-2 border">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.payments.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-2 border">{new Date(p.date).toLocaleDateString()}</td>
                        <td className="p-2 border">{p.reference}</td>
                        <td className="p-2 border">KES {p.amount.toLocaleString()}</td>
                        <td className="p-2 border">{p.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No payments recorded yet.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No fee data available.</p>
        )}
      </Card>
    </div>
  );
};

export default StudentFees;
