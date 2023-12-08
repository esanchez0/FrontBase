import React, { useState, useEffect, useMemo } from "react";
import style from "../Tool/style";
import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box
} from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {
  registrarCatalogo,
  ObtenerPerfiles,
} from "../../actions/CatalogosAction";
import { useStateValue } from "../../contexto/store";
//------------    PARA MOSTRAR DATOS    ---------------
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
//------------    PARA MOSTRAR DATOS    ---------------
//-----------     Ejemplo exportyar archivo csv
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv";

const RolesPerfiles = () => {
  const [{ usuarioSesion }, dispatch] = useStateValue();
  const [obtenerRoles, setobtenerRoles] = useState([]);

  useEffect(() => {
    ObtenerRoles();
  }, []);

  const ObtenerRoles = async () => {
    const response = await ObtenerPerfiles();
    setobtenerRoles(response.data);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "normalizedName", //access nested data with dot notation
        header: "Nombre Perfil",
        size: 150,
      },
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Nombre Perfil",
        size: 150,
      },

      {
        accessorKey: "id", //access nested data with dot notation
        header: "Nombre Perfil",
        size: 150,
      },
    ],
    []
  );

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

  const Guardar = (e) => {
    e.preventDefault();

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

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(obtenerRoles);
  };

  return (
    <Container container="main" maxWidth="xs" justifycontent="center">
      <div style={style.paper}>
        <Typography component="h1" variant="h5">
          Roles - Perfil
        </Typography>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={style.submit}
                onClick={Guardar}
              >
                Guardar Perfil
              </Button>
            </Grid>
          </Grid>
        </form>

        <MaterialReactTable

          localization={MRT_Localization_ES}
          columns={columns}
          data={obtenerRoles}
          enableRowSelection
          positionToolbarAlertBanner="bottom" //Aun no se
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Exportar todos los datos
              </Button>
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                //export all rows, including from the next page, (still respects filtering and sorting)
                onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Exportar todas las filas
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                onClick={() => handleExportRows(table.getRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Exportar pagina
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() =>
                  handleExportRows(table.getSelectedRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Exportar filas seleccionadas
              </Button>
            </Box>
          )}
        />
      </div>
    </Container>
  );
};

export default RolesPerfiles;
