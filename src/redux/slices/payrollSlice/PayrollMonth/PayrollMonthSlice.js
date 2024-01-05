import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseurl from "../../../../utils/baseUrl";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const resetGeneratePayrollMonth = createAction("generatePayrollMonth/reset");

//----------------------------------------------------------------
// register action
//----------------------------------------------------------------

export const payrollMonthCreateAction = createAsyncThunk(
  "payroll/month-create",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseurl}/api/payroll-month/create`,
        user
      );
      dispatch(resetGeneratePayrollMonth());
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
// Fetch All PayrollMonth Users
//----------------------------------------------------------------

export const payMonthAllFetchAction = createAsyncThunk(
  "payroll/paymonthfetchall",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const url = id
      ? `${baseurl}/api/payroll-month/fetch?id=${id}`
      : `${baseurl}/api/payroll-month/fetch`;
    try {
      const { data } = await axiosInstance.get(url);
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
// Fetch payroll Details
//----------------------------------------------------------------

export const fetchSingleUserPayrollMonthAction = createAsyncThunk(
  "payroll/fetched",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseurl}/api/payroll-month/fetch/${id}`
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

const payrollMonthSlices = createSlice({
  name: "payrollMonth",
  initialState: {},
  extraReducers: (builder) => {
    // payroll month create

    builder.addCase(payrollMonthCreateAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetGeneratePayrollMonth, (state, action) => {
      state.isPayrollMonthGenerated = true;
    });

    builder.addCase(payrollMonthCreateAction.fulfilled, (state, action) => {
      state.isPayrollMonthGenerated = false;
      state.loading = false;
      state.payrollMonth = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      toast.success("Payroll is Successfully Generated");
    });
    builder.addCase(payrollMonthCreateAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      toast.info(action?.payload?.message);
    });

    //----------------------------------------------------------------
    // Fetch All Users
    //----------------------------------------------------------------

    builder.addCase(payMonthAllFetchAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(payMonthAllFetchAction.fulfilled, (state, action) => {
      state.loading = false;
      state.payrollMonthList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(payMonthAllFetchAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch  Single user Details Payroll Month
    //----------------------------------------------------------------

    builder.addCase(
      fetchSingleUserPayrollMonthAction.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchSingleUserPayrollMonthAction.fulfilled,
      (state, action) => {
        state.loading = false;
        state.singlePayrollMonth = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      }
    );
    builder.addCase(
      fetchSingleUserPayrollMonthAction.rejected,
      (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      }
    );
  },
});

export default payrollMonthSlices.reducer;
