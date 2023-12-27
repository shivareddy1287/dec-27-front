import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

import "./App.css";

import Teamm from "./components/LeaveTracker/Leaves/LeaveApplications/leaveApplications2";
import Holidays2 from "./components/LeaveTracker/Holidays/holidays2";

// components 1
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ListView from "./components/LeaveTracker/Leaves/ListView/ListView";
import ApplyLeave from "./components/LeaveTracker/Leaves/ApplyLeave/ApplyLeave";
import Holidays from "./components/LeaveTracker/Holidays/holidays";
import AddHolidays from "./components/LeaveTracker/Holidays/addHolidays";
import LeaveApplications from "./components/LeaveTracker/Leaves/LeaveApplications/LeaveApplications";
import LeaveRecord from "./components/LeaveTracker/Leaves/LeaveRecord/LeaveRecord";
import UpdateLeave from "./components/LeaveTracker/Leaves/updateLeave/UpdateLeave";

import CalenderView from "./components/LeaveTracker/Leaves/CalenderView/CalenderView";
import AddAddressProof from "./components/HrLetters/AddAddressProof";
import HolidayRecord from "./components/LeaveTracker/Holidays/holidayRecord";
import UpdateHoliday from "./components/LeaveTracker/Holidays/updateHoliday";

// Dashboard
import Dashboard from "./components/Home/Dashboard/Dashboard";

// Attendence
import CheckInOut from "./components/Attendence/checkInOut";
import Attendences from "./components/Attendence/Attendences";

//test protected
import Layout from "./components/layout/layout";

//imports 2

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

// kalyani
import HomePage from "./components/HomePage/MainFile/mainFile";

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
    <div style={{ height: "7vh" }}>
      {/* Navbar component */}
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
    <div style={{ height: "7vh" }}>
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
              <CheckInOut />{" "}
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
              <SideBarLayout>
                <UpdateProfile />
              </SideBarLayout>
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
              <SideBarLayout>
                <Team />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/team/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <Profile />
              </SideBarLayout>
              s
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <Asset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <AddAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <UpdateAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <DeleteAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />
        <Route
          path="/self-service/asset/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ViewAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* Benefit */}
        <Route
          path="/self-service/benefit"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <Benefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <AddBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <UpdateBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <DeleteBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/benefit/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ViewBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* ExitDetails */}

        <Route
          path="/self-service/exitdetails"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <AddExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <UpdateExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <DeleteExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/self-service/exitdetails/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ViewExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* Designation */}
        <Route
          path="/organization/designation"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <Designation />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <AddDesignation />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <UpdateDesignation />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <DeleteDesignation />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/designation/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ViewDesignation />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* Department */}

        <Route
          path="/organization/department"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <Department />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <AddDepartment />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <UpdateDepartment />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <DeleteDepartment />{" "}
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/department/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ViewDepartment />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* Organization */}
        {/* Organization Profile */}

        <Route
          path="/organization/profile"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgProfile />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgAddProfile />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgUpdateProfile />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgViewDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/profile/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgDeleteProfile />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* Organization ExitDetails */}

        <Route
          path="/organization/exitdetails"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgAddExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgUpdateExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgViewExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/exitdetails/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgDeleteExitDetails />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* Organization Asset  */}

        <Route
          path="/organization/asset"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgAddAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgUpdateAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgViewAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/asset/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgDeleteAsset />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgAddBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgUpdateBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgViewBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/benefit/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgDeleteBenefit />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* TasksGiven  */}

        <Route
          path="/tasks/tasks-given"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <TasksGiven />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <AddTasksGiven />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <UpdateTasksGiven />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <ViewTasksGiven />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/tasks-given/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <DeleteTasksGiven />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* MyTasks */}

        <Route
          path="/tasks/my-tasks"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <MyTasks />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <MyTaskAdd />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <MyTaskUpdate />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <MyTaskView />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/tasks/my-tasks/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <MyTaskDelete />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* Organization ProjectTeam  */}

        <Route
          path="/organization/team"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgProjectTeam />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/create"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgAddProjectTeam />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/update/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgUpdateProjectTeam />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/view/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgViewProjectTeam />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        <Route
          path="/organization/team/delete/:id"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <OrgDeleteProjectTeam />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* NewHires
          NewHires */}

        <Route
          path="/organization/new-hires"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <NewHires />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />

        {/* NewHires
          NewHires */}

        <Route
          path="/organization/find-employee"
          element={
            <PrivateProtectRoute>
              <SideBarLayout>
                <FindEmployee />
              </SideBarLayout>
            </PrivateProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
