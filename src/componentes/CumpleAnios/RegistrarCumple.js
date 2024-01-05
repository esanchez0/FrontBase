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
import Calender from "../UI/Calender";
import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
// import es from 'date-fns/locale/es';
// import { es } from 'date-fns/locale'
import es from 'dayjs/locale/es';

const RegistrarCumple = (props) => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [ObtenerCumples, setObtenerCumples] = useState([]); //Obtiene los usuarios para cargar grid
  const [iniciaApp, setIniciaApp] = useState(true);
  const [Compania, setCompania] = useState([]); //Combos roles perfil

  const [datos, setDatos] = useState({
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    nombre: "",
    idCompania: "",
    fechaCumpleAnios: new Date("YYYY-MM-DD"),
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
      email: "",
      celular: ""
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

  };

  const changeCompania = (e) => {
    setDatos((anterior) => ({
      ...anterior,
      idCompania: e.id,
    }));
  };

  const changeCumpleAnios = (e) => {
    setDatos((anterior) => ({
      ...anterior,
      fechaCumpleAnios: dayjs(e.$d).format('YYYY-MM-DD'),
    }));
  };

  const RegistrarUsuario = (e) => {
    e.preventDefault();

    console.log(datos);

    Registrar(datos).then((response) => {
      if (response.status === 200) {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se registro exitosamente el Cumple años.",
          },
        });
        ConsultarCumples();
        LimpiarCajas();
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

  const [value, setValue] = useState(dayjs(new Date()));

  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDayjs}>
      <Container container="main" maxWidth="md" justifycontent="center">
        <div style={style.paper}>
          <Typography component="h1" variant="h5" justifyContent="center">
            Registro de CumpleAños
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  name="nombre"
                  variant="outlined"
                  fullWidth
                  label="Ingrese su nombre y apellidos"
                  onChange={IngresarValoresMemoria}
                  value={datos.nombre || ""}
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
                <DatePicker
                  views={['year', 'month', 'day']}
                  label="Mes, dia y año"
                  value={value}
                  onChange={(newValue) => changeCumpleAnios(newValue)}
                  disableFuture={true}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  variant="outlined"
                  fullWidth
                  label="Ingrese su Email"
                  onChange={IngresarValoresMemoria}
                  value={datos.email || ""}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="celular"
                  variant="outlined"
                  fullWidth
                  label="Ingrese su celular"
                  onChange={IngresarValoresMemoria}
                  value={datos.celular || ""}
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
    </LocalizationProvider>
  );
};

export default RegistrarCumple;
