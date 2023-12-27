import React, { useEffect, useState } from "react";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { fetchNotificationsAction } from "../../redux/slices/notifications/notificationSlices";
import { useDispatch, useSelector } from "react-redux";
// import UserActions from "./UserAction";

import DialogDemo from "../../utils/popup/uiPopup.js";

import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import {
  deleteHolidayAction,
  fetchHolidaysAction,
} from "../../redux/slices/leaves/holidaySlices";

import {
  fetchAllProfileAction,
  fetchDetailsProfileAction,
} from "../../redux/slices/profileSlice/profileSlice";

const formSchema = Yup.object({
  userId: Yup.string().required("EmployeeId is required"),
});

const Attendences = () => {
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  //access state

  const userProfile = useSelector((state) => state.profile);
  const { userAuth, profilesList, profileData, loading } = userProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProfileAction());
    dispatch(fetchDetailsProfileAction(userAuth?._id));
  }, [userAuth]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // userId: `${profileData.basicInformation.firstName} ${profileData.basicInformation.lastName}`,
      userId: {
        value: `${profileData?.basicInformation?.firstName} ${profileData?.basicInformation?.lastName}`,
        label: `${profileData?.basicInformation?.firstName} ${profileData?.basicInformation?.lastName}`,
      },
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema,
  });

  console.log(profileData?.basicInformation?.firstName);

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {new Date(params.row?.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </>
        );
      },
      // cellClassName: "name-column--cell",
    },

    {
      field: "workFrom",
      headerName: "workFrom",
      flex: 1,
    },

    {
      field: "punchIn",
      headerName: "punchIn",
      flex: 1,
    },
    {
      field: "punchOut",
      headerName: "punchOut",
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
    },
  ];
  console.log(profileData?.attendence);

  const rowsWithIds =
    profileData?.attendence?.map((row) => ({
      ...row,
      id: row._id, // Use a unique identifier from your row data
    })) || [];

  console.log(profilesList);

  return (
    <Box>
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
          <div className="bl_leave-applications_header">
            <h2 className="bl_headings">Attendance</h2>
            <div className="bl_att-select">
              <Select
                value={formik.values.userId}
                onChange={(selectedOption) => {
                  console.log(selectedOption);
                  formik.setFieldValue("userId", selectedOption);
                  return dispatch(
                    fetchDetailsProfileAction(selectedOption?.value)
                  );
                }}
                options={profilesList?.map((user) => ({
                  value: `${user._id}`,
                  label: `${user.basicInformation.firstName} ${user.basicInformation.lastName}`,
                }))}
              />
            </div>
          </div>
          <DialogDemo />
          <h1 className="text-3xl font-bold underline">Hello world!</h1>{" "}
          <Box
            // m={1}
            height="85.5vh"
            sx={{
              //   "& .MuiDataGrid-root": {
              //     border: "none",
              //   },
              //   "& .MuiDataGrid-cell": {
              //     borderBottom: "none",
              //   },
              //   "& .name-column-cell": {
              //     color: colors.greenAccent[300],
              //   },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ebebed",
                borderBottom: "none",
              },
              //   "& .MuiDataGrid-virtualScroller": {
              //     backgroundColor: colors.primary[400],
              //   },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#ebebed",
              },
            }}
          >
            <DataGrid
              rows={rowsWithIds ?? []}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onFilterModelChange={(model) => console.log(model)}
            />
          </Box>{" "}
        </>
      )}
    </Box>
  );
};

export default Attendences;
