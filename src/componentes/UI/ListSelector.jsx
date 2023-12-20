import React, { useState, useEffect } from "react";
import { TextField, Grid, Container } from "@mui/material";
//import Autocomplete from "@material-ui/lab/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ListSelector(props) {
  //const classes = useStyles();
  const [idField, setIdField] = useState(props.idField || "id");
  const [textField, setTextField] = useState(props.textField || "descripcion");
  const [dataList, setDataList] = useState(props.dataSource);
  const [ctrlValue, setCtrlValue] = useState(props.selectedValue || "");
  const [ctrlItem, setCtrlItem] = useState("");
  const [requiredLabel, setRequiredLabel] = useState(
    props.requiredLabel || "Valor requerido"
  );
  const [label, setLabel] = useState(props.label || "Ingrese valor");
  const [isRequired, setRequired] = useState(props.required || false);
  const [status, setStatus] = useState(false);
  const [div1, setdiv1] = useState(props.div1 || "");
  const [div2, setdiv2] = useState(props.div2 || "");

  const SetItem = (id) => {
    let defaultId = "-1";

    if (dataList.length > 0 && id !== defaultId) {
      id = id === null ? defaultId : id;

      try {
        if (id !== defaultId && id !== undefined) {
          let items = dataList.filter(
            (item) =>
              item[idField].toString().toLowerCase() ===
              id.toString().toLowerCase()
          );

          if (ctrlItem !== items[0]) {
            setCtrlItem(items[0]);
            setCtrlValue(id);
          }
        } else if (id === defaultId || id === undefined) {
          setStatus(isRequired);
          setCtrlItem("");
          setCtrlValue("");
        }
      } catch (e) {
        console.log("Se presentó un problema.");
      }
    }
  };

  const onOptionSelect = (e, args) => {
    e.preventDefault();

    let newVal = args !== null ? args : "";

    SetItem(newVal[idField]);

    if (props.onChange !== undefined) {
      props.onChange(e, newVal[idField]);
    }
  };

  useEffect(() => {
    if (dataList !== props.dataSource) setDataList(props.dataSource);

    if (props.selectedValue !== "-1") SetItem(props.selectedValue);
  }, [props.dataSource, props.selectedValue]);

  if (dataList.length > 0 && ctrlValue !== "-1") {
    let ctrlId = (props.id ?? props.name) + "list";

    return (
      // <div className="MuiAutocomplete-root mt-2 md:w-5/12 w-full MuiAutocomplete-hasClearIcon MuiAutocomplete-hasPopupIcon"
      // role="combobox" aria-expanded="false">
      //   <div className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
      <div className={props.div1} role="combobox" aria-expanded="false">
        <div className={props.div2}>
          <Autocomplete
            onChange={(event, newValue) => {
              onOptionSelect(event, newValue);
            }}
            id={ctrlId}
            name={ctrlId}
            options={dataList}
            //className={style}
            getOptionLabel={(option) =>
              option[textField] ? option[textField] : ""
            }
            value={ctrlItem}
            getoptionselected={(option, value) => {
              if (value === "") {
                return true;
              } else if (value === option) {
                return true;
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={label} variant="outlined" />
            )}
          />
          {ctrlValue === "" && status ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
              <p>{requiredLabel}</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return <Skeleton variant="rounded" width={"100%"} height={60} />;
  }
}
