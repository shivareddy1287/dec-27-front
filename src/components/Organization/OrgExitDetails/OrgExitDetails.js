import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import "./OrgExitDetails.css";

import { allFetchexitDetailsAction } from "../../../redux/slices/exitDetails/exitDetailsSlice";
import {
  normalAdminAccessGivenFun,
  restrictedAccessFun,
} from "../../../utils/restrictedAccess";
import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import {
  dateOnlyFormate,
  dateTimeFormate,
} from "../../../utils/DateFun/DateModify";

import { Avatar, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import Loader from "../../../utils/Loader/Loader";

const OrgExitDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state?.profile);

  const { _id, Access } = profile?.userAuth;
  useEffect(() => {
    dispatch(allFetchexitDetailsAction());
  }, [dispatch]);
  const exitDetails = useSelector((state) => state?.exitDetails);
  const { exitDetailsList, loading, appErr, serverErr } = exitDetails;

  const accessMain = normalAdminAccessGivenFun(Access);
  const newExitDetailsList = exitDetailsList?.map((exitDetailsEach) => ({
    id: exitDetailsEach?.id,
    Access: accessMain,
    userNames: `${exitDetailsEach?.user?.basicInformation?.firstName} ${exitDetailsEach?.user?.basicInformation?.lastName} ${exitDetailsEach?.user?.basicInformation?.employerId}`,
    interviewerNames: `${exitDetailsEach?.Interviewer?.basicInformation?.firstName} ${exitDetailsEach?.Interviewer?.basicInformation?.lastName} ${exitDetailsEach?.Interviewer?.basicInformation?.employerId}`,
    separationDate: dateOnlyFormate(exitDetailsEach?.separationDate),
    reasonForLeaving: exitDetailsEach?.ReasonForLeaving,
    workingForOrganizationAgain:
      exitDetailsEach?.WorkingforthisOrganizationAgain,
    organizationImprovementFeedback:
      exitDetailsEach?.Thinktheorganizationdotoimprovestaffwelfare,
    likedMostAboutOrganization:
      exitDetailsEach?.Whatdidyoulikethemostoftheorganization,
    additionalComments: exitDetailsEach?.Anythingyouwishtosharewithus,
    companyVehicleHandedIn: exitDetailsEach?.CompanyVehiclehandedin,
    libraryBooksSubmitted: exitDetailsEach?.Alllibrarybookssubmitted,
    exitInterviewConducted: exitDetailsEach?.Exitinterviewconducted,
    resignationLetterSubmitted: exitDetailsEach?.Resignationlettersubmitted,
    equipmentHandedIn: exitDetailsEach?.Allequipmentshandedin,
    security: exitDetailsEach?.Security,
    noticePeriodFollowed: exitDetailsEach?.Noticeperiodfollowed,
    managerSupervisorClearance: exitDetailsEach?.ManagerSupervisorclearance,
    addedBy: `${exitDetailsEach?.addedBy?.basicInformation?.firstName} ${exitDetailsEach?.addedBy?.basicInformation?.lastName} ${exitDetailsEach?.addedBy?.basicInformation?.employerId}`,
    createdAt: dateTimeFormate(exitDetailsEach?.createdAt),
    modifiedBy: `${exitDetailsEach?.ModifiedBy?.basicInformation?.firstName} ${exitDetailsEach?.ModifiedBy?.basicInformation?.lastName} ${exitDetailsEach?.ModifiedBy?.basicInformation?.employerId}`,
    updatedAt: dateTimeFormate(exitDetailsEach?.updatedAt),
  }));

  const columns = [
    {
      field: "photoURL",
      headerName: "",
      width: 60,
      renderCell: (params) => (
        <Avatar src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: "userNames",
      headerName: "Name",
      width: 180,
    },

    {
      field: "interviewerNames",
      headerName: "Interviewer",
      width: 180,
    },
    {
      field: "separationDate",
      headerName: "	Separation Date",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "reasonForLeaving",
      headerName: "Reason for leaving",
      width: 150,
    },
    {
      field: "workingForOrganizationAgain",
      headerName: "Working for this organization again",
      width: 150,
    },
    {
      field: "organizationImprovementFeedback",
      headerName: "Think the organization do to improve staff welfare",
      width: 150,
    },
    {
      field: "likedMostAboutOrganization",
      headerName: "What did you like the most of the organization",
      width: 150,
    },
    {
      field: "additionalComments",
      headerName: "Anything you wish to share with us",
      width: 150,
    },
    {
      field: "companyVehicleHandedIn",
      headerName: "Company Vehicle handed in",
      width: 150,
    },
    {
      field: "libraryBooksSubmitted",
      headerName: "All library books submitted",
      width: 150,
    },
    {
      field: "exitInterviewConducted",
      headerName: "Exit interview conducted",
      width: 150,
    },
    {
      field: "resignationLetterSubmitted",
      headerName: "Resignation letter submitted",
      width: 150,
    },
    {
      field: "equipmentHandedIn",
      headerName: "All equipments handed in",
      width: 150,
    },
    {
      field: "security",
      headerName: "Security",
      width: 150,
    },
    {
      field: "noticePeriodFollowed",
      headerName: "Notice period followed",
      width: 150,
    },
    {
      field: "managerSupervisorClearance",
      headerName: "Manager/Supervisor clearance",
      width: 150,
    },
    {
      field: "addedBy",
      headerName: "Added By",
      width: 180,
    },
    {
      field: "createdAt",
      headerName: "Added Time",
      width: 150,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      width: 180,
    },
    {
      field: "updatedAt",
      headerName: "Modified Time",
      width: 150,
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
                navigate(`/organization/exitdetails/view/${params.row.id}`)
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
                    navigate(
                      `/organization/exitdetails/update/${params.row.id}`
                    )
                  }
                >
                  {" "}
                  <CreateIcon />
                </IconButton>
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={() =>
                    navigate(
                      `/organization/exitdetails/delete/${params.row.id}`
                    )
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
              <h2 className="cs_table_head_Assets_head">Exit Details</h2>
              {normalAdminAccessGivenFun(Access) && (
                <Link
                  className="cs_table_add_asset_button"
                  to={`/organization/exitdetails/create`}
                >
                  <span className="cs_asset_add_symbol">+</span> Add Exit
                  Details
                </Link>
              )}
            </div>
            <TableReusable
              rows={newExitDetailsList ?? []}
              columns={columns}
              initialState={{
                columns: {
                  columnVisibilityModel: {
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

export default OrgExitDetails;
