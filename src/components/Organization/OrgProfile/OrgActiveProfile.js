import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchDetailsProfileAction,
  updateTheUserActiveOrInctive,
} from "../../../redux/slices/profileSlice/profileSlice";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";

import Loader from "../../../utils/Loader/Loader";

const OrgActiveProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetailsProfileAction(id));
  }, [dispatch, id]);

  const profile = useSelector((state) => state?.profile);

  const { profileData, isUserActiveUpdated } = profile ? profile : "";

  const { email: emailMain } = profileData ? profileData : "";
  const { firstName, lastName, employerId } = profileData?.basicInformation
    ? profileData?.basicInformation
    : "";

  const { designation, employeeStatus } = profileData?.workInformation
    ? profileData?.workInformation
    : "";

  const { appErr, serverErr, loading } = profile;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      workInformation: { employeeStatus },
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateTheUserActiveOrInctive({ id, values }));
    },
  });
  if (
    isUserActiveUpdated ||
    (!normalAdminAccessGivenFun(profile?.userAuth?.Access) &&
      profile?.userAuth?.Access)
  )
    return <Navigate to={`/organization/profile`} />;

  return (
    <div>
      <div className="cs_div_profile">
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={formik.handleSubmit} className="cs_edit_div">
            <Link
              to="/organization/profile"
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
                <h2 className="cs_edit_employee_head">
                  Change Employee Status
                </h2>
              </div>
            </Link>

            <div className="cs_edit_form_div">
              <div>
                {serverErr || appErr ? (
                  <p>
                    {serverErr} {appErr}
                  </p>
                ) : null}

                <h1 className="cs_edit_side_head">Employee Information</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    {" "}
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Employee ID:</h1>
                      <h1 className="cs_view_right_input">{employerId}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">First Name:</h1>
                      <h1 className="cs_view_right_input">{firstName}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        *Employment Status:
                      </h1>

                      <select
                        className="cs_select_option_all"
                        value={formik.values.workInformation.employeeStatus}
                        onChange={formik.handleChange(
                          "workInformation.employeeStatus"
                        )}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Email address:</h1>
                      <h1 className="cs_view_right_input">{emailMain}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Last Name:</h1>
                      <h1 className="cs_view_right_input">{lastName}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Designation:</h1>
                      <h1 className="cs_view_right_input">{designation}</h1>
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
                <Link to={`/organization/profile`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrgActiveProfile;
