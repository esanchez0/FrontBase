import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { styled } from "@mui/system";
import isEmail from "validator/lib/isEmail";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function TextBoxPassword(props) {
  // const [requiredLabel, setRequiredLabel] = useState(props.requiredLabel || "Valor requerido");
  // const [ctrlLabel, setLabel] = useState(props.label || "Ingrese valor");
  // const [isRequired, setRequired] = useState(props.required || false);
  // const [isuppercase, setuppercase] = useState(props.uppercase || false);

  const [name, setname] = useState(props.name);
  const [label, setlabel] = useState(props.label);
  const [value, setvalue] = useState(props.value);
  const [showPassword, setShowPassword] = useState(false);
  const [mostrarError, setmostrarError] = useState(false);
  const [mensajeError, setmensajeError] = useState(
    props.mensajeError || "Ingresar password"
  );

  //Estos 2 useState solo se envian en la confirmacion del password
  const [passwordOriginal, setpasswordOriginal] = useState(
    props.passwordOriginal || ""
  );
  const [validarPasswordIgual, setvalidarPasswordIgual] = useState(
    props.mensajeError || false
  );

  useEffect(() => {
     alert( props.passwordOriginal);
    setvalue(props.value);
  }, [props.value]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onTextChange = (e) => {
    e.preventDefault();

    if (e.target.value === null || e.target.value === "") {
      setmostrarError(true);
    } else {
      setmostrarError(false);
    }
    if (props.onChange !== undefined) props.onChange(e);
  };

  // //Solo en el textbox de confirmacion
  const onBlurText = (e) => {
    if (props.onBlur !== undefined) {
     

 
      // if (passwordOriginal === e.target.value) {
      //   alert("igual");
      // } else alert("dif");
      // e.preventDefault();
      // alert("control");
    }

     if (props.onBlur !== undefined) props.onBlur(e);
  };

  const DivRequeridValidation = styled("div")({
    color: "white",
    backgroundColor: "#FF7D33",
    padding: 10,
    marginbottom: 5,
    textAlign: "center",
    verticalAlign: "middle",
    font: "text-danger",
  });

  return (
    <div>
      <TextField
        name={name}
        // type="password"
        variant="outlined"
        fullWidth
        label={label}
        // onChange={props.onChange}
        onBlur={(e) => {
          onBlurText(e);
        }}
        // onBlur={props.onBlur}
        onChange={(e) => {
          onTextChange(e);
        }}
        value={value}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
      {mostrarError ? (
        <DivRequeridValidation>
          {mensajeError && <span className="err">{mensajeError}</span>}
        </DivRequeridValidation>
      ) : null}
    </div>
  );
}
