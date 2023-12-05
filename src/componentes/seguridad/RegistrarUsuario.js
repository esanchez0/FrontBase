import { useState } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import style from "../Tool/style";
import { registrarUsuario as Guardar } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";
const RegistrarUsuario = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [datos, setDatos] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    username: "",
    confirmacionpassword: "",
  });

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const RegistrarUsuario = (e) => {
    e.preventDefault();
    Guardar(datos).then((response) => {
      if (response.status === 200) {
        console.log("Se registro el usuario", response);
        window.localStorage.setItem("token_seguridad", response.data.token); //Almacenando token
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
  }; //Termina funcion

  return (
    <Container container="main" maxWidth="md" justifycontent="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5" justifyContent="center">
          Registro de usuario
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="nombreCompleto"
                variant="outlined"
                fullWidth
                label="Ingrese su nombre y apellidos"
                onChange={IngresarValoresMemoria}
                value={datos.nombreCompleto || ""}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                variant="outlined"
                fullWidth
                label="Ingrese su email"
                onChange={IngresarValoresMemoria}
                value={datos.email || ""}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                variant="outlined"
                fullWidth
                label="Ingrese su username"
                onChange={IngresarValoresMemoria}
                value={datos.username || ""}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese su password"
                onChange={IngresarValoresMemoria}
                value={datos.password || ""}
              ></TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="confirmacionpassword"
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese su confirmacion password"
                onChange={IngresarValoresMemoria}
                value={datos.confirmacionpassword || ""}
              ></TextField>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={style.submit}
                onClick={RegistrarUsuario}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegistrarUsuario;
