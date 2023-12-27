import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { assetCreateAction } from "../../../redux/slices/assetSlice/assetSlice";
import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import {
  normalAdminAccessGivenFun,
  restrictedAccessFun,
} from "../../../utils/restrictedAccess";
import DatePickFun from "../../../utils/DatePickFun/DatePickFun";
import FormikDateYour from "../../../utils/DateFun/FormDateComp";
import Loader from "../../../utils/Loader/Loader";

const AddAsset = () => {
  const dispatch = useDispatch();

  const asset = useSelector((state) => state?.asset);
  const { isAssetAdded, loading, appErr, serverErr } = asset;
  // profile
  const user = useSelector((state) => state?.profile);
  const { profileLoading, profileAppErr, profileServerErr, userAuth } = user;

  const { _id, Access } = user?.userAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: _id,
      givenDate: "",
      assetDetails: "",
      typeOfAsset: "Computer",
      returnDate: "",
      addedBy: _id,
      ModifiedBy: _id,
    },
    onSubmit: (values) => {
      dispatch(assetCreateAction(values));
      console.log(values);
    },
  });

  if (isAssetAdded || (!normalAdminAccessGivenFun(Access) && Access))
    return <Navigate to={`/self-service/asset`} />;

  return (
    <div>
      <div className="cs_div_profile">
        {profileLoading ? (
          <Loader />
        ) : (
          <form onSubmit={formik.handleSubmit} className="cs_edit_div">
            <div>
              <Link
                to={`/self-service/asset`}
                className="cs_edit_employee_head_div"
              >
                <div>
                  <svg
                    className="cs_font_icons"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                </div>
                <div>
                  <h2 className="cs_edit_employee_head"> Add Asset</h2>
                </div>
              </Link>
            </div>
            <div className="cs_edit_form_div">
              <div>
                {serverErr || appErr ? (
                  <p>
                    {serverErr} {appErr}
                  </p>
                ) : null}
                {profileServerErr || profileAppErr ? (
                  <p>
                    {profileServerErr} {profileAppErr}
                  </p>
                ) : null}
                <h1 className="cs_edit_side_head">Asset</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    {" "}
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Employee ID:</h1>

                      <h2 className="cs_edit_right_input">
                        {userAuth?.basicInformation?.firstName}{" "}
                        {userAuth?.basicInformation?.lastName}{" "}
                        {userAuth?.basicInformation?.employerId}
                      </h2>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Given date:</h1>
                      {/* <input
                        type="date"
                        className="cs_edit_right_input"
                        value={formik.values.givenDate}
                        onChange={formik.handleChange("givenDate")}
                      /> */}

                      <FormikDateYour
                        name="givenDate"
                        onChange={formik.setFieldValue}
                        type="text"
                        value={formik?.values?.givenDate}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Asset details:</h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.assetDetails}
                        onChange={formik.handleChange("assetDetails")}
                      />
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Type of asset:</h1>

                      <select
                        className="cs_select_option_all"
                        value={formik.values.typeOfAsset}
                        onChange={formik.handleChange("typeOfAsset")}
                      >
                        <option value="Computer">Computer</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Books">Books</option>
                      </select>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Return date:</h1>

                      <FormikDateYour
                        name="returnDate"
                        onChange={formik.setFieldValue}
                        type="text"
                        value={formik?.values?.returnDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <button className="cs_edit_submit_button" type="submit">
                  Submit
                </button>
              </div>

              <div>
                <Link to={`/self-service/asset`}>
                  <button className="cs_view_button_close">Cancel</button>
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddAsset;
