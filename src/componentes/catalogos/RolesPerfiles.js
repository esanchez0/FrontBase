import React, { useState, useEffect, useMemo } from "react";
import style from "../Tool/style";
import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
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
//-----------     Ejemplo exportyar archivo csv

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

  const rows = [];

  Object.keys(obtenerRoles).forEach(function (key) {
    rows.push(obtenerRoles[key]);
  });

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
          </Grid>
        </form>
        <div className="flex flex-col  w-full mt-10 ">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Alias
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Calle y Numero
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Colonia
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        CP
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                      >
                        Municipio
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                      >
                        Editar
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                      >
                        Eliminar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((row) => (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {row.alias}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {row.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {row.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{row.cp}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {row.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {row.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              // setopen(true);
                              // setInformation(row);
                              // setIdMun(row.municipioId);
                            }}
                            className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                          >
                            Editar
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            // onClick={() => {
                            //   setidEliminar(row.inmuebleId);
                            //   EliminarInmueble(row.inmuebleId);
                            // }}
                            className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RolesPerfiles;
