import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
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
import ListSelector from "../UI/ListSelector";

//-------------------------Control fecha y hora

const EditarConsigna = (props) => {

  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [ObtenerConsignas, setObtenerConsignas] = useState([]); //Obtiene los usuarios para cargar grid
  const [iniciaApp, setIniciaApp] = useState(true);
  const [TipoIncidencia, setTipoIncidencia] = useState([]); //Combos roles perfil
  const [obtenerUsuarios, setObtenerUsuarios] = useState([]);
  var timespan = require('timespan');


  const [datos, setDatos] = useState({
    consignaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    incidencia: "",
    tipoIncidenciaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    seReportoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    operadorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    fechaYHora: new Date("YYYY-MM-DD")
    });

  const LimpiarCajas = () => {
    setDatos({
      consignaId: "",
      incidencia: "",
      tipoIncidenciaId: "",
      seReportoId: "",
      operadorId: "",
      fechaYHora: ""
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

    setDatos(props.AtributoData);

    ConsultarCatTipoIncidencia();
    Consultarusuarios();
    console.log(props.AtributoData);

    console.log(props.AtributoData.operadorId);
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

  const EditarConsigna = (e) => {
    e.preventDefault();

    console.log(datos);

    Registrar(datos).then((response) => {
      if (response.status === 200) {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se actualizo exitosamente la consigna.",
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
            Editar de Consigna
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6}>

              </Grid>
              <Grid item xs={12} md={6}>
                <ListSelector
                  dataSource={obtenerUsuarios}
                  selectedValue={datos.seReportoId}
                  label="Tipo incidencia:"
                  //onChange={(event, newValue) => {
                  //  changeTipoIncidencia(newValue);
                  idField="id"
                  textField="nombreCompleto"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="incidencia"
                  variant="outlined"
                  fullWidth
                  label="Ingrese la descripcion de la incidencia"
                  onChange={IngresarValoresMemoria}
                  value={datos.incidencia || ""}
                ></TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <ListSelector
                   dataSource={obtenerUsuarios}
                   selectedValue={datos.seReportoId}
                   label="Se reporto a:"
                  //onChange={(event, newValue) => {
                   //  changeSeReportoA(newValue);
                   //}}
                  idField="id"
                  textField="nombreCompleto"
                />
              </Grid>              
              <Grid item xs={12} md={6}>
                <ListSelector
                    dataSource={obtenerUsuarios}
                    selectedValue={datos.operadorId}
                    label="Operador:"
                  // onChange={(event, newValue) => {
                  //   changeOperador(newValue);
                  // }}
                  idField="id"
                  textField="nombreCompleto"
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
                  onClick={EditarConsigna}
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

export default EditarConsigna;
