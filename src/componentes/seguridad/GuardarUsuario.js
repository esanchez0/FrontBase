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
import { styled } from "@mui/system";

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
  const handleOpenAlert = () => {
    setopenAlert(!openAlert);
  };

  const [datos, setDatos] = useState({
    nombreCompleto: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    password: "",
    username: "",
    confirmacionpassword: "",
    nombreRol: "",
    idRol: "",
    confirmarEmail: "",
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

    if (datos.apellidoPaterno === "" || datos.apellidoPaterno === null) {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese un Apellido Paterno",
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

    if (datos.confirmarEmail === "") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingresar un email",
      });
    } else {
      if (!isEmail(datos.confirmarEmail)) {
        listaErrores.push({
          id: uuidv4(),
          descripcion: "Ingrese un email valido",
        });
        seterror("");
      } else {
        if (datos.confirmarEmail !== datos.email) {
          listaErrores.push({
            id: uuidv4(),
            descripcion: "Los emails son diferentes",
          });       
        } else{};
      }
    }

    if (datos.username === "") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese un username",
      });
    }

    if (datos.password === "") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese una contraseña",
      });
    }

    if (datos.confirmacionpassword === "") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese la confirmacion de su contraseña",
      });
    }

    if (datos.password !== "" && datos.confirmacionpassword !== "") {
      if (datos.password !== datos.confirmacionpassword) {
        listaErrores.push({
          id: uuidv4(),
          descripcion: "Las contraseñas son diferentes",
        });
      }
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

    console.log(listaErrores);

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
      } else if (response.status === 400) {
        listaErrores.push({
          id: uuidv4(),
          descripcion: response.data.errores.mensaje,
        });
        settituloAlerta("Usuario Invalido");
        setopenAlert(true);       
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

  //Para mostrar o no la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //Para mostrar o no la contraseña confirm
  const [showPasswordConfimr, setShowPasswordConfimr] = useState(false);

  const handleClickShowPasswordConfimr = () =>
    setShowPasswordConfimr((show) => !show);

  const handleMouseDownPasswordConfimr = (event) => {
    event.preventDefault();
  };

  const [error, seterror] = useState("");
  const [errorConfirm, seterrorConfirm] = useState("");
  const [emailConfirm, setemailConfirm] = useState("");

  const DivRequeridValidation = styled("div")({
    color: "white",
    backgroundColor: "#FF7D33",
    padding: 10,
    marginbottom: 5,
    textAlign: "center",
    verticalAlign: "middle",
    font: "text-danger",
  });

  const Validate = (e) => {
    e.preventDefault();

    if (!e.target.value) {
      seterror("Ingresar una contraseña");
    } else {
      seterror("");
    }

    return error;
  };

  const ValidateConfirm = (e) => {
    e.preventDefault();

    if (!e.target.value) {
      seterrorConfirm("Ingresar una contraseña");
    } else {
      if (e.target.value !== datos.password) {
        seterrorConfirm("Las contraseñas son diferentes");
      } else seterrorConfirm("");
    }

    return error;
  };

  const ValidateConfirmEmail = (e) => {
    e.preventDefault();

    if (!e.target.value) {
      setemailConfirm("Ingresar un email");
    } else {
      if (!isEmail(e.target.value)) {
        seterror("Ingrese un email valido");
      } else {
        if (e.target.value !== datos.email) {
          setemailConfirm("Los emails son diferentes");
        } else setemailConfirm("");
        //seterror("");
      }
      // if (e.target.value !== datos.email) {
      //   setemailConfirm("Los emails son diferentes");
      // } else setemailConfirm("");
    }

    return error;
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
              <TextBox
                id="apellidoPaterno"
                name="apellidoPaterno"
                value={datos.apellidoPaterno || ""}
                onChange={IngresarValoresMemoria}
                label="Apellido Paterno"
                required={true}
                requiredLabel={"Ingrese Apellido Paterno"}
                uppercase={true}
              ></TextBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextBox
                id="apellidoMaterno"
                name="apellidoMaterno"
                value={datos.apellidoMaterno || ""}
                onChange={IngresarValoresMemoria}
                label="Apellido Materno"
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
              <TextField
                id="confirmarEmail"
                name="confirmarEmail"
                value={datos.confirmarEmail || ""}
                onChange={IngresarValoresMemoria}
                onBlur={ValidateConfirmEmail}
                label="Confirmar Email"
                variant="outlined"
                fullWidth
              ></TextField>
              {emailConfirm ? (
                <DivRequeridValidation>
                  {emailConfirm && <span className="err">{emailConfirm}</span>}
                </DivRequeridValidation>
              ) : null}
            </Grid>

            <Grid item xs={12} md={12}>
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
              <TextField
                name="password"
                // type="password"
                variant="outlined"
                fullWidth
                label="Ingrese su password"
                onChange={IngresarValoresMemoria}
                onBlur={Validate}
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
              ></TextField>
              {error ? (
                <DivRequeridValidation>
                  {error && <span className="err">{error}</span>}
                </DivRequeridValidation>
              ) : null}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name="confirmacionpassword"
                type={showPasswordConfimr ? "text" : "password"}
                variant="outlined"
                fullWidth
                label="Ingrese su confirmacion password"
                onChange={IngresarValoresMemoria}
                onBlur={ValidateConfirm}
                value={datos.confirmacionpassword || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfimr}
                        onMouseDown={handleMouseDownPasswordConfimr}
                        edge="end"
                      >
                        {showPasswordConfimr ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              {errorConfirm ? (
                <DivRequeridValidation>
                  {errorConfirm && <span className="err">{errorConfirm}</span>}
                </DivRequeridValidation>
              ) : null}
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
