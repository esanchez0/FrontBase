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
            primary="Registrar Nuevo Usuario"
          />
        </ListItem>
        <ListItem to="/rol" component={NavLink}>
          <i className="material-icons">supervisor_account</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Nuevo Rol"
          />
        </ListItem>
        <ListItem to="/rol" component={NavLink}>
          <i className="material-icons">library_books</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Catalogos"
          />
        </ListItem>
        {/* <ListItem to="/auth/perfil" component={NavLink}>
          <i className="material-icons">account_box</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Perfil"
          />
        </ListItem> */}
      </List>
      <Divider></Divider>
      <List>
        <ListItem to="/Consigna" component={NavLink}>
          <i className="material-icons">account_box</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Consigna"
          />
        </ListItem>
      </List>
      <List>
        <ListItem to="/Incidencia" component={NavLink}>
          <i className="material-icons">account_box</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Incidencia"
          />
        </ListItem>
      </List>
      <List>
        <ListItem to="/cumple" component={NavLink}>
          <i className="material-icons">cake</i>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Cumple Años"
          />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};
