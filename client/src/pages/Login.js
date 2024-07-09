import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setShowSuccessAlert(true);
    } catch (error) {
      setError("Invalid email or password");
      setShowSuccessAlert(false);
      console.error(error);
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
          variant="h4"
          component="h1"
          gutterBottom
          style={{
            color: theme.palette.text.secondary,
            marginBottom: "1.5rem",
          }}
        >
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {showSuccessAlert && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Login successful!
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                color: theme.palette.text.secondary,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
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
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Login;
