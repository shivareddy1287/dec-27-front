import React, { useState } from "react";
import { useFormik } from "formik";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "./LoginPage.css";
import { loginUserAction } from "../../redux/slices/profileSlice/profileSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const toggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });
  // const profileData = useSelector((state) => state);
  // console.log(profileData, "usr alksdf");
  // const { userAuth, loading, serverErr, appErr } = profileData?.profile
  //   ? profileData?.profile
  //   : "";

  const user = useSelector((state) => state?.profile);
  const { userAuth } = user;
  // console.log(userAuth?._id, "userid");
  // const userAuth = "";
  if (userAuth) return <Navigate to={`/self-service/profile`} />;
  return (
    <div>
      <div className="cs_bg_login">
        <form onSubmit={formik.handleSubmit} className="cs_card_login">
          <div className="cs_login_left_card">
            <div>
              <div className="cs_card_login_head_div">
                <h1 className="cs_card_login_heading">Login</h1>
                <p className="cs_card_login_para">to access to employers</p>
              </div>

              <div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  placeholder="Email"
                  className="cs_card_login_email"
                />
              </div>
              <div className="cs_card_login_error">
                {formik.touched.email && formik.errors.email}
              </div>
              <div className="cs_card_login_password">
                {" "}
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  placeholder="Password"
                  className="cs_card_login_email"
                />
                <div
                  className="cs_card_login_password_icon"
                  onClick={toggleLoginPassword}
                >
                  {showLoginPassword ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="cs_card_login_icon_eye"
                    />
                  ) : (
                    <AiOutlineEye
                      size={20}
                      className="cs_card_login_icon_eye"
                    />
                  )}
                </div>
              </div>

              <div className="cs_card_login_error">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>

            <div>
              <button type="submit" className="cs_card_login_button">
                Login
              </button>
              <div className="cs_card_login_forgot_div">
                <Link className="cs_card_login_forgot" to="/">
                  Home
                </Link>
                <Link className="cs_card_login_forgot" to="/forgot">
                  Forgot Password&nbsp;?
                </Link>
              </div>
            </div>
          </div>
          <div className="cs_login_right_card"></div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
