import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a202c', // Dark background color
    },
    secondary: {
      main: '#f56565', // Accent color
    },
    ternary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff', // Text color
      secondary: '#1f2020', // Subdued text color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.125rem',
      fontWeight: 300,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2', // Change this to your desired blue color
          },
        },
      },
    },
  },
});

export default theme;
