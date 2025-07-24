import { createTheme } from '@mui/material/styles';

export const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff', // Neon cyan
      light: '#66ffff',
      dark: '#00cccc',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ff00ff', // Neon magenta/purple
      light: '#ff66ff',
      dark: '#cc00cc',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a', // Very dark background
      paper: '#1a1a2e', // Dark purple-ish paper
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
    error: {
      main: '#ff3366',
      light: '#ff6699',
      dark: '#cc0033',
    },
    success: {
      main: '#00ff88',
      light: '#66ffaa',
      dark: '#00cc66',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 300,
      color: '#00ffff',
      textShadow: '0 0 10px #00ffff',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 300,
      color: '#ff00ff',
      textShadow: '0 0 8px #ff00ff',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      color: '#00ffff',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 400,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      color: '#ffffff',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#b3b3b3',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00ffff 30%, #ff00ff 90%)',
          color: '#000000',
          '&:hover': {
            background: 'linear-gradient(45deg, #00cccc 30%, #cc00cc 90%)',
          },
        },
        outlined: {
          borderColor: '#00ffff',
          color: '#00ffff',
          '&:hover': {
            borderColor: '#ff00ff',
            color: '#ff00ff',
            backgroundColor: 'rgba(255, 0, 255, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a2e',
          borderRadius: '12px',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 255, 255, 0.1)',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a2e',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a4e',
          '& .MuiTableCell-head': {
            color: '#00ffff',
            fontWeight: 600,
            borderBottom: '2px solid #00ffff',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(0, 255, 255, 0.05)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 0, 255, 0.1)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffffff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#00ffff',
          textDecoration: 'none',
          '&:hover': {
            color: '#ff00ff',
            textDecoration: 'underline',
            textShadow: '0 0 5px #ff00ff',
          },
        },
      },
    },
  },
});