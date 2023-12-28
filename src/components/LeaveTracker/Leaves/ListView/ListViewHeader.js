import React, { useEffect } from "react";
import "./listview.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProfileAction,
  fetchDetailsProfileAction,
} from "../../../../redux/slices/profileSlice/profileSlice";

import * as Yup from "yup";
import { useFormik } from "formik";

const formSchema = Yup.object({
  userId: Yup.string().required("EmployeeId is required"),
});

const ListViewHeader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProfileAction());
  }, [dispatch]);

  const userProfile = useSelector((state) => state.profile);
  const { userAuth, profilesList } = userProfile;

  useEffect(() => {
    dispatch(fetchDetailsProfileAction(userAuth?._id));
  }, [dispatch, userAuth]);

  const formik = useFormik({
    initialValues: {
      userId: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: formSchema,
  });

  const isManager = userAuth?.Access === "Manager";

  return (
    <div className="bl-list-view-header">
      <div className="bl-list-view-header_left-part">
        <img
          alt="avatar"
          className="bl_avatar"
          src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
        />
        {userAuth?.isAdmin ? (
          <select
            value={formik.values.userId}
            onChange={(e) => {
              formik.handleChange("userId")(e);
              dispatch(fetchDetailsProfileAction(e.target.value));
            }}
          >
            <option value={userAuth?._id}>{userAuth.email}</option>
            {profilesList
              ?.filter((userprof) => userprof?._id !== userAuth?._id)
              ?.map((user) => {
                return (
                  <option value={user._id}>
                    {user.basicInformation.firstName}{" "}
                    {user.basicInformation.lastName}
                  </option>
                );
              })}
          </select>
        ) : (
          <>
            {" "}
            {isManager ? (
              <select
                value={formik.values.userId}
                onChange={(e) => {
                  formik.handleChange("userId")(e);
                  dispatch(fetchDetailsProfileAction(e.target.value));
                }}
              >
                <option value={userAuth?._id}>
                  {userAuth.basicInformation.firstName}{" "}
                  {userAuth.basicInformation.lastName}
                </option>
                {profilesList
                  ?.filter(
                    (userprof) =>
                      userprof?._id !== userAuth?._id &&
                      userprof?.managerDataId?._id === userAuth?._id
                  )
                  ?.map((user) => {
                    return (
                      <option value={user._id}>
                        {user.basicInformation.firstName}{" "}
                        {user.basicInformation.lastName}
                      </option>
                    );
                  })}
              </select>
            ) : (
              <p>{userAuth?.basicInformation.firstName}</p>
            )}
          </>
        )}
      </div>
      {/* <div>Date Range</div> */}
      {/* <div>
        <button
          className="button"
          onClick={() => navigate("/leave-tracker/apply-leave")}
        >
          Apply Leave
        </button>
      </div> */}
    </div>
  );
};

export default ListViewHeader;
