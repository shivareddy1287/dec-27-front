import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TasksGivenCreateAction } from "../../../redux/slices/TasksGiven/TasksGivenSlice";
import FormikDateYour from "../../../utils/DateFun/FormDateComp";

const MyTaskAdd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state?.tasks);

  const { isTasksGivenAdded } = tasks;
  const user = useSelector((state) => state?.profile);
  const { _id } = user?.userAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskGivenUser: _id,
      taskType: "Self",
      taskName: "",
      taskDescription: "",
      startDate: "",
      dueDate: "",
      Importance: "",
      Status: "Open",
      taskAssignedUser: _id,
    },
    onSubmit: (values) => {
      dispatch(TasksGivenCreateAction(values));
      console.log(values);
    },
  });

  if (isTasksGivenAdded) return <Navigate to={`/tasks/my-tasks`} />;

  return (
    <div className="cs_div_profile">
      <form onSubmit={formik.handleSubmit} className="cs_edit_div">
        <div>
          <Link to={`/tasks/my-tasks`} className="cs_edit_employee_head_div">
            <div>
              <svg
                className="cs_font_icons"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 320 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
            </div>
            <div>
              <h2 className="cs_edit_employee_head"> Add Task</h2>
            </div>
          </Link>
        </div>
        <div className="cs_edit_form_div">
          <div>
            <h1 className="cs_edit_side_head">Task Details</h1>
            <div className="cs_edit_left_right_div">
              <div className="cs_edit_left_input_right_input">
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input"> Task Assign to :</h1>
                  <h2 className="cs_edit_right_input">
                    {user?.userAuth?.basicInformation?.firstName}{" "}
                    {user?.userAuth?.basicInformation?.lastName}{" "}
                    {user?.userAuth?.basicInformation?.employerId}
                  </h2>
                </div>
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input">Task Type:</h1>
                  <h2 className="cs_edit_right_input">Self</h2>
                </div>
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input">Task Name :</h1>
                  <input
                    className="cs_edit_right_input"
                    value={formik.values.taskName}
                    onChange={formik.handleChange("taskName")}
                  />
                </div>
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input">Description :</h1>
                  <input
                    className="cs_edit_right_input"
                    value={formik.values.taskDescription}
                    onChange={formik.handleChange("taskDescription")}
                  />
                </div>
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input">Start Date :</h1>
                  <FormikDateYour
                    name="startDate"
                    onChange={formik.setFieldValue}
                    type="text"
                    value={formik?.values?.startDate}
                  />
                </div>
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input">Due Date :</h1>

                  <FormikDateYour
                    name="dueDate"
                    onChange={formik.setFieldValue}
                    type="text"
                    value={formik?.values?.dueDate}
                  />
                </div>
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input">Importance :</h1>
                  <input
                    className="cs_edit_right_input"
                    value={formik.values.Importance}
                    onChange={formik.handleChange("Importance")}
                  />
                </div>
                <div className="cs_edit_input_div">
                  <h1 className="cs_edit_left_input">Status :</h1>

                  <select
                    className="cs_select_option_all"
                    value={formik.values.Status}
                    onChange={formik.handleChange("Status")}
                  >
                    <option value="Open">Open</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cs_edit_submit_cancel_div">
          <div>
            <button className="cs_edit_submit_button" type="submit">
              Submit
            </button>
          </div>

          <div>
            <Link to={`/tasks/my-tasks`}>
              <button className="cs_view_button_close">Close</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyTaskAdd;
