import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import './Signup.css'; 

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.number().required('Age is required').min(1, 'Age must be greater than 0').typeError("Age is required"),
  location: Yup.string().required('Location is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
});

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const response = await fetch('https://backend-practice-eta.vercel.app/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage('Signup successful! Redirecting to login...');
        setFormData({ name: '', age: '', location: '', email: '', password: '' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setServerError(result.message || 'Signup failed!');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Error submitting form:', error);
        setServerError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h3>Signup</h3>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            placeholder="Enter Your age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter Your location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="error-text">{errors.location}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle type based on showPassword state
              placeholder="Enter Your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
            >
              {showPassword ? '🙈' : '👁️‍🗨️'} {/* Change eye icon based on state */}
            </span>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>
        {serverError && <p className="error-text server-error">{serverError}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Signup'}
        </button>
      </form>
      <p className="signup-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
