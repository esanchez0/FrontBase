import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: "#ffcdd2", //mouse over
//       main: "#e53935", //color principal
//       dark: "#ffcdd2", //color obscuro del proyecto
//       contratext: "#ffcdd2", //contraste a barras de navegacion
//     },
//   },
// });

const theme = createTheme({
  palette : {
      primary : {
          light : "#63a4fff", //Quien sabe
          main : "#1976d2", //Todo, barra de navegacion y botones
          dark : "#004ba0", //Cuando pasas por un elemento, por ejemplo boton
          contrastText : "#ecfad8" //Letras fuente, iconos barra de navegacion
      }
          
  },
});


export default theme;
