import React, { useEffect } from "react";
import ListViewHeader from "./ListViewHeader";
import { fetchAllLeaves } from "../../../../redux/slices/leaves/leaveSlices";
import { useDispatch, useSelector } from "react-redux";
import { BsCalendar2Date } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { fetchNotificationsAction } from "../../../../redux/slices/notifications/notificationSlices";

// images
import noLeavesImg from "../../../../Assets/leavesAndHolidays/leave.png";
import casualLeavesImg from "../../../../Assets/leavesAndHolidays/flight.png";
import sickLeavesImg from "../../../../Assets/leavesAndHolidays/sick.png";
import maternityLeavesImg from "../../../../Assets/leavesAndHolidays/maternity.png";
import earnedLeavesImg from "../../../../Assets/leavesAndHolidays/remaining-leave.png";

const LeaveType = ({
  title,
  customFunc,
  icon,
  availableLeaves,
  bookedLeaves,
}) => {
  return (
    <div className="bl_leave_type" onClick={customFunc}>
      <h2>{title}</h2>
      <img src={icon} />
      <div>
        <p>Available: {availableLeaves}</p>
        <p>Applied : {bookedLeaves}</p>
      </div>
    </div>
  );
};

const ListView = () => {
  //navigation
  const navigate = useNavigate();

  //access state
  const leaves = useSelector((state) => state?.leave);
  console.log(leaves);
  const { allLeaves, appErr, serverErr } = leaves;
  console.log(allLeaves);

  const userProfile = useSelector((state) => state.profile);
  const { userAuth, profilesList, profileData, loading } = userProfile;

  const isLeavesApplied = profileData?.leaves.length > 0;
  console.log(isLeavesApplied);

  let pendingSortedList = [];
  if (profileData) {
    pendingSortedList = [...profileData?.leaves]?.sort((a, b) => {
      // Sort by 'Pending' status first
      if (a.leaveStatus === "Pending" && b.leaveStatus !== "Pending") return -1;
      if (a.leaveStatus !== "Pending" && b.leaveStatus === "Pending") return 1;
      // Sort by other leaveStatuses alphabetically
      return a.leaveStatus.localeCompare(b.leaveStatus);
    });
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllLeaves());
    dispatch(fetchNotificationsAction(userAuth?._id));
  }, []);
  return (
    <div className="bl_leave_list-view-cont">
      <div className="bl_leave-header-cont">
        <ListViewHeader />
      </div>
      {loading ? (
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
      ) : (
        <>
          <div className="bl_leave_type-category">
            <LeaveType
              title="Casual Leave"
              customFunc={() => navigate("/leave-tracker/apply-leave")}
              availableLeaves={profileData?.casualLeaves}
              bookedLeaves={12 - profileData?.casualLeaves}
              icon={casualLeavesImg}
            />
            <LeaveType
              title="Sick Leave"
              customFunc={() => navigate("/leave-tracker/apply-leave")}
              availableLeaves={profileData?.sickLeaves}
              bookedLeaves={12 - profileData?.sickLeaves}
              icon={sickLeavesImg}
            />
            <LeaveType
              title="Earned Leaves"
              customFunc={() => navigate("/leave-tracker/apply-leave")}
              availableLeaves="0"
              bookedLeaves="0"
              icon={earnedLeavesImg}
            />
            <LeaveType
              title="Maternity"
              customFunc={() => navigate("/leave-tracker/apply-leave")}
              availableLeaves="0"
              bookedLeaves="0"
              icon={maternityLeavesImg}
            />
          </div>
          <div className="bl_leave_and_holiday">
            <div className="bl_leave-tabel">
              {isLeavesApplied ? (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Reason Type/ Festival</th>
                      {/* <th>Reason</th> */}
                      <th>No of Days</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingSortedList?.map((leave) => {
                      console.log(leave);
                      return (
                        <tr>
                          <td>
                            {/* {new Date(leave?.fromDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric", 
                              }
                            )} */}
                            <>
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
                            </>
                          </td>
                          {/* <td>{leave?.fromDate}</td> */}
                          <td>{leave.leaveType}</td>
                          {/* <td>{leave.reasonForLeave}</td> */}
                          <td>{leave.numOfDays}</td>
                          <td
                            className={
                              leave.isApproved
                                ? "bl_leave_approved-text"
                                : "bl_leave_not_approved-text"
                            }
                          >
                            {leave.leaveStatus}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="bl_no-leaves">
                  <img src={noLeavesImg} />
                  <p>No Leaves Applied</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListView;
