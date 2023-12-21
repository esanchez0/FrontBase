import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
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
    Container
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { data, states } from './makeData';
import {
    registrarUsuario as Guardar,
    ObtenerUsuarios,
    obtenerRoles,
} from "../../actions/UsuarioAction";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import style from "../Tool/style";
import Modalusuario from "./Modalusuario";

const RegistrarUsuarioNueva = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    const [iniciaApp, setIniciaApp] = useState(true);
    const [obtenerUsuarios, setObtenerUsuarios] = useState([]); //Obtiene los usuarios para cargar grid
    const [roles, setRoles] = useState([]); //Combos roles perfil

    const [Information, setInformation] = useState({}); //Data que se envia cuando se edita
    const [PerfilId, setPerfilId] = useState(""); //Obtiene el perfil cuando va editar
    const [accion, setAccion] = useState(""); //Obtiene la accion para ver que pop up mostrar


    const [open, setopen] = useState(false);
    const handleOpen = () => {
        setopen(!open);
    };

    const IngresarValoresMemoria = (e) => {

        const [datos, setDatos] = useState({
            nombreCompleto: "",
            email: "",
            password: "",
            username: "",
            confirmacionpassword: "",
            nombreRol: "",
            idRol: "",
        });


        const { name, value } = e.target;
        setDatos((anterior) => ({
            ...anterior,
            [name]: value,
        }));
    };

    //Eventos de estado
    useEffect(() => {
        Consultarusuarios();
        consultarRoles();
        setIniciaApp(false);
    }, [iniciaApp]);

    //------------  Solicitudes BD  -------------
    const Consultarusuarios = async () => {
        const response = await ObtenerUsuarios();
        setObtenerUsuarios(response.data);
        setTableData(response.data);
        setIniciaApp(false);
    };

    const consultarRoles = async () => {
        const response = await obtenerRoles();
        setRoles(response.data);
    };

    const rowsRoles = [];

    Object.keys(roles).forEach(function (key) {
        rowsRoles.push(roles[key]);
    });

    //------------  Solicitudes BD  -------------

    const handleCreateNewRow = (values) => {
        tableData.push(values);
        setTableData([...tableData]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            setTableData([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                !window.confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    const handleEdit = useCallback(
        (row) => {
            setopen(true);
            setInformation(row.original);
            setPerfilId(row.original.perfilId);
            setAccion("Edicion");
            Consultarusuarios();
        },
        [tableData],
    );

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                            ? validateEmail(event.target.value)
                            : cell.column.id === 'age'
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
        [validationErrors],
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'idUsuario',
                header: 'ID',
                //  enableColumnOrdering: false,
                //  enableEditing: false, //disable editing on this column
                //  enableSorting: false,
                //   size: 80,

            },
            {
                accessorKey: 'nombreCompleto',
                header: 'Nombre',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'userName',
                header: 'Nombre de Usuario',
                size: 140,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
            },
            {
                accessorKey: 'email',
                header: 'Email',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'email',
                }),
            },
            // {
            //     accessorKey: 'perfil',
            //     header: 'Perfil',
            //     size: 80,
            //     muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            //         ...getCommonEditTextFieldProps(cell),
            //         //type: 'number',
            //     }),
            // },
            {
                accessorKey: 'perfil',
                header: 'Roles',
                muiTableBodyCellEditTextFieldProps: {
                    select: true, //change to select for a dropdown
                    children: rowsRoles.map((state) => (
                        //  console.log(state)
                        <MenuItem key={state.id} value={state.name}>
                            {state}
                        </MenuItem>
                    )),
                },
            },
        ],
        [getCommonEditTextFieldProps],
    );

    return (
        <Container container="main" maxWidth="lg" justifycontent="center" style={{ paddingTop: 10 }}>
            <>
                <MaterialReactTable
                    localization={MRT_Localization_ES}

                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            size: 120,
                        },
                    }}
                    columns={columns}
                    data={tableData}
                    initialState={{ columnVisibility: { idUsuario: false } }}
                    //editingMode="modal" //default
                    enableColumnOrdering
                    enableEditing
                    // onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
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
                        <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                            <Button

                                // onClick={() => setCreateModalOpen(true)}
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
                />
                <CreateNewAccountModal
                    columns={columns}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                    dataRoles={roles}
                />

                <Modalusuario
                    open={open}
                    handleOpen={handleOpen}
                    Information={Information}
                    setopen={setopen}
                    Perfil={PerfilId}
                    Actualizar={Consultarusuarios}
                    Accion={accion}
                />
            </>
        </Container>
    );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit, dataRoles }) => {

    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );

    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Nuevo usuario</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    name="nombreCompleto"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese su nombre y apellidos"
                                // onChange={IngresarValoresMemoria}
                                //  value={datos.nombreCompleto || ""}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese su email"
                                //  onChange={IngresarValoresMemoria}
                                //  value={datos.email || ""}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="username"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese su username"
                                //  onChange={IngresarValoresMemoria}
                                //  value={datos.username || ""}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese su password"
                                //   onChange={IngresarValoresMemoria}
                                //   value={datos.password || ""}
                                ></TextField>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="confirmacionpassword"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese su confirmacion password"
                                //  onChange={IngresarValoresMemoria}
                                // value={datos.confirmacionpassword || ""}
                                ></TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Autocomplete
                                    // onChange={(event, newValue) => {
                                    //     changeRol(newValue);
                                    // }}
                                    id="nombreRol"
                                    name="nombreRol"
                                    options={dataRoles}
                                    //value={valuesdefault}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Roles" variant="outlined" />
                                    )}
                                />
                            </Grid>
                        </Grid>
                        {/* <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    style={style.submit}
                   // onClick={RegistrarUsuario}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid> */}

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
                    </Stack>
                </form>

            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
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
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateAge = (age) => age >= 18 && age <= 50;

export default RegistrarUsuarioNueva;