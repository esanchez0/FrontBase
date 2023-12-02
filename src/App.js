import theme from "./theme/theme";
import { Button, Grid, Snackbar, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <RegistrarUsuario></RegistrarUsuario> */}
      <Login></Login>
      {/* <PerfilUsuario></PerfilUsuario> */}
    </ThemeProvider>
  );
}

export default App;
