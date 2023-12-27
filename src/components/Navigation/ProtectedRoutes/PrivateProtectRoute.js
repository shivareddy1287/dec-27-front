import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginStatus } from "../../../redux/slices/profileSlice/profileSlice";
const PrivateProtectRoute = ({ children }) => {
  const user = useSelector((state) => state?.profile);
  const { userAuth, isLoggedIn } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);

  if (!userAuth) {
    localStorage.removeItem("userInfo");
    return <Navigate to="/login" replace />;
  }

  // if (isLoggedIn === false) {
  //   localStorage.removeItem("userInfo");
  //   return <Navigate to="/login" replace />;
  // }
  return children;
};
export default PrivateProtectRoute;
