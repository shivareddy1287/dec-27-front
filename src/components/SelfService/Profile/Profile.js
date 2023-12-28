import React, { useEffect } from "react";
import "./Profile.css";
import {
  fetchAllProfileAction,
  fetchDetailsProfileAction,
  loginStatus,
  logout,
} from "../../../redux/slices/profileSlice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dateOnlyFormate } from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";
import { proAdminAccessGivenFun } from "../../../utils/restrictedAccess";
import DialogOpen from "../../../utils/Dialog/DialogOpen";

const Profile = () => {
  let { id } = useParams();

  // console.log(id, "profile");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetailsProfileAction(id));
  }, [dispatch, id]);

  const profile = useSelector((state) => state?.profile);
  const { loading, appErr, serverErr, userAuth, profileData } = profile;

  if (!id) {
    id = userAuth?._id;
  }
  const isSelfUser = id === userAuth?._id;

  const { ProfileEditAccess, managerDataId, email } = profileData
    ? profileData
    : "";

  const { firstName, lastName, employerId } = profileData?.basicInformation
    ? profileData?.basicInformation
    : "";

  const { dateOfBirth, gender, age, maritalStatus, bloodGroup } =
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

  const EditRequestFun = () => {
    // alert("Edit Request");

    console.log("Edit Request");
  };
  return (
    <div>
      <div className="cs_div_profile">
        <div className="cs_content_img_div_profile">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <div className="cs_profile_photo_main_div">
                <div className="cs_profile_photo_div"></div>
                <h2 className="cs_profile_photo_bottom_name">
                  {firstName} {lastName}
                </h2>
              </div>
              {isSelfUser && (
                <div className="cs_profile_edit_view_top_div">
                  {ProfileEditAccess === "Approve" &&
                    employeeStatus === "Active" && (
                      <div>
                        <Link
                          to={`/self-service/profile/update/${id}`}
                          className="cs_profile_edit_view_top_heading"
                        >
                          Edit
                        </Link>
                      </div>
                    )}

                  {ProfileEditAccess !== "Approve" && (
                    <div>
                      <h2
                        className="cs_profile_edit_view_top_heading"
                        onClick={() => EditRequestFun()}
                      >
                        <DialogOpen />
                      </h2>
                    </div>
                  )}

                  <div>
                    <Link
                      to={`/self-service/profile/viewdetials/${id}`}
                      className="cs_profile_edit_view_top_heading"
                    >
                      View Profile
                    </Link>
                  </div>

                  <div>
                    <h2
                      className="cs_profile_edit_view_top_heading"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </h2>
                  </div>
                  <div>
                    <Link
                      to={`/ChangePassword`}
                      className="cs_profile_edit_view_top_heading"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              )}

              <div className="cs_content_div_profile">
                <div className="cs_total_content_profile">
                  {appErr || serverErr ? (
                    <p>
                      {serverErr} {appErr}
                    </p>
                  ) : null}
                  <div className="cs_card_content_div_profile">
                    <h1 className="cs_card_head_profile">Basic information</h1>
                    <div className="cs_card_data_div_profile">
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Employee ID
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {employerId}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          First Name
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {firstName}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Last Name
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {lastName}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Email Address
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {email}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="cs_card_content_div_profile">
                    <h1 className="cs_card_head_profile">Personal Details</h1>
                    <div className="cs_card_data_div_profile">
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Date of Birth
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {dateOnlyFormate(dateOfBirth)}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">Age</h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {age}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Gender
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {gender}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Marital Status
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {maritalStatus}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Blood Group
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {bloodGroup}
                        </h2>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="cs_card_content_div_profile">
                    <h1 className="cs_card_head_profile">Contact Details</h1>
                    <div className="cs_card_data_div_profile">
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Work Phone Number
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {workNumber}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Personal Mobile Number
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {personalNumber}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Personal email Address
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {emailAddress}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Present Address
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {presentAddress}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Permanent Address
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {permanentAddress}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cs_total_content_profile">
                  <div className="cs_card_content_div_profile">
                    <h1 className="cs_card_head_profile">Work information</h1>
                    <div className="cs_card_data_div_profile">
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Department
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {Department}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Location
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {location}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Manager
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {managerDataId?.basicInformation?.firstName}
                          {managerDataId?.basicInformation?.lastName} &nbsp;
                          {managerDataId?.basicInformation?.employerId}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Designation
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {designation}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          App Role
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {appRole}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Employment Type
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {employmentType}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Employee Status
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {employeeStatus}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Source of Hire
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {sourceOfHire}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Date of Joining
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {dateOnlyFormate(dateOfJoining)}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Current Experience
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {currentExperience}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Total Experience
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {totalExperience}
                        </h2>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="cs_card_content_div_profile">
                    <h1 className="cs_card_head_profile">
                      Identity Information
                    </h1>
                    <div className="cs_card_data_div_profile">
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">UAN</h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {uan}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">PAN</h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {pan}
                        </h2>
                      </div>
                      <div className="cs_card_each_data_div_profile">
                        <h2 className="cs_card_data_each_head_profile">
                          Aadhaar
                        </h2>{" "}
                        <h2 className="cs_card_data_each_head_profile">
                          {adhaar}
                        </h2>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
