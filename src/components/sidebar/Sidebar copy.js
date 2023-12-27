import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineStock,
} from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";
import { BsCalendar2Date } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import { TfiFiles } from "react-icons/tfi";
import { PiSlidersHorizontal } from "react-icons/pi";

import { Link, NavLink, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setActiveMenu,
  setShowSideBar,
} from "../../redux/slices/Navbar/navbarSlices";

import "./sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const user = useSelector((state) => state?.profile);
  const { _id } = user?.userAuth ? user?.userAuth : "";
  // console.log(_id);

  const links = [
    {
      title: "Services",
      icon: <AiOutlineStock />,
      path: "services/line",
      links: [
        {
          name: "line",
          subPath: "services/line",
        },
        {
          name: "area",
          subPath: "services/area",
        },

        {
          name: "bar",
          subPath: "services/bar",
        },
        {
          name: "pie",
          subPath: "services/pie",
        },
        {
          name: "financial",
          subPath: "services/financial",
        },
        {
          name: "color-mapping",
          subPath: "services/color-mapping",
        },
        {
          name: "pyramid",
          subPath: "services/pyramid",
        },
        {
          name: "stacked",
          subPath: "services/stacked",
        },
      ],
    },
    {
      title: "Home",
      icon: <HiOutlineHome />,
      path: "home/dashboard",
      links: [
        {
          name: "dashboard",
          subPath: "home/dashboard",
        },
        {
          name: "feed",
          subPath: "home/feed",
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
          name: "Team",
          subPath: "self-service/team",
        },
        // {
        //   name: "calender",
        //   subPath: "self-service/calender",
        // },
        // {
        //   name: "Leave Tracker",
        //   subPath: "self-service/leave-tracker",
        // },
        // {
        //   name: "Files",
        //   subPath: "self-service/files",
        // },
        // {
        //   name: "Deligation",
        //   subPath: "self-service/deligation",
        // },
        {
          name: "Assets",
          subPath: "self-service/asset",
        },
        {
          name: "Benefit",
          subPath: "self-service/benefit",
        },
        {
          name: "Exit Details",
          subPath: "self-service/exitdetails",
        },
        // {
        //   name: "Travel Expences",
        //   subPath: "self-service/travel-expences",
        // },
        // {
        //   name: "Travel Request",
        //   subPath: "self-service/travel-request",
        // },
      ],
    },
    {
      title: "Leave Tracker",
      icon: <BsCalendar2Date />,
      path: "leave-tracker/list-view",
      links: [
        {
          name: "list View",
          subPath: "leave-tracker/list-view",
        },
        {
          name: "Calender View",
          subPath: "leave-tracker/calender-view",
        },

        {
          name: "apply leave",
          subPath: "leave-tracker/apply-leave",
        },
        {
          name: "Leave Applications",
          subPath: "leave-tracker/leave-applications",
        },

        {
          name: "holidays",
          subPath: "leave-tracker/holidays",
        },

        {
          name: "add holiday",
          subPath: "leave-tracker/add-holiday",
        },
      ],
    },
    {
      title: "Hr Letters",
      path: "hr-letters/adress-proof",
      icon: <AiOutlineStar />,
      links: [
        {
          name: "Adress Proof",
          subPath: "hr-letters/adress-proof",
        },
        {
          name: "Bonafide Letter",
          subPath: "hr-letters/bonafide-letter",
        },
      ],
    },
    {
      title: "Organization",
      path: "organization/profile",
      icon: <VscOrganization />,
      links: [
        {
          name: "Profile",
          subPath: "organization/profile",
        },
        {
          name: "Department",
          subPath: "organization/department",
        },
        {
          name: "Designation",
          subPath: "organization/designation",
        },
        {
          name: "Asset",
          subPath: "organization/asset",
        },

        {
          name: "Benefit",
          subPath: "organization/benefit",
        },
        {
          name: "Team",
          subPath: "organization/team",
        },
        {
          name: "Exit Details",
          subPath: "organization/exitdetails",
        },
        {
          name: "New Hires",
          subPath: "organization/new-hires",
        },
        {
          name: "All Profiles",
          subPath: "organization/all-profiles",
        },

        {
          name: "Organization Tree",
          subPath: "organization/tree-chart",
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
        {
          name: "Main tasks",
          subPath: "tasks/main-tasks",
        },
        {
          name: "Total tasks",
          subPath: "tasks/total-tasks",
        },
        {
          name: "Employees tasks",
          subPath: "tasks/tasks-given",
        },
      ],
    },
  ];
  // Now you have access to the path
  // console.log("Current Path:", path);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.activeMenu);
  const titleRoute = state.menu;
  const activeRightSidebar = state.showSideBar;
  // console.log(location.pathname.split("/")[1]);

  return (
    <div className="bl_sidebar">
      <div className="bl_sidebar-left">
        <div>
          {links.map((item) => {
            return (
              <>
                <NavLink
                  to={`${item.path}`}
                  key={item.title}
                  onClick={() => dispatch(setActiveMenu(item.title))}
                  className={({ isActive }) =>
                    isActive ||
                    location.pathname.startsWith(
                      `/${item.title.toLowerCase().replace(/\s+/g, "-")}`
                    )
                      ? "activeLink"
                      : "normalLink"
                  }
                >
                  <span className="bl_sidebar_link-icon">{item.icon} </span>
                  <span className="bl_sidebar_link-item">{item.title}</span>
                </NavLink>
              </>
            );
          })}
        </div>
        <div>
          <div className="bl_sidebar_bottom_icons">
            <NavLink
              to={`/reports`}
              key="Reports"
              onClick={() => dispatch(setActiveMenu("Reports"))}
              className={({ isActive }) =>
                isActive || location.pathname.startsWith("/reports")
                  ? "activeLink"
                  : "normalLink"
              }
            >
              <span className="bl_sidebar_link-icon">
                {" "}
                <AiOutlineStock />
              </span>
              <span className="bl_sidebar_link-item">Reports</span>
            </NavLink>

            <button
              className="bl_minimize-icon"
              onClick={() => dispatch(setShowSideBar(!activeRightSidebar))}
            >
              <PiSlidersHorizontal className="bl_minimize-icon_i" />
            </button>
          </div>
        </div>
      </div>
      {activeRightSidebar && (
        <div className="bl_slidebar-right">
          {links
            .filter(
              (item) =>
                item.title.toLowerCase().replace(/\s+/g, "-") ===
                location.pathname.split("/")[1]
            )
            .map((item) => (
              <div key={item.title}>
                {item.links.map((link) => {
                  // console.log(location.pathname);
                  return (
                    <NavLink
                      to={`${link.subPath}`}
                      key={link.subPath}
                      className={({ isActive }) =>
                        isActive ||
                        location.pathname.startsWith(`/${link.subPath}`)
                          ? "sub-activeLink"
                          : "sub-normalLink"
                      }
                    >
                      {link.name}
                    </NavLink>
                  );
                })}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
