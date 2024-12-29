import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      navigate('/home'); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-practice-eta.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem('jwtToken', result.jwtToken);
        navigate('/home'); // Redirect to home after successful login
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group password-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle type based on showPassword state
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
            >
              {showPassword ? '🙈' : '👁️‍🗨️'} {/* Change eye icon based on state */}
            </span>
          </div>
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}
