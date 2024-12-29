import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoute from './PrivateRoute ';

export default function Navigation() {
  const token = localStorage.getItem('jwtToken');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? '/home' : '/login'} />} />
      <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
      <Route path="/signup" element={token ? <Navigate to="/home" /> : <Signup />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
