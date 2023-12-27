import React, { useEffect } from "react";
import "./dashboard.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import { format, parse } from "date-fns";

import WorkingFormatDonut from "../../charts/workingFormatDonut";

import employeesIcon from "../../../Assets/dashboard/team.png";
import maleIcon from "../../../Assets/dashboard/male.png";
import femaleIcon from "../../../Assets/dashboard/female.png";
import EmployeeDepatmentDonut from "../../charts/employeeDepartmentDonut";
import { fetchAllLeaves } from "../../../redux/slices/leaves/leaveSlices";
import { fetchHolidaysAction } from "../../../redux/slices/leaves/holidaySlices";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllLeaves());
    dispatch(fetchHolidaysAction());
  }, []);

  const leaves = useSelector((state) => state.leave);
  const { allLeaves } = leaves;
  console.log(allLeaves);

  const holidays = useSelector((state) => state.holidays);
  const { allHolidays } = holidays;

  // leaves
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);
  console.log(todaysDate);

  const onLeaveEmployees = allLeaves?.filter((leave) => {
    const fromDate = new Date(leave.fromDate);
    const toDate = new Date(leave.toDate);

    // Set time components to midnight for comparison
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);

    // Check if today's date is between from date and to date
    const isOnLeave = todaysDate >= fromDate && todaysDate <= toDate;

    // If the employee is on leave, include them in the filtered array
    return isOnLeave;
  });

  // holidays
  const upcommingHolidays = allHolidays?.filter((holiday) => {
    const fromDate = new Date(holiday.fromDate);
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date(holiday.toDate);
    toDate.setHours(0, 0, 0, 0);
    const formattedDate = new Date(fromDate);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const month = months[formattedDate.getMonth()];
    const date = formattedDate.getDate();
    const day = days[formattedDate.getDay()];

    console.log("date", date, "month", month, "day", day);

    const isUpcomming = todaysDate <= fromDate;
    return isUpcomming;
  });
  console.log("upcomming", upcommingHolidays);

  return (
    <div className="bl-apply-leave-cont">
      <div className="bl-apply-leave_header">
        <div>
          <span className="bl_headings">Dashboard</span>
        </div>
      </div>
      <div className="bl-apply-leave-form-cont">
        {/* user 1 */}
        <div className="bl_dashboard-cont">
          {/* holiday */}
          <div className="bl_dashboard-card_user-lh">
            <div className="bl_dashboard-card_header">
              Upcomming Holidays(2023)
            </div>

            <div className="bl_dashboard_holiday_cont">
              {upcommingHolidays?.map((holiday) => {
                const fromDate = new Date(holiday.fromDate);
                fromDate.setHours(0, 0, 0, 0);
                const toDate = new Date(holiday.toDate);
                toDate.setHours(0, 0, 0, 0);
                const formattedDate = new Date(fromDate);

                const months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];

                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                const month = months[formattedDate.getMonth()];
                const date = formattedDate.getDate();
                const day = days[formattedDate.getDay()];

                console.log("date", date, "month", month, "day", day);
                return (
                  <div className="bl_dashboard_holiday">
                    <div className="bl_dashboard_holiday_date">
                      <span>{date}</span>
                      <br />
                      <span>{month}</span>
                    </div>
                    <div>
                      <p className="bl_dashboard-leave-main-text">
                        {" "}
                        {holiday.name}
                      </p>
                      <span className="bl_dashboard-leave-light-text">
                        {day}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* leave */}
          <div className="bl_dashboard-card_user-lh">
            <div className="bl_dashboard-card_header">Leaves</div>
            <div className="bl_dashboard_leave_cont">
              <div className="bl_dashboard_leave">
                <div className="bl_dashboard_applied_leaves">4</div>
                <div>
                  <p className="bl_dashboard-leave-main-text">Sick leaves</p>{" "}
                  <span className="bl_dashboard-leave-light-text">
                    Available 5 days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3rd */}
          <div className="bl_dashboard-card_user-lh">
            <div className="bl_dashboard-card_header">Next</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
