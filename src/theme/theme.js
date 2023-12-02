import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#ff7961", //mouse over
//       main: "#f44336", //color principal
//       dark: "#ba000d", //color obscuro del proyecto
//       contratext: "#ecfad8", //contraste a barras de navegacion
//     },
//   },
// });

const theme = createTheme({
  palette : {
      primary : {
          light : "#63a4fff",
          main : "#1976d2",
          dark : "#004ba0",
          contrastText : "#ecfad8"
      }
          
  },
});


export default theme;
