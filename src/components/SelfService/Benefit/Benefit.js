import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import "./Benefit.css";
// import DateFormatter from "../../utils/DateFormatter";
import { allFetchbenefitAction } from "../../../redux/slices/benefitSlice/benefitSlice";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";

import { dateTimeFormate } from "../../../utils/DateFun/DateModify";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import { Avatar, Box, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Loader from "../../../utils/Loader/Loader";

const Benefit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state?.profile);
  const { _id, Access, profilePhoto } = profile?.userAuth;
  useEffect(() => {
    dispatch(allFetchbenefitAction(_id));
  }, [dispatch, _id]);
  const benefit = useSelector((state) => state?.benefit);
  const { benefitList, loading, appErr, serverErr } = benefit;

  const accessMain = normalAdminAccessGivenFun(Access);

  const newBenefitList = benefitList?.map((eachBenefit) => ({
    id: eachBenefit?.id,
    Access: accessMain,
    userNames: `${eachBenefit?.user?.basicInformation?.employerId}-${eachBenefit?.user?.basicInformation?.firstName} ${eachBenefit?.user?.basicInformation?.lastName}`,
    educationAllowance: eachBenefit?.educationAllowance,
    lunchBenefit: eachBenefit?.lunchBenfit,
    housingAllowance: eachBenefit?.housingAllowance,
    addedBy: eachBenefit?.addedBy
      ? `${eachBenefit?.addedBy?.basicInformation?.employerId}-${eachBenefit?.addedBy?.basicInformation?.firstName} ${eachBenefit?.addedBy?.basicInformation?.lastName}`
      : "",
    createdAt: dateTimeFormate(eachBenefit?.createdAt),
    modifiedBy: eachBenefit?.ModifiedBy
      ? `${eachBenefit?.ModifiedBy?.basicInformation?.employerId}-${eachBenefit?.ModifiedBy?.basicInformation?.firstName} ${eachBenefit?.ModifiedBy?.basicInformation?.lastName}`
      : "",
    updatedAt: dateTimeFormate(eachBenefit?.updatedAt),
  }));

  const columns = [
    {
      field: "photoURL",
      headerName: "",
      width: 60,
      renderCell: () => <Avatar src={profilePhoto} />,
      sortable: false,
      filterable: false,
    },
    {
      field: "userNames",
      headerName: "Name",
      width: 180,
    },

    {
      field: "educationAllowance",
      headerName: "Education Allowance",
      width: 150,
    },
    {
      field: "lunchBenefit",
      headerName: "Lunch Allowance",
      minWidth: 150,
    },
    {
      field: "housingAllowance",
      headerName: "Housing Allowance",
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
                navigate(`/self-service/benefit/view/${params.row.id}`)
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
                    navigate(`/self-service/benefit/update/${params.row.id}`)
                  }
                >
                  {" "}
                  <CreateIcon />
                </IconButton>
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={() =>
                    navigate(`/self-service/benefit/delete/${params.row.id}`)
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
              <h2 className="cs_table_head_Assets_head">Benefits</h2>
              {normalAdminAccessGivenFun(Access) && (
                <Link
                  className="cs_table_add_asset_button"
                  to={`/self-service/benefit/create`}
                >
                  <span className="cs_asset_add_symbol">+</span> Add Benefit
                </Link>
              )}
            </div>
            <TableReusable
              rows={newBenefitList ?? []}
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

export default Benefit;
