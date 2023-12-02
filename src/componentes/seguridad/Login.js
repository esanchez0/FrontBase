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
// import { loginUsuario } from "../../actions/UsuarioAction";
// import { useStateValue } from "../../contexto/store";

const Login = () => {
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
            // onClick={IniciarSesion}
          >
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
