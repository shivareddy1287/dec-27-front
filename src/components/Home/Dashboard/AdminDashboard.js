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

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllLeaves());
    dispatch(fetchHolidaysAction());
  }, []);

  const leaves = useSelector((state) => state.leave);
  const { allLeaves, loading: leavesLoading } = leaves;
  console.log(allLeaves);

  const holidays = useSelector((state) => state.holidays);
  const { allHolidays, loading: holidaysLoading } = holidays;

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
        {/* 1 */}
        <div className="bl_dashboard-cont">
          <div className="bl_dashboard_employees_data">
            <div className="bl_dashboard_employees_data_card">
              <img src={employeesIcon} />
              <div>
                <p>Employees</p>
                <span>1234</span>
              </div>
            </div>
          </div>
          <div className="bl_dashboard_employees_data">
            <div className="bl_dashboard_employees_data_card">
              <img src={maleIcon} />
              <div>
                <p>Male</p>
                <span>123</span>
              </div>
            </div>
          </div>
          <div className="bl_dashboard_employees_data">
            <div className="bl_dashboard_employees_data_card">
              <img src={femaleIcon} />
              <div>
                <p>Female</p>
                <span>234</span>
              </div>
            </div>
          </div>
          <div className="bl_dashboard_employees_data">
            <div className="bl_dashboard_employees_data_card">
              <img src={employeesIcon} />
              <div>
                <p>New Employees</p>
                <span>12</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 */}
        <div className="bl_dashboard-cont">
          <div className="bl_dashboard_w_card">
            <h3 className="bl_dashboard_w_card_h1">Working Format</h3>
            <div className="bl_dashboard_w_card__cont">
              <div className="bl_dashboard_w_card__cont_w_format">
                <div className="bl_dashboard_wf_wfh">
                  <h5>Work From Home</h5>
                  <p>60%</p>
                </div>
                <div className="bl_dashboard_wf_wfo">
                  <h5>Work From Office</h5>
                  <p>40%</p>
                </div>
              </div>
              <div className="bl_dashboard_W_card_donut">
                <WorkingFormatDonut />
              </div>
            </div>
          </div>
          <div className="bl_dashboard_w_card">
            <h5>Employee by Department</h5>
            <EmployeeDepatmentDonut />
          </div>
          <div className="bl_dashboard_w_card">
            <h5>On Leave ( {onLeaveEmployees?.length} )</h5>
            <div className="bl_d_on-leave_cont">
              {leavesLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90%",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <>
                  {onLeaveEmployees?.map((employee) => (
                    <div className="bl_d_on-leave_profile">
                      <img
                        src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                        alt="Employee"
                      />
                      <div>
                        <h3>
                          {employee.user.basicInformation.firstName}{" "}
                          {employee.user.basicInformation.lastName}{" "}
                        </h3>
                        <p>{employee.user.workInformation.designation}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="bl_dashboard-cont">
          <div className="bl_dashboard-card">
            <div className="bl_dashboard-card_header">Leave Requests</div>

            <div className="table_data">
              {leavesLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90%",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Date</th>
                      <th>No of Days</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLeaves
                      ?.filter((leave) => leave.leaveStatus === "Pending")
                      ?.map((leave) => {
                        return (
                          <tr>
                            <td>
                              <img
                                alt="avatar"
                                className="bl_avatar"
                                src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                              />
                              {leave.user.basicInformation.firstName}{" "}
                              {leave.user.basicInformation.lastName}{" "}
                            </td>

                            <td>
                              {leave?.numOfDays > 1 ? (
                                <>
                                  {new Date(leave?.fromDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                  {" - "}
                                  <br />
                                  {new Date(leave?.toDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </>
                              ) : (
                                <>
                                  {new Date(leave?.fromDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </>
                              )}
                            </td>
                            <td>{leave?.numOfDays}</td>
                            <td>
                              <button
                                className="button"
                                onClick={() =>
                                  navigate(
                                    `/leave-tracker/leave-applications/${leave._id}`
                                  )
                                }
                              >
                                Take Action
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                    {/* <tr>
                    <td>Employee Name</td>

                    <td>Date</td>
                    <td>5</td>
                    <td>Take Action</td>
                  </tr>
                  <tr>
                    <td>Employee Name</td>

                    <td>Date</td>
                    <td>5</td>
                    <td>Take Action</td>
                  </tr>
                  <tr>
                    <td>Employee Name</td>

                    <td>Date</td>
                    <td>5</td>
                    <td>Take Action</td>
                  </tr>
                  <tr>
                    <td>Employee Name</td>

                    <td>Date</td>
                    <td>5</td>
                    <td>Take Action</td>
                  </tr> */}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="bl_dashboard-card">
            <div className="bl_dashboard-card_header">
              Upcomming Holidays(2023)
            </div>

            <div className="bl_dashboard_holiday_cont">
              {holidaysLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90%",
                  }}
                >
                  <div className="loader"></div>
                </div>
              ) : (
                <>
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

                    const days = [
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ];

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
                </>
              )}

              {/* <div className="bl_dashboard_holiday">
                <div className="bl_dashboard_holiday_date">
                  <span>25</span>
                  <br />
                  <span>Mar</span>
                </div>
                <div>
                  <p className="bl_dashboard-leave-main-text"> Diwali</p>
                  <span className="bl_dashboard-leave-light-text">Friday</span>
                </div>
              </div>
              <div className="bl_dashboard_holiday">
                <div className="bl_dashboard_holiday_date">
                  <span>25</span>
                  <br />
                  <span>Mar</span>
                </div>
                <div>
                  <p className="bl_dashboard-leave-main-text"> Diwali</p>
                  <span className="bl_dashboard-leave-light-text">Friday</span>
                </div>
              </div>
              <div className="bl_dashboard_holiday">
                <div className="bl_dashboard_holiday_date">
                  <span>25</span>
                  <br />
                  <span>Mar</span>
                </div>
                <div>
                  <p className="bl_dashboard-leave-main-text"> Diwali</p>
                  <span className="bl_dashboard-leave-light-text">Friday</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
