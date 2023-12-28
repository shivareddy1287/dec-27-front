import React, { useEffect } from "react";

import {
  allFetchTasksGivenAction,
  fetchSingleTasksGivenAction,
} from "../../../redux/slices/TasksGiven/TasksGivenSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate, Link, useNavigate } from "react-router-dom";
import Loader from "../../../utils/Loader/Loader";
import { dateOnlyFormate } from "../../../utils/DateFun/DateModify";

const ViewTasksGiven = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleTasksGivenAction(id));
  }, [dispatch, id]);

  const tasks = useSelector((state) => state?.tasks);
  const { singleTasksGiven, loading, appErr, serverErr } = tasks;

  const {
    taskType,
    taskGivenUser,
    taskName,
    taskDescription,
    startDate,
    dueDate,
    Importance,
    Status,
    taskAssignedUser,
  } = singleTasksGiven ? singleTasksGiven : "";

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="cs_div_profile">
          <div className="cs_edit_div">
            <div>
              <Link
                to={`/tasks/tasks-given`}
                className="cs_edit_employee_head_div"
              >
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
                  <h2 className="cs_edit_employee_head">View Task</h2>
                </div>
              </Link>
            </div>
            <div className="cs_edit_form_div">
              <div>
                <h2 className="cs_edit_side_head">Task Details</h2>
                <div>
                  <div className="cs_edit_left_right_div">
                    <div className="cs_edit_left_input_right_input">
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input"> Task From :</h2>
                        <h2 className="cs_view_right_input">
                          {taskGivenUser?.basicInformation?.employerId}-
                          {taskGivenUser?.basicInformation?.firstName}{" "}
                          {taskGivenUser?.basicInformation?.lastName}{" "}
                        </h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input">
                          {" "}
                          Task Assign to :
                        </h2>
                        <h2 className="cs_view_right_input">
                          {taskAssignedUser?.basicInformation?.employerId}-
                          {taskAssignedUser?.basicInformation?.firstName}{" "}
                          {taskAssignedUser?.basicInformation?.lastName}{" "}
                        </h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h1 className="cs_edit_left_input">Task Type:</h1>
                        <h2 className="cs_view_right_input">{taskType}</h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input">Task Name :</h2>
                        <h2 className="cs_view_right_input">{taskName}</h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input">Description :</h2>
                        <h2 className="cs_view_right_input">
                          {taskDescription}
                        </h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input">Start Date :</h2>
                        <h2 className="cs_view_right_input">
                          {dateOnlyFormate(startDate)}
                        </h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input">Due Date :</h2>
                        <h2 className="cs_view_right_input">
                          {dateOnlyFormate(dueDate)}
                        </h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input">Importance :</h2>
                        <h2 className="cs_view_right_input">{Importance}</h2>
                      </div>
                      <div className="cs_edit_input_div">
                        <h2 className="cs_edit_left_input">Status :</h2>
                        <h2 className="cs_view_right_input">{Status}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <Link to={`/tasks/tasks-given`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTasksGiven;
