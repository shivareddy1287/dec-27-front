import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../redux/slices/profileSlice/profileSlice";
import { toast } from "react-toastify";
import { validateEmail } from "../utils/emailValidation";
import "./authcommon.css";
const Forgot = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
    };

    await dispatch(forgotPassword(userData));
  };
  return (
    <div>
      <>
        <div className="cs_card_auth_main_div">
          <div className="cs_card_auth_div">
            <div className="cs_card_text_center">
              <svg
                className="cs_card_icon"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
              </svg>
              <h2 className="cs_card_heading">Forgot Password</h2>
            </div>
            <form onSubmit={forgot} className="cs_card_padding_all">
              <div className="cs_card_margin_top cs_width_full">
                <input
                  className="cs_card_input"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="cs_card_width_full cs_card_margin_top">
                <button type="submit" className="cs_card_submit_button">
                  Get Reset Email
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
      </>
    </div>
  );
};

export default Forgot;
