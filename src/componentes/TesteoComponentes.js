import React, { useState } from "react";
import Calender from "./UI/Calender";
import TextBox from "./UI/TextBox";
import DatePicker, {
  registerLocale,
  calendarContainer,
} from "react-datepicker";
import ListSelector from "./UI/ListSelector";

const TesteoComponentes = () => {
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });

  const IngresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  //const [startDate, setStartDate] = useState(new Date());
  const onChangeFecha = (date) => {
    console.log(date);
  };

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const onChangeRangeDate = (dates) => {
    setDateRange(dates);
    setDateRange(dates);
    //console.log(dates[0].toLocaleDateString());
  };
  return (
    <div>
      <TextBox
        id="alias"
        name="alias"
        value={datos.alias || ""}
        onChange={IngresarValoresMemoria}
        label="Prueba"
        required={true}
        requiredLabel={"Ingrese Informacion"}
      ></TextBox>

      <Calender
        fullScreen={true}
        onChange={onChangeFecha}
        DateFormat="MM-dd-yyyy"
      ></Calender>

      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeRangeDate}
        withPortal
        showIcon
        dateFormat="yyyy/MM/dd"
      />
      <ListSelector
        //dataSource={estados}       
        //selectedValue={datos.estadoId}
        label="Estado:"
        // onChange={(event, newValue) => {
        //   changeEstado(newValue);
        // }}
        idField="estadoId"
        textField="nombre"
      />
    </div>
  );
};

export default TesteoComponentes;
