import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      style={{ backgroundColor: '#141a24', padding: '0.4rem' }}
      elevation={4} // Add this line to set the elevation
    >
      <Toolbar>
        <Typography
          variant="h2"
          component={Link}
          to="/"
          style={{
            textDecoration: 'none',
            color: theme.palette.text.primary,
          }}
        >
          Bike Service
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button
          component={Link}
          to="/register"
          style={{
            color: theme.palette.secondary.main,
            fontSize: '1.1rem', // Set the font size here
          }}
        >
          Register
        </Button>
        <Button
          component={Link}
          to="/login"
          style={{
            color: theme.palette.secondary.main,
            fontSize: '1.1rem', // Set the font size here
          }}
        >
          Login
        </Button>
        <IconButton color="inherit" style={{ color: theme.palette.text.primary }}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;