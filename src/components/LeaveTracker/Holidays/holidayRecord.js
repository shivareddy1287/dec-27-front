import React, { useEffect } from "react";
import "./holidays.css";
import { useFormik } from "formik";
import { Redirect, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHolidayAction } from "../../../redux/slices/leaves/holidaySlices";
import * as Yup from "yup";

import { AiOutlineLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

//Form Schema

const HolidayRecord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchHolidayAction(id));
  }, []);

  const holidays = useSelector((state) => state.holidays);
  const { holiday, isHolidayAdded, loading } = holidays;
  console.log("holiday", holiday);

  const fromdate = new Date(holiday?.fromDate);
  const formattedFromDate = `${fromdate.getFullYear()}-${(
    fromdate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${fromdate.getDate().toString().padStart(2, "0")}`;
  console.log(formattedFromDate);

  const toDate = new Date(holiday?.fromDate);
  const formattedToDate = `${toDate.getFullYear()}-${(toDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${toDate.getDate().toString().padStart(2, "0")}`;
  console.log(formattedFromDate);

  if (isHolidayAdded) return navigate("/leave-tracker/holidays");
  return (
    <div className="bl-apply-leave-cont">
      <div className="bl-apply-leave_header">
        <div className="bl-apply-leave_header_left-cont">
          {/* <span> */}
          <AiOutlineLeft
            className="bl_header-icon"
            onClick={() => navigate("/leave-tracker/holidays")}
          />
          {/* </span> */}

          <span className="bl_header_head">Holiday Record</span>
        </div>
        <span
          className="bl_cancel-icon"
          onClick={() => navigate("/leave-tracker/holidays")}
        >
          <RxCross2 />
        </span>
      </div>
      {/* <div className="bl_card">
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
            <span className="bl_card-title">Add Holiday </span>
            <p className="message">
              Are you sure want to Add Holiday for on 22/22/2222.
            </p>
          </div>
          <div className="actions">
            <button
              className="desactivate"
              type="button"
              onClick={() => dispatch(addHolidayAction(formik.values))}
            >
              Add <span>{loading ? " loading" : ""}</span>
            </button>
            <button className="cancel" onClick={removeCard} type="button">
              Cancel
            </button>
          </div>
        </div>
      </div> */}

      <div className="bl-apply-leave-form-cont">
        <form className="bl-apply-leave-form">
          <div className="wrapper">
            <div className="title">Add Holiday</div>
            <div className="form">
              <div className="inputfield">
                <label>Name</label>
                <div style={{ width: "100%" }}>
                  <input
                    disabled
                    value={holiday?.name}
                    type="text"
                    className="input"
                  />
                </div>
              </div>

              <div className="inputfield">
                <label>Date</label>
                <div className="date-input-cont">
                  <input
                    disabled
                    value={formattedFromDate}
                    className="date-input"
                    placeholder="Enter birth date"
                    type="date"
                  ></input>
                  <span className="bl_err-msg"></span>
                </div>
                <div className="date-input-cont">
                  <input
                    disabled
                    value={formattedToDate}
                    className="date-input"
                    placeholder="Enter birth date"
                    type="date"
                  ></input>
                  <span className="bl_err-msg"></span>
                </div>
              </div>

              {/* <div className="inputfield">
                <label>Shifts</label>
                <div className="custom_select">
                  <select>
                    <option value="">Select</option>
                    <option value="Day Shift" selected>
                      Day Shifts
                    </option>
                  </select>
                  <span className="bl_err-msg"></span>
                </div>
              </div> */}

              <div className="inputfield">
                <label>Shifts</label>
                <div style={{ width: "100%" }}>
                  <input
                    disabled
                    value={holiday?.shifts}
                    type="text"
                    className="input"
                  />
                </div>
              </div>

              {/* <div className="inputfield">
                <label>Applicable For</label>
                <div className="custom_select">
                  <select>
                    <option value="">Select</option>
                    <option value="Hyderbad" selected>
                      Hyderbad
                    </option>
                  </select>
                </div>
              </div> */}
              <div className="inputfield">
                <label>Applicable For</label>
                <div style={{ width: "100%" }}>
                  <input
                    disabled
                    value={holiday?.applicableFor}
                    type="text"
                    className="input"
                  />
                </div>
              </div>

              <div className="inputfield">
                <label>Description</label>
                <div style={{ width: "100%" }}>
                  <textarea
                    disabled
                    value={holiday?.description}
                    className="textarea"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bl-apply-leave_footer">
        <button
          className="button"
          onClick={() => navigate("/leave-tracker/holidays")}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default HolidayRecord;
