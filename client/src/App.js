import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import ToastContainerWrapper from './components/ToastWrapper';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import OwnerDash from './pages/OwnerDash';
import CustomerDash from './pages/CustomerDash';

const App = () => {
  return (
    <Router>
      <ToastContainerWrapper />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner-dashboard" element={<OwnerDash />} />
        <Route path="/customer-dashboard" element={<CustomerDash />} />
      </Routes>
    </Router>
  );
};

export default App;
