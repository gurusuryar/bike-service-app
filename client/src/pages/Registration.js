import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link} from 'react-router-dom';
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
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CountrySelect from '../components/CountrySelect';

const Registration = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState(null);
  const [ph, setPh] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    country: false,
    ph: false,
    role: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    password: '',
    name: '',
    country:null,
    ph: '',
    role: '',
  });

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/; //Validates password
    const phoneRegex = /^[0-9]{10,15}$/; // Validates a phone number with 10 to 15 digits

    // Validate the fields
    const newErrors = {
      email: email === '' || !email.endsWith('@gmail.com'),
      password: password === '' || !passwordRegex.test(password),
      name: name === '',
      country: country === null,
      ph: ph === '' || !phoneRegex.test(ph),
      role: role === '',
    };
    const newErrorMessages = {
      email: email === '' ? 'Email is required' : !email.endsWith('@gmail.com') ? 'Email must end with @gmail.com' : '',
      password: password === '' ? 'Password is required' : !passwordRegex.test(password)
        ? 'Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character'
        : '',
      name: name === '' ? 'Name is required' : '',
      country: country === null ? 'Country is required' : '',
      ph: ph === '' ? 'Phone number is required' : !phoneRegex.test(ph) ? 'Phone number must be a valid number with 10 to 15 digits' : '',
      role: role === '' ? 'Role is required' : '',
    };
    setErrors(newErrors);
    setErrorMessages(newErrorMessages);

    // If there are any errors, do not proceed
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    //posting through axios to db
    try {
      const response = await axios.post('api/users/register', {
        email,
        password,
        role,
        name,
        ph: country?.['data-country-code'] ? `+${country['data-country-code']}${ph}` : `+${ph}`, // Append the country code to the phone number

      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', role);
      role === 'owner'
        ? navigate('/owner-dashboard')
        : navigate('/customer-dashboard');
    } catch (error) {
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
          marginTop:"7rem",
          padding: "2rem",
          borderRadius: "8px",
          backgroundColor: theme.palette.ternary.main,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{ color: theme.palette.text.secondary, textAlign: 'center' }}
        >
          Sign up
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

          <Grid container spacing={2}>
            <Grid item xs={4}>
            <CountrySelect onCountrySelect={handleCountrySelect} />
            </Grid>
            <Grid item xs={8}>
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
              <MenuItem value="owner" style={{ color: theme.palette.text.secondary }}>Owner</MenuItem>
              <MenuItem value="customer" style={{ color: theme.palette.text.secondary }}>Customer</MenuItem>
            </Select>
            {errors.role && (
              <Typography variant="caption" color="error">
                {errorMessages.role}
              </Typography>
            )}
          </FormControl>
          <Button type="submit" variant="contained" color="secondary" fullWidth style={{ marginTop: '1rem' }}>
            Sign Up
          </Button>
          <Typography
          variant="body2"
          align="center"
          style={{ marginTop: '1rem', color: theme.palette.text.secondary }}
        >
          Already have an account? <Link to="/login" style={{ color: theme.palette.secondary.main }}>Sign in</Link>
        </Typography>
        </form>
      </Container>
    </div>
  );
};

export default Registration;