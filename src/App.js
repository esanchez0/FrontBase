import React, { react, useState, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import AppNavbar from "./componentes/navegacion/AppNavbar";
import { Grid, Snackbar } from "@mui/material";
import { useStateValue } from "./contexto/store";
import RutaSegura from "./componentes/navegacion/RutaSegura";
import ProtectedRoute from "./componentes/navegacion/ProtectedRoute";
import { ObtenerUsuarioActual } from "./actions/UsuarioAction";
import RegistrarUsuario from "./componentes/seguridad/RegistrarUsuario";
import Login from "./componentes/seguridad/Login";
import PerfilUsuario from "./componentes/seguridad/PerfilUsuario";
import TesteoComponentes from "./componentes/TesteoComponentes"
import TestsGrid from "./componentes/TestsGrid"
import Consigna from "./componentes/Consignas/NuevoConsigna"
import Incidencia from "./componentes/Incidencias/NuevaIncidencia"

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

  return iniciaApp === false ? null : (
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
            <Routes basename="/auth/login">
                <Route basename="/auth/login" path="/" element={<Login></Login>} >
                  <Route exact path="/auth/login" element={<Login></Login>}></Route>
                </Route>
                <Route basename="/auth/perfil" path="/" element={<ProtectedRoute isAllowed={!!sesionUsuario} />}>
                  <Route path="/" element={<PerfilUsuario />} />  
                  <Route path="/auth/perfil" element={<PerfilUsuario />} />   
                  <Route path="/auth/registrar" element={<RegistrarUsuario />} />
                  <Route path="/Consigna" element={<Consigna></Consigna>}></Route>
                  <Route path="/Incidencia" element={<Incidencia></Incidencia>}></Route> 
                  <Route exact path="/Test" element={<TesteoComponentes></TesteoComponentes>}></Route>
                  <Route exact path="/Grid" element={<TestsGrid></TestsGrid>}></Route> 
                  <Route path="*" element={<PerfilUsuario />} />  
                </Route>
            </Routes>
          </Grid>
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
