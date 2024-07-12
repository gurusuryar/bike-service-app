import React, { useState,useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext"; 

const Login = () => {
  const theme = useTheme(); // Access the theme for styling
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  }); // State for input errors
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  }); // State for error messages

  const { login } = useContext(UserContext); // Access login function from UserContext

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

    // Validate the fields
    const newErrors = {
      email: email === "" || !emailRegex.test(email),
      password: password === "",
    };
    const newErrorMessages = {
      email:
        email === ""
          ? "Email is required"
          : !emailRegex.test(email)
          ? "Email is not valid"
          : "",
      password: password === "" ? "Password is required" : "",
    };
    setErrors(newErrors); // Set errors state
    setErrorMessages(newErrorMessages); // Set error messages state

    // If there are any errors, do not proceed
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Try logging in the user
    try {
      const response = await axios.post("api/users/login", {
        email,
        password,
      });
      const { token, role } = response.data; // Get token and role from response
      login(token, role); // Call the login function to set the user context
      setError(""); // Clear any previous errors
      toast.success('Logged in Successfully!'); // Show success toast

      // Redirect based on role
      role === "owner"
        ? navigate("/ownerservices")
        : navigate("/customerservices");
        
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setError(errorMessage); // Set specific error message
      } else {
        setError("An unexpected error occurred"); // Set general error message
        toast.error("An unexpected error occurred"); // Show error toast
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
        style={{
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: theme.palette.ternary.main,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          style={{
            color: theme.palette.text.secondary,
            marginBottom: "0.5rem",
            textAlign: "center" // This line centers the text
          }}
        >
          Sign in
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            error={errors.email}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            helperText={errors.email && errorMessages.email}
            InputProps={{
              style: {
                color: theme.palette.text.secondary,
              },
            }}
          />
          <TextField
            error={errors.password}
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            helperText={errors.password && errorMessages.password}
            InputProps={{
              style: {
                color: theme.palette.text.secondary,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            style={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              marginTop:"1rem"
            }}
          >
            Sign in
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "1rem", color: theme.palette.text.secondary }}
          >
            Don't have an account?{" "}
            <Link to="/register" style={{ color: theme.palette.secondary.main }}>
              Sign up
            </Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

export default Login;
