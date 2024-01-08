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
  DialogContentText
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  Obtener as ObtenerCumples,
  Eliminar,
} from "../../actions/ConsignasAction";
import ModalCrud from "./ModalCrud";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStateValue } from "../../contexto/store";

const Cumples = () => {
  const [{ sesionUsuario }, dispatch] = useStateValue();
  const [iniciaApp, setIniciaApp] = useState(true);
  const [obtenerDataGrid, setobtenerDataGrid] = useState([]);
  const [Information, setInformation] = useState({}); //Data que se envia cuando se edita
  const [accion, setAccion] = useState(""); //Obtiene la accion para ver que pop up mostrar
  const [IdConsigna, setIdConsigna] = useState("");
  const [open, setopen] = useState(false);
  //Use State para dialogo de borrado
  const [openDialog, setopenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const handleClickOpen = () => {
    setopenDialog(true);
  };

  const handleClose = () => {
    setopenDialog(false);
  };


  const handleOpen = () => {
    setopen(!open);
  };

  //Eventos de estado
  useEffect(() => {
    ConsultarCumples();
    setIniciaApp(false);
  }, [iniciaApp]);

  //------------  Solicitudes BD  -------------
  const ConsultarCumples = async () => {
    const response = await ObtenerCumples();
    setobtenerDataGrid(response.data.listaResultado);
  };

  //Eventos del GRID
  const handleEdit = useCallback(
    (row) => {
      setopen(true);
      setInformation(row.original);
      setAccion("Edicion");
      ConsultarCumples();
    },
    [obtenerDataGrid]
  );

  const handleDeleteRow = useCallback(
    (row) => {
      setopenDialog(true);
      setIdConsigna(row.getValue("consignaId"));
    },
    [obtenerDataGrid]
  );

  const EliminarRegistro = () => {
    // alert(IdConsigna);
    Eliminar(IdConsigna).then((response) => {

      if (response.status === 200) {

        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Se elimino exitosamente la consigna.",
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
        accessorKey: "consignaId",
        header: "ConsignaId",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "tipoIncidenciaId",
        header: "Tipo Incidencia Id",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "operadorId",
        header: "OperadorId",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "seReportoId",
        header: "SeReportoId",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "incidencia",
        header: "Incidencia",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "fechaYHora",
        header: "FechaYHora",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "operadorNombre",
        header: "Operador",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "seReportoNombre",
        header: "Se Reporto a",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)        }),
      },
      {
        accessorKey: "tipoIncidencia",
        header: "TipoIncidencia",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)        }),
      }
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
        initialState={{ columnVisibility: {consignaId: false,operadorId:false, seReportoId:false,tipoIncidenciaId:false } }}
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
              }}
              variant="contained"
            >
              Nueva Consgina
            </Button>
            <Button
              onClick={() => alert("Exportar Data")}
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
            Desea eliminar esta consigna ? 
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
