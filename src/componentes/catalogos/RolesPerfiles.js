import React, { useState, useEffect, useMemo } from "react";
import style from "../Tool/style";
import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {
  registrarCatalogo,
  ObtenerPerfiles,
} from "../../actions/CatalogosAction";
import { useStateValue } from "../../contexto/store";
//------------    PARA MOSTRAR DATOS    ---------------
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
//------------    PARA MOSTRAR DATOS    ---------------
const RolesPerfiles = () => {
  const [{ usuarioSesion }, dispatch] = useStateValue();
  const [obtenerRoles, setobtenerRoles] = useState([]);

  useEffect(() => {
    ObtenerRoles();
  }, []);

  const ObtenerRoles = async () => {
    const response = await ObtenerPerfiles();
    setobtenerRoles(response.data);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "normalizedName", //access nested data with dot notation
        header: "Nombre Perfil",
        size: 150,
      },
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Nombre Perfil",
        size: 150,
      },

      {
        accessorKey: "id", //access nested data with dot notation
        header: "Nombre Perfil",
        size: 150,
      },
    ],
    []
  );

  const [datos, setDatos] = useState({
    nombre: "",
  });

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const Guardar = (e) => {
    e.preventDefault();

    registrarCatalogo(datos).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Perfil guardado exitosamente",
          },
        });
        ObtenerRoles();
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Error al intentar guardar el perfil nuevo",
          },
        });
      }
    });
  };

  return (
    <Container container="main" maxWidth="xs" justifycontent="center">
      <div style={style.paper}>
        {/* <Avatar style={style.avatar}>
          <SupervisedUserCircleIcon
            style={style.icon}
          ></SupervisedUserCircleIcon>
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Roles - Perfil
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                label="Ingrese Perfil"
                name="nombre"
                fullWidth
                margin="normal"
                onChange={IngresarValoresMemoria}
                value={datos.nombre || ""}
              ></TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={style.submit}
                onClick={Guardar}
              >
                Guardar Perfil
              </Button>
            </Grid>
            {/* <Grid item xs={12} md={12}>
              <MaterialReactTable
                enableColumnActions={false}
                enableColumnFilters={false}
                enablePagination={false}
                enableSorting={false}
                enableBottomToolbar={false}
                enableTopToolbar={false}
                muiTableBodyRowProps={{ hover: false }}
                localization={MRT_Localization_ES}
                columns={columns}
                data={obtenerRoles}
              />
            </Grid> */}
          </Grid>
        </form>
       
        <MaterialReactTable
        //  enableColumnActions={false} //Opciones ocultar o mostrar columna una a una
         // enableColumnFilters={false} //Busqueda filtros por columna
          //enablePagination={false} //Paginacion
          // enableSorting={false} //ordenar por columnas
          // enableBottomToolbar={false} //mostrar opciones d epaginacion
          // enableTopToolbar={false} //opciones de menu superior
          // muiTableBodyRowProps={{ hover: false }} //resltar filas
  
          localization={MRT_Localization_ES}
          columns={columns}
          data={obtenerRoles}
        />
      </div>
    </Container>
  );
};

export default RolesPerfiles;
