import React, { useCallback, useMemo, useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Container,
  DialogContentText,
  Alert,
  AlertTitle
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  Obtener as ObtenerCumples,
  Eliminar,
} from "../../actions/CumplesAction";
import ModalCrud from "./ModalCrud";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStateValue } from "../../contexto/store";
import { v4 as uuidv4 } from 'uuid';
import { name } from "dayjs/locale/es";
import ControlAlert from "./../UI/ControlAlert";

const Cumples = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [iniciaApp, setIniciaApp] = useState(true);
  const [obtenerDataGrid, setobtenerDataGrid] = useState([]);

  const [Information, setInformation] = useState({}); //Data que se envia cuando se edita
  const [accion, setAccion] = useState(""); //Obtiene la accion para ver que pop up mostrar
  const [IdCumple, setIdCumple] = useState("");
  const [open, setopen] = useState(false);
  //UseState para dialogo de borrado
  const [openDialog, setopenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  //UseState para alert
  const [listaErrores, setErrores] = useState([]); //Arreglo de los errores que se mostraran
  const [openAlert, setopenAlert] = useState(false); //Bandera para mostrar y ocultar alert
  const [tipoAlert, settipoAlert] = useState('error'); //tipo de error, warning o mensaje
  const [tituloAlerta, settituloAlerta] = useState('Error'); //titulo



  const handleClickOpen = () => {
    setopenDialog(true);
  };

  const handleClose = () => {
    setopenDialog(false);
  };


  const handleOpen = () => {
    setopen(!open);
  };

  const handleOpenAlert = () => {
    setopenAlert(!openAlert);
  };

  //Eventos de estado
  useEffect(() => {
    ConsultarCumples();
    setIniciaApp(false);
  }, [iniciaApp]);

  //------------  Solicitudes BD  -------------
  const ConsultarCumples = async () => {
    const response = await ObtenerCumples();
    setobtenerDataGrid(response.data);
  };

  //Eventos del GRID
  const handleEdit = useCallback(
    (row) => {

      setErrores([
        ...listaErrores,
        { id: uuidv4(), descripcion: "Editar" }
      ]);



      setopen(true);
      setInformation(row.original);
      setAccion("Edicion");
      ConsultarCumples();
    },
    // [obtenerDataGrid]
  );

  const handleDeleteRow = useCallback(
    (row) => {

      setIdCumple(row.getValue("id"));
      setopenDialog(true);

      // if (
      //   !window.confirm(
      //     `Desea eliminar este cumple años ${row.getValue("id")}`
      //   )
      // ) {
      //   return;
      // }
      //send api delete request here, then refetch or update local table data for re-render
      // tableData.splice(row.index, 1);
      // setTableData([...tableData]);
    },
    [obtenerDataGrid]
  );

  const EliminarRegistro = () => {
    // alert(IdCumple);
    Eliminar(IdCumple).then((response) => {

      if (response.status === 200) {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se elimino exitosamente el Cumple años.",
          },
        });
        ConsultarCumples();
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "Errores al intentar eliminar en : " +
              Object.keys(response.data.errors),
          },
        });
      }
    });
    setopenDialog(false);
  };

  const getCommonEditTextFieldProps = useCallback((cell) => { }, []);
  //

  //Crear Columnas
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        //  enableColumnOrdering: false,
        //  enableEditing: false, //disable editing on this column
        //  enableSorting: false,
        //   size: 80,
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "compania",
        header: "Compañia",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "idCompania",
        header: "CompañiaID",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "fechaCumpleAnios",
        header: "Fechade Cumple años",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "celular",
        header: "Celular",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "edad",
        header: "Edad",
      },
    ],
    [getCommonEditTextFieldProps]
  );
  //



  return (
    <Container
      container="main"
      maxWidth="lg"
      justifycontent="center"
      style={{ paddingTop: 10 }}
    >
      <MaterialReactTable
        localization={MRT_Localization_ES}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={obtenerDataGrid}
        initialState={{ columnVisibility: { id: false, idCompania: false } }}
        enableColumnOrdering
        enableEditing
        // onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Editar">
              <IconButton onClick={() => handleEdit(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Eliminar">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
            <Button
              onClick={() => {
                setopen(true);
                setAccion("Registrar");
                setErrores([
                  ...listaErrores,
                  { id: uuidv4(), descripcion: "Registrar" }
                ]);

              }}
              variant="contained"
            >
              Nuevo CumpleAños
            </Button>
            <Button
              onClick={() => {
                alert("exportar datos");

              }}
              variant="contained"
            >
              Exportar Datos
            </Button>
          </Box>
        )}
      ></MaterialReactTable>
      <ModalCrud
        open={open}
        handleOpen={handleOpen}
        Information={Information}
        setopen={setopen}
        Actualizar={ConsultarCumples}
        Accion={accion}
      />

      <ControlAlert
        errores={listaErrores}
        setErrores={setErrores}
        open={openAlert}
        handleOpen={handleOpenAlert}
        setopen={setopenAlert}
        tipoAlerta={tipoAlert}
        tituloAlerta={tituloAlerta}
      />


      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Advertencia!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Desea eliminar este cumple años?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={EliminarRegistro} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default Cumples;
