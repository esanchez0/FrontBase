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
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Grid,
  Autocomplete,
  Container,
  Collapse,
  DialogContentText
} from "@mui/material";
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { Delete, Edit } from "@mui/icons-material";
import {
  Registrar as Guardar,
  Obtener as ObtenerCumples,
  Eliminar,
} from "../../actions/CumplesAction";
import ModalCrud from "./ModalCrud";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import style from "../Tool/style";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Cumples = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [iniciaApp, setIniciaApp] = useState(true);
  const [obtenerDataGrid, setobtenerDataGrid] = useState([]);

  const [Information, setInformation] = useState({}); //Data que se envia cuando se edita
  const [PerfilId, setPerfilId] = useState(""); //Obtiene el perfil cuando va editar
  const [accion, setAccion] = useState(""); //Obtiene la accion para ver que pop up mostrar
  const [open, setopen] = useState(false);
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
    setobtenerDataGrid(response.data);
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
              }}
              variant="contained"
            >
              Nuevo CumpleAños
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
        Perfil={PerfilId}
        Actualizar={ConsultarCumples}
        Accion={accion}
      />

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
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
          <Button onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default Cumples;
