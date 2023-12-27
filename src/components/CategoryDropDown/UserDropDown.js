import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAllProfileAction } from "../../redux/slices/profileSlice/profileSlice";

const UserDropDown = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProfileAction());
  }, [dispatch]);

  const user = useSelector((state) => state?.profile);

  const profilesList = user?.profilesList;

  const allCategories = profilesList?.map((category) => {
    return {
      label: `${category?.basicInformation?.firstName} ${category?.basicInformation?.lastName} ${category?.basicInformation?.employerId}`,
      value: category?._id,
    };
  });

  const handleChange = (value) => {
    props.onChange("user", value?.value);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      <Select
        onChange={handleChange}
        value={props?.value}
        options={allCategories}
      />
    </div>
  );
};

export default UserDropDown;
