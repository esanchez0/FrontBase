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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  Registrar as Guardar,
  Obtener as ObtenerCumples,
  Eliminar,
} from "../../actions/CumplesAction";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import style from "../Tool/style";

const Cumples = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [iniciaApp, setIniciaApp] = useState(true);
  const [obtenerDataGrid, setobtenerDataGrid] = useState([]);

  const [Information, setInformation] = useState({}); //Data que se envia cuando se edita
  const [PerfilId, setPerfilId] = useState(""); //Obtiene el perfil cuando va editar
  const [accion, setAccion] = useState(""); //Obtiene la accion para ver que pop up mostrar

  const [open, setopen] = useState(false);
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
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("firstName")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    },
    [obtenerDataGrid]
  );

  const getCommonEditTextFieldProps = useCallback((cell) => {}, []);
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
        accessorKey: "fechaCumple",
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
        initialState={{ columnVisibility: { id: false } }}
        enableColumnOrdering
        enableEditing
        onEditingRowCancel={handleCancelRowEdits}
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
              Crear Nuevo Usuario
            </Button>
            <Button
              onClick={() => alert("Exportar Data")}
              // onClick={() => {
              //     setopen(true);
              //     setAccion("Registrar");
              // }}
              variant="contained"
            >
              Exportar Datos
            </Button>
          </Box>
        )}
      ></MaterialReactTable>
    </Container>
  );
};

export default Cumples;
