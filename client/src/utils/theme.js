import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a202c", // Dark background color
    },
    secondary: {
      main: "#f56565", // Accent, button color
    },
    ternary: {
      main: "#ffffff", //Container color
    },
    text: {
      primary: "#ffffff", // Text color
      secondary: "#0A0A0A", // Subdued text color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1.125rem",
      fontWeight: 300,
    },
    body2: {
      fontSize: "0.8rem",
      fontWeight: 100,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1976d2", // Change this to your desired blue color
          },
        },
      },
    },
  },
});

// Separate overrides to ensure theme object is fully initialized
theme.components.MuiIconButton = {
  styleOverrides: {
    root: {
      color: theme.palette.secondary.main, // Set the color for the AccountCircle icon
    },
  },
};

theme.components.MuiMenu = {
  styleOverrides: {
    paper: {
      backgroundColor: theme.palette.primary.main, // Set the background color for the menu
    },
  },
};

theme.components.MuiMenuItem = {
  styleOverrides: {
    root: {
      color: theme.palette.text.primary, // Set the text color for the menu items
    },
  },
};

export default theme;
