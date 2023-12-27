import React, { useEffect, useState } from "react";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
  deleteHolidayAction,
  fetchHolidaysAction,
} from "../../../redux/slices/leaves/holidaySlices";
import { fetchNotificationsAction } from "../../../redux/slices/notifications/notificationSlices";
import { useDispatch, useSelector } from "react-redux";
// import UserActions from "./UserAction";

// icons
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const Holidays2 = () => {
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate();

  //access state

  const userProfile = useSelector((state) => state.profile);
  const { userAuth, profilesList, profileData, userProfloading } = userProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHolidaysAction());
    // dispatch(fetchNotificationsAction(userAuth?._id));
  }, [userAuth]);

  const leaves = useSelector((state) => state?.leave);
  const holidays = useSelector((state) => state.holidays);
  const { allHolidays, loading } = holidays;

  const columns = [
    // {
    //   field: "photoURL",
    //   headerName: "Avatar",
    //   width: 60,
    //   renderCell: (params) => (
    //     <Avatar src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" />
    //   ),
    //   sortable: false,
    //   filterable: false,
    // },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },

    {
      field: "fromDate",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row?.numOfDays > 1 ? (
              <>
                {new Date(params.row?.fromDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" - "}
                <br />
                {new Date(params.row?.toDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </>
            ) : (
              <>
                {new Date(params.row?.fromDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </>
            )}
          </>
        );
      },
      // cellClassName: "name-column--cell",
    },
    {
      field: "applicableFor",
      headerName: "Applicable For",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "shifts",
      headerName: "shifts",
      flex: 1,
      // cellClassName: "name-column--cell",
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
                navigate(`/leave-tracker/holidays/${params.row._id}`)
              }
            >
              {" "}
              <VisibilityIcon />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: 1 }}
              onClick={() =>
                navigate(`/leave-tracker/holidays/update/${params.row._id}`)
              }
            >
              {" "}
              <CreateIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch(deleteHolidayAction(params.row._id)).then(() => {
                  dispatch(fetchHolidaysAction());
                })
              }
              type="button"
              sx={{ p: 1 }}
            >
              {" "}
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

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
            <h2 className="bl_headings">Holidays</h2>
            <div>
              {/* <select
              // value={formik.values.employeeId}
              // onChange={formik.handleChange("userId")}
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
              </select> */}
            </div>
          </div>
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
              rows={allHolidays ?? []}
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

export default Holidays2;
