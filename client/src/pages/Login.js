import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "2rem",
        padding: "2rem",
        borderRadius: "8px",
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
