import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import style from "../Tool/style";
import { Registrar, Obtener } from "../../actions/ConsignasAction";
import { catalogosComunes } from "../../actions/CatalogosAction";
import { ObtenerUsuarios } from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";

//-------------------------Control fecha y hora
import dayjs from 'dayjs';
import es from 'dayjs/locale/es';

import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import ClockIcon from '@mui/icons-material/AccessTime';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import { DatePicker, LocalizationProvider, esES } from '@mui/x-date-pickers';

//-------------------------Control fecha y hora

const RegistrarConsigna = (props) => {

  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [ObtenerConsignas, setObtenerConsignas] = useState([]); //Obtiene los usuarios para cargar grid
  const [iniciaApp, setIniciaApp] = useState(true);
  const [TipoIncidencia, setTipoIncidencia] = useState([]); //Combos roles perfil
  const [obtenerUsuarios, setObtenerUsuarios] = useState([]);
  var timespan = require('timespan');


  const [datos, setDatos] = useState({
    ConsignaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    Incidencia: "",
    TipoIncidenciaId: "",
    SeReportoId: "",
    OperadorId: "",
    FechaYHora: new Date("YYYY-MM-DD")
    });

  const LimpiarCajas = () => {
    setDatos({
      ConsignaId: "",
      Incidencia: "",
      TipoIncidenciaId: "",
      SeReportoId: "",
      OperadorId: "",
      FechaYHora: ""
    });
  };

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  useEffect(() => {
    ConsultarCatTipoIncidencia();
    Consultarusuarios();

    setIniciaApp(false);
  }, [iniciaApp]);

  //------------  Solicitudes BD  -------------

  const ConsultarCumples = async () => {
    const response = await Obtener();
    setObtenerConsignas(response.data.ListaResultado);
  };

  const ConsultarCatTipoIncidencia = async () => {

    const response = await catalogosComunes("Incidencias");
    setTipoIncidencia(response.data);

  };

  const changeTipoIncidencia = (e) => {
    setDatos((anterior) => ({
      ...anterior,
      TipoIncidenciaId: e.id,
    }));
  };

  const changeSeReportoA= (e) => {
    setDatos((anterior) => ({
      ...anterior,
      SeReportoId: e.idUsuario,
    }));
  };

  const changeOperador= (e) => {
    setDatos((anterior) => ({
      ...anterior,
      OperadorId: e.idUsuario,
    }));
  };

  const changeFechaYHora = (e) => {
    setDatos((anterior) => ({
      ...anterior,
      FechaYHora: dayjs(e.$d).format('YYYY-MM-DDTHH:mm'),
    }));
  };

  const RegistrarConsigna = (e) => {
    e.preventDefault();

    console.log(datos);

    Registrar(datos).then((response) => {
      if (response.status === 200) {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se registro exitosamente la consigna.",
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

      //------------  Solicitudes BD  -------------
      const Consultarusuarios = async () => {
        const response = await ObtenerUsuarios();
        setObtenerUsuarios(response.data);
        setIniciaApp(false);
    };

 //Fechas
  const [dateWithNoInitialValue, setDateWithNoInitialValue] = useState(null);
 //Fechas


  const [value, setValue] = useState(dayjs(new Date()));

  return (
    <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDayjs}>
      <Container container="main" maxWidth="md" justifycontent="center">
        <div style={style.paper}>
          <Typography component="h1" variant="h5" justifyContent="center">
            Registro de Consigna
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <DateTimePicker
                    disableFuture
                    hideTabs
                    openTo="hours"
                    value={dateWithNoInitialValue}
                    onChange={(newValue) => {
                      changeFechaYHora(newValue);
                    }}
                    minDate={dayjs('2018-01-01')}
                    components={{
                      LeftArrowIcon: AlarmIcon,
                      RightArrowIcon: SnoozeIcon,
                      OpenPickerIcon: ClockIcon,
                    }}
                    minTime={dayjs('2018-01-01T09:00')}
                    maxTime={dayjs('2018-01-01T20:00')}
                    renderInput={(params) => (
                      <TextField {...params} helperText="Fecha y hora" />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    changeTipoIncidencia(newValue);
                  }}
                  id="TipoIncidenciaId"
                  name="TipoIncidenciaId"
                  options={TipoIncidencia}
                  getOptionLabel={(option) => option.valor}
                  renderInput={(params) => (
                    <TextField {...params} label="Tipo incidencia" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="Incidencia"
                  variant="outlined"
                  fullWidth
                  label="Ingrese la descripcion de la incidencia"
                  onChange={IngresarValoresMemoria}
                  value={datos.Incidencia || ""}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    changeSeReportoA(newValue);
                  }}
                  id="SeReportoId"
                  name="SeReportoId"
                  options={obtenerUsuarios}
                  getOptionLabel={(option) => option.nombreCompleto}
                  renderInput={(params) => (
                    <TextField {...params} label="Se reporto a:" variant="outlined" />
                  )}
                />
              </Grid>              
              <Grid item xs={12} md={6}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    changeOperador(newValue);
                  }}
                  id="OperadorId"
                  name="OperadorId"
                  options={obtenerUsuarios}
                  getOptionLabel={(option) => option.nombreCompleto}
                  renderInput={(params) => (
                    <TextField {...params} label="Operador" variant="outlined" />
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
                  onClick={RegistrarConsigna}
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

export default RegistrarConsigna;
