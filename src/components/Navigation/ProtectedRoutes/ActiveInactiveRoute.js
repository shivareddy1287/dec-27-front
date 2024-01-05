import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginStatus } from "../../../redux/slices/profileSlice/profileSlice";
const ActiveInactiveRoute = ({ children }) => {
  const user = useSelector((state) => state?.profile);
  const { userAuth } = user;
  // console.log(userAuth?.workInformation?.employeeStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginStatus());
  }, [dispatch]);

  if (!(userAuth?.workInformation?.employeeStatus === "Active")) {
    return <Navigate to="/self-service/profile" replace />;
  }

  return children;
};
export default ActiveInactiveRoute;
