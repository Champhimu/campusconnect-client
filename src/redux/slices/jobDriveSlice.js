// src/features/jobDrive/jobDriveSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Create a job drive
export const createJobDrive = createAsyncThunk(
  "jobDrive/create",
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/jobdrives", jobData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const jobDriveSlice = createSlice({
  name: "jobDrive",
  initialState: {
    drives: [],
    loading: false,
    error: null,
    successMessage: null
  },
  reducers: {
    clearMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJobDrive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJobDrive.fulfilled, (state, action) => {
        state.loading = false;
        state.drives.push(action.payload.data);
        state.successMessage = action.payload.message;
      })
      .addCase(createJobDrive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      });
  }
});

export const { clearMessage } = jobDriveSlice.actions;
export default jobDriveSlice.reducer;
