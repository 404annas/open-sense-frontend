// src/components/SignupForm.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [otpData, setOtpData] = useState({
    email: '',
    otp: '',
  });
  const [step, setStep] = useState(1); // 1: signup form, 2: OTP verification
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setOtpData({ ...otpData, email: formData.email }); // Pre-fill email for OTP step
        setStep(2); // Move to OTP verification step
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        // Store token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);
        // Redirect to home or dashboard
        router.push('/');
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label htmlFor="otp-email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="otp-email"
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
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {message && <div className="mb-4 text-green-500">{message}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}
      <div className="mt-4 text-center">
        <p>
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;