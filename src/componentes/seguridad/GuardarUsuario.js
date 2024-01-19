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
import ControlAlert from "../UI/ControlAlert";
import TextBox from "../UI/TextBox";
import { v4 as uuidv4 } from "uuid";
import isEmail from "validator/lib/isEmail";
import ListSelector from "../UI/ListSelector";
import TextBoxPassword from "../UI/TextBoxPassword";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";

const GuardarUsuario = (props) => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [obtenerUsuarios, setObtenerUsuarios] = useState([]); //Obtiene los usuarios para cargar grid
  const [iniciaApp, setIniciaApp] = useState(true);
  const [Information, setInformation] = useState({}); //Data que se envia cuando se edita
  const [PerfilId, setPerfilId] = useState(""); //Obtiene el perfil cuando va editar
  const [accion, setAccion] = useState(""); //Obtiene la accion para ver que pop up mostrar
  const [roles, setRoles] = useState([]); //Combos roles perfil
  const [rolNombre, setrolNombre] = useState([]); //Obtiene el nombre del rol perfil
  const [rolId, setrolId] = useState(""); //Obtiene el nombre del rol perfil
  //UseState para alert
  const [listaErrores, setErrores] = useState([]); //Arreglo de los errores que se mostraran
  const [openAlert, setopenAlert] = useState(false); //Bandera para mostrar y ocultar alert
  const [tipoAlert, settipoAlert] = useState("error"); //tipo de error, warning o mensaje
  const [tituloAlerta, settituloAlerta] = useState("No dejar campos vacios"); //titulo
  const [openLoad, setopenLoad] = useState(false);
  //Para el control de password
  const [passwordIgual, setpasswordIgual] = useState("");

  const handleOpenAlert = () => {
    setopenAlert(!openAlert);
  };

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
    setrolId(e);
    const nombreRol = roles.filter((item) => item.id === e);
    setrolNombre(nombreRol[0].name);

    setDatos((anterior) => ({
      ...anterior,
      idRol: e,
      nombreRol: nombreRol[0].name,
    }));
  };

  const ValidarDatos = (e) => {
    console.log(datos);
    if (datos.nombreCompleto === "" || datos.nombreCompleto === null) {
      // alert("nombre");
      // setErrores([
      //   ...listaErrores,
      //   { id: uuidv4(), descripcion: "Ingrese un nombre" }
      // ]);
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese un nombre",
      });
    }

    if (datos.email === "") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese un email",
      });
    } else {
      if (!isEmail(datos.email)) {
        listaErrores.push({
          id: uuidv4(),
          descripcion: "Ingrese un email valido",
        });
      }
    }

    if (datos.username === "") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese un username",
      });
    }

    if (datos.idRol === "" || datos.idRol === null) {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese un rol",
      });
    }
  };

  const RegistrarUsuario = (e) => {
    e.preventDefault();

    ValidarDatos(e);

    if (listaErrores.length > 0) {
      setopenAlert(true);
      return;
    }

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
        props.AtributoCerrarModal();
        props.AtributoActualizarUsuarios();
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

  const ValidarPass = (e) => {
    e.preventDefault();
    setpasswordIgual(datos.password);
    //alert("form", datos.password);
    // alert("form");
    // if (e.target.value === datos.password) {
    //   setpasswordIgual(true);
    // }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container container="main" maxWidth="md" justifycontent="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5" justifyContent="center">
          Registro de usuario
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              {/* <TextField
                                name="nombreCompleto"
                                variant="outlined"
                                fullWidth
                                label="Ingrese su nombre y apellidos"
                                onChange={IngresarValoresMemoria}
                                value={datos.nombreCompleto || ""}
                            ></TextField> */}
              <TextBox
                id="nombreCompleto"
                name="nombreCompleto"
                value={datos.nombreCompleto || ""}
                onChange={IngresarValoresMemoria}
                label="Nombre completo"
                required={true}
                requiredLabel={"Ingrese nombre"}
                uppercase={true}
              ></TextBox>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <TextField
                name="email"
                variant="outlined"
                fullWidth
                label="Ingrese su email"
                onChange={IngresarValoresMemoria}
                value={datos.email || ""}
              ></TextField> */}
              <TextBox
                id="email"
                name="email"
                value={datos.email || ""}
                onChange={IngresarValoresMemoria}
                label="Email"
                required={true}
                requiredLabel={"Ingrese email"}
                validateEmail={true}
              ></TextBox>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <TextField
                name="username"
                variant="outlined"
                fullWidth
                label="Ingrese su username"
                onChange={IngresarValoresMemoria}
                value={datos.username || ""}
              ></TextField> */}
              <TextBox
                id="username"
                name="username"
                value={datos.username || ""}
                onChange={IngresarValoresMemoria}
                label="Username"
                required={true}
                requiredLabel={"Ingrese Username"}
                uppercase={true}
              ></TextBox>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <TextField
                name="password"
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese su password"
                onChange={IngresarValoresMemoria}
                value={datos.password || ""}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField> */}
              <TextBoxPassword
                name="password"
                label="Ingrese su password"
                value={datos.password}
                onChange={IngresarValoresMemoria}
              ></TextBoxPassword>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* <TextField
                name="confirmacionpassword"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                label="Ingrese su confirmacion password"
                onChange={IngresarValoresMemoria}
                value={datos.confirmacionpassword || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField> */}
              <TextBoxPassword
                name="confirmacionpassword"
                label="Ingrese su password"
                value={datos.confirmacionpassword}
                onChange={IngresarValoresMemoria}
                onBlur={ValidarPass}
                passwordOriginal={passwordIgual}
              ></TextBoxPassword>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Autocomplete
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
              /> */}
              <ListSelector
                dataSource={roles}
                selectedValue={datos.idRol}
                label="Rol:"
                onChange={(event, newValue) => {
                  changeRol(newValue);
                }}
                idField="id"
                textField="name"
                isRequired={true}
                requiredLabel="Ingrese un rol"
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
        <ControlAlert
          errores={listaErrores}
          setErrores={setErrores}
          open={openAlert}
          handleOpen={handleOpenAlert}
          setopen={setopenAlert}
          tipoAlerta={tipoAlert}
          tituloAlerta={tituloAlerta}
        />
      </div>
    </Container>
  );
};
export default GuardarUsuario;
