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

const OrgProfile = () => {
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
  let filteredProfileList = profilesList;
  if (!accessMain) {
    filteredProfileList = profilesList?.filter((each) => each.id === _id);
  }

  const newProfilesList = filteredProfileList?.map((profileEach) => ({
    id: profileEach?.id,
    Access: accessMain,
    employerId: profileEach?.basicInformation?.employerId,
    email: profileEach?.email,
    access: profileEach?.Access,
    projectTeam: profileEach?.ProjectTeam,
    firstName: profileEach?.basicInformation?.firstName,
    lastName: profileEach?.basicInformation?.lastName,
    managerDetails: profileEach?.managerDataId
      ? `${profileEach?.managerDataId?.basicInformation?.employerId}-${profileEach?.managerDataId?.basicInformation?.firstName} ${profileEach?.managerDataId?.basicInformation?.lastName}`
      : "",
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
    bloodGroup: profileEach?.personalDetails?.bloodGroup,
    workNumber: profileEach?.contactDetails?.workNumber,
    personalNumber: profileEach?.contactDetails?.personalNumber,
    presentAddress: profileEach?.contactDetails?.presentAddress,
    permanentAddress: profileEach?.contactDetails?.permanentAddress,
    emailAddress: profileEach?.contactDetails?.emailAddress,
    uan: profileEach?.identityInfo?.uan,
    pan: profileEach?.identityInfo?.pan,
    adhaar: profileEach?.identityInfo?.adhaar,
    addedBy: profileEach?.addedBy
      ? `${profileEach?.addedBy?.basicInformation?.employerId}-${profileEach?.addedBy?.basicInformation?.firstName} ${profileEach?.addedBy?.basicInformation?.lastName}`
      : "",
    createdAt: dateTimeFormate(profileEach?.createdAt),
    modifiedBy: profileEach?.ModifiedBy
      ? `${profileEach?.ModifiedBy?.basicInformation?.employerId}-${profileEach?.ModifiedBy?.basicInformation?.firstName} ${profileEach?.ModifiedBy?.basicInformation?.lastName}`
      : "",
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
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 130,
      renderCell: (params) => {
        return (
          <Box sx={{ m: 1, p: 2, postition: "relative" }}>
            <IconButton
              type="button"
              sx={{ p: 1 }}
              // onClick={() => console.log("view", params.row.id)}
              onClick={() =>
                navigate(`/organization/profile/view/${params.row.id}`)
              }
            >
              {" "}
              <VisibilityIcon />
            </IconButton>
            {params.row.Access && (
              <>
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={() =>
                    navigate(`/organization/profile/update/${params.row.id}`)
                  }
                >
                  {" "}
                  <CreateIcon />
                </IconButton>
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={() =>
                    navigate(`/organization/profile/delete/${params.row.id}`)
                  }
                >
                  {" "}
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        );
      },
    },
    {
      field: "employerId",
      headerName: "Employee ID",
      width: 130,
    },
    {
      field: "employeeStatus",
      headerName: "Employee Status",
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
      field: "managerDetails",
      headerName: "Manager",
      width: 180,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 130,
    },
    {
      field: "access",
      headerName: "Access",
      width: 130,
    },

    {
      field: "profileEditAccess",
      headerName: "Profile Edit Access",
      width: 130,
    },
    {
      field: "department",
      headerName: "Department",
      width: 130,
    },

    {
      field: "appRole",
      headerName: "App Role",
      width: 130,
    },
    {
      field: "employmentType",
      headerName: "Employment Type",
      width: 130,
    },

    {
      field: "sourceOfHire",
      headerName: "Source of Hire",
      width: 130,
    },
    {
      field: "dateOfJoining",
      headerName: "Date of Joining",
      width: 130,
    },
    {
      field: "currentExperience",
      headerName: "Current Experience",
      width: 130,
    },
    {
      field: "totalExperience",
      headerName: "Total Experience",
      width: 130,
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      width: 130,
    },
    {
      field: "age",
      headerName: "Age",
      width: 130,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 130,
    },
    {
      field: "maritalStatus",
      headerName: "Marital Status",
      width: 130,
    },
    {
      field: "bloodGroup",
      headerName: "Blood Group",
      width: 130,
    },
    {
      field: "workNumber",
      headerName: "Work Phone Number",
      width: 130,
    },
    {
      field: "personalNumber",
      headerName: "Personal Mobile Number",
      width: 130,
    },
    {
      field: "presentAddress",
      headerName: "Present Address",
      width: 130,
    },
    {
      field: "permanentAddress",
      headerName: "Permanent Address",
      width: 130,
    },
    {
      field: "emailAddress",
      headerName: "Personal Email Address",
      width: 130,
    },
    {
      field: "adhaar",
      headerName: "Aadhaar",
      width: 130,
    },
    {
      field: "pan",
      headerName: "PAN",
      width: 130,
    },
    {
      field: "uan",
      headerName: "UAN",
      width: 130,
    },
    {
      field: "addedBy",
      headerName: "Added By",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "Added Time",
      width: 140,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      width: 180,
    },
    {
      field: "updatedAt",
      headerName: "Modified Time",
      width: 140,
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
          <div>
            <div className="cs_table_head_bg_create">
              <h2 className="cs_table_head_Assets_head">Employees</h2>
              {normalAdminAccessGivenFun(Access) && (
                <Link
                  className="cs_table_add_asset_button"
                  to={`/organization/profile/create`}
                >
                  <span className="cs_asset_add_symbol">+</span> Add Employee
                </Link>
              )}
            </div>
            <TableReusable
              rows={newProfilesList ?? []}
              columns={columns}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    uan: false,
                    pan: false,
                    adhaar: false,
                    updatedAt: false,
                    emailAddress: false,
                    permanentAddress: false,
                    presentAddress: false,
                    personalNumber: false,
                    currentExperience: false,
                    totalExperience: false,
                    age: false,
                    gender: false,
                    maritalStatus: false,
                    bloodGroup: false,
                    sourceOfHire: false,
                    appRole: false,
                    employmentType: false,
                    workNumber: false,
                    employeeStatus: true,
                    department: false,
                    profileEditAccess: false,
                    addedBy: false,
                    createdAt: false,
                    modifiedBy: false,
                    updatedAt: false,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgProfile;
