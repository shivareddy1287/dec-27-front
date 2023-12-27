import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";

//redirect actions
const resetAddHoliday = createAction("addHoliday/reset");
const resetUpdateHoliday = createAction("updateHoliday/reset");

export const addHolidayAction = createAsyncThunk(
  "holiday/add",
  async (holiday, { rejectWithValue, getState, dispatch }) => {
    console.log(holiday);
    try {
      const { data } = await axiosInstance.post(
        `${baseUrl}/api/holiday`,
        holiday
      );
      dispatch(resetAddHoliday());
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const fetchHolidayAction = createAsyncThunk(
  "holiday/fetch",
  async (id, { rejectWithValue, getState, dispatch }) => {
    console.log(id);
    // async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`${baseUrl}/api/holiday/${id}`);
      console.log(data);
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const fetchHolidaysAction = createAsyncThunk(
  "holidays/fetch",
  async (holiday, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`${baseUrl}/api/holiday`);
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const updateHolidayAction = createAsyncThunk(
  "holiday/update",
  async (holiday, { rejectWithValue, getState, dispatch }) => {
    console.log(holiday.id);
    try {
      const { data } = await axiosInstance.put(
        `${baseUrl}/api/holiday/update/${holiday?.id}`,
        holiday
      );
      console.log(data);
      dispatch(resetUpdateHoliday());
      // dispatch(resetAddHoliday());
      console.log(data);
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const deleteHolidayAction = createAsyncThunk(
  "holiday/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(
        `${baseUrl}/api/holiday/${id}`
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const holidaySlice = createSlice({
  name: "Holiday",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(addHolidayAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetAddHoliday, (state, action) => {
      state.isHolidayAdded = true;
    });
    builder.addCase(addHolidayAction.fulfilled, (state, action) => {
      state.loading = true;
      state.isHolidayAdded = false;
      state.holiday = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addHolidayAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetchHolidayAction
    builder.addCase(fetchHolidayAction.pending, (state, action) => {
      state.loading1 = true;
    });
    builder.addCase(fetchHolidayAction.fulfilled, (state, action) => {
      state.loading = false;
      state.holiday = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchHolidayAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetchHolidaysAction
    builder.addCase(fetchHolidaysAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchHolidaysAction.fulfilled, (state, action) => {
      state.loading = false;
      state.allHolidays = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchHolidaysAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //updateHolidayAction
    builder.addCase(updateHolidayAction.pending, (state, action) => {
      state.loading3 = true;
    });
    builder.addCase(resetUpdateHoliday, (state, action) => {
      state.isHolidayUpdated = true;
    });

    builder.addCase(updateHolidayAction.fulfilled, (state, action) => {
      state.loading3 = false; // Set loading to false, as the action has been fulfilled
      state.isHolidayUpdated = false;
      state.holiday3 = action.payload; // You don't need ?. here, action.payload is expected to be defined
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(updateHolidayAction.rejected, (state, action) => {
      state.loading3 = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default holidaySlice.reducer;
