import React from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile);
  const { userAuth } = user;
  console.log(userAuth);
  return (
    <>
      {userAuth?.isAdmin ? (
        <>
          <AdminDashboard />
        </>
      ) : (
        <>
          <UserDashboard />
        </>
      )}
    </>
  );
};

export default Dashboard;
