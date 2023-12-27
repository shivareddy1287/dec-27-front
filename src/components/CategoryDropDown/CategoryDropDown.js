import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const category = [
  { value: "Software Trainee", label: "Software Trainee" },
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Consultant", label: "Consultant" },
  { value: "Lead Consultant", label: "Lead Consultant" },
];

const CategoryDropDown = (props) => {
  const handleChange = (value) => {
    console.log(value, "valuees");
    props.onChange("workInformation.designation", value?.label);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Select onChange={handleChange} value={props?.value} options={category} />
    </div>
  );
};

export default CategoryDropDown;
