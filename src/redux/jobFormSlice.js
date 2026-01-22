// store/jobFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  packageLPA: "",
  eligibilityCriteria: {
    minCGPA: "",
    maxBacklogs: "",
    allowedBranches: "",
  },
  driveDate: "",
  driveMode: "",
  jobDescription: "",
  jobType: "fulltime",
};

const jobFormSlice = createSlice({
  name: "jobForm",
  initialState,
  reducers: {
    setJobForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetJobForm: () => initialState,
  },
});

export const { setJobForm, resetJobForm } = jobFormSlice.actions;
export default jobFormSlice.reducer;
