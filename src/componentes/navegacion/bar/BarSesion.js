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
//import { useStateValue } from "../../../contexto/store";
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
  //   const [{ sesionUsuario }, dispatch] = useStateValue();
  const classes = useStyles();
  //   const navigate = useNavigate();

  return (
    <Toolbar>
      <IconButton color="inherit">
        <i className="material-icons">lists</i>
      </IconButton>
      <Typography variant="h6">KOC</Typography>
      <div className={classes.grow}></div>

      {/* Botones del menu, exclusivos para dispositivos moviles, no se muestran con celular */}
      <div className={classes.seccionDesktop}>
        <Button color="inherit">Salir</Button>
        <Button color="inherit">{"Nombre de usuario"}</Button>
        <Avatar src={FotoUsuarioTemp}></Avatar>
      </div>

      {/* Menu exclusivo para dispositivos mobiles, no se muestra en desktop */}
      <div className={classes.seccionMobile}>
        <IconButton color="inherit">
          <i className="material-icons">menu_open</i>
        </IconButton>
      </div>
    </Toolbar>
  );
};

export default BarSesion;
