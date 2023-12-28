import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import "./TasksGiven.css";
import { allFetchTasksGivenAction } from "../../../redux/slices/TasksGiven/TasksGivenSlice";
import { dateOnlyFormate } from "../../../utils/DateFun/DateModify";

import { Box, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import Loader from "../../../utils/Loader/Loader";

const TasksGiven = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allFetchTasksGivenAction());
  }, [dispatch]);
  const tasks = useSelector((state) => state?.tasks);
  const { TasksGivenList, loading, appErr, serverErr } = tasks;
  const filteredTasksGivenList = TasksGivenList?.filter(
    (eachId) => eachId?.taskAssignedUser?._id !== eachId?.taskGivenUser?._id
  );
  // console.log(filteredTasksGivenList, "tasksGivenList");

  const newTasksGivenList = filteredTasksGivenList?.map((task) => ({
    id: task?.id,
    status: task?.Status,
    taskName: task?.taskName,
    taskDescription: task?.taskDescription,
    startDate: dateOnlyFormate(task?.startDate),
    dueDate: dateOnlyFormate(task?.dueDate),
    importance: task?.Importance,
    taskGivenUser: `${task?.taskGivenUser?.basicInformation?.employerId}-${task?.taskGivenUser?.basicInformation?.firstName} ${task?.taskGivenUser?.basicInformation?.lastName}`,
    taskAssignedUser: `${task?.taskAssignedUser?.basicInformation?.employerId}-${task?.taskAssignedUser?.basicInformation?.firstName} ${task?.taskAssignedUser?.basicInformation?.lastName}`,
    taskType: "Others",
  }));

  const columns = [
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      field: "taskName",
      headerName: "Task Name",
      width: 100,
    },
    {
      field: "taskDescription",
      headerName: "Task Description",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 100,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 100,
    },
    {
      field: "importance",
      headerName: "Importance",
      width: 100,
    },
    {
      field: "taskGivenUser",
      headerName: "Task From",
      width: 180,
    },
    {
      field: "taskAssignedUser",
      headerName: "Task Assigned To",
      width: 180,
    },
    {
      field: "taskType",
      headerName: "Task Type",
      width: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 200,
      renderCell: (params) => {
        return (
          <Box sx={{ m: 1, p: 2, postition: "relative" }}>
            <IconButton
              type="button"
              sx={{ p: 1 }}
              // onClick={() => console.log("view", params.row.id)}
              onClick={() =>
                navigate(`/tasks/tasks-given/view/${params.row.id}`)
              }
            >
              {" "}
              <VisibilityIcon />
            </IconButton>
            <>
              <IconButton
                type="button"
                sx={{ p: 1 }}
                onClick={() =>
                  navigate(`/tasks/tasks-given/update/${params.row.id}`)
                }
              >
                {" "}
                <CreateIcon />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: 1 }}
                onClick={() =>
                  navigate(`/tasks/tasks-given/delete/${params.row.id}`)
                }
              >
                {" "}
                <DeleteIcon />
              </IconButton>
            </>
          </Box>
        );
      },
    },
  ];

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {serverErr || appErr ? (
            <p>
              {serverErr} {appErr}
            </p>
          ) : null}
          <div className="cs_table_head_bg_create">
            <h2 className="cs_table_head_Assets_head">Employees Tasks</h2>
            <Link
              className="cs_table_add_asset_button"
              to={`/tasks/tasks-given/create`}
            >
              <span className="cs_asset_add_symbol">+</span> Add Employee Task
            </Link>
          </div>
          <TableReusable rows={newTasksGivenList ?? []} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default TasksGiven;
