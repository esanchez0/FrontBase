import { useState, useEffect } from "react";
import { Container, Typography, Grid, Button } from "@mui/material";
import style from "../Tool/style";
import { obtenerRoles, ActualizarUsuario } from "../../actions/UsuarioAction";
import { v4 as uuidv4 } from "uuid";
import isEmail from "validator/lib/isEmail";
import ListSelector from "../UI/ListSelector";
import { useStateValue } from "../../contexto/store";
import TextBox from "../UI/TextBox";
import ControlAlert from "../UI/ControlAlert";

const EditarUsuario = (props) => {
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue();
  const [userNameOlds, setuserNameOld] = useState("");
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

    if (datos.userName === "") {
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

  const GuardarUsuario = (e) => {
    let mensajeFinal = "";
    e.preventDefault();

    ValidarDatos(e);

    if (listaErrores.length > 0) {
      setopenAlert(true);
      return;
    }

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
            <Grid item xs={12} md={12}>
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
                requiredLabel={"Ingrese nombre"}
                uppercase={true}
              ></TextBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextBox
                id="apellidoPaterno"
                name="apellidoPaterno"
                value={datos.apellidoPaterno || ""}
                onChange={IngresarValoresEnMemoria}
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
                onChange={IngresarValoresEnMemoria}
                label="Apellido Materno"              
                uppercase={true}
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
                requiredLabel={"Ingrese email"}
                validateEmail={true}
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
                requiredLabel={"Ingrese Username"}
                uppercase={true}
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

export default EditarUsuario;
