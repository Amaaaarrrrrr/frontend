import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/common/Card';

const StudentFees = () => {
  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/payments');
      setPayments(response.data.payments);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setMessage('Failed to load payments');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Fees & Payments</h1>

      <Card title="Fee Statement">
        {message && <p className="text-red-500">{message}</p>}
        {payments.length > 0 ? (
          <table className="border-collapse border border-gray-300 w-full text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">ID</th>
                <th className="border px-2 py-1">Student ID</th>
                <th className="border px-2 py-1">Fee Structure ID</th>
                <th className="border px-2 py-1">Amount</th>
                <th className="border px-2 py-1">Payment Date</th>
                <th className="border px-2 py-1">Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="border px-2 py-1">{payment.id}</td>
                  <td className="border px-2 py-1">{payment.student_id}</td>
                  <td className="border px-2 py-1">{payment.fee_structure_id}</td>
                  <td className="border px-2 py-1">{payment.amount_paid}</td>
                  <td className="border px-2 py-1">{payment.payment_date}</td>
                  <td className="border px-2 py-1">{payment.payment_method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No payment records available.</p>
        )}
      </Card>
    </div>
  );
};

export default StudentFees;
