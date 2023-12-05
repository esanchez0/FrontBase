import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { styled } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function TextBox(props) {
  const classes = useStyles();
  const [ctrlValue, setCtrlValue] = useState(props.value);
  const [requiredLabel, setRequiredLabel] = useState(
    props.requiredLabel || "Valor requerido"
  );
  const [ctrlLabel, setLabel] = useState(props.label || "Ingrese valor");
  const [isRequired, setRequired] = useState(props.required || false);
  const [isDisabled, setDisabled] = useState(props.disabled || false);
  const [Type, setType] = useState(props.type || "text");
  const [status, setStatus] = useState(false);
  const [isuppercase, setuppercase] = useState(props.uppercase || true);

  const DivRequeridValidation = styled("div")({
    color: "white",
    backgroundColor: "#f44336",
    padding: 10,
    marginbottom: 5,
    textAlign: "center",
    verticalAlign: "middle",
    font: "text-danger",
  });

  const onTextChange = (e) => {
    e.preventDefault();

    let newVal = e.target.value !== null ? e.target.value : "";

    SetItem(newVal);

    if (props.onChange !== undefined) props.onChange(e);
  };

  const SetItem = (val) => {
    let defaultId = undefined;

    if (val !== defaultId) {
      val = val === null ? defaultId : val;

      try {
        if (val !== defaultId) {
          setCtrlValue(val);

          if (val === "") setStatus(isRequired);
        }
      } catch (e) {
        console.log("Se presentó un problema.");
      }
    }
  };

  useEffect(() => {
    if (props.value !== null) SetItem(props.value);
  }, [props.value]);

  const [error, seterror] = useState("");

  const Validate = (e) => {
    e.preventDefault();

    if (isRequired) {
      if (!e.target.value) {
        seterror(props.requiredLabel);
      } else {
        seterror("");
      }
    } else {
      seterror("");
    }
    return error;
  };

  if (ctrlValue !== undefined) {
    let ctrlId = props.id ?? props.name;

    return (
      <div>
        <TextField
          id={ctrlId}
          name={ctrlId}
          value={ctrlValue}
          onChange={(e) => {
            onTextChange(e);
          }}
          variant="outlined"
          fullWidth
          label={ctrlLabel}
          disabled={isDisabled}
          type={Type}
          onBlur={(e) => {
            Validate(e);
          }}
          inputProps={{
            style: { textTransform: isuppercase ? "uppercase" : "" },
          }}
          
        />
        {/* {(ctrlValue === '' && status) ? (<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{requiredLabel}</p>
      </div>) : null} */}
        {error ? (
          <DivRequeridValidation>
            {error && <span className="err">{error}</span>}
          </DivRequeridValidation>
        ) : null}
      </div>
    );
  } else {
    return <Skeleton variant="rounded" width={"100%"} height={60} />;
  }
}
