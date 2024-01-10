import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import style from "../Tool/style";
import {
  registrarUsuario as Guardar,
  ObtenerUsuarios,
  obtenerRoles,
} from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";
import Modalusuario from "./Modalusuario";

const RegistrarUsuario = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [obtenerUsuarios, setObtenerUsuarios] = useState([]); //Obtiene los usuarios para cargar grid
  const [iniciaApp, setIniciaApp] = useState(true);
  const [Information, setInformation] = useState({}); //Data que se envia cuando se edita
  const [PerfilId, setPerfilId] = useState(""); //Obtiene el perfil cuando va editar
  const [accion, setAccion] = useState(""); //Obtiene la accion para ver que pop up mostrar
  const [roles, setRoles] = useState([]); //Combos roles perfil
  const [rolNombre, setrolNombre] = useState([]); //Obtiene el nombre del rol perfil
  const [rolId, setrolId] = useState(""); //Obtiene el nombre del rol perfil

  //------  Modelo de datos -----
  const [datos, setDatos] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    username: "",
    confirmacionpassword: "",
    nombreRol: "",
    idRol: "",
  });

  const LimpiarCajas = () => {
    setDatos({
      nombreCompleto: "",
      email: "",
      password: "",
      username: "",
      confirmacionpassword: "",
      nombreRol: "",
      idRol: "",
    });
  };

  //Eventos de estado
  useEffect(() => {
    Consultarusuarios();
    consultarRoles();
    setIniciaApp(false);
  }, [iniciaApp]);

  //------------  Solicitudes BD  -------------
  const Consultarusuarios = async () => {
    const response = await ObtenerUsuarios();
    setObtenerUsuarios(response.data);
    setIniciaApp(false);
  };

  const consultarRoles = async () => {
    const response = await obtenerRoles();
    setRoles(response.data);
  };

  //------------  Solicitudes BD  -------------

  const rows = [];

  Object.keys(obtenerUsuarios).forEach(function (key) {
    rows.push(obtenerUsuarios[key]);
  });

  //------------  Eventos de controles  -------------

  const changeRol = (e) => {
    setrolNombre(e.name);
    setrolId(e.id);
    setDatos((anterior) => ({
      ...anterior,
      idRol: e.id,
      nombreRol: e.name,
    }));
  };

  const RegistrarUsuario = (e) => {
    e.preventDefault();

    Guardar(datos).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("token_seguridad", response.data.token); //Almacenando token
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se actualizaron exitosamente los cambios.",
          },
        });
        Consultarusuarios();
        LimpiarCajas();
        window.localStorage.setItem("token_seguridad", response.data.token);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "Errores al intentar guardar en : " +
              Object.keys(response.data.errors),
          },
        });
      }
    });
  };

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //------------  Eventos de controles  -------------

  const [open, setopen] = useState(false);
  const handleOpen = () => {
    setopen(!open);
  };

  return (
    <Container container="main" maxWidth="md" justifycontent="center">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Nuevo</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div style={style.paper}>
            <Typography component="h1" variant="h5" justifyContent="center">
              Registro de usuario
            </Typography>
            <form style={style.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="nombreCompleto"
                    variant="outlined"
                    fullWidth
                    label="Ingrese su nombre y apellidos"
                    onChange={IngresarValoresMemoria}
                    value={datos.nombreCompleto || ""}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="email"
                    variant="outlined"
                    fullWidth
                    label="Ingrese su email"
                    onChange={IngresarValoresMemoria}
                    value={datos.email || ""}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="username"
                    variant="outlined"
                    fullWidth
                    label="Ingrese su username"
                    onChange={IngresarValoresMemoria}
                    value={datos.username || ""}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    label="Ingrese su password"
                    onChange={IngresarValoresMemoria}
                    value={datos.password || ""}
                  ></TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    name="confirmacionpassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    label="Ingrese su confirmacion password"
                    onChange={IngresarValoresMemoria}
                    value={datos.confirmacionpassword || ""}
                  ></TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    onChange={(event, newValue) => {
                      changeRol(newValue);
                    }}
                    id="nombreRol"
                    name="nombreRol"
                    options={roles}
                    //value={valuesdefault}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="Roles" variant="outlined" />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    style={style.submit}
                    onClick={RegistrarUsuario}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Detalles</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  name="busquedaUsuario"
                  variant="outlined"
                  fullWidth
                  label="Buscar por nombre"
                  //value={datos.apellidoPaterno || ""}
                  //onChange={BuscarUsuarios}
                ></TextField>
              </Grid>
            </Grid>
          </form> */}
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
                          Nombre
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          UserName
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Perfil
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                        >
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rows.map((row) => (
                        <tr key={row.idUsuario}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.nombreCompleto}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.userName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.perfil}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap  ">
                            <div className="text-sm text-gray-900 flex flex-col md:flex-row mx-auto justify-between  ">
                              <button
                                onClick={() => {
                                  setopen(true);
                                  setInformation(row);
                                  setPerfilId(row.perfilId);
                                  setAccion("Edicion");
                                }}
                                className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                              >
                                Editar
                              </button>

                              <button
                                // onClick={() => {
                                //   EliminarUsuario(row.idUsuario);
                                // }}
                                className="bg-red-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                              >
                                Eliminar
                              </button>
                              {/* <button
                                onClick={() => {
                                  setopen(true);
                                  setInformation(row);
                                  setAccion("ResetearPassword");
                                }}
                                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                              >
                                Resetear Password
                              </button> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Modalusuario
              open={open}
              handleOpen={handleOpen}
              Information={Information}
              setopen={setopen}
              Perfil={PerfilId}
              Actualizar={Consultarusuarios}
              Accion={accion}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default RegistrarUsuario;
