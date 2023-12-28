import React, { useEffect } from "react";

import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deletebenefitAction,
  fetchSinglebenefitAction,
} from "../../../redux/slices/benefitSlice/benefitSlice";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";
import Loader from "../../../utils/Loader/Loader";
const DeleteBenefit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSinglebenefitAction(id));
  }, [dispatch, id]);

  const benefit = useSelector((state) => state?.benefit);
  const { singlebenefit, isDeleted, loading, appErr, serverErr } = benefit;
  const { user, educationAllowance, housingAllowance, lunchBenfit } =
    singlebenefit ? singlebenefit : "";

  const profile = useSelector((state) => state?.profile);

  if (
    isDeleted ||
    (!normalAdminAccessGivenFun(profile?.userAuth?.Access) &&
      profile?.userAuth?.Access)
  )
    return <Navigate to={`/self-service/benefit`} />;

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
                  <h2 className="cs_edit_employee_head">Delete Benefit</h2>
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
                      <h1 className="cs_view_right_input">
                        {user?.basicInformation?.employerId}-
                        {user?.basicInformation?.firstName}{" "}
                        {user?.basicInformation?.lastName}{" "}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Education allowance:
                      </h1>

                      <h1 className="cs_view_right_input">
                        {educationAllowance}
                      </h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Lunch:</h1>

                      <h1 className="cs_view_right_input">{lunchBenfit}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Housing Allowance:</h1>

                      <h1 className="cs_view_right_input">
                        {housingAllowance}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cs_edit_submit_cancel_div">
              <div>
                <button
                  className="cs_delete_button_delete"
                  onClick={() => dispatch(deletebenefitAction(id))}
                >
                  Confirm Delete
                </button>
              </div>
              <div>
                <Link to={`/self-service/benefit`}>
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

export default DeleteBenefit;
