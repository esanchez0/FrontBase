import React, { useState, useEffect, useRef } from "react";
import style from "../Tool/style";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useStateValue } from "../../contexto/store";
import TextBox from "../UI/TextBox";
//import { ConsultarCargaResguardo } from "../../actions/CargaResguardoAction";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//import { CargarResguardo } from "../../actions/CargaResguardoAction";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Calender from "../UI/Calender";
import ListSelector from "../UI/ListSelector"

const Nuevo = (props) => {
  const [iniciaApp, setIniciaApp] = useState(true);
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue(); //useStateValue();

  const [setCargaResguardo] = useState([]);

  useEffect(() => {
    //ConsultarCargaResguardoAction();
    setIniciaApp(false);
  }, [iniciaApp]);

  const rows = [];

 /* Object.keys(CargaResguardo).forEach(function (key) {
    rows.push(CargaResguardo[key]);
    //console.log("Row:"+JSON.stringify(rows));

  });
  */

/*
  const ConsultarCargaResguardoAction = async () => {

    const response = await ConsultarCargaResguardo("");

    if (response.status === 200) {
      setCargaResguardo(response.data);
      //console.log(JSON.stringify(response));
    }

  };*/

  const refFileUpload = useRef();

  /*
  const CargaResguardoAction = async () => {

    const dataForm = refFileUpload.current.obtenerFormData();

    if (dataForm == undefined || dataForm.hasValue == undefined || dataForm.hasValue == null || dataForm.hasValue == false) {
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: "Debe seleccionar un archivo CSV valido",
        },
      });

      return;
    }

    //const response = await CargarResguardo(dataForm.formData);

    if (response.status === 200) {
      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: response.data.respuesta,
        },
      });

      ConsultarCargaResguardoAction();

      console.log(JSON.stringify(response));
    } else {

      dispatch({
        type: "OPEN_SNACKBAR",
        openMensaje: {
          open: true,
          mensaje: response.data.respuesta,
        },
      });
    }

  };*/

  const refModalDetalle = useRef();
  const [abrirModalDetalleBandera, setAbrirModalDetalle] = useState(false);

  const onChangeFecha = (date) => {
    console.log(date);
  };

  const handlesetAbrirModalDetalle = (detalle) => {
    refModalDetalle.current.cargarDatos(detalle);
    setAbrirModalDetalle(!abrirModalDetalleBandera);
  };

  const handlesetCerrarModalDetalle = (detalle) => {
    setAbrirModalDetalle(!abrirModalDetalleBandera);
  };

  return (
    <Container
      container="main"
      maxWidth="lg"
      justifycontent="center"
      style={style.Container}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Incidencias</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={style.paper}>
            <Typography component="h1" variant="h5">
              Nueva Incidencia
            </Typography>
            <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <ListSelector
                dataSource={[{id:1,descripcion:"Chofer"},{id:2,descripcion:"Escolta"}]}       
                //selectedValue={datos.estadoId}
                label="Tipo:"
                // onChange={(event, newValue) => {
                //   changeEstado(newValue);
                // }}
                idField="id"
                textField="descripcion"
            /> 
            </Grid>
            <Grid item xs={12} md={6}>
              <Calender
                  fullScreen={false}
                  onChange={onChangeFecha}
              // DateFormat="dd-MM-yyyy"
              ></Calender>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Hora"
                variant="outlined"
                fullWidth
                label="Ingrese Hora entrada"
                //onChange={IngresarValoresMemoria}
                //value={datos.username || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="Hora"
                variant="outlined"
                fullWidth
                label="Ingrese Hora salida"
                //onChange={IngresarValoresMemoria}
                //value={datos.username || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <ListSelector
                  dataSource={[{id:1,descripcion:"Luis"},{id:2,descripcion:"Abel"}]}       
                  //selectedValue={datos.estadoId}
                  label="Origino (Chofer/Operador):"
                  // onChange={(event, newValue) => {
                  //   changeEstado(newValue);
                  // }}
                  idField="id"
                  textField="descripcion"
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="HorasExtras"
                variant="outlined"
                fullWidth
                label="Horas extras"
                //onChange={IngresarValoresMemoria}
                //value={datos.username || ""}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={12}>
              <TextBox
                id="Incidencia"
                name="Incidencia"
                value=""
                fullWidth
                label="Ingrese Incidencia"
                //onChange={IngresarValoresMemoria}
                //value={datos.password || ""}
                required={true}
                requiredLabel={"Ingrese Informacion"}
              ></TextBox>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
                //onClick={ActualizarDatos}
              >
                Guardar Datos
              </Button>
            </Grid>
          </Grid>
        </form>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Consulta</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col  w-full mt-10 ">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nombre Archivo
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Fecha Carga
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total Resguardos
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total Resguardos Cargados
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                        >
                          Total Resguardos No Cargados
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider mx-auto"
                        >
                          Ver detalles
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {rows.map((row) => (
                        <tr key={row.Id}>
                          {console.log("EntroRow:")}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.nombreArchivo}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.fechaCarga}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.totalResguardos}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.totalResguardosCargados}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {row.totalResguardosNoCargados}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const valuesArray = JSON.parse(row.mensajes)
                                handlesetAbrirModalDetalle(valuesArray);
                              }}
                              className="bg-green-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mx-5 md:mt-0 mt-5 "
                            >
                              <VisibilityOutlinedIcon />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default Nuevo;