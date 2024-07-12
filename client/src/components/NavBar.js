import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Popover,
  MenuItem,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import bikelogo from "../assets/bikelogofinal.png";

const Navbar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  // Use media query to determine screen width
  const isLargeScreen = useMediaQuery("(min-width:800px)");

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handlePopoverClose();
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const sidebarItems = () => {
    if (user) {
      if (user.role === "owner") {
        return (
          <>
            <ListItem button component={Link} to="/ownerservices">
              <ListItemText primary="Service" />
            </ListItem>
            <ListItem button component={Link} to="/ownerbookdetails">
              <ListItemText primary="Booking" />
            </ListItem>
            <ListItem button component={Link} to="/ownercompleted">
              <ListItemText primary="History" />
            </ListItem>
          </>
        );
      }
      if (user.role === "customer") {
        return (
          <>
            <ListItem button component={Link} to="/customerservices">
              <ListItemText primary="Service" />
            </ListItem>
            <ListItem button component={Link} to="/customerbookdetails">
              <ListItemText primary="Booking" />
            </ListItem>
            <ListItem button component={Link} to="/customercompleted">
              <ListItemText primary="History" />
            </ListItem>
          </>
        );
      }
    } else {
      return (
        <>
          <ListItem button component={Link} to="/register">
            <ListItemText primary="Sign Up" />
          </ListItem>
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        </>
      );
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "rgba(31, 38, 52, 0.7)",
          backdropFilter: "blur(10px)",
          padding: "0.4rem",
        }}
        elevation={4}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
            {!isLargeScreen && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon
                  style={{
                    margin: ".5rem",
                    fontSize: "2.5rem", // Increase size to match AccountCircle
                  }}
                />
              </IconButton>
            )}
            <Box
              display="flex"
              alignItems="center"
              component={Link}
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <img
                src={bikelogo}
                alt="Bike Logo"
                component={Link}
                to="/"
                style={{
                  width: 70,
                  height: 70,
                  marginRight: "1.25rem",
                  borderRadius: ".5rem",
                }}
              />
              <Typography
                variant="h2"
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                Bike Service
              </Typography>
            </Box>
          </Box>
          <div style={{ flexGrow: 1 }} />
          {user ? (
            <>
              {isLargeScreen ? (
                <>
                  <Button
                    variant="inherit"
                    component={Link}
                    to="/ownerservices"
                    style={{
                      color: theme.palette.secondary.main,
                      fontSize: "1.4rem",
                    }}
                  >
                    Service
                  </Button>
                  <Button
                    variant="inherit"
                    component={Link}
                    to="/ownerbookdetails"
                    style={{
                      color: theme.palette.secondary.main,
                      fontSize: "1.4rem",
                    }}
                  >
                    Booking
                  </Button>
                  <Button
                    variant="inherit"
                    component={Link}
                    to="/ownercompleted"
                    style={{
                      color: theme.palette.secondary.main,
                      fontSize: "1.4rem",
                    }}
                  >
                    History
                  </Button>
                </>
              ) : null}
              <div style={{ position: "relative", marginLeft: "1rem" }}>
                <AccountCircle
                  onClick={handlePopoverOpen}
                  style={{
                    color: theme.palette.secondary.main,
                    cursor: "pointer",
                    fontSize: "2.5rem",
                  }}
                />
              </div>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={handleLogout}
                  style={{ color: theme.palette.text.secondary }}
                >
                  SIGN OUT
                </MenuItem>
              </Popover>
            </>
          ) : (
            <>
              {isLargeScreen ? (
                <>
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
                  <Button
                    variant="inherit"
                    component={Link}
                    to="/login"
                    style={{
                      color: theme.palette.secondary.main,
                      fontSize: "1.1rem",
                    }}
                  >
                    Login
                  </Button>
                </>
              ) : null}
            </>
          )}
        </Toolbar>
      </AppBar>
      {!isLargeScreen && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: 300, // Set the width as needed
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 300,
              backgroundColor: "rgba(31, 38, 52, 0.7)", // Transparent color
              backdropFilter: "blur(10px)", // Optional: Add a blur effect
            },
          }}
        >
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>{sidebarItems()}</List>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
