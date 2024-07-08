import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Registration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ph, setPh] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    ph: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    name: "",
    ph: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // Validate the fields
    const newErrors = {
      email: email === '' || !email.endsWith('@gmail.com'),
      password: password === '' || !passwordRegex.test(password),
      name: name === '',
      ph: ph === '',
    };
    const newErrorMessages = {
      email: email === '' ? 'Email is required' : !email.endsWith('@gmail.com') ? 'Email must end with @gmail.com' : '',
      password: password === '' ? 'Password is required' : !passwordRegex.test(password) 
        ? 'Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character' 
        : '',
      name: name === '' ? 'Name is required' : '',
      ph: ph === '' ? 'Phone number is required' : '',
    };
    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    // If there are any errors, do not proceed
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      const response = await axios.post("api/users/register", {
        email,
        password,
        role,
        name,
        ph,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);
      role === "owner"
        ? navigate("/owner-dashboard")
        : navigate("/customer-dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.main,
        padding: '4rem 0',
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          marginTop: '2rem',
          padding: '2rem',
          borderRadius: '8px',
          backgroundColor: theme.palette.text.primary,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          style={{ color: theme.palette.text.secondary, textAlign: "center" }}
        >
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            error={errors.email}
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            helperText={errors.email && errorMessages.email}
            InputProps={{ style: { color: theme.palette.text.secondary } }}
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
            InputProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <TextField
            error={errors.name}
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            helperText={errors.name && errorMessages.name}
            InputProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <TextField
            error={errors.ph}
            label="Phone"
            variant="outlined"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            fullWidth
            margin="normal"
            helperText={errors.ph && errorMessages.ph}
            InputProps={{ style: { color: theme.palette.text.secondary } }}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              style={{ color: theme.palette.text.secondary }}
            >
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Registration;
