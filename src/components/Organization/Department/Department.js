import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import "./Department.css";

import { allFetchDepartmentAction } from "../../../redux/slices/department/departmentSlice";
import { dateTimeFormate } from "../../../utils/DateFun/DateModify";

import { Box, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import Loader from "../../../utils/Loader/Loader";

const Department = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allFetchDepartmentAction());
  }, [dispatch]);
  const department = useSelector((state) => state?.department);
  const { DepartmentList, loading, appErr, serverErr } = department;

  const newDepartmentList = DepartmentList?.map((department) => ({
    id: department?.id,
    departmentName: department?.DepartmentName,
    addedBy: department?.addedBy
      ? `${department?.addedBy?.basicInformation?.employerId}-${department?.addedBy?.basicInformation?.firstName} ${department?.addedBy?.basicInformation?.lastName}`
      : "",
    createdAt: dateTimeFormate(department?.createdAt),
    modifiedBy: department?.ModifiedBy
      ? `${department?.ModifiedBy?.basicInformation?.employerId}-${department?.ModifiedBy?.basicInformation?.firstName} ${department?.ModifiedBy?.basicInformation?.lastName}`
      : "",
    updatedAt: dateTimeFormate(department?.updatedAt),
  }));

  const columns = [
    {
      field: "departmentName",
      headerName: "Department Name",
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
                navigate(`/organization/department/view/${params.row.id}`)
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
                  navigate(`/organization/department/update/${params.row.id}`)
                }
              >
                {" "}
                <CreateIcon />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: 1 }}
                onClick={() =>
                  navigate(`/organization/department/delete/${params.row.id}`)
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
              <h2 className="cs_table_head_Assets_head">Departments</h2>
              <Link
                className="cs_table_add_asset_button"
                to={`/organization/department/create`}
              >
                <span className="cs_asset_add_symbol">+</span> Add Department
              </Link>
            </div>
            <TableReusable rows={newDepartmentList ?? []} columns={columns} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Department;
