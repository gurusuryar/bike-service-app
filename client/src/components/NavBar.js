import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" style={{ backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
        <Typography
          variant="h6"
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
          color="inherit"
          component={Link}
          to="/register"
          style={{ color: theme.palette.text.primary }}
        >
          Register
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          style={{ color: theme.palette.text.primary }}
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
