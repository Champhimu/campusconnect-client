// companyDriveSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const submitDrive = createAsyncThunk(
  "drives/submit",
  async (driveData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/company/createJobDrive", driveData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSubmittedDrives = createAsyncThunk(
  "drives/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tpo/getsubmitteddrives");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const companyDriveSlice = createSlice({
  name: "companyDrives",
  initialState: {
    drives: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitDrive.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitDrive.fulfilled, (state, action) => {
        state.loading = false;
        state.drives.push(action.payload);
      })
      .addCase(submitDrive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSubmittedDrives.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubmittedDrives.fulfilled, (state, action) => {
        state.loading = false;
        state.drives = action.payload;
      })
      .addCase(fetchSubmittedDrives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companyDriveSlice.reducer;
