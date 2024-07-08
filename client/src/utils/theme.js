import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0078D4', // primary color from the palette
    },
    secondary: {
      main: '#333741', // secondary color from the palette
    },
    background: {
      default: '#1C1F24', // background color from the palette
      paper: '#1A1C20',   // paper background color
    },
    text: {
      primary: '#FFFFFF', // primary text color (white)
      secondary: '#000000', // secondary text color (gray)
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
    body1: {
      fontSize: '1.125rem',
      fontWeight: 400,
    },
  },
});

export default theme;
