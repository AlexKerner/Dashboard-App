import {  createTheme } from '@mui/material'
import {  blue, purple } from '@mui/material/colors'

export const DarkTheme = createTheme({

  palette: {
    mode: 'dark',
    primary: {
      main: purple[400],
      dark: purple[800],
      light: purple[500],
      contrastText: '#fff'
    },

    secondary: {
      main: blue[500],
      dark: blue[400],
      light: blue[300],
      contrastText: '#fff'
    ,},

    background: {
      default: '#202124',
      paper: '#303134'
    }
  },

  typography: {
    allVariants: {
      color: 'white',
      fontFamily: 'Poppins , sans-serif'
    }
  }

})