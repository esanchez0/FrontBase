import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FotoUsuarioTemp from "../../../logo.svg";
import { makeStyles } from "@mui/styles";
import { useStateValue } from "../../../contexto/store";
import { MenuIzquierda } from "./MenuIzquierda";
import { MenuDerecha } from "./MenuDerecha";
import { redirect, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  //Logica para mostrar u ocultar el menu, dependiendo del dispositivo
  seccionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  seccionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  //Separacion entre menu izquierdo y menu derecho
  grow: {
    flexGrow: 1,
  },

  avatarSize: {
    width: 40,
    height: 40,
  },
  list: {
    width: 250,
  },
  ListItemText: {
    fontSize: "14px",
    fontWeight: 600,
    paddingLeft: "15px",
    color: "212121",
  },
}));

const BarSesion = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const classes = useStyles();
  const navigate = useNavigate();

  const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);

  const [abrirMenuDerecha, setAbrirMenuDerecha] = useState(false);

  const abrirMenuIzquierdaAction = () => {
    setAbrirMenuIzquierda(true);
  };

  const cerrarMenuIzquierda = () => {
    setAbrirMenuIzquierda(false);
  };

  const cerrarMenuDerecha = () => {
    setAbrirMenuDerecha(false);
  };

  const abrirMenuDerechaAction = () => {
    setAbrirMenuDerecha(true);
  };

  const SalirSesionApp = (event) => {
    event.preventDefault();
    console.log("salir sesion");
    // localStorage.removeItem("token_seguridad");
    // dispatch({
    //   type: "SALIR_SESION",
    //   nuevoUsuario: null,
    //   autenticado: false,
    // });

    // navigate("/auth/login");
  };

  return (
    <React.Fragment>
      <Drawer
        open={abrirMenuIzquierda}
        onClose={cerrarMenuIzquierda}
        anchor="left"
      >
        <div
          className={classes.list}
          onKeyDown={cerrarMenuIzquierda}
          onClick={cerrarMenuIzquierda}
        >
          <MenuIzquierda classes={classes} />
        </div>
      </Drawer>

      <Drawer
        open={abrirMenuDerecha}
        onClose={cerrarMenuDerecha}
        anchor="right"
      >
        <div
          className={classes.list}
          onClick={cerrarMenuDerecha}
          onKeyDown={cerrarMenuDerecha}
          role="button"
        >
          <MenuDerecha
            classes={classes}
            salirSesion={SalirSesionApp}
            usuario={sesionUsuario ? sesionUsuario.usuario : null}
          />
        </div>
      </Drawer>

      <Toolbar>
        <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
          <i className="material-icons">menu</i>
        </IconButton>
        <Typography variant="h6">KOC</Typography>
        <div className={classes.grow}></div>
        <div className={classes.seccionDesktop}>
          <Button onClick={SalirSesionApp} color="inherit">Salir</Button>
          <Button color="inherit">
            {sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ""}
          </Button>
          <Avatar src={FotoUsuarioTemp}></Avatar>
        </div>
        <div className={classes.seccionMobile}>
          <IconButton color="inherit" onClick={abrirMenuDerechaAction}>
            <i className="material-icons">more_vert</i>
          </IconButton>
        </div>
      </Toolbar>
    </React.Fragment>
  );
};

export default BarSesion;
