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
      fontFamily: "'Inter', sans-serif",
      h1: {
        fontFamily: "Inter",
        fontSize: '2.8rem'
      },
      h2: {
        fontFamily: "Inter",
        fontSize: '2.2rem'
      },
      h3: {
        fontFamily: "Inter",
        fontSize: '1.5rem'
      },
      h4: {
        fontFamily: "Inter",
        fontSize: '1.2rem'
      },
      h5: {
        fontFamily: "Inter",
        fontSize: '1rem'
      },
      body1: {
        fontFamily: "Inter",
        fontSize: '0.9rem'
      },
      button: {
        textTransform: "none"
      }

    },
  })
