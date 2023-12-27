import React, { useEffect } from "react";
import "./applyleave.css";
import { useFormik } from "formik";
import { Redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  applyLeaveAction,
  fetchAllLeaves,
} from "../../../../redux/slices/leaves/leaveSlices";

import {
  fetchAllProfileAction,
  fetchDetailsProfileAction,
} from "../../../../redux/slices/profileSlice/profileSlice";

import * as Yup from "yup";

import { AiOutlineLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { fetchHolidaysAction } from "../../../../redux/slices/leaves/holidaySlices";

// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Form Schema
const formSchema = Yup.object({
  employeeId: Yup.string().required("*EmployeeId is required"),
  leaveType: Yup.string().required("*LeaveType is required"),
  fromDate: Yup.date().required("*FromDate is required"),
  toDate: Yup.date().required("*ToDate is required"),
  // emailId: Yup.string().required("EmailId is required"),
  // askLeaveFor: Yup.string().required("askLeaveFor is required"),
  reasonForLeave: Yup.string().required("*ReasonForLeave is required"),
  numOfDays: Yup.number().required("*NumOfDays is required"),
});

const ApplyLeave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.profile);
  const {
    profileData,
    profilesList,
    userAuth,
    loading: userProfLoading,
  } = userProfile;

  let userMngrName = "";
  if (profileData) {
    userMngrName =
      profileData?.managerDataId?.basicInformation?.firstName +
      " " +
      profileData?.managerDataId?.basicInformation?.lastName;
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      employeeId: profileData?._id,
      leaveType: "",
      fromDate: "",
      toDate: "",
      emailId: "",
      userMangagerId: profileData?.managerDataId?._id,
      userManagerName: userMngrName,
      remainingLeaves: "",
      reasonForLeave: "",
      askLeaveFor: "",
      numOfDays: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      // dispatch(applyLeaveAction(values));
    },
    validationSchema: formSchema,
  });
  console.log(formik.values);
  const today = new Date();
  const getCurrentDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // console.log(formik.values);

  useEffect(() => {
    dispatch(fetchAllLeaves());
    dispatch(fetchHolidaysAction());
    dispatch(fetchAllProfileAction());
    if (!profileData) {
      dispatch(fetchDetailsProfileAction(userAuth?._id));
    }
  }, []);

  const leaves = useSelector((state) => state.leave);
  const { leave, isApplied, loading, allLeaves } = leaves;

  const holidays = useSelector((state) => state.holidays);
  const { holiday, isHolidayAdded, allHolidays } = holidays;

  //show card
  const showCard = () => {
    formik.submitForm();
    console.log(formik.values);
    const card = document.querySelector(".bl_card");
    console.log(allLeaves);
    const isAppliedBefore = allLeaves
      ?.filter((eachLeave) => eachLeave.employeeId === formik.values.employeeId)
      .some((eachLeave) => {
        const fromDate = new Date(eachLeave.fromDate);
        const toDate = new Date(eachLeave.toDate);

        const presentFromDate = new Date(formik.values.fromDate);
        const presentToDate = new Date(formik.values.toDate);
        if (
          (presentFromDate >= fromDate && presentFromDate <= toDate) ||
          (presentToDate >= fromDate && presentToDate <= toDate)
        ) {
          return true; // This will break out of the loop
        }
        return false;
      });

    // is a Holiday
    const isaHoliday = allHolidays?.some((eachLeave) => {
      const fromDate = new Date(eachLeave.fromDate);
      const toDate = new Date(eachLeave.toDate);
      const presentFromDate = new Date(formik.values.fromDate);
      const presentToDate = new Date(formik.values.toDate);
      console.log("test", presentFromDate !== "");
      console.log(formik.values.fromDate !== "");
      if (
        (presentFromDate >= fromDate && presentFromDate <= toDate) ||
        (presentToDate >= fromDate && presentToDate <= toDate)
      ) {
        return true; // This will break out of the loop
      }
      return false;
    });

    if (isaHoliday) {
      // alert(`Hey You are Applying on a Holiday`);
      toast("Hey You are Applying on a Holiday");
      return;
    }

    // Check Weekend
    const checkWeekend = (date) => {
      const dayOfWeek = date.getDay(); // 0 for Sunday, 6 for Saturday
      return dayOfWeek === 0 || dayOfWeek === 6; // Check if it's Sunday or Saturday
    };

    const fromDate = new Date(formik.values.fromDate);
    const toDate = new Date(formik.values.toDate);

    const isWeekend = checkWeekend(fromDate) || checkWeekend(toDate);
    if (isWeekend) {
      // alert(`Hey Its a weekend`);
      toast("Hey Its a weekend");
      return;
    }

    // days count
    let weekdays = 0;

    while (fromDate <= toDate) {
      const dayOfWeek = fromDate.getDay(); // 0 for Sunday, 6 for Saturday

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        weekdays++;
      }

      fromDate.setDate(fromDate.getDate() + 1);
    }
    console.log(weekdays);

    console.log(formik.values.fromDate, formik.values.toDate);
    console.log(isAppliedBefore);
    if (isAppliedBefore) {
      alert(`User already applied on That Date`);
      return;
    }
    console.log(formik.values.leaveType !== "");
    if (
      formik.values.leaveType !== "" &&
      !isAppliedBefore &&
      !isWeekend &&
      Object.keys(formik.errors).length === 0
    ) {
      console.log("weekdays", weekdays);
      formik.setFieldValue("numOfDays", weekdays);
      console.log(formik.values);
      return card.classList.add("show");
    }
  };

  const removeCard = () => {
    const card = document.querySelector(".bl_card");
    card.classList.remove("show");
  };

  if (isApplied) {
    toast("Leave Applied");
    return navigate("/leave-tracker/leave-applications");
  }

  const isManager = userAuth?.Access === "Manager";

  let remLeavesText = "";
  let remainingLeavesCount = 1;
  console.log("sdz", formik.values.leaveType);
  console.log("profiles", profilesList);

  if (formik.values.leaveType === "casual Leave") {
    const userPRof = profilesList.filter(
      (prof) => prof._id === formik.values.employeeId
    );
    console.log("userPRof", userPRof);
    remLeavesText = `${userPRof[0]?.casualLeaves} Leaves(s) Available`;
    remainingLeavesCount = userPRof[0]?.casualLeaves;
  } else if (formik.values.leaveType === "sick Leave") {
    const userPRof = profilesList.filter(
      (prof) => prof._id === formik.values.employeeId
    );
    remLeavesText = `${userPRof[0]?.sickLeaves} Leaves(s) Available`;
    remainingLeavesCount = userPRof[0]?.sickLeaves;
  }

  const isUserHaveLeaves = remainingLeavesCount > 0;
  console.log(isUserHaveLeaves);

  return (
    <div className="bl-apply-leave-cont">
      <div className="bl-apply-leave_header">
        <div className="bl-apply-leave_header_left-cont">
          {/* <span> */}
          <AiOutlineLeft
            className="bl_header-icon"
            onClick={() => navigate("/leave-tracker/overview")}
          />
          {/* </span> */}

          <span className="bl_header_head">Apply Leave</span>
        </div>
        <span
          className="bl_cancel-icon"
          onClick={() => navigate("/leave-tracker/list-view")}
        >
          <RxCross2 />
        </span>
      </div>

      <div className="bl_card">
        <div className="bl_card-header">
          <div className="bl_card_image">
            <svg
              aria-hidden="true"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          <div className="bl_card_content">
            <span className="bl_card-title">Apply </span>

            <p className="message">
              Are you sure want to Apply {formik.values.leaveType} for{" "}
              {profilesList
                ?.filter((user) => user?._id === formik.values.employeeId)
                .map((user, index) => (
                  <span key={index}>
                    {user.basicInformation.firstName}{" "}
                    {user.basicInformation.lastName}
                  </span>
                ))}{" "}
              for
              {formik.values.numOfDays > 1 ? (
                <>
                  {" "}
                  {formik.values.numOfDays} Days from {formik.values.fromDate}{" "}
                  to {formik.values.toDate}
                </>
              ) : (
                <>
                  {" "}
                  {formik.values.numOfDays} Day on {formik.values.fromDate}
                </>
              )}
            </p>
          </div>
          <div className="actions">
            <button
              className="desactivate"
              type="button"
              onClick={() => dispatch(applyLeaveAction(formik.values))}
              disabled={loading}
            >
              Apply {loading ? <div className="loader"></div> : <></>}
            </button>
            <button className="cancel" onClick={removeCard} type="button">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="bl-apply-leave-form-cont">
        <form className="bl-apply-leave-form" onSubmit={formik.handleSubmit}>
          <div className="wrapper">
            {userProfLoading ? (
              <div className="loader"></div>
            ) : (
              <>
                <div className="title">Apply Leave</div>
                <div className="form">
                  <div className="inputfield">
                    <label>Employee ID</label>
                    {userAuth?.isAdmin ? (
                      <div className="custom_select">
                        <select
                          value={formik.values.employeeId}
                          onChange={(e) => {
                            console.log(e.target.value);
                            console.log(formik.values);

                            const userManager = profilesList.filter(
                              (user) => user._id === e.target.value
                            )[0]?.managerDataId;
                            console.log("userManager: " + userManager);

                            if (e.target.value !== "") {
                              formik.setFieldValue(
                                "userManagerName",
                                `${userManager?.basicInformation?.firstName} ${userManager?.basicInformation?.lastName}`
                              );
                            } else {
                              formik.setFieldValue("userManagerName", "");
                            }

                            formik.setFieldValue("employeeId", e.target.value);

                            formik.setFieldValue(
                              "userMangagerId",
                              userManager?._id
                            );
                          }}
                          onBlur={formik.handleBlur("employeeId")}
                        >
                          <option value="">Select</option>
                          <option value={userAuth?._id}>
                            {userAuth.basicInformation.firstName}{" "}
                            {userAuth.basicInformation.lastName}
                          </option>
                          {profilesList
                            ?.filter(
                              (userprof) => userprof?._id !== userAuth?._id
                            )
                            ?.map((user) => {
                              return (
                                <option key={user?._id} value={user._id}>
                                  {user.basicInformation.firstName}{" "}
                                  {user.basicInformation.lastName}
                                </option>
                              );
                            })}
                        </select>
                        <span className="bl_err-msg">
                          {formik?.touched?.employeeId &&
                            formik?.errors?.employeeId}{" "}
                        </span>
                      </div>
                    ) : (
                      <>
                        {isManager ? (
                          <div className="custom_select">
                            <select
                              value={formik.values.employeeId}
                              onChange={(e) => {
                                console.log(e.target.value);
                                console.log(formik.values);

                                const userManager = profilesList.filter(
                                  (user) => user._id === e.target.value
                                )[0]?.managerDataId;
                                console.log("userManager: " + userManager);

                                if (e.target.value !== "") {
                                  formik.setFieldValue(
                                    "userManagerName",
                                    `${userManager?.basicInformation?.firstName} ${userManager?.basicInformation?.lastName}`
                                  );
                                } else {
                                  formik.setFieldValue("userManagerName", "");
                                }

                                formik.setFieldValue(
                                  "employeeId",
                                  e.target.value
                                );

                                formik.setFieldValue(
                                  "userMangagerId",
                                  userManager?._id
                                );
                              }}
                              onBlur={formik.handleBlur("employeeId")}
                            >
                              <option value="">Select</option>
                              <option value={userAuth?._id}>
                                {userAuth.basicInformation.firstName}{" "}
                                {userAuth.basicInformation.lastName}
                              </option>
                              {profilesList
                                ?.filter(
                                  (userprof) =>
                                    userprof?._id !== userAuth?._id &&
                                    userprof?.managerDataId?._id ===
                                      userAuth?._id
                                )
                                ?.map((user) => {
                                  return (
                                    <option key={user?._id} value={user._id}>
                                      {user.basicInformation.firstName}{" "}
                                      {user.basicInformation.lastName}
                                    </option>
                                  );
                                })}
                            </select>
                            <span className="bl_err-msg">
                              {formik?.touched?.employeeId &&
                                formik?.errors?.employeeId}{" "}
                            </span>
                          </div>
                        ) : (
                          <div style={{ width: "100%" }}>
                            <input
                              value={userAuth?._id}
                              type="text"
                              className="input"
                              style={{ border: "none" }}
                              disabled
                            />
                            <span className="bl_err-msg">
                              {formik?.touched?.employeeId &&
                                formik?.errors?.employeeId}{" "}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="inputfield">
                    <label>Leave Type</label>
                    <div className="custom_select">
                      <select
                        values={formik.values.leaveType}
                        onChange={formik.handleChange("leaveType")}
                        onBlur={formik.handleBlur("leaveType")}
                      >
                        <option value="">Select</option>
                        <option value="casual Leave">Causal Leave</option>
                        <option value="sick Leave">Sick Leave</option>
                      </select>
                      <span
                        className={
                          isUserHaveLeaves ? "bl_suc-msg" : "bl_err-msg"
                        }
                      >
                        {remLeavesText}
                      </span>
                      <span className="bl_err-msg">
                        {formik?.touched?.leaveType &&
                          formik?.errors?.leaveType}
                      </span>
                    </div>
                  </div>

                  <div className="inputfield">
                    <label>Date</label>
                    <div className="date-input-cont">
                      <input
                        required=""
                        className="date-input"
                        placeholder="Enter birth date"
                        value={formik.values.fromDate}
                        onChange={formik.handleChange("fromDate")}
                        onBlur={formik.handleBlur("fromDate")}
                        disabled={!isUserHaveLeaves}
                        min={today}
                        type="date"
                      ></input>
                      <span className="bl_err-msg">
                        {formik?.touched?.fromDate && formik?.errors?.fromDate}
                      </span>
                    </div>
                    <div className="date-input-cont">
                      <input
                        required=""
                        className="date-input"
                        value={formik.values.toDate}
                        onChange={formik.handleChange("toDate")}
                        onBlur={formik.handleBlur("toDate")}
                        placeholder="Enter birth date"
                        disabled={!isUserHaveLeaves}
                        type="date"
                        min={formik.values.fromDate}
                      ></input>
                      <span className="bl_err-msg">
                        {formik?.touched?.toDate && formik?.errors?.toDate}
                      </span>
                    </div>
                  </div>

                  <div className="inputfield">
                    <label>Manager</label>
                    <div style={{ width: "100%" }}>
                      <input
                        value={formik.values.userManagerName}
                        type="text"
                        className="input"
                        style={{ border: "none" }}
                        // onChange={formik.handleChange("emailId")}
                        // onBlur={formik.handleBlur("emailId")}
                        disabled
                      />
                      <span className="bl_err-msg">
                        {formik?.touched?.userManagerName &&
                          formik?.errors?.userManagerName}
                      </span>
                    </div>
                  </div>

                  <div className="inputfield">
                    <label>Reason For Leave</label>
                    <div style={{ width: "100%" }}>
                      <textarea
                        value={formik.values.reasonForLeave}
                        className="textarea"
                        onChange={formik.handleChange("reasonForLeave")}
                        handleBlur={formik.handleBlur("reasonForLeave")}
                      ></textarea>
                      <span className="bl_err-msg">
                        {formik?.touched?.reasonForLeave &&
                          formik?.errors?.reasonForLeave}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
      <div className="bl-apply-leave_footer">
        <button
          type="submit"
          onClick={showCard}
          disabled={!isUserHaveLeaves}
          className="button"
        >
          Apply
        </button>
        <button
          className="button"
          onClick={() => navigate("/leave-tracker/list-view")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ApplyLeave;
