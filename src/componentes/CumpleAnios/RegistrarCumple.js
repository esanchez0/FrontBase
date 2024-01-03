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
import { Registrar, Obtener } from "../../actions/CumplesAction";
import { catalogosComunes } from "../../actions/CatalogosAction";
import { useStateValue } from "../../contexto/store";
// import Modalusuario from "./Modalusuario";

const RegistrarCumple = (props) => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [ObtenerCumples, setObtenerCumples] = useState([]); //Obtiene los usuarios para cargar grid
  const [iniciaApp, setIniciaApp] = useState(true);
  const [Compania, setCompania] = useState([]); //Combos roles perfil

  const [datos, setDatos] = useState({
    id: "",
    nombre: "",
    idCompania: "",
    fechaCumpleAnios: "",
  });

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const LimpiarCajas = () => {
    setDatos({
      id: "",
      nombre: "",
      idCompania: "",
      fechaCumpleAnios: "",
    });
  };

  //Eventos de estado
  useEffect(() => {
   // ConsultarCumples();
    ConsultarCompania();
    setIniciaApp(false);
  }, [iniciaApp]);

  //------------  Solicitudes BD  -------------
  const ConsultarCumples = async () => {
    const response = await Obtener();
    setObtenerCumples(response.data);
  };

  const ConsultarCompania = async () => {
    
    const response = await catalogosComunes("Compañia");
   
    setCompania(response.data);
    console.log("resgrteso: ",response);
  };

  const changeCompania = (e) => {
    setDatos((anterior) => ({
      ...anterior,
      idCompania: e.id,
    }));
  };

  const RegistrarUsuario = (e) => {
    e.preventDefault();
    console.log(datos);

    Registrar(datos).then((response) => {
      if (response.status === 200) {
        console.log("Se registro el cumples años", response);

        // dispatch({
        //     type: "OPEN_SNACKBAR",
        //     openMensaje: {
        //         open: true,
        //         mensaje: "Se actualizaron exitosamente los cambios.",
        //     },
        // });
        ConsultarCumples();
        LimpiarCajas();
        props.AtributoCerrarModal();
        // props.AtributoActualizarUsuarios();
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

  return (
    <Container container="main" maxWidth="md" justifycontent="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5" justifyContent="center">
          Registro de CumpleAños
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="Nombre"
                variant="outlined"
                fullWidth
                label="Ingrese su nombre y apellidos"
                onChange={IngresarValoresMemoria}
                value={datos.nombreCompleto || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                onChange={(event, newValue) => {
                  changeCompania(newValue);
                }}
                id="catalogo"
                name="catalogo"
                options={Compania}
                //value={valuesdefault}
                getOptionLabel={(option) => option.valor}
                renderInput={(params) => (
                  <TextField {...params} label="Compañia" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="FechaCumpleAnios"
                variant="outlined"
                fullWidth
                label="Ingrese su fecha de nacimiento"
                onChange={IngresarValoresMemoria}
                value={datos.username || ""}
              ></TextField>
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
  );
};

export default RegistrarCumple;
