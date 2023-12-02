import { Avatar, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import FotousuarioTemp from "../../../logo.svg";

export const MenuDerecha = ({ classes, usuario, salirSesion }) => (
  <div className={classes.list}>
    <List>
      <ListItem>
        <Avatar src={usuario.imagenPerfil || FotousuarioTemp} />
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary={usuario ? usuario.nombreCompleto : ""}
        />
      </ListItem>
      <ListItem button onClick={salirSesion}>
        <ListItemText
          classes={{ primary: classes.listItemText }}
          primary="Salir"
        />
      </ListItem>
    </List>
  </div>
);
