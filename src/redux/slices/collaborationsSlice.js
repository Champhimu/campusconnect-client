import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Fetch accepted collaborations
export const fetchAcceptedCollaborations = createAsyncThunk(
  "collaborations/fetchAccepted",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/collaborations/accepted");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch pending collaborations
export const fetchPendingCollaborations = createAsyncThunk(
  "collaborations/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/collaborations/pending");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Accept collaboration
export const acceptCollaboration = createAsyncThunk(
  "collaborations/accept",
  async (collabId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/collaborations/${collabId}/accept`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Reject collaboration
export const rejectCollaboration = createAsyncThunk(
  "collaborations/reject",
  async ({ collabId, reason }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/collaborations/${collabId}/reject`, { reason });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Send collaboration requests
export const sendCollaborationRequests = createAsyncThunk(
  "collaborations/sendRequests",
  async ({ companyIds, message }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/collaborations/send", { companyIds, message });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Get available companies
export const fetchAvailableCompanies = createAsyncThunk(
  "collaborations/fetchAvailableCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/tpo/companies/available");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Bulk invites
export const sendBulkInvites = createAsyncThunk(
  "collaborations/sendBulkInvites",
  async ({ emails, message }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/collaborations/bulk-invites", { emails, message });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// --- Slice ---
const collaborationsSlice = createSlice({
  name: "collaborations",
  initialState: {
    accepted: [],
    pending: [],
    availableCompanies: [],
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
    // Accepted collaborations
    builder
      .addCase(fetchAcceptedCollaborations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcceptedCollaborations.fulfilled, (state, action) => {
        state.loading = false;
        state.accepted = action.payload.data;
      })
      .addCase(fetchAcceptedCollaborations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      });

    // Pending collaborations
    builder
      .addCase(fetchPendingCollaborations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingCollaborations.fulfilled, (state, action) => {
        state.loading = false;
        state.pending = action.payload.data;
      })
      .addCase(fetchPendingCollaborations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
      });

    // Accept collaboration
    builder
      .addCase(acceptCollaboration.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        // Move collaboration from pending to accepted
        const collab = action.payload.data;
        state.pending = state.pending.filter((c) => c._id !== collab._id);
        state.accepted.unshift(collab);
      })
      .addCase(acceptCollaboration.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      });

    // Reject collaboration
    builder
      .addCase(rejectCollaboration.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
        // Remove from pending
        const collab = action.payload.data;
        state.pending = state.pending.filter((c) => c._id !== collab._id);
      })
      .addCase(rejectCollaboration.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      });

    // Send requests
    builder
      .addCase(sendCollaborationRequests.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(sendCollaborationRequests.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      });

    // Available companies
    builder
      .addCase(fetchAvailableCompanies.fulfilled, (state, action) => {
        state.availableCompanies = action.payload.data;
      })
      .addCase(fetchAvailableCompanies.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      });

    // Bulk invites
    builder
      .addCase(sendBulkInvites.fulfilled, (state, action) => {
        state.successMessage = action.payload.message;
      })
      .addCase(sendBulkInvites.rejected, (state, action) => {
        state.error = action.payload.message || action.payload;
      });
  }
});

export const { clearMessage } = collaborationsSlice.actions;
export default collaborationsSlice.reducer;

