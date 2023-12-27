import React, { useEffect, useState } from "react";
import "./leaveRecord.css";
import { useFormik } from "formik";
import { Redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as Yup from "yup";

import { AiOutlineLeft } from "react-icons/ai";
import {
  approveLeaveAction,
  cancelLeaveAction,
  fetchLeaveAction,
} from "../../../../redux/slices/leaves/leaveSlices";
import { RxCross2 } from "react-icons/rx";

//Form Schema
const formSchema = Yup.object({
  reasonForLeave: Yup.string().required("Reason For Leave is required"),
});

const LeaveRecord = (props) => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      reasonForLeave: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // dispatch(applyLeaveAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    dispatch(fetchLeaveAction(id));
  }, []);

  const user = useSelector((state) => state.profile);
  const { userAuth } = user;

  const leaves = useSelector((state) => state?.leave);
  const { leave, isApproved, loading, appErr, serverErr } = leaves;
  console.log(leave);

  const fromdate = new Date(leave?.fromDate);
  const formattedFromDate = `${fromdate.getFullYear()}-${(
    fromdate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${fromdate.getDate().toString().padStart(2, "0")}`;
  console.log(formattedFromDate);

  const toDate = new Date(leave?.fromDate);
  const formattedToDate = `${toDate.getFullYear()}-${(toDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${toDate.getDate().toString().padStart(2, "0")}`;
  console.log(formattedFromDate);

  //show card
  const showCard = () => {
    const card = document.querySelector(".bl_card");
    card.classList.add("show");
  };

  const removeCard = () => {
    const card = document.querySelector(".bl_card");
    card.classList.remove("show");
  };

  // show cancel card
  const showCanelCard = () => {
    // ;
    const card = document.querySelector(".bl_card2");
    card.classList.add("show");
  };

  const removeCancelCard = () => {
    const card = document.querySelector(".bl_card2");
    card.classList.remove("show");
  };

  const isUserManager = leave?.userMangagerId === userAuth?._id;
  console.log("leave?.user?.userMangagerId", isUserManager);

  if (isApproved) return navigate("/leave-tracker/leave-applications");

  return (
    <div className="bl-apply-leave-cont">
      <div className="bl-apply-leave_header">
        <div>
          {/* <span > */}
          <div className="bl-apply-leave_header_left-cont">
            <AiOutlineLeft
              className="bl_header-icon"
              onClick={() => navigate("/leave-tracker/leave-applications")}
            />
            {/* </span> */}

            <span>Applied Leave</span>
          </div>
        </div>
        {/* <button onClick={() => navigate("/leave-tracker/leave-applications")}>
          X
        </button> */}
        <span
          className="bl_cancel-icon"
          onClick={() => navigate("/leave-tracker/leave-applications")}
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
            <span className="bl_card-title">Approve </span>
            <p className="message">
              Are you sure want to Approve Casual Leave for Employee 1 on
              22/22/2222.
            </p>
          </div>
          <div className="actions">
            <button
              className="desactivate"
              type="button"
              onClick={() => dispatch(approveLeaveAction(id))}
            >
              Approve {loading ? <div className="loader"></div> : <></>}
            </button>
            <button className="cancel" onClick={removeCard} type="button">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="bl_card2">
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
            <span className="bl_card-title">Cancel </span>
            <p className="message">
              Are you sure want to Cancel Casual Leave for Employee 1 on
              22/22/2222.
            </p>
          </div>
          <textarea
            placeholder="Reason For Rejecting Leave..."
            className="bl_card_textarea"
            value={formik.values.reasonForLeave}
            onChange={formik.handleChange("reasonForLeave")}
            onBlur={formik.handleBlur("reasonForLeave")}
          />
          <span className="bl_err-msg">
            {formik?.touched?.reasonForLeave && formik?.errors?.reasonForLeave}
          </span>
          <div className="actions">
            <button
              className="desactivate"
              type="submit"
              onClick={() => {
                formik.submitForm();
                if (formik.values.reasonForLeave !== "") {
                  dispatch(cancelLeaveAction({ id, ...formik.values }));
                }
              }}
            >
              Reject Leave
            </button>
            <button className="cancel" onClick={removeCancelCard} type="button">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <>
          {" "}
          <div className="loader-cont">
            <div className="graph-loader">
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__bar"></div>
              <div className="loader__ball"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bl-apply-leave-form-cont">
            <form className="bl-apply-leave-form">
              <div className="wrapper">
                <div className="title">Applied Leave</div>
                <div className="form">
                  <div className="inputfield">
                    <label>Employee ID</label>
                    <input
                      disabled
                      value={leave?.employeeId}
                      type="text"
                      className="input"
                    />
                  </div>

                  {/* <div className="inputfield">
                    <label>Employee ID</label>
                    <div className="custom_select">
                      <select value={leave?.employeeId} disabled>
                        <option value="">Select</option>
                        <option value="employye1">Employee 1</option>
                        <option value="employee2">Employee 2</option>
                      </select>
                    </div>
                  </div> */}

                  <div className="inputfield">
                    <label>Leave Type</label>
                    <input
                      disabled
                      value={leave?.leaveType}
                      type="text"
                      className="input"
                    />
                  </div>
                  {/* <div className="inputfield">
                    <label>Leave Type</label>
                    <div className="custom_select">
                      <select value={leave?.leaveType} disabled>
                        <option value="">Select</option>
                        <option value="casualLeaves">Causal Leave</option>
                        <option value="sickLeaves">Sick Leave</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="inputfield">
                    <label>Date</label>
                    <input
                      required=""
                      disabled
                      className="date-input"
                      value={formattedFromDate}
                      placeholder="Enter birth date"
                      type="date"
                    ></input>
                    <input
                      required=""
                      disabled
                      className="date-input"
                      value={formattedToDate}
                      placeholder="Enter birth date"
                      type="date"
                    ></input>
                  </div>

                  {/* <div className="inputfield">
                    <label>Team Email ID</label>
                    <input
                      disabled
                      value={leave?.emailId}
                      type="text"
                      className="input"
                    />
                  </div> */}

                  <div className="inputfield">
                    <label>Manager</label>
                    <div style={{ width: "100%" }}>
                      <input
                        value={leave?.userManagerName}
                        type="text"
                        className="input"
                        onChange={formik.handleChange("emailId")}
                        onBlur={formik.handleBlur("emailId")}
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
                    <textarea
                      value={leave?.reasonForLeave}
                      disabled
                      className="textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="bl-apply-leave_footer">
            <button
              className="button"
              onClick={() => navigate("/leave-tracker/leave-applications")}
            >
              Close
            </button>
            {!leave?.isApproved &&
              !leave?.isRejected &&
              (isUserManager || userAuth?.isAdmin) && (
                <>
                  <button className="button" onClick={showCanelCard}>
                    Cancel Leave{" "}
                  </button>
                  <button className="button" onClick={showCard}>
                    Approve Leave
                  </button>
                </>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default LeaveRecord;
