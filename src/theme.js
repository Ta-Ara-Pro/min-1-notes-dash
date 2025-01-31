import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(223, 223, 223)",
      light: "rgba(238, 238, 238, 0.9)",
    },
    Button:{
      red: "rgb(251, 226, 243)",
      blue: "rgb(196, 182, 240)",
      blueBgColor: "rgb(95, 52, 236)",
    },
    background: {
      default: " rgb(248, 243, 236)",
      paper: "rgb(248, 247, 247)",
    },
    text: {
      primary: "rgb(51, 51, 51)",
    },
  },
  typography: {
    fontFamily: 'Sahel, Arial, sans-serif',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(96, 95, 97)",
      light: "rgb(141, 141, 141)",
      outline: "rgb(175, 175, 175)"
    },
    Button:{
      red: "rgb(255,202,202)",
      redBgColor: "rgb(136, 1, 1)",
      blue: "rgb(196, 182, 240)",
      blueBgColor: "rgb(95, 52, 236)",
    },
    background: {
      default: "rgb(65, 63, 63)",
      paper: "rgb(87, 81, 81)",
    },
    text: {
      main:  "rgb(238, 234, 234)",
      primary: "rgb(233, 227, 227)",
      light: "rgb(196, 196, 196)",
      dark:"rgb(107, 107, 107)",
      
    },
  },
  typography: {
    fontFamily: 'Sahel, Arial, sans-serif',
  },
});
