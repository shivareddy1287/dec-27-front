import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";

// reset actions
export const resetAttendancePunchIn = createAction("attendence/punchIn");
export const reserAttendencePunchOut = createAction("attendence/punchOut");

export const fetchAttendencesAction = createAsyncThunk(
  "attendence/fetch",
  async (attendence, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`${baseUrl}/api/attendence`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const attendencePunchInAction = createAsyncThunk(
  "attendence/punchIn",
  async (attendence, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseUrl}/api/attendence`,
        attendence
      );
      console.log("data", data);
      dispatch(resetAttendancePunchIn());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const attendancePunchOutAction = createAsyncThunk(
  "attendence/punchOut",
  async (attendence, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.put(
        `${baseUrl}/api/attendence/${attendence?.id}`,
        attendence
      );
      dispatch(reserAttendencePunchOut());
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

const attendenceSlice = createSlice({
  name: "attendence",
  initialState: {},
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchAttendencesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAttendencesAction.fulfilled, (state, action) => {
      state.attendences = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAttendencesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(attendencePunchInAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetAttendancePunchIn, (state, action) => {
      state.isPunChedIn = true;
    });
    builder.addCase(attendencePunchInAction.fulfilled, (state, action) => {
      state.attendence = action?.payload;
      state.isPunChedIn = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(attendencePunchInAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    builder.addCase(attendancePunchOutAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(reserAttendencePunchOut, (state, action) => {
      state.isPunChedOut = true;
    });
    builder.addCase(attendancePunchOutAction.fulfilled, (state, action) => {
      state.attendence = action?.payload;
      state.isPunChedOut = false;
      state.loading = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(attendancePunchOutAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });
  },
});

export default attendenceSlice.reducer;
