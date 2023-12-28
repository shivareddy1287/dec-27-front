import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import "./Team.css";

import { allFetchTeamAction } from "../../../redux/slices/team/teamSlice";

import { dateTimeFormate } from "../../../utils/DateFun/DateModify";

import { Box, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import Loader from "../../../utils/Loader/Loader";

const OrgProjectTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allFetchTeamAction());
  }, [dispatch]);
  const team = useSelector((state) => state?.team);
  const { TeamList, loading, appErr, serverErr } = team;

  const newTeamList = TeamList?.map((team) => ({
    id: team?.id,
    teamName: team?.TeamName,
    addedBy: team?.addedBy
      ? `${team?.addedBy?.basicInformation?.employerId}-${team?.addedBy?.basicInformation?.firstName} ${team?.addedBy?.basicInformation?.lastName}`
      : "",
    createdAt: dateTimeFormate(team?.createdAt),
    modifiedBy: team?.ModifiedBy
      ? `${team?.ModifiedBy?.basicInformation?.employerId}-${team?.ModifiedBy?.basicInformation?.firstName} ${team?.ModifiedBy?.basicInformation?.lastName}`
      : "",
    updatedAt: dateTimeFormate(team?.updatedAt),
  }));

  const columns = [
    {
      field: "teamName",
      headerName: "Team Name",
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
                navigate(`/organization/team/view/${params.row.id}`)
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
                  navigate(`/organization/team/update/${params.row.id}`)
                }
              >
                {" "}
                <CreateIcon />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: 1 }}
                onClick={() =>
                  navigate(`/organization/team/delete/${params.row.id}`)
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
          <div>
            <div className="cs_table_head_bg_create">
              <h2 className="cs_table_head_Assets_head">Teams</h2>
              <Link
                className="cs_table_add_asset_button"
                to={`/organization/team/create`}
              >
                <span className="cs_asset_add_symbol">+</span> Add Team
              </Link>
            </div>
            <TableReusable rows={newTeamList ?? []} columns={columns} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrgProjectTeam;
