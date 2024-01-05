import React, { useEffect } from "react";

import { useFormik } from "formik";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";

import Loader from "../../../utils/Loader/Loader";
import {
  fetchSinglepayrollAction,
  updatepayrollAction,
} from "../../../redux/slices/payrollSlice/payrollSlice";

const PayrollUpdate = () => {
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
  const { _id, Access } = profile?.userAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user: user?._id,
      accountInfo: {
        pfAccountNumber,
        bankAccountNumber,
        UAN,
        ESINumber,
      },
      annualCtc,
      earnings: {
        basic,
        houseRentAllowance,
        conveyanceAllowance,
        fixedAllowance,
        bonus,
      },
      reimbursements: {
        telephoneReimbursement,
        fuelReimbursement,
      },
      deductions: {
        EmployeeProvidentFund,
        HealthInsurance,
        IncomeTax,
      },
      statusPayroll,
      addedBy: _id,
      ModifiedBy: _id,
    },
    onSubmit: (values) => {
      dispatch(updatepayrollAction({ id, values }));
      console.log(values);
    },
  });

  if (ispayrolleUpdated || (!normalAdminAccessGivenFun(Access) && Access))
    return <Navigate to={`/payroll/employees`} />;

  return (
    <div>
      <div className="cs_div_profile">
        <div className="cs_left_back"></div>
        {profileLoading || loading ? (
          <Loader />
        ) : (
          <form onSubmit={formik.handleSubmit} className="cs_edit_div">
            <div>
              <Link
                to={`/payroll/employees`}
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
                  <h2 className="cs_edit_employee_head"> Edit Payroll</h2>
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
                      <select
                        className="cs_select_option_all"
                        value={formik.values.user}
                        onChange={formik.handleChange("user")}
                      >
                        <option value={`${user?._id}`}>
                          {user?.basicInformation?.employerId}-
                          {user?.basicInformation?.firstName}{" "}
                          {user?.basicInformation?.lastName}{" "}
                        </option>
                      </select>
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">PF Account Number:</h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.accountInfo.pfAccountNumber}
                        onChange={formik.handleChange(
                          "accountInfo.pfAccountNumber"
                        )}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Bank Account Number:
                      </h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.accountInfo.bankAccountNumber}
                        onChange={formik.handleChange(
                          "accountInfo.bankAccountNumber"
                        )}
                      />
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">UAN:</h1>

                      <input
                        className="cs_edit_right_input"
                        value={formik.values.accountInfo.UAN}
                        onChange={formik.handleChange("accountInfo.UAN")}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">ESINumber:</h1>

                      <input
                        className="cs_edit_right_input"
                        value={formik.values.accountInfo.ESINumber}
                        onChange={formik.handleChange("accountInfo.ESINumber")}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Status Payroll:</h1>

                      <select
                        className="cs_select_option_all"
                        value={formik.values.statusPayroll}
                        onChange={formik.handleChange("statusPayroll")}
                      >
                        <option value="Inactive">Inactive</option>
                        <option value="Active">Active</option>
                      </select>
                    </div>
                  </div>
                </div>
                <h1 className="cs_edit_side_head">Earnings</h1>

                <div className="cs_edit_left_right_div">
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Annual Ctc:</h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.annualCtc}
                        onChange={formik.handleChange("annualCtc")}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Basic:</h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.earnings.basic}
                        onChange={formik.handleChange("earnings.basic")}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        House Rent Allowance:
                      </h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.earnings.houseRentAllowance}
                        onChange={formik.handleChange(
                          "earnings.houseRentAllowance"
                        )}
                      />
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Conveyance Allowance:
                      </h1>

                      <input
                        className="cs_edit_right_input"
                        value={formik.values.earnings.conveyanceAllowance}
                        onChange={formik.handleChange(
                          "earnings.conveyanceAllowance"
                        )}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Fixed Allowance:</h1>

                      <input
                        className="cs_edit_right_input"
                        value={formik.values.earnings.fixedAllowance}
                        onChange={formik.handleChange(
                          "earnings.fixedAllowance"
                        )}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Bonus:</h1>

                      <input
                        className="cs_edit_right_input"
                        value={formik.values.earnings.bonus}
                        onChange={formik.handleChange("earnings.bonus")}
                      />
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
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.deductions.EmployeeProvidentFund}
                        onChange={formik.handleChange(
                          "deductions.EmployeeProvidentFund"
                        )}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Health Insurance:</h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.deductions.HealthInsurance}
                        onChange={formik.handleChange(
                          "deductions.HealthInsurance"
                        )}
                      />
                    </div>
                  </div>
                  <div className="cs_edit_left_input_right_input">
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">Income Tax:</h1>

                      <input
                        className="cs_edit_right_input"
                        value={formik.values.deductions.IncomeTax}
                        onChange={formik.handleChange("deductions.IncomeTax")}
                      />
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
                      <input
                        className="cs_edit_right_input"
                        value={
                          formik.values.reimbursements.telephoneReimbursement
                        }
                        onChange={formik.handleChange(
                          "reimbursements.telephoneReimbursement"
                        )}
                      />
                    </div>
                    <div className="cs_edit_input_div">
                      <h1 className="cs_edit_left_input">
                        Fuel Reimbursement:
                      </h1>
                      <input
                        className="cs_edit_right_input"
                        value={formik.values.reimbursements.fuelReimbursement}
                        onChange={formik.handleChange(
                          "reimbursements.fuelReimbursement"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cs_edit_submit_cancel_div">
              <div>
                <button className="cs_edit_submit_button" type="submit">
                  Submit
                </button>
              </div>

              <div>
                <Link to={`/payroll/employees`}>
                  <button className="cs_view_button_close">Close</button>
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PayrollUpdate;
