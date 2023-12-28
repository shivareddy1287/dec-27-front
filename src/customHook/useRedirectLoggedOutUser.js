import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { useDispatch } from "react-redux";
import { localStorageUserSetData } from "../redux/slices/profileSlice/profileSlice";

const useRedirectLoggedOutUser = (path) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(localStorageUserSetData());
    let isLoggedIn;
    const redirectLoggedOutUser = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/api/users/login/loginStatus`,
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );

        isLoggedIn = data;
      } catch (error) {
        console.log(error.message, "Session expired, please login to continue");
        toast.info("Session expired, please login to continue");
      }

      if (!isLoggedIn) {
        // toast.info("Session expired, please login to continue");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [dispatch, path, navigate]);
};

export default useRedirectLoggedOutUser;
