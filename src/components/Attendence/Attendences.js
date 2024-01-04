import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
// import UserActions from "./UserAction";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import CloseIcon from "@mui/icons-material/Close";
import Select from "react-select";
import * as Yup from "yup";
import { useFormik } from "formik";

// icons

import {
  fetchAllProfileAction,
  fetchDetailsProfileAction,
} from "../../redux/slices/profileSlice/profileSlice";

const formSchema = Yup.object({
  userId: Yup.string().required("EmployeeId is required"),
});

const Attendences = () => {
  const [userAttList, setUserAttList] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  const [filterPeriod, setFilterPeriod] = useState("");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [showFIlterPage, setShowFilterPage] = useState(false);

  //access state

  const userProfile = useSelector((state) => state.profile);
  const { userAuth, profilesList, profileData, loading } = userProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProfileAction());
    dispatch(fetchDetailsProfileAction(userAuth?._id));
  }, [userAuth, dispatch]);

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
      // console.log(values);
    },
    validationSchema: formSchema,
  });

  // console.log(profileData?.basicInformation?.firstName);

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
      headerName: "Duration(hrs)",
      flex: 1,
      renderCell: (params) => {
        console.log(params.row.duration);
        const hours = Math.floor(params.row?.duration / 3600);
        const minutes = Math.floor((params.row?.duration % 3600) / 60);
        return (
          <>
            {hours}:{minutes} hrs
          </>
        );
      },
    },
  ];
  // console.log(profileData?.attendence);

  const rowsWithIds =
    profileData?.attendence?.map((row) => ({
      ...row,
      id: row._id, // Use a unique identifier from your row data
    })) || [];

  useEffect(() => {
    // console.log(rowsWithIds);
    // setUserAttList(rowsWithIds);
    const rowsWithIds =
      profileData?.attendence?.map((row) => ({
        ...row,
        id: row._id, // Use a unique identifier from your row data
      })) || [];
    setUserAttList(rowsWithIds);
  }, [profileData]);

  console.log(userAttList);

  // filter
  const handleChangefilterPeriod = (e) => {
    const value = e.target.value;
    setFilterPeriod(value);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (value === "thisyear") {
      const startDate = new Date(currentYear, 0, 1);
      const endDate = new Date(currentYear, 11, 31);
      setFilterFromDate(startDate.toLocaleDateString("en-CA"));
      setFilterToDate(endDate.toLocaleDateString("en-CA"));
    } else if (value === "lastyear") {
      const startDate = new Date(currentYear - 1, 0, 1);
      const endDate = new Date(currentYear - 1, 11, 31);
      setFilterFromDate(startDate.toLocaleDateString("en-CA"));
      setFilterToDate(endDate.toLocaleDateString("en-CA"));
    } else if (value === "thismonth") {
      const startDate = new Date(currentYear, currentMonth, 1);
      const endDate = new Date(currentYear, currentMonth, 31);
      setFilterFromDate(startDate.toLocaleDateString("en-CA"));
      setFilterToDate(endDate.toLocaleDateString("en-CA"));
    } else if (value === "lastmonth") {
      const startDate = new Date(currentYear, currentMonth - 1, 1);
      const endDate = new Date(currentYear, currentMonth - 1, 31);
      setFilterFromDate(startDate.toLocaleDateString("en-CA"));
      setFilterToDate(endDate.toLocaleDateString("en-CA"));
    } else if (value === "custom") {
    } else {
      // Handle default case or any additional logic
      setFilterFromDate(null); // Update with the appropriate default value or logic
    }
  };

  const handleClickFilterSearchBtn = () => {
    console.log(filterFromDate, "d", filterToDate);
    setShowFilterPage(false);

    const fromDate = new Date(filterFromDate);
    const toDate = new Date(filterToDate);

    // The date you want to check
    // const checkDate = new Date("2023-12-25T10:25:12.273Z");

    const rowsWithIds =
      profileData?.attendence?.map((row) => ({
        ...row,
        id: row._id, // Use a unique identifier from your row data
      })) || [];

    const searchUpdateUserList = rowsWithIds.filter((att) => {
      const checkDate = new Date(att.date);
      return checkDate >= fromDate && checkDate <= toDate;
    });
    setUserAttList(searchUpdateUserList);
  };

  const isCustomDate = filterPeriod === "custom";

  // console.log(isCustomDate);

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
            <div style={{ display: "flex", gap: "10px", marginRight: "20px" }}>
              {userAuth?.isAdmin ? (
                <div className="bl_att-select">
                  <Select
                    value={formik.values.userId}
                    onChange={(selectedOption) => {
                      // console.log(selectedOption);
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
              ) : null}
              <div className="bl_filter_date_range_cont">
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={() => setShowFilterPage(!showFIlterPage)}
                >
                  {showFIlterPage ? (
                    <>
                      <FilterAltOffIcon />
                    </>
                  ) : (
                    <>
                      <FilterAltIcon />
                    </>
                  )}
                </IconButton>
                {showFIlterPage && (
                  <div className="bl_filter_date_range">
                    <div>
                      <div className="bl_filter_date_range_header">
                        <h1 className="">Filter</h1>

                        <IconButton
                          type="button"
                          sx={{ p: 1 }}
                          onClick={() => setShowFilterPage(false)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </div>

                      <div className="bl_filter_date_range_input_cont">
                        <div>
                          <label>Period</label>
                          <select
                            value={filterPeriod}
                            onChange={handleChangefilterPeriod}
                          >
                            <option>select</option>
                            <option value="thisyear">This Year</option>
                            <option value="lastyear">Last Year</option>
                            <option value="thismonth">This Month</option>
                            <option value="lastmonth">Last Month</option>
                            <option value="custom">Custom</option>
                          </select>
                        </div>
                        <div>
                          <label>From</label>
                          <input
                            value={filterFromDate}
                            onChange={(e) => setFilterFromDate(e.target.value)}
                            disabled={!isCustomDate}
                            type="date"
                          />
                        </div>
                        <div>
                          <label>To</label>
                          <input
                            value={filterToDate}
                            onChange={(e) => setFilterToDate(e.target.value)}
                            disabled={!isCustomDate}
                            type="date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bl_filter_date_range_footer">
                      <button
                        className="button"
                        onClick={handleClickFilterSearchBtn}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Box
            // m={1}
            // height="85.5vh"
            className="bl_table_box"
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
              rows={userAttList ?? []}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              rowsPerPageOptions={[5, 10, 20]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
          </Box>{" "}
        </>
      )}
    </Box>
  );
};

export default Attendences;
