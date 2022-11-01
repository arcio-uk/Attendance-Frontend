import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#f50057",
      dark: "#d4d4d4",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#EBEBD3",
    },
    text: {
      primary: "#212121",
      secondary: "#212121",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#38dc3e",
    },
    divider: "rgba(0,0,0,0.29)",
  },
  props: {
    MuiAppBar: {
      color: "primary",
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

export default Theme;
