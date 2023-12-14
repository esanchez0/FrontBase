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
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  registrarCatalogo,
  ObtenerPerfiles,
  EliminarRol,
} from "../../actions/CatalogosAction";
import { useStateValue } from "../../contexto/store";
import style from "../Tool/style";

const CrudGRID = () => {
  const [obtenerRoles, setobtenerRoles] = useState([]);

  useEffect(() => {
    ObtenerRoles();
  }, []);

  const ObtenerRoles = async () => {
    const response = await ObtenerPerfiles();
    setobtenerRoles(response.data);
    setTableData(response.data);
  };

  const [createModalOpen, setCreateModalOpen] = useState(false); //handler abrir y cerra modal
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const [{ usuarioSesion }, dispatch] = useStateValue();
  //Guardar nuevo registro
  const handleCreateNewRow = (datos) => {
    console.log(datos);
    // tableData.push(datos);
    // setTableData([...tableData]);
    registrarCatalogo(datos).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Perfil guardado exitosamente",
          },
        });
        ObtenerRoles();
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "Error al intentar guardar el perfil nuevo",
          },
        });
      }
    });
  };

  //Editar guardar ya registro registro
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    //row.original.id para obtener el id que se va editar
    //values los nuevos valores que se ingresaron

    if (!Object.keys(validationErrors).length) {
      //Actualizamos los valores y regresamos la data nueva
      tableData[row.index] = values;
      setTableData([...tableData]);
      exitEditingMode(); //siempre se pone es requerido para salir de la modal
    }
  };

  //Cerrar popup editar
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //Eliminar registro, ir a la api eliminar y vovler a llenar datos
  const handleDeleteRow = useCallback(
    (row) => {
      //console.log(JSON.stringify(row.original));

      // if (
      //   !window.confirm(
      //     "Seguro que desea eliminar" // ${row.getValue("id")}
      //   )
      // ) {
      //   return;
      // }

      // tableData.splice(row.index, 1);
      // setTableData([...tableData]);

      const objDatos = {
        nombre: row.getValue("name"),
      };

      console.log(objDatos);

      EliminarRol(objDatos).then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Perfil eliminado exitosamente",
            },
          });
          ObtenerRoles();
        } else {
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: true,
              mensaje: "Error al intentar elininar el perfil",
            },
          });
        }
      });
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  //Configuramos las columnas que se mostraran en la tabla
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Nombre",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "normalizedName",
        header: "Nombre mayusculas",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: "email",
      //   header: "Email",
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //     type: "email",
      //   }),
      // },
      // {
      //   accessorKey: "age",
      //   header: "Edad",
      //   size: 80,
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //     type: "number",
      //   }),
      // },
      // {
      //   accessorKey: "state",
      //   header: "State",
      //   muiTableBodyCellEditTextFieldProps: {
      //     select: true, //change to select for a dropdown
      //     children: states.map((state) => (
      //       <MenuItem key={state} value={state}>
      //         {state}
      //       </MenuItem>
      //     )),
      //   },
      // },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <Container container="main" maxWidth="xs" justifycontent="center">
        <div style={style.paper}>
          <MaterialReactTable
            displayColumnDefOptions={{
              "mrt-row-actions": {
                muiTableHeadCellProps: {
                  align: "center",
                },
                size: 120,
              },
            }}
            columns={columns}
            data={tableData}
            editingMode="modal" //default
            enableColumnOrdering
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              //Menu para editar o eliminar registros
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Editar">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Eliminar">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              //Boton para crear nuevo, muestra la modal
              <Button
                color="secondary"
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                Crear nuevo perfil
              </Button>
            )}
          />
        </div>
      </Container>
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//Modal mui para crear nuevos registros
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [datos, setDatos] = useState({
    nombre: "",
  });

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //Se obtienen los valores de las cajas de texto
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  //Obtener valores, logica para validaciones
  const GuardarNuevo = () => {
    //  alert("valido nuevo");
    onSubmit(datos);
    setDatos({ nombre: "" });
    onClose();
  };

  //Pop de Nuevo
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Nuevo Perfil</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {/* Ciclo for, recorre las columnas y crea dinamicamente los textbox */}
            {/* {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))} */}
            <Container container="main" maxWidth="xs" justifycontent="center">
              <div style={style.paper}>
                <form style={style.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        variant="outlined"
                        label="Ingrese Perfil"
                        name="nombre"
                        fullWidth
                        margin="normal"
                        onChange={IngresarValoresMemoria}
                        value={datos.nombre || ""}
                      ></TextField>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="secondary" onClick={GuardarNuevo} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;
export default CrudGRID;
