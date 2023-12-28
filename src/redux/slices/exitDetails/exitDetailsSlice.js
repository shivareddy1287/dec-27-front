import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import baseurl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

const resetAddexitDetails = createAction("addexitDetails/reset");
const resetUpdateexitDetails = createAction("updateexitDetails/reset");
const resetDeleteexitDetails = createAction("deleteexitDetails/reset");
const resetWithdrawExitDetails = createAction("withdrawExitDetails/reset");
const resetApproveExitDetails = createAction("approveExitDetails/reset");
//----------------------------------------------------------------
// create action
//----------------------------------------------------------------

export const exitDetailsCreateAction = createAsyncThunk(
  "exitDetails/create",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseurl}/api/exitdetails/create`,
        user
      );
      dispatch(resetAddexitDetails());
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
// Fetch exitDetails Details
//----------------------------------------------------------------

export const fetchSingleexitDetailsAction = createAsyncThunk(
  "exitDetails/fetched",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseurl}/api/exitDetails/fetch/${id}`
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

export const allFetchexitDetailsAction = createAsyncThunk(
  "exitDetails/fetchall",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const url = id
      ? `${baseurl}/api/exitDetails/fetch?id=${id}`
      : `${baseurl}/api/exitDetails/fetch`;
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

export const updateexitDetailsAction = createAsyncThunk(
  "exitDetails/update",
  async (userDet, { rejectWithValue, getState, dispatch }) => {
    const { id, values } = userDet;
    console.log(values, "updateUserAction");

    try {
      const { data } = await axiosInstance.put(
        `${baseurl}/api/exitDetails/update/${id}`,
        {
          ...values,
        }
      );
      dispatch(resetUpdateexitDetails());
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
// withdrawExitDetailsAction User Details
//----------------------------------------------------------------

export const withdrawExitDetailsAction = createAsyncThunk(
  "exitDetails/withdraw",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.put(
        `${baseurl}/api/exitDetails/withdraw/${id}`
      );
      dispatch(resetWithdrawExitDetails());
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
// approve User Details
//----------------------------------------------------------------

export const approveExitDetailsAction = createAsyncThunk(
  "exitDetails/approve",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.put(
        `${baseurl}/api/exitDetails/approve/${id}`
      );
      dispatch(resetApproveExitDetails());
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
// delete exitDetails
//----------------------------------------------------------------
export const deleteexitDetailsAction = createAsyncThunk(
  "exitDetails/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call

      const { data } = await axiosInstance.delete(
        `${baseurl}/api/exitDetails/fetch/${id}`
      );
      dispatch(resetDeleteexitDetails());
      return data;
    } catch (error) {
      if (!error?.message) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
const exitDetailsSlices = createSlice({
  name: "exitDetails",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(exitDetailsCreateAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetAddexitDetails, (state, action) => {
      state.isexitDetailsAdded = true;
    });
    builder.addCase(exitDetailsCreateAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isexitDetailsAdded = false;
      state.exitDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      toast.success(action?.payload?.message);
    });
    builder.addCase(exitDetailsCreateAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      toast.error(action?.payload?.message);
    });

    //----------------------------------------------------------------
    // Fetch  Single user Details
    //----------------------------------------------------------------

    builder.addCase(fetchSingleexitDetailsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchSingleexitDetailsAction.fulfilled, (state, action) => {
      state.loading = false;

      state.singleexitDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchSingleexitDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch All Users
    //----------------------------------------------------------------

    builder.addCase(allFetchexitDetailsAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(allFetchexitDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.exitDetailsList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(allFetchexitDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Update profile
    //----------------------------------------------------------------

    builder.addCase(updateexitDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUpdateexitDetails, (state, action) => {
      state.isexitDetailseUpdated = true;
    });
    builder.addCase(updateexitDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isexitDetailseUpdated = false;
      state.exitDetailsUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateexitDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // withdraw exit details
    //----------------------------------------------------------------

    builder.addCase(withdrawExitDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetWithdrawExitDetails, (state, action) => {
      state.isWithdrawSeparation = true;
    });
    builder.addCase(withdrawExitDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isWithdrawSeparation = false;
      state.separationStatusWithdraw = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      toast.success(action?.payload?.message);
    });
    builder.addCase(withdrawExitDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      if (action?.payload) {
        if (action?.payload?.message) {
          toast.info(action?.payload?.message);
        } else {
          toast.error(action?.payload);
        }
      } else {
        toast.error(action?.error?.message);
      }
    });

    //----------------------------------------------------------------
    // approve separation
    //----------------------------------------------------------------

    builder.addCase(approveExitDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetApproveExitDetails, (state, action) => {
      state.isApproveSeparation = true;
    });
    builder.addCase(approveExitDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isApproveSeparation = false;
      state.separationStatusApprove = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      toast.success(action?.payload?.message);
    });
    builder.addCase(approveExitDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
      if (action?.payload) {
        if (action?.payload?.message) {
          toast.info(action?.payload?.message);
        } else {
          toast.error(action?.payload);
        }
      } else {
        toast.error(action?.error?.message);
      }
    });

    //----------------------------------------------------------------
    // delete post
    //----------------------------------------------------------------

    builder.addCase(deleteexitDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetDeleteexitDetails, (state, action) => {
      state.isDeleted = true;
    });

    builder.addCase(deleteexitDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.exitDetailsDeleted = action?.payload;
      state.isDeleted = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteexitDetailsAction.rejected, (state, action) => {
      state.loading = false;

      state.appErr = action?.payload?.message;
      state.serverErr = action?.errors?.message;
    });
  },
});

export default exitDetailsSlices.reducer;
