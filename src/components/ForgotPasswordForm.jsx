// src/components/ForgotPasswordForm.jsx
'use client';

import React, { useState } from 'react';

const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [otpData, setOtpData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });
  const [step, setStep] = useState(1); // 1: request OTP, 2: reset password
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setOtpData({ ...otpData, email: formData.email }); // Pre-fill email for next step
        setStep(2); // Move to password reset step
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        // Optionally redirect to login after a delay
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {step === 1 ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {message && <div className="mb-4 text-green-500">{message}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="reset-email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="reset-email"
              name="email"
              value={otpData.email}
              onChange={handleOtpChange}
              required
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 mb-2">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otpData.otp}
              onChange={handleOtpChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={otpData.newPassword}
              onChange={handleOtpChange}
              required
              minLength="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {message && <div className="mb-4 text-green-500">{message}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;