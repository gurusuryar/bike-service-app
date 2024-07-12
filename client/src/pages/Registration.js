import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CountrySelect from "../components/CountrySelect";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Registration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [name, setName] = useState(""); // State for name
  const [country, setCountry] = useState(null); // State for country, initialized as null
  const [ph, setPh] = useState(""); // State for phone number
  const [role, setRole] = useState(""); // State for role
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    country: false,
    ph: false,
    role: false,
  }); // State for validation errors
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    name: "",
    country: "",
    ph: "",
    role: "",
  }); // State for error messages
  const [showErrorAlert, setShowErrorAlert] = useState(false); // State for showing error alert
  const [showEmailExistsAlert, setShowEmailExistsAlert] = useState(false); // State for showing email exists alert
  const [showCountryErrorAlert, setShowCountryErrorAlert] = useState(false); // State for showing country error alert
  const [errorMessage, setErrorMessage] = useState(""); // State for custom error message

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    // Clear country error if a country is selected
    setErrors((prevErrors) => ({
      ...prevErrors,
      country: false,
    }));
    setErrorMessages((prevMessages) => ({
      ...prevMessages,
      country: "",
    }));
    setShowCountryErrorAlert(false);
  };

  const { register } = useContext(UserContext); // Access register function from UserContext

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Regex patterns for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; // Validates password
    const phoneRegex = /^[0-9]{10,15}$/; // Validates a phone number with 10 to 15 digits
    const nameRegex = /^[a-zA-Z]+$/; // Validates a name containing alphabets

    // Validate the fields
    const newErrors = {
      email: email === "" || !emailRegex.test(email),
      password: password === "" || !passwordRegex.test(password),
      name: name === "" || !nameRegex.test(name),
      country: country === null, // Check if country is null
      ph: ph === "" || !phoneRegex.test(ph),
      role: role === "",
    };

    // Error messages for validation
    const newErrorMessages = {
      email:
        email === ""
          ? "Email is required"
          : !emailRegex.test(email)
          ? "Email is not valid"
          : "",
      password:
        password === ""
          ? "Password is required"
          : !passwordRegex.test(password)
          ? "Password must be at least 6 characters long includes an uppercase letter, a lowercase letter, a number and a special character"
          : "",
      name:
        name === ""
          ? "Name is required"
          : !nameRegex.test(name)
          ? "Name must contain only alphabets"
          : "",
      country: country === null ? "Country is required" : "", // Error message for country
      ph:
        ph === ""
          ? "Phone number is required"
          : !phoneRegex.test(ph)
          ? "Phone number must be a valid number between 10 to 15 digits"
          : "",
      role: role === "" ? "Role is required" : "",
    };

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    // If there are any errors, do not proceed
    if (Object.values(newErrors).some((error) => error)) {
      if (newErrors.country) {
        setShowCountryErrorAlert(true); // Show country error alert if country is missing
      }
      return;
    }

    // Posting through axios to the database
    try {
      const response = await axios.post("api/users/register", {
        email,
        password,
        role,
        name,
        ph: country?.["data-country-code"]
          ? `+${country["data-country-code"]}${ph}`
          : `+${ph}`, // Append the country code to the phone number
      });

      const { token, role: role1 } = response.data;
      register(token, role1); // Call the register function to set the user context

      role1 === "owner"
        ? navigate("/ownerservices")
        : navigate("/customerservices");

      toast.success("Signed up successfully!");
    } catch (error) {
      if (error.response.data.error === "Email already registered") {
        setShowEmailExistsAlert(true);// Show email exists alert
      } else {
        setShowErrorAlert(true);
        setErrorMessage(error.response.data.error);
      }
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
          marginTop: "7rem",
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: theme.palette.ternary.main,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{ color: theme.palette.text.secondary, textAlign: "center" }}
        >
          Sign up
        </Typography>
        {showErrorAlert && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {errorMessage}
          </Alert>
        )}
        {showEmailExistsAlert && (
          <Alert severity="error" sx={{ mb: 1 }}>
            Email already registered. Please use a different email.
          </Alert>
        )}
        {showCountryErrorAlert && (
          <Alert severity="error" sx={{ mb: 1 }}>
            Country Code is required
          </Alert>
        )}
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

          <Grid container spacing={2}>
            <Grid item xs={5}>
              <CountrySelect onCountrySelect={handleCountrySelect} />
            </Grid>
            <Grid item xs={7}>
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
            </Grid>
          </Grid>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            error={errors.role}
          >
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              style={{ color: theme.palette.text.secondary }}
            >
              <MenuItem
                value="owner"
                style={{ color: theme.palette.ternary.main }}
              >
                Owner
              </MenuItem>
              <MenuItem
                value="customer"
                style={{ color: theme.palette.ternary.main }}
              >
                Customer
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: "1rem", color: theme.palette.text.secondary }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: theme.palette.secondary.main }}>
              Sign in
            </Link>
          </Typography>
        </form>
      </Container>
    </div>
  );
};

export default Registration;
