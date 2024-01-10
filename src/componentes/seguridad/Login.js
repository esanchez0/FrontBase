import React, { useState } from "react";
import style from "../Tool/style";
import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import { loginUsuario } from "../../actions/UsuarioAction";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../contexto/store";

const Login = () => {
  const [{ usuarioSesion }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const IniciarSesion = (e) => {
    e.preventDefault();

    loginUsuario(datos, dispatch).then((response) => {
      if (response.status === 200) {  
        window.localStorage.setItem("token_seguridad", response.data.token);
        navigate("/");
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Las credenciales del usuario son incorrectas",
          },
        });
      }
    });
  };

  return (
    <Container container="main" maxWidth="xs" justifycontent="center">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockTwoToneIcon style={style.icon}></LockTwoToneIcon>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login de Usuario
        </Typography>
        <form style={style.form}>
          <TextField
            variant="outlined"
            label="Ingrese email"
            name="email"
            fullWidth
            margin="normal"
            onChange={IngresarValoresMemoria}
            value={datos.email || ""}
          ></TextField>
          <TextField
            variant="outlined"
            type="password"
            label="Ingrese password"
            name="password"
            fullWidth
            margin="normal"
            onChange={IngresarValoresMemoria}
            value={datos.password || ""}
          ></TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={style.submit}
            onClick={IniciarSesion}
          >
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
