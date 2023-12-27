import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import "./Designation.css";

import { allFetchDesignationAction } from "../../../redux/slices/designation/designationSlice";
import {
  normalAdminAccessGivenFun,
  restrictedAccessFun,
} from "../../../utils/restrictedAccess";
import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import { dateTimeFormate } from "../../../utils/DateFun/DateModify";

import { Avatar, Box, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import Loader from "../../../utils/Loader/Loader";

const Designation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allFetchDesignationAction());
  }, [dispatch]);
  const designation = useSelector((state) => state?.designation);
  const { DesignationList, loading, appErr, serverErr } = designation;

  const newDesignationList = DesignationList?.map((designation) => ({
    id: designation?.id,
    designationName: designation?.DesignationName,
    addedBy: `${designation?.addedBy?.basicInformation?.firstName} ${designation?.addedBy?.basicInformation?.lastName} ${designation?.addedBy?.basicInformation?.employerId}`,
    createdAt: dateTimeFormate(designation?.createdAt),
    modifiedBy: `${designation?.ModifiedBy?.basicInformation?.firstName} ${designation?.ModifiedBy?.basicInformation?.lastName} ${designation?.ModifiedBy?.basicInformation?.employerId}`,
    updatedAt: dateTimeFormate(designation?.updatedAt),
  }));

  const columns = [
    {
      field: "designationName",
      headerName: "Designation Name",
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
                navigate(`/organization/designation/view/${params.row.id}`)
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
                  navigate(`/organization/designation/update/${params.row.id}`)
                }
              >
                {" "}
                <CreateIcon />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: 1 }}
                onClick={() =>
                  navigate(`/organization/designation/delete/${params.row.id}`)
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
              <h2 className="cs_table_head_Assets_head">Designations</h2>
              <Link
                className="cs_table_add_asset_button"
                to={`/organization/designation/create`}
              >
                <span className="cs_asset_add_symbol">+</span> Add Designation
              </Link>
            </div>
            <TableReusable rows={newDesignationList ?? []} columns={columns} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Designation;
