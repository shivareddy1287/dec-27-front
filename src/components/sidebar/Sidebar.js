import React, { useEffect } from "react";

import { HiOutlineHome, HiDocumentText } from "react-icons/hi";

import { RxAvatar } from "react-icons/rx";
import { BsCalendar2Date } from "react-icons/bs";

import { BiTask } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";

import { useDispatch, useSelector } from "react-redux";
import { setActiveMenu } from "../../redux/slices/Navbar/navbarSlices";

import "./sidebar.css";
import { Navigate, useNavigate } from "react-router-dom";
import { loginStatus } from "../../redux/slices/profileSlice/profileSlice";
import { normalAdminAccessGivenFun } from "../../utils/restrictedAccess";

const SidebarLink = ({ to, onClick, icon, title, isActive }) => (
  <div
    onClick={onClick}
    className={isActive ? "sub-activeLink" : "sub-normalLink"}
  >
    {icon && <span className="bl_sidebar_link-icon">{icon}</span>}
    <span className="bl_sidebar_link-item">{title}</span>
  </div>
);

const RightSidebarLink = ({ to, onClick, icon, title, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={isActive ? "sub-activeLink-right" : "sub-normalLinkright"}
    >
      {icon && <span className="bl_sidebar_link-icon-right">{icon}</span>}
      <span className="bl_sidebar_link-item-right">{title}</span>
    </div>
  );
};

const Sidebar = () => {
  const user = useSelector((state) => state?.profile);
  const { Access, workInformation } = user?.userAuth ? user?.userAuth : "";
  const { employeeStatus } = workInformation ? workInformation : "";
  let links = [];

  if (normalAdminAccessGivenFun(Access) && Access) {
    links = [
      {
        title: "Home",
        icon: <HiOutlineHome />,
        path: "home/dashboard",
        links: [
          {
            name: "Dashboard",
            subPath: "home/dashboard",
          },
          {
            name: "Updates",
            subPath: "home/Updates",
          },
        ],
      },

      {
        title: "Self Service",
        icon: <RxAvatar />,
        path: "self-service/profile",
        links: [
          {
            name: "Profile",
            subPath: `self-service/profile`,
          },
          {
            name: "Teams",
            subPath: "self-service/team",
          },

          {
            name: "Assets",
            subPath: "self-service/asset",
          },
          {
            name: "Benefits",
            subPath: "self-service/benefit",
          },
          {
            name: "Separation",
            subPath: "self-service/exitdetails",
          },
        ],
      },
      {
        title: "Leave Tracker",
        icon: <BsCalendar2Date />,
        path: "leave-tracker/overview",
        links: [
          {
            name: "Overview",
            subPath: "leave-tracker/overview",
          },
          {
            name: "My Calender",
            subPath: "leave-tracker/my-calender",
          },

          {
            name: "Apply leave",
            subPath: "leave-tracker/apply-leave",
          },
          {
            name: "Leave Applications",
            subPath: "leave-tracker/leave-applications",
          },

          {
            name: "Holidays",
            subPath: "leave-tracker/holidays",
          },

          {
            name: "Add holiday",
            subPath: "leave-tracker/add-holiday",
          },
        ],
      },
      {
        title: "Attandence",
        icon: <BsCalendar2Date />,
        path: "attandence/checkin-out",
        links: [
          {
            name: "CheckIn Out",
            subPath: "attandence/checkin-out",
          },
          {
            name: "Attendance",
            subPath: "attandence/attendance",
          },
        ],
      },

      {
        title: "Documents",
        path: "documents/adress-proof",
        icon: <HiDocumentText />,
        links: [
          {
            name: "Adress Proof",
            subPath: "documents/adress-proof",
          },
          {
            name: "Bonafide Letter",
            subPath: "documents/bonafide-letter",
          },
        ],
      },
      {
        title: "Organization",
        path: "organization/profile",
        icon: <VscOrganization />,
        links: [
          {
            name: "Employees",
            subPath: "organization/profile",
          },
          {
            name: "Departments",
            subPath: "organization/department",
          },
          {
            name: "Designations",
            subPath: "organization/designation",
          },
          {
            name: "Assets",
            subPath: "organization/asset",
          },

          {
            name: "Benefits",
            subPath: "organization/benefit",
          },
          {
            name: "Teams",
            subPath: "organization/team",
          },
          {
            name: "Separation",
            subPath: "organization/exitdetails",
          },
          {
            name: "New Joinees",
            subPath: "organization/new-hires",
          },
          {
            name: "Find Employee",
            subPath: "organization/find-employee",
          },
        ],
      },
      {
        title: "Tasks",
        path: "tasks/my-tasks",
        icon: <BiTask />,
        links: [
          {
            name: "Create Task",
            subPath: "tasks/create-tasks",
          },
          {
            name: "My Tasks",
            subPath: "tasks/my-tasks",
          },

          {
            name: "Employees tasks",
            subPath: "tasks/tasks-given",
          },
        ],
      },
      {
        title: "Payroll",
        path: "payroll/employees",
        icon: <BiTask />,
        links: [
          {
            name: "All Employees",
            subPath: "payroll/employees",
          },
          {
            name: "Generate Payslips",
            subPath: "payroll/generate-payslips",
          },
          {
            name: "Payslips",
            subPath: "payroll/payslips",
          },
        ],
      },
    ];
  } else if (employeeStatus !== "Active") {
    links = [
      {
        title: "Self Service",
        icon: <RxAvatar />,
        path: "self-service/profile",
        links: [
          {
            name: "Profile",
            subPath: `self-service/profile`,
          },
        ],
      },

      {
        title: "Documents",
        path: "documents/adress-proof",
        icon: <HiDocumentText />,
        links: [
          {
            name: "Adress Proof",
            subPath: "documents/adress-proof",
          },
          {
            name: "Bonafide Letter",
            subPath: "documents/bonafide-letter",
          },
        ],
      },
    ];
  } else {
    links = [
      {
        title: "Home",
        icon: <HiOutlineHome />,
        path: "home/dashboard",
        links: [
          {
            name: "Dashboard",
            subPath: "home/dashboard",
          },
          {
            name: "Updates",
            subPath: "home/Updates",
          },
        ],
      },

      {
        title: "Self Service",
        icon: <RxAvatar />,
        path: "self-service/profile",
        links: [
          {
            name: "Profile",
            subPath: `self-service/profile`,
          },
          {
            name: "Teams",
            subPath: "self-service/team",
          },

          {
            name: "Assets",
            subPath: "self-service/asset",
          },
          {
            name: "Benefits",
            subPath: "self-service/benefit",
          },
          {
            name: "Separation",
            subPath: "self-service/exitdetails",
          },
          {
            name: "Find Employee",
            subPath: "self-service/find-employee",
          },
        ],
      },
      {
        title: "Leave Tracker",
        icon: <BsCalendar2Date />,
        path: "leave-tracker/overview",
        links: [
          {
            name: "Overview",
            subPath: "leave-tracker/overview",
          },
          {
            name: "My Calender",
            subPath: "leave-tracker/my-calender",
          },

          {
            name: "Apply leave",
            subPath: "leave-tracker/apply-leave",
          },
          {
            name: "Leave Applications",
            subPath: "leave-tracker/leave-applications",
          },

          {
            name: "Holidays",
            subPath: "leave-tracker/holidays",
          },

          {
            name: "Add holiday",
            subPath: "leave-tracker/add-holiday",
          },
        ],
      },
      {
        title: "Attandence",
        icon: <BsCalendar2Date />,
        path: "attandence/checkin-out",
        links: [
          {
            name: "CheckIn Out",
            subPath: "attandence/checkin-out",
          },
          {
            name: "Attendance",
            subPath: "attandence/attendance",
          },
        ],
      },

      {
        title: "Documents",
        path: "documents/adress-proof",
        icon: <HiDocumentText />,
        links: [
          {
            name: "Adress Proof",
            subPath: "documents/adress-proof",
          },
          {
            name: "Bonafide Letter",
            subPath: "documents/bonafide-letter",
          },
        ],
      },
      {
        title: "Tasks",
        path: "tasks/my-tasks",
        icon: <BiTask />,
        links: [
          {
            name: "My Tasks",
            subPath: "tasks/my-tasks",
          },
        ],
      },
    ];
  }

  const dispatch = useDispatch();
  const state = useSelector((state) => state.activeMenu);

  const activeRightSidebar = state.showSideBar;

  const location = window.location.pathname;

  const navigate = useNavigate();

  const { userAuth } = user;

  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);
  // loginStatus();
  if (!userAuth) {
    localStorage.removeItem("userInfo");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bl_sidebar">
      <div className="bl_sidebar-left">
        <div>
          {links.map((item) => {
            // console.log(item);
            return (
              <SidebarLink
                key={item.title}
                to={`/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => {
                  dispatch(setActiveMenu(item.title));
                  navigate(`/${item.path.toLowerCase().replace(/\s+/g, "-")}`);
                }}
                icon={item.icon}
                title={item.title}
                isActive={location.startsWith(
                  `/${item.title.toLowerCase().replace(/\s+/g, "-")}`
                )}
              />
            );
          })}
        </div>
        <div>
          <div className="bl_sidebar_bottom_icons">
            {/* ... your other links */}
          </div>
        </div>
      </div>
      {activeRightSidebar && (
        <div className="bl_slidebar-right">
          {links
            .filter(
              (item) =>
                item.title.toLowerCase().replace(/\s+/g, "-") ===
                location.split("/")[1]
            )
            .map((item) => (
              <div key={item.title}>
                {item.links.map((link) => (
                  <RightSidebarLink
                    key={link.subPath}
                    // to={`/${link.subPath}`}
                    onClick={() => navigate(`/${link.subPath}`)}
                    isActive={location.startsWith(`/${link.subPath}`)}
                    title={link.name}
                  />
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
