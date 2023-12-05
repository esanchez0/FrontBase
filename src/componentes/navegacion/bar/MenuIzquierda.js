import { Divider, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../../contexto/store";

export const MenuIzquierda = ({ classes }) => {
  const [{ sesionUsuario }, dispatch] = useStateValue();

  return (
    <div className={classes.list}>
     
      <List>
        <ListItem to="/auth/registrar" component={NavLink}>
          <i className="material-icons">account_box</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Registrar"
          />
        </ListItem>
      </List>
      <Divider></Divider>
      <List>
        <ListItem to="/auth/perfil" component={NavLink}>
          <i className="material-icons">account_box</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Perfil"
          />
        </ListItem>
      </List>

      <Divider />
    </div>
  );
};
