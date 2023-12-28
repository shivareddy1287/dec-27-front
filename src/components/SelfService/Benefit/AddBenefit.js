import React from "react";

import { useFormik } from "formik";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { benefitCreateAction } from "../../../redux/slices/benefitSlice/benefitSlice";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";

const AddBenefit = () => {
  const dispatch = useDispatch();

  const benefit = useSelector((state) => state?.benefit);
  const { isbenefitAdded } = benefit;
  const user = useSelector((state) => state?.profile);
  const { userAuth } = user;
  const { _id, Access } = user?.userAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: _id,

      addedBy: _id,
      ModifiedBy: _id,

      lunchBenfit: "",
      educationAllowance: "",
      housingAllowance: "",
    },
    onSubmit: (values) => {
      dispatch(benefitCreateAction(values));
    },
  });

  if (isbenefitAdded || (!normalAdminAccessGivenFun(Access) && Access))
    return <Navigate to={`/self-service/benefit`} />;

  return (
    <div>
      <div className="cs_div_profile">
        <form onSubmit={formik.handleSubmit} className="cs_edit_div">
          <div>
            <Link
              to={`/self-service/benefit`}
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
                <h2 className="cs_edit_employee_head"> Add Benefit</h2>
              </div>
            </Link>
          </div>
          <div className="cs_edit_form_div">
            <div>
              <h1 className="cs_edit_side_head">Benefit</h1>
              <div className="cs_edit_left_right_div">
                <div className="cs_edit_left_input_right_input">
                  {" "}
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Employee ID:</h1>
                    <h2 className="cs_edit_right_input">
                      {userAuth?.basicInformation?.employerId}-
                      {userAuth?.basicInformation?.firstName}{" "}
                      {userAuth?.basicInformation?.lastName}{" "}
                    </h2>
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Education allowance:</h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.educationAllowance}
                      onChange={formik.handleChange("educationAllowance")}
                    />
                  </div>
                </div>
                <div className="cs_edit_left_input_right_input">
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Lunch:</h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.lunchBenfit}
                      onChange={formik.handleChange("lunchBenfit")}
                    />
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Housing Allowance:</h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.housingAllowance}
                      onChange={formik.handleChange("housingAllowance")}
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
              <Link to={`/self-service/benefit`}>
                <button className="cs_view_button_close">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBenefit;
