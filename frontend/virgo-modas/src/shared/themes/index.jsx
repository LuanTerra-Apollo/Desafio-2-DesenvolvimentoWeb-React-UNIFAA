import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C19400',
      contrastText: '#fff',
    },
    secondary: {
      main: '#866700',
      contrastText: '#000',
    },
  },
});

export {theme};