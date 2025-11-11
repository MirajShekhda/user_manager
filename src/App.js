import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AccountManagement from './pages/AccountManagement';
import AdminPage from './pages/AdminPage';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/account" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={isAuthenticated ? <AccountManagement /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
