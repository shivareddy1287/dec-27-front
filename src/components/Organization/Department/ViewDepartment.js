import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";
import { fetchSingleDepartmentAction } from "../../../redux/slices/department/departmentSlice";
import Loader from "../../../utils/Loader/Loader";

const ViewDepartment = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleDepartmentAction(id));
  }, [dispatch, id]);

  const department = useSelector((state) => state?.department);
  const { singleDepartment, loading, appErr, serverErr } = department;
  const { DepartmentName } = singleDepartment ? singleDepartment : "";
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
          <div className="cs_edit_div">
            <div>
              <Link
                to={`/organization/department`}
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
                  <h2 className="cs_edit_employee_head"> View Department</h2>
                </div>
              </Link>
            </div>
            <div className="cs_edit_form_div">
              <div>
                <h1 className="cs_edit_side_head">Department</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Department Name:</h1>

                      <h1 className="cs_view_right_input">{DepartmentName}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <Link to={`/organization/department`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDepartment;
