// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { allFetchAssetAction } from "../../../redux/slices/assetSlice/assetSlice";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   normalAdminAccessGivenFun,
//   restrictedAccessFun,
// } from "../../../utils/restrictedAccess";
// import {
//   fetchAllProfileAction,
//   loginStatus,
// } from "../../../redux/slices/profileSlice/profileSlice";
// import {
//   dateOnlyFormate,
//   dateTimeFormate,
// } from "../../../utils/DateFun/DateModify";
// import Loader from "../../../utils/Loader/Loader";

// const Asset = () => {
//   const dispatch = useDispatch();

//   const profile = useSelector((state) => state?.profile);
//   const { _id, Access } = profile?.userAuth;

//   useEffect(() => {
//     dispatch(allFetchAssetAction(_id));
//   }, [dispatch, _id]);

//   const asset = useSelector((state) => state?.asset);
//   const { assetList, loading, appErr, serverErr } = asset;
//   console.log(assetList, "assetList09000000000000000000000000000000000000");

//   return (
//     <div>
//       <div className="cs_div_profile">
//         {loading ? (
//           <Loader />
//         ) : (
//           <div className="cs_content_img_div_profile">
//             {" "}
//             {serverErr || appErr ? (
//               <p>
//                 {serverErr} {appErr}
//               </p>
//             ) : null}
//             {normalAdminAccessGivenFun(Access) && (
//               <div className="cs_asset_bg_div">
//                 <div className="cs_aaset_add_div">
//                   <h1 className="cs_asset_head_main">Asset</h1>

//                   <Link
//                     className="cs_asset_add_asset_button"
//                     to={`/self-service/asset/create`}
//                   >
//                     <span className="cs_asset_add_symbol">+</span> Add asset
//                   </Link>
//                 </div>
//                 <div className="cs_asset_table">
//                   {" "}
//                   <table>
//                     <thead>
//                       <tr>
//                         {" "}
//                         <th>Edit</th>
//                         <th>Delete</th>
//                         <th>View</th>
//                         <th>Name</th>
//                         <th>Given Date</th>
//                         <th>Asset Details</th>
//                         <th>Type of Asset</th>
//                         <th>Return Date</th>
//                         <th>Added By</th>
//                         <th>Added Time</th>
//                         <th>Modified By</th>
//                         <th>Modified Time</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assetList?.map((assetEach) => (
//                         <tr key={assetEach?.id}>
//                           <td>
//                             <Link
//                               className="cs_div_edit_icons_all"
//                               to={`/self-service/asset/update/${assetEach?.id}`}
//                             >
//                               <svg
//                                 className="cs_all_edit_icons_project"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 512 512"
//                               >
//                                 <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
//                               </svg>
//                             </Link>
//                           </td>
//                           <td>
//                             <Link
//                               className="cs_div_edit_icons_all"
//                               to={`/self-service/asset/delete/${assetEach?.id}`}
//                             >
//                               <svg
//                                 className="cs_all_edit_icons_project"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 448 512"
//                               >
//                                 <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
//                               </svg>
//                             </Link>
//                           </td>
//                           <td>
//                             <Link
//                               className="cs_div_edit_icons_all"
//                               to={`/self-service/asset/view/${assetEach?.id}`}
//                             >
//                               <svg
//                                 className="cs_all_edit_icons_project"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 576 512"
//                               >
//                                 <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
//                               </svg>
//                             </Link>
//                           </td>
//                           <td>
//                             {`${assetEach?.user?.basicInformation?.firstName} ${assetEach?.user?.basicInformation?.lastName} ${assetEach?.user?.basicInformation?.employerId}`}
//                           </td>
//                           <td>{dateOnlyFormate(assetEach?.givenDate)}</td>
//                           <td>{assetEach?.assetDetails}</td>
//                           <td>{assetEach?.typeOfAsset}</td>
//                           <td>{dateOnlyFormate(assetEach?.returnDate)}</td>
//                           <td>
//                             {`${assetEach?.addedBy?.basicInformation?.firstName} ${assetEach?.addedBy?.basicInformation?.lastName} ${assetEach?.addedBy?.basicInformation?.employerId}`}
//                           </td>
//                           <td>{dateTimeFormate(assetEach?.createdAt)} </td>
//                           <td>
//                             {`${assetEach?.ModifiedBy?.basicInformation?.firstName} ${assetEach?.ModifiedBy?.basicInformation?.lastName} ${assetEach?.ModifiedBy?.basicInformation?.employerId}`}
//                           </td>
//                           <td>{dateTimeFormate(assetEach?.updatedAt)} </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//             {!normalAdminAccessGivenFun(Access) && (
//               <div className="cs_asset_bg_div">
//                 <div className="cs_aaset_add_div">
//                   <h1 className="cs_asset_head_main">Asset</h1>
//                 </div>
//                 <div className="cs_asset_table">
//                   {" "}
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>View</th>
//                         <th>Name</th>
//                         <th>Given Date</th>
//                         <th>Asset Details</th>
//                         <th>Type of Asset</th>
//                         <th>Return Date</th>
//                         <th>Added By</th>
//                         <th>Added Time</th>
//                         <th>Modified By</th>
//                         <th>Modified Time</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assetList?.map((assetEach) => (
//                         <tr key={assetEach?.id}>
//                           {" "}
//                           <td>
//                             <Link
//                               className="cs_div_edit_icons_all"
//                               to={`/self-service/asset/view/${assetEach?.id}`}
//                             >
//                               <svg
//                                 className="cs_all_edit_icons_project"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 height="1em"
//                                 viewBox="0 0 576 512"
//                               >
//                                 <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
//                               </svg>
//                             </Link>
//                           </td>
//                           <td>
//                             {`${assetEach?.user?.basicInformation?.firstName} ${assetEach?.user?.basicInformation?.lastName} ${assetEach?.user?.basicInformation?.employerId}`}
//                           </td>
//                           <td>{dateOnlyFormate(assetEach?.givenDate)}</td>
//                           <td>{assetEach?.assetDetails}</td>
//                           <td>{assetEach?.typeOfAsset}</td>
//                           <td>{dateOnlyFormate(assetEach?.returnDate)}</td>
//                           <td>
//                             {`${assetEach?.addedBy?.basicInformation?.firstName} ${assetEach?.addedBy?.basicInformation?.lastName} ${assetEach?.addedBy?.basicInformation?.employerId}`}
//                           </td>
//                           <td>{dateTimeFormate(assetEach?.createdAt)} </td>
//                           <td>
//                             {`${assetEach?.ModifiedBy?.basicInformation?.firstName} ${assetEach?.ModifiedBy?.basicInformation?.lastName} ${assetEach?.ModifiedBy?.basicInformation?.employerId}`}
//                           </td>
//                           <td>{dateTimeFormate(assetEach?.updatedAt)}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Asset;

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allFetchAssetAction } from "../../../redux/slices/assetSlice/assetSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  normalAdminAccessGivenFun,
  restrictedAccessFun,
} from "../../../utils/restrictedAccess";

import {
  dateOnlyFormate,
  dateTimeFormate,
} from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Asset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state?.profile);
  const { _id, Access } = profile?.userAuth;

  useEffect(() => {
    dispatch(allFetchAssetAction(_id));
  }, [dispatch, _id]);

  const asset = useSelector((state) => state?.asset);
  const { assetList, loading, appErr, serverErr } = asset;
  const accessMain = normalAdminAccessGivenFun(Access);

  const newAssetList = assetList?.map((assetEach) => ({
    id: assetEach?._id,
    Access: accessMain,
    userNames: `${assetEach?.user?.basicInformation?.firstName} ${assetEach?.user?.basicInformation?.lastName} ${assetEach?.user?.basicInformation?.employerId}`,
    givenDates: dateOnlyFormate(assetEach?.givenDate),
    assetDetails: assetEach?.assetDetails,
    assetTypes: assetEach?.typeOfAsset,
    returnDates: dateOnlyFormate(assetEach?.returnDate),
    addedBy: `${assetEach?.addedBy?.basicInformation?.firstName} ${assetEach?.addedBy?.basicInformation?.lastName} ${assetEach?.addedBy?.basicInformation?.employerId}`,
    createdDates: dateTimeFormate(assetEach?.createdAt),
    modifiedBy: `${assetEach?.ModifiedBy?.basicInformation?.firstName} ${assetEach?.ModifiedBy?.basicInformation?.lastName} ${assetEach?.ModifiedBy?.basicInformation?.employerId}`,
    updatedDates: dateTimeFormate(assetEach?.updatedAt),
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
      field: "givenDates",
      headerName: "Given Date",
      width: 140,
    },
    {
      field: "assetDetails",
      headerName: "Asset Details",
      minWidth: 140,
      flex: 1,
    },
    {
      field: "assetTypes",
      headerName: "Type of Asset",
      width: 140,
    },
    {
      field: "returnDates",
      headerName: "Return Date",
      width: 140,
    },
    {
      field: "addedBy",
      headerName: "Added By",
      width: 180,
    },
    {
      field: "createdDates",
      headerName: "Added Time",
      width: 140,
    },
    {
      field: "modifiedBy",
      headerName: "Modified By",
      width: 180,
    },
    {
      field: "updatedDates",
      headerName: "Modified Time",
      width: 140,
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
                navigate(`/self-service/asset/view/${params.row.id}`)
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
                    navigate(`/self-service/asset/update/${params.row.id}`)
                  }
                >
                  {" "}
                  <CreateIcon />
                </IconButton>
                <IconButton
                  type="button"
                  sx={{ p: 1 }}
                  onClick={() =>
                    navigate(`/self-service/asset/delete/${params.row.id}`)
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

  console.log(newAssetList);

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
                  to={`/self-service/asset/create`}
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

export default Asset;
