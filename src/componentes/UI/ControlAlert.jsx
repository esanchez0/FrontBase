import React, { useState, useEffect } from "react";
import { AlertTitle, Dialog, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

{/* 
Ejemplo para implementar el control

<ControlAlert
errores={listaErrores}              *Arreglo con el mensaje a mostrar
setErrores={setErrores}             *Usestate para limpiar el arreglo
open={openAlert}                    *Propiedad para abrir la alerta
handleOpen={handleOpenAlert}        *Funcion para abrir
setopen={setopenAlert}              *Funcion para cambiar la bandera, abrir y cerrar alerta
tipoAlerta={tipoAlert}              *Tipo de alerta a mostrar(success,info,warning,error)
tituloAlerta={tituloAlerta}         *Titulo que se muestra en la alerta

/> */}


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function ControlAlert(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        props.setopen(false);
        props.setErrores([]);
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <Alert onClose={handleClose}  severity={props.tipoAlerta}>
                <AlertTitle>{props.tituloAlerta}</AlertTitle>

                <ul>
                    {props.errores.map(error => (
                        <li key={error.id}>{error.descripcion}</li>
                    ))}
                </ul>
            </Alert>
        </Dialog>
    );

}
