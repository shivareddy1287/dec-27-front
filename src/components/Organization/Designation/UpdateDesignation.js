import React, { useEffect } from "react";

import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSingleDesignationAction,
  updateDesignationAction,
} from "../../../redux/slices/designation/designationSlice";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";
import Loader from "../../../utils/Loader/Loader";

const UpdateDesignation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleDesignationAction(id));
  }, [dispatch, id]);

  const designation = useSelector((state) => state?.designation);
  const {
    singleDesignation,
    isDesignationeUpdated,
    loading,
    appErr,
    serverErr,
  } = designation;
  const { DesignationName } = singleDesignation ? singleDesignation : "";

  const user = useSelector((state) => state?.profile);
  const { _id, Access } = user?.userAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      DesignationName: DesignationName,
      ModifiedBy: _id,
    },
    onSubmit: (values) => {
      dispatch(updateDesignationAction({ id, values }));
    },
  });

  if (isDesignationeUpdated || (!normalAdminAccessGivenFun(Access) && Access))
    return <Navigate to={`/organization/designation`} />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="cs_div_profile">
          {serverErr || appErr ? (
            <p>
              {serverErr} {appErr}
            </p>
          ) : null}
          <form onSubmit={formik.handleSubmit} className="cs_edit_div">
            <div>
              <Link
                to={`/organization/designation`}
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
                  <h2 className="cs_edit_employee_head"> Edit Designation</h2>
                </div>
              </Link>
            </div>
            <div className="cs_edit_form_div">
              <div>
                <h1 className="cs_edit_side_head">Designation</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Designation Name:</h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.DesignationName}
                        onChange={formik.handleChange("DesignationName")}
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
                <Link to={`/organization/designation`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateDesignation;
