import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { toast } from "react-toastify";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format

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
    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    // If there are any errors, do not proceed
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await axios.post("api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      response.data.role === "owner"
        ? navigate("/owner-dashboard")
        : navigate("/customer-dashboard");
      setError("");
      toast.success('Logged in Successfully!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred");
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
            marginBottom: "1.5rem",
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
