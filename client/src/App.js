import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />


        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;