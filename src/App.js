import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Teamm from "./components/LeaveTracker/Leaves/LeaveApplications/leaveApplications2";
import Holidays2 from "./components/LeaveTracker/Holidays/holidays2";

// components 1
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ListView from "./components/LeaveTracker/Leaves/ListView/ListView";
import ApplyLeave from "./components/LeaveTracker/Leaves/ApplyLeave/ApplyLeave";
// import Holidays from "./components/LeaveTracker/Holidays/holidays";
import AddHolidays from "./components/LeaveTracker/Holidays/addHolidays";
// import LeaveApplications from "./components/LeaveTracker/Leaves/LeaveApplications/LeaveApplications";
import LeaveRecord from "./components/LeaveTracker/Leaves/LeaveRecord/LeaveRecord";
import UpdateLeave from "./components/LeaveTracker/Leaves/updateLeave/UpdateLeave";

import CalenderView from "./components/LeaveTracker/Leaves/CalenderView/CalenderView";
import AddAddressProof from "./components/HrLetters/AddAddressProof";
import EducationalDocs from "./components/HrLetters/EducationalDocs.js";

import HolidayRecord from "./components/LeaveTracker/Holidays/holidayRecord";
import UpdateHoliday from "./components/LeaveTracker/Holidays/updateHoliday";

// Dashboard
import Dashboard from "./components/Home/Dashboard/Dashboard";

// Attendence
// import CheckInOut from "./components/Attendence/checkInOut";
import UcheckInOut from "./components/Attendence/UcheckInOut.js";

import Attendences from "./components/Attendence/Attendences";
import AttendenceDashboard from "./components/Attendence/AttendenceDashboard.js";

//test protected
// import Layout from "./components/layout/layout";

// imports 2
import LoginPage from "./components/LoginPage/LoginPage";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";

// single profile
import Profile from "./components/SelfService/Profile/Profile";
import UpdateProfile from "./components/SelfService/Profile/UpdateProfile";
import ViewDetails from "./components/SelfService/Profile/ViewDetails";

// Profile Asset
import Asset from "./components/SelfService/Asset/Asset";
import DeleteAsset from "./components/SelfService/Asset/DeleteAsset";
import UpdateAsset from "./components/SelfService/Asset/UpdateAsset";
import AddAsset from "./components/SelfService/Asset/AddAsset";
import ViewAsset from "./components/SelfService/Asset/ViewAsset";
// Profile Benefit
import Benefit from "./components/SelfService/Benefit/Benefit";
import AddBenefit from "./components/SelfService/Benefit/AddBenefit";
import DeleteBenefit from "./components/SelfService/Benefit/DeleteBenefit";
import ViewBenefit from "./components/SelfService/Benefit/ViewBenefit";
import UpdateBenefit from "./components/SelfService/Benefit/UpdateBenefit";

// Profile ExitDetails
import ExitDetails from "./components/SelfService/ExitDetails/ExitDetails";
import AddExitDetails from "./components/SelfService/ExitDetails/AddExitDetails";
import DeleteExitDetails from "./components/SelfService/ExitDetails/DeleteExitDetails";
import UpdateExitDetails from "./components/SelfService/ExitDetails/UpdateExitDetails";
import ViewExitDetails from "./components/SelfService/ExitDetails/ViewExitDetails";

//  self service team
import Team from "./components/SelfService/Team/Team";

// Organization OrgAddProfile
import OrgAddProfile from "./components/Organization/OrgProfile/OrgAddProfile";
import OrgUpdateProfile from "./components/Organization/OrgProfile/OrgUpdateProfile";
import OrgViewDetails from "./components/Organization/OrgProfile/OrgViewDetails";
import OrgProfile from "./components/Organization/OrgProfile/OrgProfile";
import OrgDeleteProfile from "./components/Organization/OrgProfile/OrgDeleteProfile";

// OrgExitDetails
import OrgExitDetails from "./components/Organization/OrgExitDetails/OrgExitDetails";
import OrgAddExitDetails from "./components/Organization/OrgExitDetails/OrgAddExitDetails";
import OrgDeleteExitDetails from "./components/Organization/OrgExitDetails/OrgDeleteExitDetails";
import OrgUpdateExitDetails from "./components/Organization/OrgExitDetails/OrgUpdateExitDetails";
import OrgViewExitDetails from "./components/Organization/OrgExitDetails/OrgViewExitDetails";

// OrgAsset
import OrgAsset from "./components/Organization/OrgAsset/OrgAsset";
import OrgAddAsset from "./components/Organization/OrgAsset/OrgAddAsset";
import OrgDeleteAsset from "./components/Organization/OrgAsset/OrgDeleteAsset";
import OrgUpdateAsset from "./components/Organization/OrgAsset/OrgUpdateAsset";
import OrgViewAsset from "./components/Organization/OrgAsset/OrgViewAsset";

// OrgAddBenefit
import OrgAddBenefit from "./components/Organization/OrgBenefit/OrgAddBenefit";
import OrgViewBenefit from "./components/Organization/OrgBenefit/OrgViewBenefit";
import OrgDeleteBenefit from "./components/Organization/OrgBenefit/OrgDeleteBenefit";
import OrgUpdateBenefit from "./components/Organization/OrgBenefit/OrgUpdateBenefit";
import OrgBenefit from "./components/Organization/OrgBenefit/OrgBenefit";

// Designation
import Designation from "./components/Organization/Designation/Designation";
import AddDesignation from "./components/Organization/Designation/AddDesignation";
import UpdateDesignation from "./components/Organization/Designation/UpdateDesignation";
import DeleteDesignation from "./components/Organization/Designation/DeleteDesignation";
import ViewDesignation from "./components/Organization/Designation/ViewDesignation";

// Department
import Department from "./components/Organization/Department/Department";
import AddDepartment from "./components/Organization/Department/AddDepartment";
import DeleteDepartment from "./components/Organization/Department/DeleteDepartment";
import ViewDepartment from "./components/Organization/Department/ViewDepartment";
import UpdateDepartment from "./components/Organization/Department/UpdateDepartment";

// NewHires
// NewHires
import NewHires from "./components/Organization/NewHires/NewHires";

// TasksGiven
// TasksGiven

import AddTasksGiven from "./components/TasksGiven/OrgTasks/AddTasksGiven";
import ViewTasksGiven from "./components/TasksGiven/OrgTasks/ViewTasksGiven";
import DeleteTasksGiven from "./components/TasksGiven/OrgTasks/DeleteTasksGiven";
import UpdateTasksGiven from "./components/TasksGiven/OrgTasks/UpdateTasksGiven";
import TasksGiven from "./components/TasksGiven/OrgTasks/TasksGiven";
import CreateTasks from "./components/TasksGiven/CreateTasks";

// my tasks
import MyTasks from "./components/TasksGiven/MyTasks/MyTasks";

// OrgProjectTeam
import OrgProjectTeam from "./components/Organization/OrgProjectTeam/OrgProjectTeam";
import OrgAddProjectTeam from "./components/Organization/OrgProjectTeam/OrgAddProjectTeam";
import OrgUpdateProjectTeam from "./components/Organization/OrgProjectTeam/OrgUpdateProjectTeam";
import OrgViewProjectTeam from "./components/Organization/OrgProjectTeam/OrgViewProjectTeam";
import OrgDeleteProjectTeam from "./components/Organization/OrgProjectTeam/OrgDeleteProjectTeam";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";
import ChangePassword from "./auth/changePassword";
import MyTaskAdd from "./components/TasksGiven/MyTasks/AddMyTask";
import MyTaskDelete from "./components/TasksGiven/MyTasks/DeleteMyTask";
import MyTaskUpdate from "./components/TasksGiven/MyTasks/UpdateMyTask";
import MyTaskView from "./components/TasksGiven/MyTasks/ViewMyTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FindEmployee from "./components/Organization/FindEmployee/FindEmployee";
import WithdrawSeparation from "./components/SelfService/ExitDetails/WithdrawSeparation";
import OrgApproveSeparation from "./components/Organization/OrgExitDetails/OrgApproveSeparation";
import ActiveInactiveRoute from "./components/Navigation/ProtectedRoutes/ActiveInactiveRoute.js";
import Payroll from "./components/Payroll/Payroll/Payroll.js";
import PayrollAdd from "./components/Payroll/Payroll/PayrollAdd.js";
import PayrollUpdate from "./components/Payroll/Payroll/PayrollUpdate.js";
import PayrollView from "./components/Payroll/Payroll/PayrollView.js";
import PayrollDelete from "./components/Payroll/Payroll/PayrollDelete.js";

// PaySlips
import PaySlips from "./components/Payroll/PaySlips/PaySlips.js";

// kalyani
import HomePage from "./components/HomePage/MainFile/mainFile";

// Generate Payslips
import GeneratePayslips from "./components/Payroll/GeneratePayslips/GeneratePayslips.js";
import GenPayrollView from "./components/Payroll/GeneratePayslips/GenPayrollView.js";
import GenPayrollUpdate from "./components/Payroll/GeneratePayslips/GenPayrollUpdate.js";
import GenerateConfirm from "./components/Payroll/GeneratePayslips/GenerateConfirm.js";
import PaySlipsView from "./components/Payroll/PaySlips/PaySlipsView.js";
import DemoPay from "./components/Payroll/PaySlips/DemoPay.js";

// const SideBarLayout = ({ children }) => (
//   <div>
//     <div style={{ height: "3.4em" }}>
//       {/* Navbar component */}
//       <Navbar />
//     </div>

//     <div style={{ display: "flex" }}>
//       {/* Sidebar component */}
//       <Sidebar />
//       <div className="bl-routes-path">{children}</div>
//     </div>
//   </div>
// );

// const NoSidebarNoNavbarLayout = ({ children }) => (
//   <div className="bl-routes-path">{children}</div>
// );

const SideBarLayout = ({ children }) => (
  <div>
    <div style={{ height: "50px" }}>
      <Navbar />
    </div>

    <div style={{ display: "flex" }}>
      {/* Sidebar component */}
      <Sidebar />
      <div className="bl-routes-path">{children}</div>
    </div>
  </div>
);

const NoSidebarNoNavbarLayout = ({ children }) => (
  <>
    <div style={{ height: "50px" }}>
      {/* Navbar component */}
      <Navbar />
    </div>

    <div className="bl-routes-pat">{children}</div>
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right" // Adjust the position as needed
        autoClose={2000} // Set autoClose to control how long the toast should be visible (in milliseconds)
        style={{ zIndex: "22200" }}
      />
      {/* <div style={{ height: "7vh" }}>
        <Navbar />
      </div> */}
      {/* <div style={{ display: "flex" }}> */}
      {/* <Sidebar /> */}
      {/* <div className="bl-routes-path"> */}

      <Routes>
        <Route
          path="/"
          element={
            <NoSidebarNoNavbarLayout>
              <HomePage />
            </NoSidebarNoNavbarLayout>
          }
        />

        <Route
          path="/home/dashboard"
          element={
            <SideBarLayout>
              <Dashboard />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/overview"
          element={
            <SideBarLayout>
              <ListView />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/my-calender"
          element={
            <SideBarLayout>
              <CalenderView />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/apply-leave"
          element={
            <SideBarLayout>
              <ApplyLeave />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/leave-applications"
          element={
            <SideBarLayout>
              <Teamm />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/leave-applications/:id"
          element={
            <SideBarLayout>
              <LeaveRecord />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/leave-applications/update/:id"
          element={
            <SideBarLayout>
              <UpdateLeave />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/holidays"
          element={
            <SideBarLayout>
              <Holidays2 />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/add-holiday"
          element={
            <SideBarLayout>
              <AddHolidays />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/holidays/:id"
          element={
            <SideBarLayout>
              <HolidayRecord />
            </SideBarLayout>
          }
        />
        <Route
          path="/leave-tracker/holidays/update/:id"
          element={
            <SideBarLayout>
              <UpdateHoliday />{" "}
            </SideBarLayout>
          }
        />
        {/* <PrivateProtectRoute
              path="/leave-tracker/add-holiday"
              element={<AddHolidays />}
            /> */}

        {/* <PrivateProtectRoute
              path="/leave-tracker/add-holiday"
              element={<AddHolidays />}
            /> */}
        <Route
          path="/documents/adress-proof"
          element={
            <SideBarLayout>
              <AddAddressProof />{" "}
            </SideBarLayout>
          }
        />
        <Route
          path="/documents/educational-documents"
          element={
            <SideBarLayout>
              <EducationalDocs />{" "}
            </SideBarLayout>
          }
        />

        {/* <Route
              path="/documents/bonafide-letter"
              element={<UsersDocuments />}
            /> */}
        {/* <Route
          path="/documents/bonafide-letter/:id"
          element={
            <SideBarLayout>
              
            </SideBarLayout>
          }
        /> */}

        <Route
          path="/attandence/checkin-out"
          element={
            <SideBarLayout>
              <UcheckInOut />{" "}
            </SideBarLayout>
          }
        />

        <Route
          path="/attandence/attendance"
          element={
            <SideBarLayout>
              <Attendences />{" "}
            </SideBarLayout>
          }
        />
        <Route
          path="/attandence/dashboard"
          element={
            <SideBarLayout>
              <AttendenceDashboard />{" "}
            </SideBarLayout>
          }
        />

        {/* 22 */}
        {/* Routes  2 */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetPassword/:resetToken" element={<Reset />} />
        {/* <Route path="/ChangePassword" element={<ChangePassword />} /> */}

        <Route
          path="/ChangePassword"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ChangePassword />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/profile"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <Profile />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* <Route
      path="/self-service/profile/:id"
      element={
        <PrivateProtectRoute>
          <Profile />
        </PrivateProtectRoute>
      }
    /> */}

        <Route
          path="/self-service/profile/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <UpdateProfile />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/profile/viewdetials/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ViewDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/team"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <Team />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/team/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <Profile />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <Asset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <AddAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <UpdateAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DeleteAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <ViewAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* Benefit */}
        <Route
          path="/self-service/benefit"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <Benefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <AddBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <UpdateBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DeleteBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <ViewBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* ExitDetails */}

        <Route
          path="/self-service/exitdetails"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <ExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <AddExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <UpdateExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DeleteExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <ViewExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* Designation */}
        <Route
          path="/organization/designation"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <Designation />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <AddDesignation />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <UpdateDesignation />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DeleteDesignation />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <ViewDesignation />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* Department */}

        <Route
          path="/organization/department"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <Department />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <AddDepartment />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <UpdateDepartment />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DeleteDepartment />{" "}
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <ViewDepartment />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* Organization */}
        {/* Organization Profile */}

        <Route
          path="/organization/profile"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgProfile />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgAddProfile />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgUpdateProfile />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgViewDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgDeleteProfile />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* Organization ExitDetails */}

        <Route
          path="/organization/exitdetails"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgAddExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgUpdateExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgViewExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgDeleteExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DeleteExitDetails />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/withdraw/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <WithdrawSeparation />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/approve/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgApproveSeparation />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* Organization Asset  */}

        <Route
          path="/organization/asset"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgAddAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgUpdateAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgViewAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgDeleteAsset />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgAddBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgUpdateBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgViewBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgDeleteBenefit />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* TasksGiven  */}

        <Route
          path="/tasks/tasks-given"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <TasksGiven />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <AddTasksGiven />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <UpdateTasksGiven />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <ViewTasksGiven />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DeleteTasksGiven />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* MyTasks */}

        <Route
          path="/tasks/my-tasks"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <MyTasks />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <MyTaskAdd />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <MyTaskUpdate />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <MyTaskView />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <MyTaskDelete />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/create-tasks"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <CreateTasks />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* Organization ProjectTeam  */}

        <Route
          path="/organization/team"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgProjectTeam />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgAddProjectTeam />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgUpdateProjectTeam />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgViewProjectTeam />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <OrgDeleteProjectTeam />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* NewHires
  NewHires */}

        <Route
          path="/organization/new-hires"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <NewHires />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* NewHires
  NewHires */}

        <Route
          path="/organization/find-employee"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <FindEmployee />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/find-employee"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <FindEmployee />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        {/* Payroll Payroll Payroll */}

        <Route
          path="/payroll/employees"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <Payroll />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/employees/create"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <PayrollAdd />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/employees/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <PayrollUpdate />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/employees/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <PayrollView />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/employees/delete/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <PayrollDelete />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* payslips */}
        <Route
          path="/payroll/payslips"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <PaySlips />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/payslips/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <PaySlipsView />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        {/* GeneratePayslips */}
        <Route
          path="/payroll/generate-payslips"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <GeneratePayslips />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/generate-payslips/generate"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <GenerateConfirm />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/generate-payslips/update/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <GenPayrollUpdate />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/payroll/generate-payslips/view/:id"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <GenPayrollView />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
        {/* demo  */}

        <Route
          path="/payroll/demo"
          element={
            <PrivateProtectRoute>
              <ActiveInactiveRoute>
                <SideBarLayout>
                  <DemoPay />
                </SideBarLayout>
              </ActiveInactiveRoute>
            </PrivateProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
