import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import axiosInstance from "../axiosInstance";

//action to intimate
const resetAddedDocument = createAction("document/added");

export const fetchAdharProofsAction = createAsyncThunk(
  "adress-proof/fetch",
  async (leave, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(`${baseUrl}/api/hr-letters`);
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const addUserDocumentsAction = createAsyncThunk(
  "user-documents/add",
  async (userDoc, { rejectWithValue, getState, dispatch }) => {
    console.log(userDoc);
    try {
      const formData = new FormData();
      formData.append("employeeId", userDoc.employeeId);
      formData.append("documentName", userDoc.documentName);
      formData.append("document", userDoc.document);
      console.log(formData);
      const { data } = await axiosInstance.post(
        `${baseUrl}/api/hr-letters/userDocuments`,
        formData
      );
      dispatch(resetAddedDocument());
      console.log(data);
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const fetchUserDocumentsAction = createAsyncThunk(
  "user-documents/fetch",
  async (userDoc, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axiosInstance.get(
        `${baseUrl}/api/hr-letters/userDocuments`
      );
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

export const deleteUserDocument = createAsyncThunk(
  "adress-proof/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      // get user token

      const { data } = await axiosInstance.delete(
        `${baseUrl}/api/hr-letters/${id}`
      );
      return data;
    } catch (error) {
      if (!error?.responce) throw error;
      return rejectWithValue(error?.responce?.data);
    }
  }
);

const adressSlices = createSlice({
  name: "address-proofs",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdharProofsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAdharProofsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.pdfs = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAdharProofsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    builder.addCase(addUserDocumentsAction.pending, (state, action) => {
      state.addUserLoading = true;
    });
    builder.addCase(resetAddedDocument, (state, action) => {
      state.isDocAdded = true;
    });
    builder.addCase(addUserDocumentsAction.fulfilled, (state, action) => {
      state.addUserLoading = false;
      state.isDocAdded = false;
      state.userDocument = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(addUserDocumentsAction.rejected, (state, action) => {
      state.addUserLoading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    builder.addCase(fetchUserDocumentsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserDocumentsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userDocumentsList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchUserDocumentsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    builder.addCase(deleteUserDocument.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteUserDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.userDocument = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteUserDocument.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default adressSlices.reducer;
