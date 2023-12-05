import React, { useEffect, useState } from "react";
import style from "../Tool/style";
import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import {
  ObtenerUsuarioActual,
  ActualizarUsuario,
} from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

const PerfilUsuario = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [datos, setDatos] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmePassword: "",
    username: "",
  });

  useEffect(() => {
    //ObtenerUsuarioActual(dispatch).then((response) => {
      setDatos(sesionUsuario.usuario);
   // });
  }, []);

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const ActualizarDatos = (e) => {
    e.preventDefault();

    ActualizarUsuario(datos, dispatch).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se actualizaron exitosamente los cambios.",
          },
        });
        window.localStorage.setItem("token_seguridad", response.data.token);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "Errores al intentar guardar en : " +
              Object.keys(response.data.errors),
          },
        });
      }
    });
  };

  return (
    <Container component="main" maxWidth="md" justifycontent="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Perfil de Usuario
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="nombreCompleto"
                variant="outlined"
                fullWidth
                label="Ingrese nombre y apellido"
                onChange={IngresarValoresMemoria}
                value={datos.nombreCompleto || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                variant="outlined"
                fullWidth
                label="Ingrese email"
                onChange={IngresarValoresMemoria}
                value={datos.email || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                variant="outlined"
                fullWidth
                label="Ingrese username"
                onChange={IngresarValoresMemoria}
                value={datos.username || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                variant="outlined"
                fullWidth
                label="Ingrese password"
                onChange={IngresarValoresMemoria}
                value={datos.password || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmePassword"
                variant="outlined"
                fullWidth
                label="Confirme password"
                onChange={IngresarValoresMemoria}
                value={datos.confirmePassword || ""}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
                onClick={ActualizarDatos}
              >
                Guardar Datos
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PerfilUsuario;
