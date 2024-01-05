import {  useState, useEffect } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import style from "../Tool/style";
import {
  RegistrarUsuario as GuardarUsuario,
  obtenerRoles,
  ObtenerUsuarios,
  ActualizarUsuario,
} from "../../actions/UsuarioAction";
import ListSelector from "../UI/ListSelector";
import { useStateValue } from "../../contexto/store";
import TextBox from "../UI/TextBox";

const EditarUsuario = (props) => {
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue(); 
  const [userNameOlds, setuserNameOld] = useState("");
  const [datos, setDatos] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    username: "",
    confirmacionpassword: "",
    nombreRol: "",
    idRol: "",
    perfilId: null,
  });

  const IngresarValoresEnMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //Variables
  //para cargar combos
  const [roles, setRoles] = useState([]);
  //Para obtener el rolperfil y hablitar controles en la vista, precio e inmueble
  const [rolNombre, setrolNombre] = useState("");
  const [iniciaApp, setIniciaApp] = useState(true);
  const [obtenerUsuarios, setObtenerUsuarios] = useState([]);

  useEffect(() => {
    const consultarRoles = async () => {
      const response = await obtenerRoles();
      setRoles(response.data);

    };
   consultarRoles();
    setDatos(props.AtributoData);
    setrolNombre(props.AtributoData.perfil);
    setuserNameOld(props.AtributoData.userName);
    setIniciaApp(false);
  }, [iniciaApp]);



  const [open, setopen] = useState(false);
  const handleOpen = () => {
    setopen(!open);
  };


  const changeRol = (e) => {
    const nombreRol = roles.filter((item) => item.id === e);
    //console.log(nombreRol[0].name);
    setrolNombre(nombreRol[0].name);
    // setestadoid(Id[0].estadoId);
    setDatos((anterior) => ({
      ...anterior,
      perfilId: e,
      nombreRol: nombreRol[0].name,
    }));
  };


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

  const GuardarUsuario = (e) => {
    let mensajeFinal = "";
    e.preventDefault();
    console.log(datos);

    ActualizarUsuario(datos, dispatch).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("token_seguridad", response.data.token); //Almacenando token
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se guardaron exitosamente los cambios en Perfil Usuario",
          },
        });
        LimpiarCajas();
        props.AtributoCerrarModal();
        props.AtributoActualizarUsuarios();
      } else {
        if (response.data.errores != undefined) {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: response.data.errores.mensaje,
            },
          });
        } else {
          Object.entries(response.data.errors).forEach(([key, value]) => {
            mensajeFinal += `${value}` + " ";
          });
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: mensajeFinal,
              // "Errores al intentar guardar en : " +
              // Object.keys(response.data.errors),
            },
          });
        }
      }
    });
  };

  return (
    <Container container="main" maxWidth="md" justifycontent="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5" justifyContent="center">
          Editar Usuario
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <ListSelector
                dataSource={roles}
                selectedValue={datos.perfilId}
                label="Rol:"
                onChange={(event, newValue) => {
                  changeRol(newValue);
                }}
                idField="id"
                textField="name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <TextField
                name="nombreCompleto"
                variant="outlined"
                fullWidth
                label="Nombre Completo"
                value={datos.nombreCompleto || ""}
                onChange={IngresarValoresEnMemoria}
              ></TextField> */}
              <TextBox
                id="nombreCompleto"
                name="nombreCompleto"
                value={datos.nombreCompleto || ""}
                onChange={IngresarValoresEnMemoria}
                label="Nombre"
                required={true}
                requiredLabel={"Ingrese Informacion"}
              ></TextBox>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <TextField
                name="email"
                variant="outlined"
                fullWidth
                label="ingrese email"
                onChange={IngresarValoresEnMemoria}
                value={datos.email || ""}
              ></TextField> */}
              <TextBox
                id="email"
                name="email"
                value={datos.email || ""}
                onChange={IngresarValoresEnMemoria}
                label="Email"
                required={true}
                requiredLabel={"Ingrese Informacion"}
              ></TextBox>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <TextField
                name="userName"
                variant="outlined"
                fullWidth
                label="ingrese userName"
                onChange={IngresarValoresEnMemoria}
                value={datos.userName || ""}
              ></TextField> */}
              <TextBox
                id="userName"
                name="userName"
                value={datos.userName || ""}
                onChange={IngresarValoresEnMemoria}
                label="User Name"
                required={true}
                requiredLabel={"Ingrese Informacion"}
              ></TextBox>
            </Grid>        

  
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                style={style.submit}
                onClick={GuardarUsuario}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default EditarUsuario;