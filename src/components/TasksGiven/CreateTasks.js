import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { fetchAllProfileAction } from "../../redux/slices/profileSlice/profileSlice";

import { TasksGivenCreateAction } from "../../redux/slices/TasksGiven/TasksGivenSlice";
import FormikDateYour from "../../utils/DateFun/FormDateComp";
import Loader from "../../utils/Loader/Loader";

const CreateTasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProfileAction());
  }, [dispatch]);

  const tasks = useSelector((state) => state?.tasks);

  const { isTasksGivenAdded } = tasks;
  const user = useSelector((state) => state?.profile);
  const { profilesList, loading, appErr, serverErr } = user;

  const { _id } = user?.userAuth;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taskGivenUser: _id,
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

  if (isTasksGivenAdded && formik.values.taskAssignedUser === _id)
    return <Navigate to={`/tasks/my-tasks`} />;

  if (isTasksGivenAdded && formik.values.taskAssignedUser !== _id)
    return <Navigate to={`/tasks/tasks-given`} />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="cs_div_profile">
          <form onSubmit={formik.handleSubmit} className="cs_edit_div">
            <div className="cs_edit_form_div">
              <div>
                <h1 className="cs_edit_side_head">Task Details</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input"> Task Assign to :</h1>
                      <select
                        className="cs_select_option_all"
                        value={formik.values.taskAssignedUser}
                        onChange={formik.handleChange("taskAssignedUser")}
                      >
                        {profilesList?.map((each) => (
                          <option value={`${each?._id}`}>
                            {each?.basicInformation?.employerId}-
                            {each?.basicInformation?.firstName}{" "}
                            {each?.basicInformation?.lastName}{" "}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Task Type:</h1>
                      <h2 className="cs_edit_right_input">
                        {formik.values.taskAssignedUser === _id
                          ? "Self"
                          : "Others"}
                      </h2>
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
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTasks;
