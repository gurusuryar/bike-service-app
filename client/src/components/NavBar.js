import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (route) => {
    handleMenuClose();
    navigate(route);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "rgba(31, 38, 52, 0.7)", // semi-transparent background
        backdropFilter: "blur(10px)", // blur effect
        padding: "0.4rem",
      }}
      elevation={4}
    >
      <Toolbar>
        <Typography
          variant="h3"
          component={Link}
          to="/"
          style={{
            textDecoration: "none",
            color: theme.palette.text.primary,
          }}
        >
          Bike Service
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button
        variant="inherit"
          component={Link}
          to="/register"
          style={{
            color: theme.palette.secondary.main,
            fontSize: "1.1rem",
          }}
        >
          Sign Up
        </Button>
        <div style={{ position: "relative", marginLeft: "1rem" }}>
          <AccountCircle
            onClick={handleMenuOpen}
            style={{ color: theme.palette.secondary.main, cursor: "pointer", fontSize:"2.5rem"}}
          />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          style={{ backgroundColor: theme.palette.primary.main }}
        >
          <MenuItem
            component={Link}
            to="/login"
            onClick={() => handleMenuItemClick("/login")}
            style={{ color: theme.palette.text.primary }}
          >
            Sign in
          </MenuItem>
          <MenuItem
            component={Link}
            to="/logout"
            onClick={() => handleMenuItemClick("/logout")}
            style={{ color: theme.palette.text.primary }}
          >
            Sign out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
