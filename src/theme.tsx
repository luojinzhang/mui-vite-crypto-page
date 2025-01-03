import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "poppins",
  },
  palette: {
    primary: {
      main: "#11998e",
    },
    secondary: {
      main: "#2f80ed",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#000",
    },
    background: {
      default: "#ddd",
    },
  },
});

export default theme;
