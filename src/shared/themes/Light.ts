import {  createTheme } from '@mui/material'
import {  blue, purple } from '@mui/material/colors'


export const LightTheme = createTheme({

  palette: {
    primary: {
      main: purple[700],
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
      default: '#fff',
      paper: '#f7f6f3'
    }

  },
  typography: {
    allVariants: {
      fontFamily: 'Poppins , sans-serif'
    }
  }

})