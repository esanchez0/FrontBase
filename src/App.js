import React, { react, useState, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import AppNavbar from "./componentes/navegacion/AppNavbar";
import { Grid, Snackbar } from "@mui/material";
import { useStateValue } from "./contexto/store";
// import RutaSegura from "./componentes/navegacion/RutaSegura";
import { ObtenerUsuarioActual } from "./actions/UsuarioAction";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";

function App() {
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue();
  const [iniciaApp, setIniciaApp] = useState(false);

  useEffect(() => {
    if (!iniciaApp) {
      ObtenerUsuarioActual(dispatch)
        .then((response) => {
          setIniciaApp(true);
        })
        .catch((error) => {
          setIniciaApp(true);
        });
    }
  }, [iniciaApp]);

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: "",
            },
          })
        }
      ></Snackbar>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppNavbar></AppNavbar>
          <Grid container>
            <Routes>
              <Route exact path="/auth/login" element={<Login></Login>}></Route>
              <Route
                exact
                path="/auth/registrar"
                element={<RegistrarUsuario></RegistrarUsuario>}
              ></Route>
              <Route
                exact
                path="/auth/perfil"
                element={<PerfilUsuario></PerfilUsuario>}
              ></Route>
              <Route
                exact
                path="/"
                element={<PerfilUsuario></PerfilUsuario>}
              ></Route>
            </Routes>
          </Grid>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
