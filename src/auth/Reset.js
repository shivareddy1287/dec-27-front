import React, { useEffect, useState } from "react";
import { MdPassword } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PasswordInput from "./passwordInput/PasswordInput";
import {
  RESET,
  resetPassword,
} from "../redux/slices/profileSlice/profileSlice";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  console.log(resetToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state?.profile);
  // console.log(profile, "profile");
  const { isSuccess, message } = profile ? profile : "";
  // console.log(isSuccess, message, "success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
    };

    await dispatch(resetPassword({ userData, resetToken }));
  };

  useEffect(() => {
    if (isSuccess && message?.includes("Password Reset Successful")) {
      navigate("/login");
    }

    dispatch(RESET());
  }, [dispatch, navigate, message, isSuccess]);

  return (
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
          <h2 className="cs_card_heading">Reset Password</h2>
        </div>

        <form onSubmit={reset} className="cs_card_padding_all">
          <PasswordInput
            placeholder="Password"
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
              Reset Password
            </button>
          </div>

          <div className="cs_card_extra_links_div">
            <Link className="cs_card_extra_link" to="/">
              Home
            </Link>

            <Link className="cs_card_extra_link" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
