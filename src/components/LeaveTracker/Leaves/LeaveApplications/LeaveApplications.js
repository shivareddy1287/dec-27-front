import React, { useEffect } from "react";
import { fetchAllLeaves } from "../../../../redux/slices/leaves/leaveSlices";
import { useDispatch, useSelector } from "react-redux";
import "./leaveApplication.css";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { fetchNotificationsAction } from "../../../../redux/slices/notifications/notificationSlices";
import * as Yup from "yup";
import { useFormik } from "formik";

//Form Schema
const formSchema = Yup.object({
  userId: Yup.string().required("EmployeeId is required"),
});

const LeaveApplication = () => {
  //navigate
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema,
  });

  //access state
  const leaves = useSelector((state) => state?.leave);
  console.log(leaves);
  const { allLeaves, loading, appErr, serverErr } = leaves;
  console.log(allLeaves);

  const userProfile = useSelector((state) => state.profile);
  const { userAuth, profilesList, profileData, userProfloading } = userProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllLeaves());
    dispatch(fetchNotificationsAction(userAuth?._id));
  }, []);
  return (
    <div>
      <div className="bl_leave-applications_header">
        <h2 className="bl_headings">Leave Applications</h2>
        <div>
          <select
            value={formik.values.employeeId}
            onChange={formik.handleChange("userId")}
          >
            <option value="">All Users</option>
            {profilesList?.map((user) => {
              return (
                <option value={user._id}>
                  {user.basicInformation.firstName}{" "}
                  {user.basicInformation.lastName}
                </option>
              );
            })}
          </select>
          <span>
            <BsThreeDots />
          </span>
        </div>
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
        <div className="bg-trail">
          <div className="table_data">
            <table>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "55px" }}>
                    {/* <input type="checkbox" /> */}
                    Employee Name
                  </th>
                  <th>Date</th>
                  <th>Reason Type/ Festival</th>
                  <th>No of Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allLeaves
                  ?.filter((eachLeave) => {
                    if (formik.values.userId === "") {
                      return true; // Return true to include all leaves when userId is empty
                    }
                    return eachLeave.employeeId === formik.values.userId;
                  })
                  ?.map((leave) => {
                    return (
                      <tr>
                        <td>
                          <span className="bl_three_dots_icon">
                            <BsThreeDots />
                            <ul className="bl_three_dots_options">
                              <li
                              // onClick={() =>
                              //   navigate(
                              //     `/leave-tracker/leave-applications/update/${leave._id}`
                              //   )
                              // }
                              >
                                View
                              </li>
                              <li
                                onClick={() =>
                                  navigate(
                                    `/leave-tracker/leave-applications/update/${leave._id}`
                                  )
                                }
                              >
                                Edit
                              </li>
                              <li>Delete</li>
                            </ul>
                            {/* <span >
                          <p>Option 1</p>
                          <p>Option 2</p>
                          <p>Option 3</p>
                        </span> */}
                          </span>
                          <img
                            alt="avatar"
                            // className="bl_avatar"
                            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                          />{" "}
                          {leave?.user?.basicInformation?.firstName}{" "}
                          {leave?.user?.basicInformation?.lastName}
                        </td>
                        {/* <div className="bl_holyday-tabel_avatar_tab">
                          {" "}
                          <span className="bl_tabel_dots">
                            <BsThreeDots />
                          </span>

                          <img
                            alt="avatar"
                            className="bl_avatar"
                            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                          />
                          <p>{leave?.user?.basicInformation?.firstName} </p>
                        </div> */}
                        <td
                          onClick={() =>
                            navigate(
                              `/leave-tracker/leave-applications/${leave._id}`
                            )
                          }
                        >
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

                        {/* <td>
                      {new Date(leave?.fromDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td> */}
                        <td>{leave.leaveType}</td>
                        <td>{leave.numOfDays}</td>
                        <td>{leave.reasonForLeave}</td>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;

// import {
//   Agenda,
//   Day,
//   Inject,
//   Month,
//   ScheduleComponent,
// } from "@syncfusion/ej2-react-schedule";
// import React from "react";

// const ListView = () => {
//   return (
//     <div>
//       <ScheduleComponent
//         height="600px"
//         style={{ margin: 0, padding: 0 }}
//         currentView="Month"
//         eventSettings={
//           {
//             // dataSource: calenderData,
//             // template: eventTemplate,
//           }
//         }
//       >
//         {/* <ViewsDirective>
//             <ViewDirective option="Month" />
//             <ViewDirective option="Day" />
//             <ViewDirective option="Agenda" />
//           </ViewsDirective> */}
//         <Inject
//           style={{ margin: "10px", padding: 0 }}
//           services={[Day, Month, Agenda]}
//         />
//       </ScheduleComponent>
//     </div>
//   );
// };

// export default ListView;
