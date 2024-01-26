import { useState, useEffect } from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import style from "../Tool/style";
import { Registrar as RegistrarActualizarIncidencia, Obtener } from "../../actions/IncidenciasKocPIBAction";
import { catalogosComunes } from "../../actions/CatalogosAction";
import { useStateValue } from "../../contexto/store";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import es from "dayjs/locale/es";
import ControlAlert from "../UI/ControlAlert";
import TextBox from "../UI/TextBox";
import { v4 as uuidv4 } from "uuid";
import isEmail from "validator/lib/isEmail";
import ListSelector from "../UI/ListSelector";

const RegistrarCumple = (props) => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [ObtenerCumples, setObtenerCumples] = useState([]); //Obtiene los usuarios para cargar grid
  const [iniciaApp, setIniciaApp] = useState(true);
  const [Compania, setCompania] = useState([]); //Combos roles perfil
  //UseState para alert
  const [listaErrores, setErrores] = useState([]); //Arreglo de los errores que se mostraran
  const [openAlert, setopenAlert] = useState(false); //Bandera para mostrar y ocultar alert
  const [tipoAlert, settipoAlert] = useState("error"); //tipo de error, warning o mensaje
  const [tituloAlerta, settituloAlerta] = useState("No dejar campos vacios"); //titulo
  const [openLoad, setopenLoad] = useState(false);
  const [accion, setAccion] = useState("Nuevo registro");

  const handleOpenAlert = () => {
    setopenAlert(!openAlert);
  };

  const [datos, setDatos] = useState({
    incidenciaKOCPBIId: "",
    fechaYHora: "",
    tipoIncidencia: "",
    nombre: "",
    empresa: "",
    asunto: "",
    descripcion: "",
    conclusion: "",
    seReportoA: "",
    analista: "",
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
      incidenciaKOCPBIId: "",
      fechaYHora: "",
      tipoIncidencia: "",
      nombre: "",
      empresa: "",
      asunto: "",
      descripcion: "",
      conclusion: "",
      seReportoA: "",
      analista: "",
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
      idCompania: e,
    }));
  };

  const changeDate = (e) => {
    setDatos((anterior) => ({
      ...anterior,
      fechaYHora: dayjs(e.$d).format("YYYY-MM-DD"),
    }));
  };

  const ValidarDatos = (e) => {
    console.log(datos);
    if (datos.nombre === "" || datos.nombre === null) {
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

    if (datos.idCompania === "" || datos.idCompania === null) {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese una compañia",
      });
    }

    if (datos.idCompania === "Invalid Date") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese una fecha",
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

    if (datos.celular === "") {
      listaErrores.push({
        id: uuidv4(),
        descripcion: "Ingrese un celular",
      });
    }
  };

  const RegistrarActualizar = (e) => {
    e.preventDefault();

    ValidarDatos(e);

    if (listaErrores.length > 0) {
      setopenAlert(true);
      return;
    }

    RegistrarActualizarIncidencia(datos).then((response) => {
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
            {accion}
          </Typography>
          <form style={style.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <DatePicker
                  views={["year", "month", "day"]}
                  label="Mes, dia y año"
                  value={value}
                  onChange={(newValue) => changeDate(newValue)}
                  disableFuture={true}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ListSelector
                  dataSource={Compania}
                  selectedValue={datos.idTipoIncidencia}
                  label="Tipo Incidencia:"
                  onChange={(event, newValue) => {
                    changeCompania(newValue);
                  }}
                  idField="id"
                  textField="valor"
                  isRequired={true}
                  requiredLabel="Ingrese tipo incidencia"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextBox
                  id="nombre"
                  name="nombre"
                  value={datos.nombre || ""}
                  onChange={IngresarValoresMemoria}
                  label="Nombre"
                  required={true}
                  requiredLabel={"Ingrese nombre"}
                  validateEmail={false}
                ></TextBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <ListSelector
                  dataSource={Compania}
                  selectedValue={datos.idEmpresa}
                  label="Empresa:"
                  onChange={(event, newValue) => {
                    changeCompania(newValue);
                  }}
                  idField="id"
                  textField="valor"
                  isRequired={true}
                  requiredLabel="Ingrese empresa"
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <TextBox
                  id="asunto"
                  name="asunto"
                  value={datos.asunto || ""}
                  onChange={IngresarValoresMemoria}
                  label="Asunto"
                  required={true}
                  requiredLabel={"Ingrese asunto"}
                  validateEmail={false}
                ></TextBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextBox
                  id="descripcion"
                  name="descripcion"
                  value={datos.descripcion || ""}
                  onChange={IngresarValoresMemoria}
                  label="Descripcion"
                  required={true}
                  requiredLabel={"Ingrese descripcion"}
                  validateEmail={false}
                ></TextBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextBox
                  id="conclusion"
                  name="conclusion"
                  value={datos.conclusion || ""}
                  onChange={IngresarValoresMemoria}
                  label="Conclusion"
                  required={true}
                  requiredLabel={"Ingrese conclusion"}
                  validateEmail={false}
                ></TextBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <ListSelector
                  dataSource={Compania}
                  selectedValue={datos.idSeReportoA}
                  label="Se reporta a:"
                  onChange={(event, newValue) => {
                    changeCompania(newValue);
                  }}
                  idField="id"
                  textField="valor"
                  isRequired={true}
                  requiredLabel="A quien se reporto?"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ListSelector
                  dataSource={Compania}
                  selectedValue={datos.idAnalista}
                  label="Analista:"
                  onChange={(event, newValue) => {
                    changeCompania(newValue);
                  }}
                  idField="id"
                  textField="valor"
                  isRequired={true}
                  requiredLabel="Ingrese analista"
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
                  onClick={RegistrarActualizar}
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
    </LocalizationProvider>
  );
};

export default RegistrarCumple;
