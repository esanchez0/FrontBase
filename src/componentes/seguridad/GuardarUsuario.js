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
        console.log(datos);

        Guardar(datos).then((response) => {
            if (response.status === 200) {
                console.log("Se registro el usuario", response);
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


    return (
        <Container container="main" maxWidth="md" justifycontent="center">
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
        </Container>
    )

};
export default GuardarUsuario;