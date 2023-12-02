import { AppBar } from "@mui/material";
import React from "react";
import BarSesion from "./bar/BarSesion";
//import { useStateValue } from "../../contexto/store";

const AppNavbar = () => {
  return (
    <AppBar position="static">
      <BarSesion></BarSesion>
    </AppBar>
  );
};

export default AppNavbar;
