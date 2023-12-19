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
import { MaterialReactTable} from 'material-react-table';
import { MRT_Localization_ES } from "material-react-table/locales/es";

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
  const data = [
    {
      tipo:'Operador',
      fecha: '31/11/2022 11:37',
      incidencia: 'No estaba el vigilante',
      sereportoa: 'Jose Luis Parra',
      operador:'Miguel perales'
    },
    {
      tipo:'Operador',
      fecha: '31/11/2022 11:37',
      incidencia: 'No estaba el vigilante',
      sereportoa: 'Jose Luis Parra',
      operador:'Miguel perales'
    },
    
  ];
  const columns = [
      {
        accessorKey: 'tipo', //normal accessorKey
        header: 'Tipo',
        size: 200,
      },
      {
        accessorKey: 'fecha',
        header: 'Fecha y hora',
        size: 150,
      },
      {
        accessorKey: 'incidencia',
        header: 'Incidencia',
        size: 150,
      },
      {
        accessorKey: 'sereportoa',
        header: 'Se reporto a',
        size: 150,
      },
      {
        accessorKey: 'operador',
        header: 'Operador',
        size: 150,
      },
      {
        accessorKey: 'detalles',
        header: 'Ver Detalle',
        size: 150,
      }
    ];


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
          <Typography>Consignas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={style.paper}>
            <Typography component="h1" variant="h5">
              Nueva consigna
            </Typography>
            <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <ListSelector
                dataSource={[{id:1,descripcion:"Consigna"},{id:2,descripcion:"Incidente"}]}       
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
            <Grid item xs={12} md={6}>
              <TextField
                name="Hora"
                variant="outlined"
                fullWidth
                label="Ingrese Hora"
                //onChange={IngresarValoresMemoria}
                //value={datos.username || ""}
              ></TextField>
            </Grid>
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
            <Grid item xs={12} md={6}>
            <ListSelector
                dataSource={[{id:1,descripcion:"Luis"},{id:2,descripcion:"Abel"}]}       
                //selectedValue={datos.estadoId}
                label="Se reporto a:"
                // onChange={(event, newValue) => {
                //   changeEstado(newValue);
                // }}
                idField="id"
                textField="descripcion"
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <ListSelector
                dataSource={[{id:1,descripcion:"Luis"},{id:2,descripcion:"Abel"}]}       
                //selectedValue={datos.estadoId}
                label="Operador:"
                // onChange={(event, newValue) => {
                //   changeEstado(newValue);
                // }}
                idField="id"
                textField="descripcion"
            /> 
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
                <MaterialReactTable localization={MRT_Localization_ES} columns={columns} data={data} />
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