import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllProfileAction,
  fetchDetailsProfileAction,
} from "../../../redux/slices/profileSlice/profileSlice";
import {
  adminHrRolesAccessGivenFun,
  normalAdminAccessGivenFun,
  proAdminAccessGivenFun,
  restrictedAccessFun,
} from "../../../utils/restrictedAccess";
import {
  dateOnlyFormate,
  dateTimeFormate,
} from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";

import { Avatar, Box, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import { DataGrid } from "@mui/x-data-grid";

const FindEmployee = () => {
  const [selectedSearchValue, setSearchSelectedValue] = useState("Email");
  const [searchInputVal, setSearchInputVal] = useState("");
  const [profilesListSearch, setProfilesListSearch] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProfileAction());
  }, [dispatch]);

  const profile = useSelector((state) => state?.profile);
  const { userAuth } = profile ? profile : "";
  const { _id, Access, profilePhoto } = userAuth ? userAuth : "";

  const { profilesList, loading, appErr, serverErr } = profile;

  const accessMain = normalAdminAccessGivenFun(Access);
  const newProfilesList = profilesListSearch?.map((profileEach) => ({
    id: profileEach?.id,
    Access: accessMain,
    employerId: profileEach?.basicInformation?.employerId,
    email: profileEach?.email,
    access: profileEach?.Access,
    projectTeam: profileEach?.ProjectTeam,
    firstName: profileEach?.basicInformation?.firstName,
    lastName: profileEach?.basicInformation?.lastName,
    managerDetails: `${profileEach?.managerDataId?.basicInformation?.employerId}-${profileEach?.managerDataId?.basicInformation?.firstName} ${profileEach?.managerDataId?.basicInformation?.lastName}`,
    basicInfoEmail: profileEach?.basicInformation?.email,
    profileEditAccess: profileEach?.ProfileEditAccess,
    department: profileEach?.workInformation?.Department,
    designation: profileEach?.workInformation?.designation,
    appRole: profileEach?.workInformation?.appRole,
    employmentType: profileEach?.workInformation?.employmentType,
    employeeStatus: profileEach?.workInformation?.employeeStatus,
    sourceOfHire: profileEach?.workInformation?.sourceOfHire,
    dateOfJoining: dateOnlyFormate(profileEach?.workInformation?.dateOfJoining),
    currentExperience: profileEach?.workInformation?.currentExperience,
    totalExperience: profileEach?.workInformation?.totalExperience,
    dateOfBirth: dateOnlyFormate(profileEach?.personalDetails?.dateOfBirth),
    age: profileEach?.personalDetails?.age,
    gender: profileEach?.personalDetails?.gender,
    maritalStatus: profileEach?.personalDetails?.maritalStatus,
    aboutMe: profileEach?.personalDetails?.aboutMe,
    workNumber: profileEach?.contactDetails?.workNumber,
    personalNumber: profileEach?.contactDetails?.personalNumber,
    presentAddress: profileEach?.contactDetails?.presentAddress,
    permanentAddress: profileEach?.contactDetails?.permanentAddress,
    emailAddress: profileEach?.contactDetails?.emailAddress,
    uan: profileEach?.identityInfo?.uan,
    pan: profileEach?.identityInfo?.pan,
    adhaar: profileEach?.identityInfo?.adhaar,
    addedBy: `${profileEach?.addedBy?.basicInformation?.employerId}-${profileEach?.addedBy?.basicInformation?.firstName} ${profileEach?.addedBy?.basicInformation?.lastName}`,
    createdAt: dateTimeFormate(profileEach?.createdAt),
    modifiedBy: `${profileEach?.ModifiedBy?.basicInformation?.employerId}-${profileEach?.ModifiedBy?.basicInformation?.firstName} ${profileEach?.ModifiedBy?.basicInformation?.lastName}`,
    updatedAt: dateTimeFormate(profileEach?.updatedAt),
  }));

  const columns = [
    {
      field: "photoURL",
      headerName: "",
      width: 60,
      renderCell: (params) => <Avatar src={profilePhoto} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "employerId",
      headerName: "Employee ID",
      width: 130,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      width: 130,
    },
    {
      field: "projectTeam",
      headerName: "Project Team",
      width: 130,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 130,
    },
    {
      field: "employmentType",
      headerName: "Employment Type",
      width: 130,
    },
    {
      field: "employeeStatus",
      headerName: "Employee Status",
      width: 130,
    },
  ];

  const handleChangeSelectSearch = (event) => {
    setSearchSelectedValue(event.target.value);
  };
  console.log(
    selectedSearchValue,
    profilesListSearch,
    searchInputVal,
    "selectedSearchValue"
  );

  const searchHandleChangeFun = (e) => {
    const newSearchInputVal = e.target.value;
    setSearchInputVal(e.target.value);

    if (!newSearchInputVal.trim()) {
      setProfilesListSearch([]);
      return;
    }

    const filteredProfiles = profilesList.filter((profile) => {
      if (selectedSearchValue === "Email") {
        return profile?.email
          ?.toLowerCase()
          .includes(newSearchInputVal?.toLowerCase());
      } else if (selectedSearchValue === "Employee ID") {
        return profile?.basicInformation?.employerId
          ?.toLowerCase()
          .includes(newSearchInputVal?.toLowerCase());
      } else if (selectedSearchValue === "Full Name") {
        const fullName = `${profile?.basicInformation?.firstName} ${profile?.basicInformation?.lastName}`;

        return fullName
          ?.toLowerCase()
          .includes(newSearchInputVal?.toLowerCase());
      }
    });
    setProfilesListSearch(filteredProfiles);
  };

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
          <div>
            {" "}
            <div className="cs_table_head_bg_create">
              <div className="cs_table_search_by_div">
                <h2 className="cs_table_head_Assets_head">Search By :</h2>
                <div className="">
                  <select
                    className="cs_table_select_search"
                    value={selectedSearchValue}
                    onChange={handleChangeSelectSearch}
                  >
                    <option value="Email">Email</option>
                    <option value="Employee ID">Employee ID</option>
                    <option value="Full Name">Full Name</option>
                  </select>
                </div>
                <div className="cs_table_search_input_div">
                  <svg
                    className="cs_table_search_input_icon"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                  <input
                    className="cs_table_search_input"
                    type="search"
                    placeholder="Search"
                    value={searchInputVal}
                    onChange={searchHandleChangeFun}
                  />
                </div>
              </div>
            </div>
            <Box>
              {" "}
              <Box
                // height="86vh"
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#ebebed",
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: "#ebebed",
                  },
                }}
              >
                <div style={{ height: "85vh", width: "100%" }}>
                  <DataGrid
                    rows={newProfilesList ?? []}
                    columns={columns}
                    hideFooterPagination={true}
                  />
                </div>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindEmployee;
