import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseurl from "../../../utils/baseUrl";
import axiosInstance from "../axiosInstance";

const resetAddTasksGiven = createAction("addTasksGiven/reset");
const resetUpdateTasksGiven = createAction("updateTasksGiven/reset");
const resetDeleteTasksGiven = createAction("deleteTasksGiven/reset");
//----------------------------------------------------------------
// register action
//----------------------------------------------------------------

export const TasksGivenCreateAction = createAsyncThunk(
  "TasksGiven/create",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(
        `${baseurl}/api/tasksgiven/create`,
        user
      );
      dispatch(resetAddTasksGiven());
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
// Fetch TasksGiven Details
//----------------------------------------------------------------

export const fetchSingleTasksGivenAction = createAsyncThunk(
  "TasksGiven/fetched",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseurl}/api/tasksgiven/fetch/${id}`
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

export const allFetchTasksGivenAction = createAsyncThunk(
  "TasksGiven/fetchall",
  async (id, { rejectWithValue, getState, dispatch }) => {
    const url = id
      ? `${baseurl}/api/tasksgiven/fetch?id=${id}`
      : `${baseurl}/api/tasksgiven/fetch`;
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

export const updateTasksGivenAction = createAsyncThunk(
  "TasksGiven/update",
  async (userDet, { rejectWithValue, getState, dispatch }) => {
    const { id, values } = userDet;
    console.log(values, "updateUserAction");

    try {
      const { data } = await axiosInstance.put(
        `${baseurl}/api/tasksgiven/update/${id}`,
        {
          ...values,
        }
      );
      dispatch(resetUpdateTasksGiven());
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
// delete TasksGiven
//----------------------------------------------------------------
export const deleteTasksGivenAction = createAsyncThunk(
  "TasksGiven/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // http call

      const { data } = await axiosInstance.delete(
        `${baseurl}/api/tasksgiven/fetch/${id}`
      );
      dispatch(resetDeleteTasksGiven());
      return data;
    } catch (error) {
      if (!error?.message) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);
const TasksGivenSlices = createSlice({
  name: "TasksGiven",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(TasksGivenCreateAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetAddTasksGiven, (state, action) => {
      state.isTasksGivenAdded = true;
    });
    builder.addCase(TasksGivenCreateAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isTasksGivenAdded = false;
      state.TasksGiven = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(TasksGivenCreateAction.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch  Single user Details
    //----------------------------------------------------------------

    builder.addCase(fetchSingleTasksGivenAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchSingleTasksGivenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.singleTasksGiven = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchSingleTasksGivenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Fetch All Users
    //----------------------------------------------------------------

    builder.addCase(allFetchTasksGivenAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(allFetchTasksGivenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.TasksGivenList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(allFetchTasksGivenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // Update profile
    //----------------------------------------------------------------

    builder.addCase(updateTasksGivenAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(resetUpdateTasksGiven, (state, action) => {
      state.isTasksGiveneUpdated = true;
    });
    builder.addCase(updateTasksGivenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isTasksGiveneUpdated = false;
      state.TasksGivenUpdated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateTasksGivenAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //----------------------------------------------------------------
    // delete TasksGiven
    //----------------------------------------------------------------

    builder.addCase(deleteTasksGivenAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetDeleteTasksGiven, (state, action) => {
      state.isDeleted = true;
    });

    builder.addCase(deleteTasksGivenAction.fulfilled, (state, action) => {
      state.loading = false;
      state.TasksGivenDeleted = action?.payload;
      state.isDeleted = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteTasksGivenAction.rejected, (state, action) => {
      state.loading = false;

      state.appErr = action?.payload?.message;
      state.serverErr = action?.errors?.message;
    });
  },
});

export default TasksGivenSlices.reducer;
