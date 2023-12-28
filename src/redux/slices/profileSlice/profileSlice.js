import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import baseurl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";

const resetRegisterProfile = createAction("registerprofile/reset");
const resetUpdateProfile = createAction("updateprofile/reset");
const resetDeleteProfile = createAction("deleteprofile/reset");
const resetActiveProfile = createAction("updateActive/reset");
//----------------------------------------------------------------
// register action
//----------------------------------------------------------------

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //http call
    try {
      const { data } = await axiosInstance.post(
        `${baseurl}/api/users/register`,
        user,
        config
      );

      if (!data?.name) {
        dispatch(resetRegisterProfile());
      }

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------------------------------
// Login
//----------------------------------------------------------------

export const loginUserAction = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http call
      const { data } = await axiosInstance.post(
        `${baseurl}/api/users/login`,
        userData
      );
      // save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const localStorageUserSetData = createAsyncThunk(
  "users/localStorageSetData",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http call
      const { data } = await axiosInstance.get(
        `${baseurl}/api/users/local/storage/data`
      );
      // save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// loginStatus

export const loginStatus = createAsyncThunk(
  "users/loginStatus",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseurl}/api/users/login/loginStatus`
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Logout action
export const logout = createAsyncThunk(
  "users/userLogout",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
      const { data } = await axiosInstance.get(
        `${baseurl}/api/users/logout/user`
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------------------------------
// Fetch User Details
//----------------------------------------------------------------

export const fetchDetailsProfileAction = createAsyncThunk(
  "users/fetchdetails",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`${baseurl}/api/users/${id}`);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//----------------------------------------------------------------
// Fetch All Users
//----------------------------------------------------------------

export const fetchAllProfileAction = createAsyncThunk(
  "users/fetchallProfile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`${baseurl}/api/users`);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------------------------------
// Fetch All New Hires
//----------------------------------------------------------------

export const fetchAllNewHiresAction = createAsyncThunk(
  "users/fetchallNewHires",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseurl}/api/users/new/hires`
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//----------------------------------------------------------------
// Update User Details
//----------------------------------------------------------------

export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userDet, { rejectWithValue, getState, dispatch }) => {
    const { id, values } = userDet;

    try {
      const { data } = await axiosInstance.put(
        `${baseurl}/api/users/update/${id}`,
        {
          ...values,
        }
      );

      if (!data?.name) {
        dispatch(resetUpdateProfile());
      }

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------------------------------
// delete Profile
//----------------------------------------------------------------
export const deleteProfileAction = createAsyncThunk(
  "Profile/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${baseurl}/api/users/delete/${id}`
      );
      dispatch(resetDeleteProfile());
      return data;
    } catch (error) {
      if (!error?.message) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------------------------------------------------------
// forgotPassword
//----------------------------------------------------------------

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http call
      const { data } = await axiosInstance.post(
        `${baseurl}/api/users/forgotPassword`,
        userData
      );

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

//----------------------------------------------------------------
// resetPassword
//----------------------------------------------------------------

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userData, resetToken }, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http call
      const { data } = await axiosInstance.post(
        `${baseurl}/api/users/resetPassword/${resetToken}`,
        userData
      );

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

//----------------------------------------------------------------
// change Password
//----------------------------------------------------------------

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http call
      const { data } = await axiosInstance.patch(
        `${baseurl}/api/users/changePassword`,
        userData
      );

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const fetchAllManagersData = createAsyncThunk(
  "users/fetchManager",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseurl}/api/users/manager/data`
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// export const updateTheUserActiveOrInctivej = createAsyncThunk(
//   "users/active-inactive",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     try {
//       const { data } = await axiosInstance.post(
//         `${baseurl}/api/users/change/active-inactive/${id}`
//       );
//       return data;
//     } catch (error) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error?.response?.data);
//     }
//   }
// );

export const updateTheUserActiveOrInctive = createAsyncThunk(
  "users/active-inactive",
  async (userDet, { rejectWithValue, getState, dispatch }) => {
    const { id, values } = userDet;

    try {
      const { data } = await axiosInstance.post(
        `${baseurl}/api/users/change/active-inactive/${id}`,
        {
          ...values,
        }
      );

      if (!data?.name) {
        dispatch(resetActiveProfile());
      }

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const profileSlices = createSlice({
  // register
  name: "user",
  initialState: { userAuth: userLoginFromStorage },
  reducers: {
    RESET(state) {
      state.twoFactor = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetRegisterProfile, (state, action) => {
      state.isProfileAdded = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      // state.loading = false;
      // state.isProfileAdded = false;
      // state.registerd = action?.payload;
      // state.appErr = undefined;
      // state.serverErr = undefined;

      if (action?.payload && action?.payload?.name) {
        // Handle validation error
        state.appErr = action?.payload?.message;
        state.serverErr = undefined;
        state.isProfileAdded = false;
        state.registered = undefined; // Clear any potential registration data
      } else {
        // Handle successful registration
        state.registered = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isProfileAdded = false;
      }
    });

    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // login
    //----------------------------------------------------------------

    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.isLoggedIn = true;
      state.appErr = undefined;
      state.serverErr = undefined;
      toast.success("user login successful");
    });

    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      if (action?.payload) {
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(action?.payload);
        }
      } else {
        toast.error(action?.error?.message);
      }
    });

    //----------------------------------------------------------------
    // localStorageUserSetData
    //----------------------------------------------------------------

    builder.addCase(localStorageUserSetData.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(localStorageUserSetData.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.isLoggedIn = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(localStorageUserSetData.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      if (action?.payload) {
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(action?.payload);
        }
      } else {
        toast.error(action?.error?.message);
      }
    });

    // Logout User
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = false;
      state.userAuth = null;
      toast.success(action.payload);
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      toast.error(action.payload);
    });

    // Get Login Status
    builder.addCase(loginStatus?.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isLoggedIn = action?.payload;
      if (!action.payload) {
        state.userAuth = null;
      }
    });
    builder.addCase(loginStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.messageTokenExpires = action?.payload;
      if (action?.payload?.message === "jwt expired") {
        // toast.error(action?.payload.message);
        state.userAuth = null;
      }
    });

    //----------------------------------------------------------------
    // forgotPassword
    //----------------------------------------------------------------

    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
      toast.success(action?.payload?.message);
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      if (action?.payload) {
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(action?.payload);
        }
      } else {
        toast.error(action?.error?.message);
      }
    });
    //----------------------------------------------------------------
    // resetPassword
    //----------------------------------------------------------------
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action?.payload?.message;
      toast.success(action?.payload?.message);
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
      if (action?.payload) {
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(action?.payload);
        }
      } else {
        toast.error(action?.error?.message);
      }
    });
    //----------------------------------------------------------------
    // changePassword
    //----------------------------------------------------------------

    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action?.payload?.message;
      toast.success(action?.payload?.message);
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action?.payload?.message;

      if (action?.payload) {
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(action?.payload);
        }
      } else {
        toast.error(action?.error?.message);
      }
    });

    //----------------------------------------------------------------
    // Fetch user Details
    //----------------------------------------------------------------

    builder.addCase(fetchDetailsProfileAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchDetailsProfileAction.fulfilled, (state, action) => {
      state.loading = false;

      state.profileData = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchDetailsProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch All Users
    //----------------------------------------------------------------

    builder.addCase(fetchAllProfileAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchAllProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profilesList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch All New Hires
    //----------------------------------------------------------------

    builder.addCase(fetchAllNewHiresAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchAllNewHiresAction.fulfilled, (state, action) => {
      state.loading = false;
      state.newHiresList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllNewHiresAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Update profile
    //----------------------------------------------------------------

    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUpdateProfile, (state, action) => {
      state.isProfileUpdated = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      if (action?.payload && action?.payload?.name) {
        state.loading = false;
        state.isProfileUpdated = false;
        state.userUpdated = undefined;
        state.appErr = action?.payload?.message;
        state.serverErr = undefined;
      } else {
        state.loading = false;
        state.isProfileUpdated = false;
        state.userUpdated = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      }
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // delete Profile
    //----------------------------------------------------------------

    builder.addCase(deleteProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetDeleteProfile, (state, action) => {
      state.isDeleted = true;
    });

    builder.addCase(deleteProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.ProfileDeleted = action?.payload;
      state.isDeleted = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteProfileAction.rejected, (state, action) => {
      state.loading = false;

      state.appErr = action?.payload?.message;
      state.serverErr = action?.errors?.message;
    });

    // fetch manager data
    builder.addCase(fetchAllManagersData.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchAllManagersData.fulfilled, (state, action) => {
      state.loading = false;
      state.managersList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllManagersData.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // update the user active or inactive

    builder.addCase(updateTheUserActiveOrInctive.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetActiveProfile, (state, action) => {
      state.isUserActiveUpdated = true;
    });
    builder.addCase(updateTheUserActiveOrInctive.fulfilled, (state, action) => {
      state.loading = false;
      state.isUserActiveUpdated = false;
      state.userUpdatedMessage = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateTheUserActiveOrInctive.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export const { RESET } = profileSlices.actions;

export default profileSlices.reducer;
