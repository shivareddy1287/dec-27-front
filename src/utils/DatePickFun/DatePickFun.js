import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CustomInput = ({ value, onClick }) => {
  return (
    <div>
      <input
        placeholder="dd/mm/yyyy"
        id="one"
        type="text"
        value={value}
        onClick={onClick}
        readOnly
      />
      <FaCalendarAlt />
    </div>
  );
};
const DatePickFun = (props) => {
  const [startDate, setStartDate] = useState(null);
  const onChangeDate = (dt) => {
    console.log(dt, "dt");
    setStartDate(dt);
    let normalDate = dt === null ? "" : normalDateFormatted(dt);
    console.log(normalDate, "normal");
    props?.onChange("givenDate", normalDate);
  };
  const normalDateFormatted = (d) => {
    if (d) {
      return (
        ("0" + d.getDate()).slice(-2) +
        "/" +
        ("0" + (Number(d.getMonth()) + 1)).slice(-2) +
        "/" +
        d.getFullYear()
      );
    }
  };
  console.log(startDate);
  return (
    <div>
      <div>
        <label htmlFor="one">
          <DatePicker
            placeholderText="dd/mm/yyyy"
            id="one"
            dateFormat={"dd-MMM-yyyy"}
            selected={props?.value}
            //   onChange={(date) => setStartDate(date)}
            onChange={(date) => onChangeDate(date)}
            //   showYearDropdown
            //   scrollableYearDropdown
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={250} // Set the desired number of years
            // minDate={new Date(1900, 0, 1)} // Optional: Set a minimum date
            // maxDate={new Date(4100, 11, 31)} // Optional: Set a maximum date
            customInput={<CustomInput />}
          />
        </label>
      </div>
    </div>
  );
};

export default DatePickFun;
