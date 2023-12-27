import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchDetailsProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import { dateOnlyFormate } from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";

const ViewDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailsProfileAction(id));
  }, [dispatch, id]);

  const profileMain = useSelector((state) => state?.profile);

  const { loading, appErr, serverErr, profileData } = profileMain;

  const { firstName, lastName, employerId, email } =
    profileData?.basicInformation ? profileData?.basicInformation : "";

  const { dateOfBirth, gender, age, maritalStatus, aboutMe } =
    profileData?.personalDetails ? profileData?.personalDetails : "";

  const {
    Department,
    location,
    designation,
    appRole,
    employmentType,
    employeeStatus,
    sourceOfHire,
    dateOfJoining,
    currentExperience,
    totalExperience,
  } = profileData?.workInformation ? profileData?.workInformation : "";
  const { uan, pan, adhaar } = profileData?.identityInfo
    ? profileData?.identityInfo
    : "";

  const {
    workNumber,
    personalNumber,
    emailAddress,
    presentAddress,
    permanentAddress,
  } = profileData?.contactDetails ? profileData?.contactDetails : "";
  const { managerDataId } = profileData ? profileData : "";
  return (
    <div>
      <div className="cs_div_profile">
        {loading ? (
          <Loader />
        ) : (
          <div className="cs_edit_div">
            <Link
              to={`/self-service/profile`}
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
                <h2 className="cs_edit_employee_head">View Employee Details</h2>
              </div>
            </Link>

            <div className="cs_edit_form_div">
              <div>
                {appErr || serverErr ? (
                  <p>
                    {serverErr} {appErr}
                  </p>
                ) : null}
                <h1 className="cs_edit_side_head">Basic Information</h1>
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
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Email address:</h1>
                      <h1 className="cs_view_right_input">{email}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Last Name:</h1>
                      <h1 className="cs_view_right_input">{lastName}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="cs_edit_side_head">Work Information</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    {" "}
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Department:</h1>
                      <h1 className="cs_view_right_input">{Department}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Location:</h1>
                      <h1 className="cs_view_right_input">{location}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Manager:</h1>
                      <h1 className="cs_view_right_input">
                        {managerDataId?.basicInformation?.firstName}
                        {managerDataId?.basicInformation?.lastName} &nbsp;
                        {managerDataId?.basicInformation?.employerId}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Designation:</h1>
                      <h1 className="cs_view_right_input">{designation}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Source of Hire:</h1>
                      <h1 className="cs_view_right_input">{sourceOfHire}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Current Experience:
                      </h1>
                      <h1 className="cs_view_right_input">
                        {currentExperience}
                      </h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">App Role:</h1>
                      <h1 className="cs_view_right_input">{appRole}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Employment Type:</h1>
                      <h1 className="cs_view_right_input">{employmentType}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Employment Status:</h1>
                      <h1 className="cs_view_right_input">{employeeStatus}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Date of Joining:</h1>
                      <h1 className="cs_view_right_input">
                        {dateOnlyFormate(dateOfJoining)}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Total Experience:</h1>
                      <h1 className="cs_view_right_input">{totalExperience}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="cs_edit_side_head">Personal Details</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    {" "}
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Date of Birth:</h1>
                      <h1 className="cs_view_right_input">
                        {dateOnlyFormate(dateOfBirth)}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Age:</h1>
                      <h1 className="cs_view_right_input">{age}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Gender:</h1>
                      <h1 className="cs_view_right_input">{gender}</h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">About Me:</h1>
                      <h1 className="cs_view_right_input">{aboutMe}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Marital Status:</h1>
                      <h1 className="cs_view_right_input">{maritalStatus}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="cs_edit_side_head">Identity Information</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    {" "}
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">UAN:</h1>
                      <h1 className="cs_view_right_input">{uan}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">PAN:</h1>
                      <h1 className="cs_view_right_input">{pan}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Aadhaar:</h1>
                      <h1 className="cs_view_right_input">{adhaar}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="cs_edit_side_head">Contact Details</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    {" "}
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        {" "}
                        Work Phone Number:
                      </h1>
                      <h1 className="cs_view_right_input">{workNumber}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Personal Phone Number:
                      </h1>
                      <h1 className="cs_view_right_input">{personalNumber}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Email address:</h1>
                      <h1 className="cs_view_right_input">{emailAddress}</h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Present Address:</h1>
                      <h1 className="cs_view_right_input">{presentAddress}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Permanent Address:</h1>
                      <h1 className="cs_view_right_input">
                        {permanentAddress}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <Link to={`/self-service/profile`}>
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

export default ViewDetails;
