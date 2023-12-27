import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import { exitDetailsCreateAction } from "../../../redux/slices/exitDetails/exitDetailsSlice";
import {
  normalAdminAccessGivenFun,
  restrictedAccessFun,
} from "../../../utils/restrictedAccess";
import FormikDateYour from "../../../utils/DateFun/FormDateComp";

const AddExitDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProfileAction());
  }, [dispatch]);

  const exitDetails = useSelector((state) => state?.exitDetails);
  const { isexitDetailsAdded } = exitDetails;
  const user = useSelector((state) => state?.profile);
  const profilesList = user?.profilesList;
  const { _id, Access } = user?.userAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: _id,

      addedBy: _id,
      ModifiedBy: _id,

      // Separation
      separationDate: "",
      Interviewer: profilesList?.[0]?._id,
      ReasonForLeaving: "",

      //   Questionairre
      WorkingforthisOrganizationAgain: "",
      Thinktheorganizationdotoimprovestaffwelfare: "",
      Whatdidyoulikethemostoftheorganization: "",
      Anythingyouwishtosharewithus: "",

      //   Checklist for Exit Interview
      CompanyVehiclehandedin: "",
      Alllibrarybookssubmitted: "",
      Exitinterviewconducted: "",
      Resignationlettersubmitted: "",
      Allequipmentshandedin: "",
      Security: "",
      Noticeperiodfollowed: "",
      ManagerSupervisorclearance: "",
    },
    onSubmit: (values) => {
      dispatch(exitDetailsCreateAction(values));
      console.log(values, "values");
    },
  });

  if (isexitDetailsAdded || (!normalAdminAccessGivenFun(Access) && Access))
    return <Navigate to={`/self-service/exitdetails`} />;

  return (
    <div>
      <div className="cs_div_profile">
        <form onSubmit={formik.handleSubmit} className="cs_edit_div">
          <div>
            <Link
              to={`/self-service/exitdetails`}
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
                <h2 className="cs_edit_employee_head"> Add Exit Details</h2>
              </div>
            </Link>
          </div>
          <div className="cs_edit_form_div">
            <div>
              <h1 className="cs_edit_side_head">Separation</h1>
              <div className="cs_edit_left_right_div">
                <div className="cs_edit_left_input_right_input">
                  {" "}
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Employee ID:</h1>
                    {/* <select
                      className="cs_select_option_all"
                      value={formik.values.user}
                      onChange={formik.handleChange("user")}
                    >
                      {profilesList?.map((each) => (
                        <option value={`${each?._id}`}>
                          {each?.basicInformation?.firstName}{" "}
                          {each?.basicInformation?.lastName}{" "}
                          {each?.basicInformation?.employerId}
                        </option>
                      ))}
                    </select> */}
                    <h2 className="cs_edit_right_input">
                      {user?.userAuth?.basicInformation?.firstName}{" "}
                      {user?.userAuth?.basicInformation?.lastName}{" "}
                      {user?.userAuth?.basicInformation?.employerId}
                    </h2>
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Interviewer:</h1>
                    <select
                      className="cs_select_option_all"
                      value={formik.values.Interviewer}
                      onChange={formik.handleChange("Interviewer")}
                    >
                      {profilesList?.map((each) => (
                        <option value={`${each?._id}`}>
                          {each?.basicInformation?.firstName}{" "}
                          {each?.basicInformation?.lastName}{" "}
                          {each?.basicInformation?.employerId}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="cs_edit_left_input_right_input">
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Separation Date:</h1>

                    <FormikDateYour
                      name="separationDate"
                      onChange={formik.setFieldValue}
                      type="text"
                      value={formik?.values?.separationDate}
                    />
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Reason for leaving:</h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.ReasonForLeaving}
                      onChange={formik.handleChange("ReasonForLeaving")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="cs_edit_side_head">Questionairre</h1>
              <div className="cs_edit_left_right_div">
                <div className="cs_edit_left_input_right_input">
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Working for this organization again:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.WorkingforthisOrganizationAgain}
                      onChange={formik.handleChange(
                        "WorkingforthisOrganizationAgain"
                      )}
                    />
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Think the organization do to improve staff welfare:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={
                        formik.values
                          .Thinktheorganizationdotoimprovestaffwelfare
                      }
                      onChange={formik.handleChange(
                        "Thinktheorganizationdotoimprovestaffwelfare"
                      )}
                    />
                  </div>
                </div>
                <div className="cs_edit_left_input_right_input">
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      What did you like the most of the organization:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={
                        formik.values.Whatdidyoulikethemostoftheorganization
                      }
                      onChange={formik.handleChange(
                        "Whatdidyoulikethemostoftheorganization"
                      )}
                    />
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Anything you wish to share with us:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.Anythingyouwishtosharewithus}
                      onChange={formik.handleChange(
                        "Anythingyouwishtosharewithus"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="cs_edit_side_head">
                Checklist for Exit Interview
              </h1>
              <div className="cs_edit_left_right_div">
                <div className="cs_edit_left_input_right_input">
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Company Vehicle handed in:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.CompanyVehiclehandedin}
                      onChange={formik.handleChange("CompanyVehiclehandedin")}
                    />
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      All library books submitted:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.Alllibrarybookssubmitted}
                      onChange={formik.handleChange("Alllibrarybookssubmitted")}
                    />
                  </div>{" "}
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Exit interview conducted:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.Exitinterviewconducted}
                      onChange={formik.handleChange("Exitinterviewconducted")}
                    />
                  </div>{" "}
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Resignation letter submitted:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.Resignationlettersubmitted}
                      onChange={formik.handleChange(
                        "Resignationlettersubmitted"
                      )}
                    />
                  </div>
                </div>
                <div className="cs_edit_left_input_right_input">
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      All equipments handed in:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.Allequipmentshandedin}
                      onChange={formik.handleChange("Allequipmentshandedin")}
                    />
                  </div>{" "}
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Security:</h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.Security}
                      onChange={formik.handleChange("Security")}
                    />
                  </div>{" "}
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Notice period followed:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.Noticeperiodfollowed}
                      onChange={formik.handleChange("Noticeperiodfollowed")}
                    />
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">
                      Manager/Supervisor clearance:
                    </h1>
                    <input
                      className="cs_edit_right_input"
                      value={formik.values.ManagerSupervisorclearance}
                      onChange={formik.handleChange(
                        "ManagerSupervisorclearance"
                      )}
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
              <Link to={`/self-service/exitdetails`}>
                <button className="cs_view_button_close">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExitDetails;
