import React, { useEffect } from "react";

import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleAssetAction } from "../../../redux/slices/assetSlice/assetSlice";
import { dateOnlyFormate } from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";

const OrgViewAsset = (props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleAssetAction(id));
  }, [dispatch, id]);

  const asset = useSelector((state) => state?.asset);
  const { singleAsset, loading, appErr, serverErr } = asset;
  const { user, assetDetails, givenDate, returnDate, typeOfAsset, ModifiedBy } =
    singleAsset ? singleAsset : "";

  return (
    <div>
      <div className="cs_div_profile">
        <div className="cs_left_back"></div>
        {loading ? (
          <Loader />
        ) : (
          <div className="cs_edit_div">
            <div>
              <Link
                to={`/organization/asset`}
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
                  <h2 className="cs_edit_employee_head"> View Asset</h2>
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

                <h1 className="cs_edit_side_head">Asset</h1>
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
                      {/* <input
                      className="cs_edit_right_input"
                      value={formik.values.user}
                      onChange={formik.handleChange("user")}
                    /> */}
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Given date:</h1>

                      <h1 className="cs_view_right_input">
                        {dateOnlyFormate(givenDate)}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Asset details:</h1>

                      <h1 className="cs_view_right_input">{assetDetails}</h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Type of asset:</h1>

                      <h1 className="cs_view_right_input">{typeOfAsset}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Return date:</h1>

                      <h1 className="cs_view_right_input">
                        {dateOnlyFormate(returnDate)}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <Link to={`/organization/asset`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrgViewAsset;
