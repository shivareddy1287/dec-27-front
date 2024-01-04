import React, { useEffect, useRef, useState } from "react";

import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { FcLeave } from "react-icons/fc";

// import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import "./navbar.css";
import {
  fetchNotificationsAction,
  updateNoticationsSeen,
} from "../../redux/slices/notifications/notificationSlices";
import { useDispatch, useSelector } from "react-redux";

// logout

// Images
import { logout } from "../../redux/slices/profileSlice/profileSlice";

import logo3 from "../../Assets/logos/logo3.png";
import { useOnClickOutside } from "../../utils/onClickOutSide";
import { useNavigate } from "react-router-dom";

const NavButton = ({
  customFunc,
  icon,
  color,
  dotColor,
  notifiactionLength,
}) => (
  <>
    {/* <TooltipComponent content={title}> */}
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="bl_navbar_btn"
    >
      <span
        style={{
          background: dotColor,
          caretColor: "transparent",
          color: "white",
        }}
      >
        {notifiactionLength}
      </span>
      {icon}
    </button>
    {/* </TooltipComponent> */}
  </>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProfileCard, setShowProfileCard] = useState(false);

  const userProfile = useSelector((state) => state.profile);

  const notifications = useSelector((state) => state.notification);
  const { allNotifications, serverErr, appErr, loading } = notifications;

  const { userAuth } = userProfile;
  // console.log(userAuth);

  useEffect(() => {
    dispatch(fetchNotificationsAction(userAuth?._id));
  }, [userAuth, dispatch]);

  const showNotificationBar = () => {
    dispatch(updateNoticationsSeen());
    const notificationBar = document.querySelector(".bl_notifications-cont");
    notificationBar.classList.add("showNotificationBar");
  };

  const hideNotificationBar = () => {
    const notificationBar = document.querySelector(".bl_notifications-cont");
    notificationBar.classList.remove("showNotificationBar");
  };

  // const notifiactionLength = 6;

  let notifiactionLength;

  if (allNotifications) {
    notifiactionLength = allNotifications?.filter(
      (notification) => notification.seen === false
    ).length;
  }

  const myRef = useRef(null);

  useOnClickOutside(myRef, () => hideNotificationBar());

  // console.log("notifiactionLength", allNotifications);
  console.log("every time calling navbar ============================");
  // useRedirectLoggedOutUser("/login");

  return (
    <>
      <div className="bl_navbar">
        <div className="bl_navbar_cont">
          {/* <p>Logo</p> */}
          <img alt="logo" className="bl_navbar_logo" src={logo3} />

          {userAuth ? (
            <div className="bl_navbar_cont_icons">
              <NavButton
                title="Notifiacation"
                dotColor="#03C9D7"
                notifiactionLength={notifiactionLength}
                customFunc={() => {
                  showNotificationBar();
                }}
                color="blue"
                icon={<RiNotification3Line />}
              />
              {/* <NavButton
              title="Cart"
              // customFunc={() => handleClick("cart")}
              color="blue"
              icon={<FiShoppingCart />}
            /> */}
              {/* <NavButton
                title="Chat"
                // dotColor="#03C9D7"
                // customFunc={() => handleClick("chat")}
                color="blue"
                icon={<BsChatLeft />}
              /> */}

              <div className="bl_profile_cont">
                <img
                  alt="avatar"
                  className="bl_avatar"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowProfileCard(!showProfileCard)}
                  src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                />
                {showProfileCard && (
                  <div className="bl_profile_card">
                    <img
                      alt="avatar"
                      // className="bl_avatar"
                      src={userAuth?.profilePhoto}
                      // src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                    />
                    <p>
                      {userAuth?.basicInformation.firstName}{" "}
                      {userAuth?.basicInformation.lastName}{" "}
                    </p>
                    <p>Role</p>
                    <button
                      className="button"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className="button">
              Log in
            </button>
          )}
        </div>
      </div>
      {userAuth && (
        <div className="bl_notifications-cont" ref={myRef}>
          <div className="bl_notification-header">
            <span>Notifications</span>
            <span style={{ cursor: "pointer" }} onClick={hideNotificationBar}>
              <AiOutlineClose />
            </span>
          </div>
          <div className="bl_all-notifications_cont">
            {allNotifications?.map((eachNotification) => (
              <div class="notification-card">
                <div class="notification-icon">
                  <FcLeave />
                </div>
                <div class="notification-content">
                  <span class="notification-title">
                    {eachNotification.employeeName}{" "}
                    {eachNotification.notificationTitle}
                  </span>
                  <div class="notification-desc">
                    {eachNotification.notificationDescription}
                  </div>
                </div>
              </div>
            ))}
            {/* <button type="button" class="notification-close">
                <AiOutlineClose />
              </button> */}
          </div>
        </div>
      )}

      <div className="bl_notifications-overlay"></div>
    </>
  );
};

export default Navbar;
