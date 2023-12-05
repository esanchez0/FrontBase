import { AppBar } from "@mui/material";
import React from "react";
import BarSesion from "./bar/BarSesion";
import { useStateValue } from "../../contexto/store";

const AppNavbar = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  // return (
  //   <AppBar position="static">
  //     <BarSesion></BarSesion>
  //   </AppBar>
  // );
  return sesionUsuario 
  ?  (sesionUsuario.autenticado == true ? <AppBar position="static"> <BarSesion /></AppBar> : null)
  : null;
};

export default AppNavbar;
