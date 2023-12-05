import React, { useState } from "react";
import DatePicker, {
  registerLocale,
  calendarContainer,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import es from "date-fns/locale/es";

export default function Calender(props) {
  const [valueDefault, setvalueDefault] = useState(props.value || new Date());
  const [FullScreen, setFullScreen] = useState(props.fullScreen || false);
  const [DateFormat, setDateFormat] = useState(props.DateFormat || "yyyy-MM-dd");

  return (
    <div>
      <DatePicker
        class={{ paddingtop: "80" }}
        selected={valueDefault}
        withPortal={FullScreen}
        onChange={props.onChange}
        dateFormat={DateFormat}
        locale={es}
        showIcon
      />
    </div>
  );
}
