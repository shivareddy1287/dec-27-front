import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PasswordInput from "./passwordInput/PasswordInput";
import {
  RESET,
  changePassword,
  logout,
} from "../redux/slices/profileSlice/profileSlice";
import { sendAutomatedEmail } from "../redux/email/emailSlice";
import Loader from "../utils/Loader/Loader";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);

  const { oldPassword, password, password2 } = formData;

  const profile = useSelector((state) => state?.profile);
  const { userAuth, isSuccess, message, isLoading } = profile ? profile : "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || !password2) {
      return toast.error("All fields are required");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      oldPassword,
      password,
    };
    const emailData = {
      subject: "Password Changed - AUTH:Z",
      send_to: userAuth?.email,
      reply_to: "noreply@zino",
      template: "changePassword",
      url: "/forgot",
    };
    await dispatch(changePassword(userData));
    await dispatch(sendAutomatedEmail(emailData));
  };

  if (isSuccess && message?.includes("Password changed")) {
    dispatch(logout());
    dispatch(RESET());
    navigate("/login");
  }

  return (
    <div>
      <div className="cs_card_auth_main_div">
        <div className="cs_card_auth_div">
          <div className="cs_card_text_center">
            <svg
              className="cs_card_icon"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
            <h2 className="cs_card_heading">Change Password</h2>
          </div>
          <form onSubmit={updatePassword} className="cs_card_padding_all">
            <PasswordInput
              placeholder="Old Password"
              name="oldPassword"
              value={oldPassword}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="New Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <PasswordInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />

            <div className="cs_card_width_full cs_card_margin_top">
              <button type="submit" className="cs_card_submit_button">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
