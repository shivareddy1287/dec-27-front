import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";

import { dateTimeFormate } from "../../../utils/DateFun/DateModify";
import Loader from "../../../utils/Loader/Loader";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Box, IconButton } from "@mui/material";
import TableReusable from "../../../utils/TableReusable/TableReusable";
import { allFetchActivePayrollAction } from "../../../redux/slices/payrollSlice/payrollSlice";

const GeneratePayslips = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state?.profile);
  const { Access, profilePhoto } = profile?.userAuth;
  useEffect(() => {
    dispatch(allFetchActivePayrollAction());
  }, [dispatch]);

  const payroll = useSelector((state) => state?.payroll);

  const { ActivePayrollList, loading, appErr, serverErr } = payroll;

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
                navigate(`/payroll/generate-payslips/view/${params.row.id}`)
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
                      `/payroll/generate-payslips/update/${params.row.id}`
                    )
                  }
                >
                  {" "}
                  <CreateIcon />
                </IconButton>
                <IconButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
                  </svg>
                </IconButton>
              </>
            )}
          </Box>
        );
      },
    },
    {
      field: "pfAccountNumber",
      headerName: "PF Account Number",
      width: 150,
    },
    {
      field: "bankAccountNumber",
      headerName: "Bank Account Number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "UAN",
      headerName: "UAN",
      width: 150,
    },

    {
      field: "ESINumber",
      headerName: "ESI Number",
      width: 150,
    },
    {
      field: "annualCtc",
      headerName: "Annual Ctc",
      width: 150,
    },
    {
      field: "basic",
      headerName: "Basic",
      width: 150,
    },
    {
      field: "houseRentAllowance",
      headerName: "House Rent Allowance",
      width: 150,
    },
    {
      field: "conveyanceAllowance",
      headerName: "Conveyance Allowance",
      width: 150,
    },
    {
      field: "fixedAllowance",
      headerName: "Fixed Allowance",
      width: 150,
    },
    {
      field: "bonus",
      headerName: "Bonus",
      width: 150,
    },
    {
      field: "telephoneReimbursement",
      headerName: "Telephone Reimbursement",
      width: 150,
    },
    {
      field: "fuelReimbursement",
      headerName: "Fuel Reimbursement",
      width: 150,
    },
    {
      field: "EmployeeProvidentFund",
      headerName: "Employee Provident Fund",
      width: 150,
    },
    {
      field: "HealthInsurance",
      headerName: "Health Insurance",
      width: 150,
    },
    {
      field: "IncomeTax",
      headerName: "Income Tax",
      width: 150,
    },
    {
      field: "statusPayroll",
      headerName: "Status Payroll",
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
  ];

  const accessMain = normalAdminAccessGivenFun(Access);
  // console.log(ActivePayrollList, "ActivePayrollList");

  const newPayrollList = ActivePayrollList?.map((payrollEach) => ({
    id: payrollEach?._id,
    Access: accessMain,
    userNames: `${payrollEach?.user?.basicInformation?.employerId}-${payrollEach?.user?.basicInformation?.firstName} ${payrollEach?.user?.basicInformation?.lastName}`,
    // accountInfo
    pfAccountNumber: payrollEach?.accountInfo?.pfAccountNumber,
    bankAccountNumber: payrollEach?.accountInfo?.bankAccountNumber,
    UAN: payrollEach?.accountInfo?.UAN,
    ESINumber: payrollEach?.accountInfo?.ESINumber,

    annualCtc: payrollEach?.annualCtc,
    // earnings
    basic: payrollEach?.earnings?.basic,
    houseRentAllowance: payrollEach?.earnings?.houseRentAllowance,
    conveyanceAllowance: payrollEach?.earnings?.conveyanceAllowance,
    fixedAllowance: payrollEach?.earnings?.fixedAllowance,
    bonus: payrollEach?.earnings?.bonus,
    // reimbursements
    telephoneReimbursement: payrollEach?.reimbursements?.telephoneReimbursement,
    fuelReimbursement: payrollEach?.reimbursements?.fuelReimbursement,
    // deductions
    EmployeeProvidentFund: payrollEach?.deductions?.EmployeeProvidentFund,
    HealthInsurance: payrollEach?.deductions?.HealthInsurance,
    IncomeTax: payrollEach?.deductions?.IncomeTax,
    statusPayroll: payrollEach?.statusPayroll,

    addedBy: payrollEach?.addedBy
      ? `${payrollEach?.addedBy?.basicInformation?.employerId}-${payrollEach?.addedBy?.basicInformation?.firstName} ${payrollEach?.addedBy?.basicInformation?.lastName}`
      : "",
    createdDates: dateTimeFormate(payrollEach?.createdAt),
    modifiedBy: payrollEach?.ModifiedBy
      ? `${payrollEach?.ModifiedBy?.basicInformation?.employerId}-${payrollEach?.ModifiedBy?.basicInformation?.firstName} ${payrollEach?.ModifiedBy?.basicInformation?.lastName}`
      : "",
    updatedDates: dateTimeFormate(payrollEach?.updatedAt),
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
              <h2 className="cs_table_head_Assets_head">Payroll</h2>
              {normalAdminAccessGivenFun(Access) && (
                // <button
                //   onClick={GeneratePayrollMonth}
                //   className="cs_table_add_asset_button"
                // >
                //   <span className="cs_asset_add_symbol">+</span> Generate
                //   Payslips
                // </button>
                <Link
                  className="cs_table_add_asset_button"
                  to={`/payroll/generate-payslips/generate`}
                >
                  <span className="cs_asset_add_symbol">+</span> Generate
                  Payslips
                </Link>
              )}
            </div>
            <TableReusable
              rows={newPayrollList ?? []}
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

export default GeneratePayslips;
