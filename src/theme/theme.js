import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette : {
        primary : {
            light : "#63a4fff",//mouse over
            main : "#1976d2",//color principal
            dark : "#004ba0",//color obscuro del proyecto
            contrastText : "#ecfad8"//contraste a barras de navegacion
        }
            
    },
  });
  
  
  export default theme;