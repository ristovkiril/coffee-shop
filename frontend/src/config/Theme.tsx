import createTheme from "@mui/material/styles/createTheme";

export const theme =
  createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#803030',
        contrastText: '#ffffff',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#efa2a9ff",
        contrastText: '#ffffff',
      },
    },
    typography: {
      h1: {
        fontSize: '2.2rem'
      },
      h2: {
        fontSize: '2rem'
      },
      h3: {
        fontSize: '1.8rem'
      },
      h4: {
        fontSize: '1.6rem'
      },
      h5: {
        fontSize: '1.4rem'
      },
      h6: {
        fontSize: '1.2rem'
      },
      body1: {
        fontSize: '0.9rem'
      },
      button: {
        textTransform: "none"
      }
    },
  })
