import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseurl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";

const resetAddpayroll = createAction("addpayroll/reset");
const resetUpdatepayroll = createAction("updatepayroll/reset");
const resetDeletepayroll = createAction("deletepayroll/reset");
//----------------------------------------------------------------
// register action
//----------------------------------------------------------------

export const payrollCreateAction = createAsyncThunk(
  "payroll/create",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseurl}/api/payroll/create`,
        user
      );
      dispatch(resetAddpayroll());
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

export const fetchSinglepayrollAction = createAsyncThunk(
  "payroll/fetched",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseurl}/api/payroll/fetch/${id}`
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
// Fetch All Users
//----------------------------------------------------------------

export const allFetchpayrollAction = createAsyncThunk(
  "payroll/fetchall",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const url = id
      ? `${baseurl}/api/payroll/fetch?id=${id}`
      : `${baseurl}/api/payroll/fetch`;
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
// Fetch All Users
//----------------------------------------------------------------

export const allFetchActivePayrollAction = createAsyncThunk(
  "payroll/fetchallactive",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const url = id
      ? `${baseurl}/api/payroll/active/users?id=${id}`
      : `${baseurl}/api/payroll/active/users`;
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
// Update User Details
//----------------------------------------------------------------

export const updatepayrollAction = createAsyncThunk(
  "payroll/update",
  async (userDet, { rejectWithValue, getState, dispatch }) => {
    const { id, values } = userDet;

    try {
      const { data } = await axiosInstance.put(
        `${baseurl}/api/payroll/update/${id}`,
        {
          ...values,
        }
      );
      dispatch(resetUpdatepayroll());
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
// delete payroll
//----------------------------------------------------------------
export const deletepayrollAction = createAsyncThunk(
  "payroll/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call

      const { data } = await axiosInstance.delete(
        `${baseurl}/api/payroll/fetch/${id}`
      );
      dispatch(resetDeletepayroll());
      return data;
    } catch (error) {
      if (!error?.message) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
const payrollSlices = createSlice({
  name: "payroll",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(payrollCreateAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetAddpayroll, (state, action) => {
      state.ispayrollAdded = true;
    });
    builder.addCase(payrollCreateAction.fulfilled, (state, action) => {
      state.loading = false;
      state.ispayrollAdded = false;
      state.payroll = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(payrollCreateAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch  Single user Details
    //----------------------------------------------------------------

    builder.addCase(fetchSinglepayrollAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchSinglepayrollAction.fulfilled, (state, action) => {
      state.loading = false;
      state.singlepayroll = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchSinglepayrollAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch All Users
    //----------------------------------------------------------------

    builder.addCase(allFetchpayrollAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(allFetchpayrollAction.fulfilled, (state, action) => {
      state.loading = false;
      state.payrollList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(allFetchpayrollAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch All Active payroll Users
    //----------------------------------------------------------------

    builder.addCase(allFetchActivePayrollAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(allFetchActivePayrollAction.fulfilled, (state, action) => {
      state.loading = false;
      state.ActivePayrollList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(allFetchActivePayrollAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Update profile
    //----------------------------------------------------------------

    builder.addCase(updatepayrollAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUpdatepayroll, (state, action) => {
      state.ispayrolleUpdated = true;
    });
    builder.addCase(updatepayrollAction.fulfilled, (state, action) => {
      state.loading = false;
      state.ispayrolleUpdated = false;
      state.payrollUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updatepayrollAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // delete post
    //----------------------------------------------------------------

    builder.addCase(deletepayrollAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetDeletepayroll, (state, action) => {
      state.isDeleted = true;
    });

    builder.addCase(deletepayrollAction.fulfilled, (state, action) => {
      state.loading = false;
      state.payrollDeleted = action?.payload;
      state.isDeleted = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deletepayrollAction.rejected, (state, action) => {
      state.loading = false;

      state.appErr = action?.payload?.message;
      state.serverErr = action?.errors?.message;
    });
  },
});

export default payrollSlices.reducer;
