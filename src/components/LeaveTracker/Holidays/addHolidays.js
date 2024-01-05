import React, { useEffect } from "react";
import "./holidays.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addHolidayAction,
  fetchHolidaysAction,
} from "../../../redux/slices/leaves/holidaySlices";
import * as Yup from "yup";

import { AiOutlineLeft } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

//Form Schema
const formSchema = Yup.object({
  name: Yup.string().required("*Name is required"),
  shifts: Yup.string().required("*Shifts is required"),
  fromDate: Yup.date().required("*FromDate is required"),
  toDate: Yup.date().required("*ToDate is required"),
  applicableFor: Yup.string().required("*ApplicableFor is required"),
  description: Yup.string().required("*Description is required"),
});

const ApplyLeave = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      shifts: "Day Shift",
      fromDate: "",
      toDate: "",
      applicableFor: "Hyderbad",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // dispatch(addHolidayAction(values));
      // showCard();
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    dispatch(fetchHolidaysAction());
  }, [dispatch]);

  const holidays = useSelector((state) => state.holidays);
  const { isHolidayAdded, loading, allHolidays } = holidays;

  //show card
  const showCard = () => {
    formik.submitForm();
    const card = document.querySelector(".bl_card");
    console.log(allHolidays);
    const isAddedBefore = allHolidays?.some((eachLeave) => {
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
    console.log(isAddedBefore);
    if (isAddedBefore) {
      alert(`Already Declared Holiday on this Day`);
    }
    if (
      formik.values.fromDate !== "" &&
      !isAddedBefore &&
      Object.keys(formik.errors).length === 0
    )
      return card.classList.add("show");
  };

  const removeCard = () => {
    const card = document.querySelector(".bl_card");
    card.classList.remove("show");
  };

  if (isHolidayAdded) return navigate("/leave-tracker/holidays");
  return (
    <div className="bl-apply-leave-cont">
      {/* <div className="bl-apply-leave_header">
        <div>
          <span onClick={() => navigate("/leave-tracker/holidays")}>
            <AiOutlineLeft />
          </span>

          <span>Add Holiday</span>
        </div>
        <button onClick={() => navigate("/leave-tracker/holidays")}>X</button>
      </div> */}
      <div className="bl-apply-leave_header">
        <div className="bl-apply-leave_header_left-cont">
          {/* <span> */}
          <AiOutlineLeft
            className="bl_header-icon"
            onClick={() => navigate("/leave-tracker/holidays")}
          />
          {/* </span> */}

          <span className="bl_header_head">Add Holiday</span>
        </div>
        <span
          className="bl_cancel-icon"
          onClick={() => navigate("/leave-tracker/holidays")}
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
      </div>

      <div className="bl-apply-leave-form-cont">
        <form className="bl-apply-leave-form" onSubmit={formik.handleSubmit}>
          <div className="wrapper">
            <div className="title">Add Holiday</div>
            <div className="form">
              <div className="inputfield">
                <label>Name</label>
                <div style={{ width: "100%" }}>
                  <input
                    value={formik.values.name}
                    type="text"
                    className="input"
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                  <span className="bl_err-msg">
                    {formik?.touched?.name && formik?.errors?.name}
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
                    type="date"
                    min={formik.values.fromDate}
                  ></input>
                  <span className="bl_err-msg">
                    {formik?.touched?.toDate && formik?.errors?.toDate}
                  </span>
                </div>
              </div>

              <div className="inputfield">
                <label>Shifts</label>
                <div className="custom_select">
                  <select
                    values={formik.values.shifts}
                    onChange={formik.handleChange("shifts")}
                    onBlur={formik.handleBlur("shifts")}
                  >
                    <option value="">Select</option>
                    <option value="Day Shift" selected>
                      Day Shifts
                    </option>
                  </select>
                  <span className="bl_err-msg">
                    {formik?.touched?.shifts && formik?.errors?.shifts}
                  </span>
                </div>
              </div>

              <div className="inputfield">
                <label>Location</label>
                <div className="custom_select">
                  <select
                    values={formik.values.applicableFor}
                    onChange={formik.handleChange("applicableFor")}
                    onBlur={formik.handleBlur("applicableFor")}
                  >
                    <option value="">Select</option>
                    <option value="Hyderbad" selected>
                      Hyderbad
                    </option>
                  </select>
                  <span className="bl_err-msg">
                    {formik?.touched?.applicableFor &&
                      formik?.errors?.applicableFor}
                  </span>
                </div>
              </div>

              <div className="inputfield">
                <label>Description</label>
                {/* <div> */}
                <textarea
                  value={formik.values.description}
                  className="textarea"
                  onChange={formik.handleChange("description")}
                  handleBlur={formik.handleBlur("description")}
                ></textarea>
                {/* <span className="bl_err-msg">
                    {formik?.touched?.description &&
                      formik?.errors?.description}
                  </span> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bl-apply-leave_footer">
        <button className="button" type="submit" onClick={showCard}>
          Apply
        </button>
        <button
          className="button"
          onClick={() => navigate("/leave-tracker/holidays")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ApplyLeave;
