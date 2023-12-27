import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
// import "./date.css";
const FormikDateYour = (props) => {
  // const [startDate, setStartDate] = useState("");
  const formattedDate = props.value ? new Date(props.value) : null;
  // console.log(formattedDate, "formattedDate");
  return (
    <div>
      <DatePicker
        customInput={<CustomDatePickerInput />} // Use a custom input with the icon
        selected={formattedDate}
        onChange={(date) => props.onChange(props.name, date)}
        dateFormat="dd/MM/yyyy" // Customize date format
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
    </div>
  );
};

const CustomDatePickerInput = ({ value, onClick }) => (
  <div
    className="cs_div_formik_date_picker"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <FaCalendarAlt className="cs_input_formik_date_picker" />
    <input
      className="cs_input_formik_date_picker"
      type="text"
      placeholder="dd/mm/yyyy"
      value={value}
      readOnly
    />
  </div>
);

export default FormikDateYour;
