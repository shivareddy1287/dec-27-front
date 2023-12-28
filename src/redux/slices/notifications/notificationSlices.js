import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseUrl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";

export const fetchNotificationsAction = createAsyncThunk(
  "notification/fetch",

  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseUrl}/api/notification?userId=${id}`
      );
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const updateNoticationsSeen = createAsyncThunk(
  "notification/seen",
  async (Notification, { rejectWithValue, getState, dispatch }) => {
    console.log("notttt");
    try {
      const { data } = await axiosInstance.put(
        `${baseUrl}/api/notification`,
        null
      );
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

const notificationSlices = createSlice({
  name: "notification",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotificationsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchNotificationsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.allNotifications = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchNotificationsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    // notification seen
    builder.addCase(updateNoticationsSeen.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateNoticationsSeen.fulfilled, (state, action) => {
      state.loading = false;
      state.seenNotifications = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateNoticationsSeen.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default notificationSlices.reducer;
