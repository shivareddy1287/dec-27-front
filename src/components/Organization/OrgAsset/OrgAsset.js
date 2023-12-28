import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allFetchAssetAction } from "../../../redux/slices/assetSlice/assetSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  normalAdminAccessGivenFun,
  restrictedAccessFun,
} from "../../../utils/restrictedAccess";
import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import {
  dateOnlyFormate,
  dateTimeFormate,
} from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Box, IconButton } from "@mui/material";
import TableReusable from "../../../utils/TableReusable/TableReusable";

const OrgAsset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state?.profile);
  const { _id, Access, profilePhoto } = profile?.userAuth;
  useEffect(() => {
    dispatch(allFetchAssetAction());
  }, [dispatch]);

  const asset = useSelector((state) => state?.asset);
  const { assetList, loading, appErr, serverErr } = asset;

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
      field: "userNames",
      headerName: "Name",
      width: 180,
    },
    {
      field: "assetTypes",
      headerName: "Type of Asset",
      width: 150,
    },
    {
      field: "assetDetails",
      headerName: "Asset Details",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "givenDates",
      headerName: "Given Date",
      width: 150,
    },

    {
      field: "returnDates",
      headerName: "Return Date",
      width: 150,
    },
    {
      field: "addedBy",
      headerName: "Added By",
      width: 180,
    },
    {
      field: "createdDates",
      headerName: "Added Time",
      width: 150,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      width: 180,
    },
    {
      field: "updatedDates",
      headerName: "Modified Time",
      width: 150,
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
                navigate(`/organization/asset/view/${params.row.id}`)
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
                    navigate(`/organization/asset/update/${params.row.id}`)
                  }
                >
                  {" "}
                  <CreateIcon />
                </IconButton>
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={() =>
                    navigate(`/organization/asset/delete/${params.row.id}`)
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

  const accessMain = normalAdminAccessGivenFun(Access);

  const newAssetList = assetList?.map((assetEach) => ({
    id: assetEach?._id,
    Access: accessMain,
    userNames: `${assetEach?.user?.basicInformation?.employerId}-${assetEach?.user?.basicInformation?.firstName} ${assetEach?.user?.basicInformation?.lastName}`,
    givenDates: dateOnlyFormate(assetEach?.givenDate),
    assetDetails: assetEach?.assetDetails,
    assetTypes: assetEach?.typeOfAsset,
    returnDates: dateOnlyFormate(assetEach?.returnDate),
    addedBy: assetEach?.addedBy
      ? `${assetEach?.addedBy?.basicInformation?.employerId}-${assetEach?.addedBy?.basicInformation?.firstName} ${assetEach?.addedBy?.basicInformation?.lastName}`
      : "",
    createdDates: dateTimeFormate(assetEach?.createdAt),
    modifiedBy: assetEach?.ModifiedBy
      ? `${assetEach?.ModifiedBy?.basicInformation?.employerId}-${assetEach?.ModifiedBy?.basicInformation?.firstName} ${assetEach?.ModifiedBy?.basicInformation?.lastName}`
      : "",
    updatedDates: dateTimeFormate(assetEach?.updatedAt),
  }));

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
              <h2 className="cs_table_head_Assets_head">Assets</h2>
              {normalAdminAccessGivenFun(Access) && (
                <Link
                  className="cs_table_add_asset_button"
                  to={`/organization/asset/create`}
                >
                  <span className="cs_asset_add_symbol">+</span> Add asset
                </Link>
              )}
            </div>
            <TableReusable
              rows={newAssetList ?? []}
              columns={columns}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    addedBy: false,
                    createdDates: false,
                    modifiedBy: false,
                    updatedDates: false,
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

export default OrgAsset;
