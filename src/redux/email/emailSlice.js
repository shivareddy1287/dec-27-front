import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import baseurl from "../../utils/baseUrl";
import axios from "axios";
import axiosInstance from "../slices/axiosInstance";

const initialState = {
  sendingEmail: false,
  emailSent: false,
  msg: "",
};

// // Send Automated Email
// export const sendAutomatedEmail = createAsyncThunk(
//   "email/sendAutomatedEmail",
//   async (userData, thunkAPI) => {
//     try {
//       return await emailService.sendAutomatedEmail(userData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

//----------------------------------------------------------------
// change Password
//----------------------------------------------------------------

export const sendAutomatedEmail = createAsyncThunk(
  "auth/sendAutomatedEmail",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      // make http call
      const { data } = await axiosInstance.post(
        `${baseurl}/api/users/sendAutomatedEmail`,
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

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state) {
      state.sendingEmail = false;
      state.emailSent = false;
      state.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // sendAutomated email
      .addCase(sendAutomatedEmail.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
        state.sendingEmail = true;
        state.emailSent = true;
        state.msg = action.payload;
        toast.success(action?.payload?.message);
      })
      .addCase(sendAutomatedEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSent = false;
        state.msg = action.payload;
        toast.error(action?.payload?.message);
      });
  },
});

export const { EMAIL_RESET } = emailSlice.actions;

export default emailSlice.reducer;
