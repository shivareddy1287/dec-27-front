import React, { useEffect } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import WorkingFormatDonut from "../charts/workingFormatDonut";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeaves } from "../../redux/slices/leaves/leaveSlices";
import { fetchAttendencesAction } from "../../redux/slices/attendence/attendenceSlices";

const AttendenceDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllLeaves());
    dispatch(fetchAttendencesAction());
  }, [dispatch]);

  const leaves = useSelector((state) => state.leave);
  const { allLeaves, loading: leavesLoading } = leaves;
  console.log(allLeaves);

  const attendence = useSelector((state) => state.attendence);
  const { attendences, loading: attLoading } = attendence;
  console.log(attendences);

  // leave
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

  // attendence
  const punchInEmployees = attendences?.filter((att) => {
    const punchInDate = new Date(att?.date);
    punchInDate?.setHours(0, 0, 0, 0);
    console.log(todaysDate);
    console.log(punchInDate);
    console.log(todaysDate.getTime() === punchInDate.getTime());

    return todaysDate.getTime() === punchInDate.getTime();
  });

  const todayWFO = punchInEmployees?.filter(
    (att) => att.workFrom === "Work from Office"
  );

  console.log(todayWFO);

  const percentage = (todayWFO?.length / punchInEmployees?.length) * 100;

  console.log(punchInEmployees);

  return (
    <div className="bl_att_dashboard">
      <div className="bl_leave-applications_header">
        <h2 className="bl_headings">Attendance Dashboard</h2>
      </div>
      <div style={{ padding: "10px" }}>
        <h2 className="bl_att_dashboard_heading">Monday, 01/01/2024</h2>

        <div className="bl_att_d_t-cont">
          <div className="bl_att3-4">
            <div style={{ display: "flex", gap: "10px" }}>
              <div className="bl_att-t-1-3">
                <div className="bl_att_cen">
                  <div>
                    <p className="bl_att_1-3-text">Total Employees</p>
                    <span>130</span>
                  </div>
                  {/* Check in */}
                </div>
              </div>
              <div className="bl_att-t-1-3">
                <div className="bl_att_cen">
                  <div className="bl_circular-bar-cont">
                    <CircularProgressbar
                      value="50"
                      // text={(seconds % 60) + ":" + seconds}
                      text="50%"
                      styles={buildStyles({
                        textColor: "#000",
                        textSize: 16,
                        // pathColor: green,
                        tailColor: "rgba(255,255,255,.2)",
                      })}
                    />
                  </div>
                  <div>
                    <p className="bl_att_1-3-text">Check In</p>
                    <span>{punchInEmployees?.length}</span>
                  </div>
                  {/* Check in */}
                </div>
              </div>
              <div className="bl_att-t-1-3">
                <div className="bl_att_cen">
                  <div className="bl_circular-bar-cont">
                    <CircularProgressbar
                      value="50"
                      // text={(seconds % 60) + ":" + seconds}
                      text="50%"
                      styles={buildStyles({
                        textColor: "#000",
                        textSize: 16,
                        // pathColor: green,
                        tailColor: "rgba(255,255,255,.2)",
                      })}
                    />
                  </div>
                  <div>
                    <p className="bl_att_1-3-text">On Leave</p>
                    <span>{onLeaveEmployees?.length}</span>
                  </div>
                  {/* Check in */}
                </div>
              </div>
            </div>
            <div>Current Day Status</div>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <div className="bl_att-t2-1-2">
                {/* <div className="bl_dashboard_w_card"> */}
                <h3 className="bl_att_card_header">Working Format</h3>
                {attLoading ? (
                  <div className="loader"></div>
                ) : (
                  <div className="bl_dashboard_w_card__cont">
                    <div className="bl_dashboard_w_card__cont_w_format">
                      <div className="bl_dashboard_wf_wfh">
                        <h5>Work From Home</h5>
                        <p>{100 - percentage}%</p>
                      </div>
                      <div className="bl_dashboard_wf_wfo">
                        <h5>Work From Office</h5>
                        <p>{percentage}%</p>
                      </div>
                    </div>
                    <div className="bl_dashboard_W_card_donut">
                      <WorkingFormatDonut workfromoffice={percentage} />
                    </div>
                  </div>
                )}

                {/* </div> */}
              </div>
              <div className="bl_att-t2-1-2">
                <h3 className="bl_att_card_header">
                  On Leave
                  {/* ( {onLeaveEmployees?.length} ) */}
                </h3>
                {/* <div className="bl_att_user-cont">
                  <div>
                    <img src="https://i.pinimg.com/736x/26/61/9c/26619c16b5451afaa95956dff93ae3e5.jpg" />
                  </div>
                  <div>
                    <p className="bl_att_user-cont_name">Name</p>
                    <p className="bl_att_user-cont_role">Role</p>
                    <p className="bl_att_user-cont_manager">
                      Maneger:
                      <span className="bl_att_user-cont_name"> Name</span>
                    </p>
                    <div className="bl_att_user-cont_date">
                      {" "}
                      <CalendarMonthIcon /> <span>01/01/2024 - 01/01/2024</span>
                    </div>
                  </div>
                </div> */}

                {/*  */}

                {onLeaveEmployees?.map((emp) => (
                  <div className="bl_att_user-cont">
                    <div>
                      <img alt="profile" src={emp?.user?.profilePhoto} />
                    </div>
                    <div>
                      <p className="bl_att_user-cont_name">
                        {emp?.user?.basicInformation?.firstName}{" "}
                        {emp?.user?.basicInformation?.lastName}
                      </p>
                      <p className="bl_att_user-cont_role">
                        {emp?.user?.workInformation?.designation}
                      </p>
                      <p className="bl_att_user-cont_manager">
                        Manager:
                        <span className="bl_att_user-cont_name">
                          {" "}
                          {emp?.userManagerName}
                        </span>
                      </p>
                      <div className="bl_att_user-cont_date">
                        {" "}
                        <CalendarMonthIcon />{" "}
                        <span>
                          {emp?.numOfDays > 1 ? (
                            <>
                              {new Date(emp?.fromDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                              {" - "}

                              {new Date(emp?.toDate).toLocaleDateString(
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
                              {new Date(emp?.fromDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/*  */}
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="bl_att1-4">
            <h3 className="bl_att_card_header">Attendence Feed</h3>

            {/* <div className="bl_att_user-cont">
              <div>
                <img src="https://i.pinimg.com/736x/26/61/9c/26619c16b5451afaa95956dff93ae3e5.jpg" />
              </div>
              <div>
                <p className="bl_att_user-cont_name">Name</p>
                <div className="bl_att_user-cont_date">
                  <AccessTimeIcon /> <span> 10: 00: AM</span>
                </div>
              </div>
            </div> */}

            {/*  */}
            {punchInEmployees?.map((att) => (
              <div className="bl_att_user-cont">
                <div>
                  <img alt="profile" src={att?.user?.profilePhoto} />
                </div>
                <div>
                  <p className="bl_att_user-cont_name">
                    {att?.user?.basicInformation.firstName}{" "}
                    {att?.user?.basicInformation.lastName}
                  </p>
                  {/* <p className="bl_att_user-cont_role">Role</p> */}
                  <div className="bl_att_user-cont_date">
                    {" "}
                    <AccessTimeIcon /> <span> {att.punchIn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendenceDashboard;
