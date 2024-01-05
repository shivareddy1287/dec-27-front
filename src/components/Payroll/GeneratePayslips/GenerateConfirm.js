import React, { useEffect } from "react";

import { useFormik } from "formik";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllProfileAction } from "../../../redux/slices/profileSlice/profileSlice";
import { normalAdminAccessGivenFun } from "../../../utils/restrictedAccess";

import Loader from "../../../utils/Loader/Loader";
import FormikDateYour from "../../../utils/DateFun/FormDateComp";
import { payrollMonthCreateAction } from "../../../redux/slices/payrollSlice/PayrollMonth/PayrollMonthSlice";
import { allFetchActivePayrollAction } from "../../../redux/slices/payrollSlice/payrollSlice";

const GenerateConfirm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProfileAction());
    dispatch(allFetchActivePayrollAction());
  }, [dispatch]);

  //   const payroll = useSelector((state) => state?.payroll);
  //   const { ispayrollAdded, loading, appErr, serverErr } = payroll;
  // console.log(asset, loading, appErr, serverErr);

  const payroll = useSelector((state) => state?.payroll);
  const { ActivePayrollList, loading, appErr, serverErr } = payroll;

  const payrollMonth = useSelector((state) => state?.payrollMonth);
  const { isPayrollMonthGenerated } = payrollMonth;

  // profile
  const user = useSelector((state) => state?.profile);
  const { profileLoading, profileAppErr, profileServerErr } = user;
  const { _id, Access } = user?.userAuth;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      month: "",
      year: "",
    },
    onSubmit: (values) => {
      console.log(values?.month, values?.year);

      const newActiveSubmitPayrollList = ActivePayrollList?.map(
        (payrollEach) => ({
          user: payrollEach?.user?._id,
          month: values?.month,
          year: values?.year,
          addedBy: _id,
          ModifiedBy: _id,
          // accountInfo
          accountInfo: {
            pfAccountNumber: payrollEach?.accountInfo?.pfAccountNumber,
            bankAccountNumber: payrollEach?.accountInfo?.bankAccountNumber,
            UAN: payrollEach?.accountInfo?.UAN,
            ESINumber: payrollEach?.accountInfo?.ESINumber,
          },

          annualCtc: payrollEach?.annualCtc,
          // earnings
          earnings: {
            basic: payrollEach?.earnings?.basic,
            houseRentAllowance: payrollEach?.earnings?.houseRentAllowance,
            conveyanceAllowance: payrollEach?.earnings?.conveyanceAllowance,
            fixedAllowance: payrollEach?.earnings?.fixedAllowance,
            bonus: payrollEach?.earnings?.bonus,
          },

          // reimbursements
          reimbursements: {
            telephoneReimbursement:
              payrollEach?.reimbursements?.telephoneReimbursement,
            fuelReimbursement: payrollEach?.reimbursements?.fuelReimbursement,
          },
          // deductions
          deductions: {
            EmployeeProvidentFund:
              payrollEach?.deductions?.EmployeeProvidentFund,
            HealthInsurance: payrollEach?.deductions?.HealthInsurance,
            IncomeTax: payrollEach?.deductions?.IncomeTax,
          },
          statusPayroll: payrollEach?.statusPayroll,
        })
      );

      console.log(newActiveSubmitPayrollList, "newActiveSubmitPayrollList");
      dispatch(payrollMonthCreateAction(newActiveSubmitPayrollList));
    },
  });

  if (isPayrollMonthGenerated || (!normalAdminAccessGivenFun(Access) && Access))
    return <Navigate to={`/payroll/generate-payslips`} />;

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
                  <h2 className="cs_edit_employee_head">Generate Payroll</h2>
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

                <h1 className="cs_edit_side_head">Month && Year</h1>
                <div className="cs_edit_left_input_right_input">
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Month:</h1>

                    {/* <FormikDateYour
                      name="month"
                      onChange={formik.setFieldValue}
                      type="text"
                      value={formik?.values?.month}
                    /> */}
                    <input
                      type="number"
                      className="cs_edit_right_input"
                      value={formik.values.month}
                      onChange={formik.handleChange("month")}
                    />
                  </div>
                  <div className="cs_edit_input_div">
                    <h1 className="cs_edit_left_input">Year:</h1>

                    {/* <FormikDateYour
                      name="year"
                      onChange={formik.setFieldValue}
                      type="text"
                      value={formik?.values?.year}
                    /> */}

                    <input
                      type="number"
                      className="cs_edit_right_input"
                      value={formik.values.year}
                      onChange={formik.handleChange("year")}
                    />
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
                <Link to={`/payroll/generate-payslips`}>
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

export default GenerateConfirm;
