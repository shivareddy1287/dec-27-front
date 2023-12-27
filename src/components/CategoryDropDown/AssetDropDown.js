import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const Asset = [
  { value: "computer", label: "computer" },
  { value: "books", label: "books" },
  { value: "laptop", label: "laptop" },
  { value: "mobile", label: "mobile" },
  { value: "vehicle", label: "vehicle" },
  { value: "phone", label: "phone" },
];

const AssetDropDown = (props) => {
  const handleChange = (value) => {
    props.onChange("typeOfAsset", value);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Select
        onChange={handleChange}
        value={props?.value?.label}
        options={Asset}
      />
    </div>
  );
};

export default AssetDropDown;
