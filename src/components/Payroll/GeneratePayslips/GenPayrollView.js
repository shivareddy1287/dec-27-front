import React, { useEffect } from "react";

import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";

import Loader from "../../../utils/Loader/Loader";
import { fetchSinglepayrollAction } from "../../../redux/slices/payrollSlice/payrollSlice";

const GenPayrollView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSinglepayrollAction(id));
  }, [dispatch, id]);

  const payroll = useSelector((state) => state?.payroll);
  const { singlepayroll, ispayrolleUpdated, loading, appErr, serverErr } =
    payroll;
  // console.log(asset, loading, appErr, serverErr);
  const {
    user,
    accountInfo,
    annualCtc,
    earnings,
    reimbursements,
    deductions,
    statusPayroll,
  } = singlepayroll ? singlepayroll : "";
  const { pfAccountNumber, bankAccountNumber, UAN, ESINumber } = accountInfo
    ? accountInfo
    : "";
  const {
    basic,
    houseRentAllowance,
    conveyanceAllowance,
    fixedAllowance,
    bonus,
  } = earnings ? earnings : "";
  const { telephoneReimbursement, fuelReimbursement } = reimbursements
    ? reimbursements
    : "";
  const { EmployeeProvidentFund, HealthInsurance, IncomeTax } = deductions
    ? deductions
    : "";

  const profile = useSelector((state) => state?.profile);
  const { profileLoading, profileAppErr, profileServerErr } = profile;
  const { Access } = profile?.userAuth;

  if (ispayrolleUpdated || (!normalAdminAccessGivenFun(Access) && Access))
    return <Navigate to={`/payroll/employees`} />;

  return (
    <div>
      <div className="cs_div_profile">
        <div className="cs_left_back"></div>
        {profileLoading || loading ? (
          <Loader />
        ) : (
          <div className="cs_edit_div">
            <div>
              <Link
                to={`/payroll/generate-payslips`}
                className="cs_edit_employee_head_div"
              >
                <div>
                  <svg
                    className="cs_font_icons"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 320 512"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                </div>
                <div>
                  <h2 className="cs_edit_employee_head"> View Payroll</h2>
                </div>
              </Link>
            </div>
            <div className="cs_edit_form_div">
              <div>
                {serverErr || appErr ? (
                  <p>
                    {serverErr} {appErr}
                  </p>
                ) : null}
                {profileServerErr || profileAppErr ? (
                  <p>
                    {profileServerErr} {profileAppErr}
                  </p>
                ) : null}
                <h1 className="cs_edit_side_head">Account Information</h1>
                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    {" "}
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Employee ID:</h1>
                      <h1 className="cs_view_right_input">
                        {user?.basicInformation?.employerId}-
                        {user?.basicInformation?.firstName}{" "}
                        {user?.basicInformation?.lastName}{" "}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">PF Account Number:</h1>
                      <h1 className="cs_view_right_input">{pfAccountNumber}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Bank Account Number:
                      </h1>
                      <h1 className="cs_view_right_input">
                        {bankAccountNumber}
                      </h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">UAN:</h1>
                      <h1 className="cs_view_right_input">{UAN}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">ESINumber:</h1>
                      <h1 className="cs_view_right_input">{ESINumber}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Status Payroll:</h1>
                      <h1 className="cs_view_right_input">{statusPayroll}</h1>
                    </div>
                  </div>
                </div>
                <h1 className="cs_edit_side_head">Earnings</h1>

                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Annual Ctc:</h1>
                      <h1 className="cs_view_right_input">{annualCtc}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Basic:</h1>
                      <h1 className="cs_view_right_input">{basic}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        House Rent Allowance:
                      </h1>
                      <h1 className="cs_view_right_input">
                        {houseRentAllowance}
                      </h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Conveyance Allowance:
                      </h1>
                      <h1 className="cs_view_right_input">
                        {conveyanceAllowance}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Fixed Allowance:</h1>
                      <h1 className="cs_view_right_input">{fixedAllowance}</h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Bonus:</h1>
                      <h1 className="cs_view_right_input">{bonus}</h1>
                    </div>
                  </div>
                </div>
                <h1 className="cs_edit_side_head">Deductions</h1>

                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Employee Provident Fund:
                      </h1>
                      <h1 className="cs_view_right_input">
                        {EmployeeProvidentFund}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Health Insurance:</h1>
                      <h1 className="cs_view_right_input">{HealthInsurance}</h1>
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Income Tax:</h1>
                      <h1 className="cs_view_right_input">{IncomeTax}</h1>
                    </div>
                  </div>
                </div>
                <h1 className="cs_edit_side_head">Reimbursements</h1>

                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Telephone Reimbursement:
                      </h1>
                      <h1 className="cs_view_right_input">
                        {telephoneReimbursement}
                      </h1>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Fuel Reimbursement:
                      </h1>
                      <h1 className="cs_view_right_input">
                        {fuelReimbursement}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <Link to={`/payroll/generate-payslips`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenPayrollView;
