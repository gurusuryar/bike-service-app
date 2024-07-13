import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar';
import ToastContainerWrapper from './components/ToastWrapper';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import OwnerServicePage from './pages/OwnerServicePage';
import CustomerServicePage from './pages/CustomerServicePage';
import OwnerBookingDetails from './pages/OwnerBookingDetails';
import CustomerBookingDetails from './pages/CustomerBookingDetails';
import OwnerCompletedBooking from './pages/OwnerCompletedBooking';
import CustomerCompletedBooking from './pages/CustomerCompletedBooking';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <ToastContainerWrapper />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ownerservices" element={<ProtectedRoute role="owner"><OwnerServicePage /></ProtectedRoute>} />
          <Route path="/customerservices" element={<ProtectedRoute role="customer"><CustomerServicePage /></ProtectedRoute>} />
          <Route path="/ownerbookdetails" element={<ProtectedRoute role="owner"><OwnerBookingDetails /></ProtectedRoute>} />
          <Route path="/customerbookdetails" element={<ProtectedRoute role="customer"><CustomerBookingDetails /></ProtectedRoute>} />
          <Route path="/ownercompleted" element={<ProtectedRoute role="owner"><OwnerCompletedBooking /></ProtectedRoute>} />
          <Route path="/customercompleted" element={<ProtectedRoute role="customer"><CustomerCompletedBooking /></ProtectedRoute>} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
