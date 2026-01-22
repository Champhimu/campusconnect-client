import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* =======================
   ASYNC THUNKS
======================= */

// Accepted collaborations
export const fetchAcceptedCollaborations = createAsyncThunk(
  "collaborations/fetchAccepted",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/company/collaborations/accepted");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Pending collaborations
export const fetchPendingCollaborations = createAsyncThunk(
  "collaborations/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/company/collaborations/pending");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Accept collaboration
export const acceptCollaboration = createAsyncThunk(
  "collaborations/accept",
  async (collaborationId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/company/collaborations/${collaborationId}/accept`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Reject collaboration
export const rejectCollaboration = createAsyncThunk(
  "collaborations/reject",
  async ({ collaborationId, reason }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(
        `/company/collaborations/${collaborationId}/reject`,
        { reason }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// Invite TPO
export const inviteTPO = createAsyncThunk(
  "collaborations/invite",
  async ({ collegeId, message }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/company/collaborations/invite", {
        collegeId,
        message
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const collaborationSlice = createSlice({
  name: "collaborations",
  initialState: {
    accepted: [],
    pending: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ACCEPTED
      .addCase(fetchAcceptedCollaborations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAcceptedCollaborations.fulfilled, (state, action) => {
        state.loading = false;
        state.accepted = action.payload;
      })
      .addCase(fetchAcceptedCollaborations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PENDING
      .addCase(fetchPendingCollaborations.fulfilled, (state, action) => {
        state.pending = action.payload;
      })

      // ACCEPT
      .addCase(acceptCollaboration.fulfilled, (state, action) => {
        state.pending = state.pending.filter(
          (c) => c._id !== action.payload._id
        );
        state.accepted.unshift(action.payload);
      })

      // REJECT
      .addCase(rejectCollaboration.fulfilled, (state, action) => {
        state.pending = state.pending.filter(
          (c) => c._id !== action.payload._id
        );
      });
  }
});

export default collaborationSlice.reducer;
