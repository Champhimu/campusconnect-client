import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../api/axiosInstance';

// Fetch all students
export const fetchStudents = createAsyncThunk(
    'admin/fetchStudents',
    async ({ branch, academicYear, status, search } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (branch) params.append('branch', branch);
            if (academicYear) params.append('academicYear', academicYear);
            if (status) params.append('status', status);
            if (search) params.append('search', search);

            const response = await axiosInstance.get(`/admin/liststudents?${params}`);
            console.log("fetchStudents response:", response);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
        }
    }
);

// Fetch all TPOs
export const fetchTPOs = createAsyncThunk(
    'admin/fetchTPOs',
    async ({ status, search } = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (status) params.append('status', status);
            if (search) params.append('search', search);

            const response = await axiosInstance.get(`/admin/listTPOs?${params}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch TPOs');
        }
    }
);

// Create single student
export const createStudent = createAsyncThunk(
    'admin/createStudent',
    async (studentData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/students', studentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create student');
        }
    }
);

// Create single TPO
export const createTPO = createAsyncThunk(
    'admin/createTPO',
    async (tpoData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/tpo/create', tpoData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create TPO');
        }
    }
);

// Update student profile
export const updateStudent = createAsyncThunk(
    'admin/updateStudent',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/admin/updateStudent/${id}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update student');
        }
    }
);

// Get student profile
export const getStudentProfile = createAsyncThunk(
    'admin/getStudentProfile',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/studentProfile/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to get student profile');
        }
    }
);

// Get TPO profile
export const getTPOProfile = createAsyncThunk(
    'admin/getTPOProfile',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/TPOProfile/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to get TPO profile');
        }
    }
);

// Toggle student account status
export const toggleStudentStatus = createAsyncThunk(
    'admin/toggleStudentStatus',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/admin/toggle/${userId}`, {});
            return { userId, isActive: response.data.message.includes('activated') };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to toggle student status');
        }
    }
);

// Toggle TPO account status
export const toggleTPOStatus = createAsyncThunk(
    'admin/toggleTPOStatus',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/admin/toggle/tpo/${userId}`, {});
            console.log("toggleTPOStatus response:", response.data.message.includes('activated'));
            return { userId, isActive: response.data.message.includes('activated') };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to toggle TPO status');
        }
    }
);

// Bulk upload students (Excel)
export const bulkUploadStudents = createAsyncThunk(
    'admin/bulkUploadStudents',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/student/bulk', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to upload students');
        }
    }
);

// Bulk upload academic data (Excel)
export const bulkUploadAcademic = createAsyncThunk(
    'admin/bulkUploadAcademic',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/academic/bulk', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to upload academic data');
        }
    }
);

// Bulk create TPOs (Excel)
export const bulkCreateTPOs = createAsyncThunk(
    'admin/bulkCreateTPOs',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/tpo/bulk', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to upload TPOs');
        }
    }
);

// ============================================
// REDUX SLICE
// ============================================

const initialState = {
    // Students
    students: [],
    studentProfile: null,
    studentLoading: false,
    studentError: null,

    // TPOs
    tpos: [],
    tpoProfile: null,
    tpoLoading: false,
    tpoError: null,

    // Bulk operations
    bulkLoading: false,
    bulkError: null,
    bulkResult: null,

    // General
    loading: false,
    error: null,
    success: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // Clear errors
        clearError: (state) => {
            state.error = null;
            state.studentError = null;
            state.tpoError = null;
            state.bulkError = null;
        },
        // Clear success message
        clearSuccess: (state) => {
            state.success = null;
        },
        // Clear bulk result
        clearBulkResult: (state) => {
            state.bulkResult = null;
        },
    },
    extraReducers: (builder) => {
        // ============ FETCH STUDENTS ============
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.studentLoading = true;
                state.studentError = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.studentLoading = false;
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.studentLoading = false;
                state.studentError = action.payload;
            });

        // ============ FETCH TPOs ============
        builder
            .addCase(fetchTPOs.pending, (state) => {
                state.tpoLoading = true;
                state.tpoError = null;
            })
            .addCase(fetchTPOs.fulfilled, (state, action) => {
                state.tpoLoading = false;
                state.tpos = action.payload;
            })
            .addCase(fetchTPOs.rejected, (state, action) => {
                state.tpoLoading = false;
                state.tpoError = action.payload;
            });

        // ============ CREATE STUDENT ============
        builder
            .addCase(createStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'Student created successfully';
                state.students.unshift(action.payload.data);
            })
            .addCase(createStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ============ CREATE TPO ============
        builder
            .addCase(createTPO.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTPO.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'TPO created successfully';
                state.tpos.unshift(action.payload.data);
            })
            .addCase(createTPO.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ============ UPDATE STUDENT ============
        builder
            .addCase(updateStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'Student updated successfully';
                const index = state.students.findIndex(s => s.userId._id === action.payload.data.userId._id);
                if (index !== -1) {
                    state.students[index] = {
                        ...state.students[index],
                        ...action.payload.data,
                        userId: {
                            ...state.students[index].userId,
                            ...action.payload.data.userId
                        }
                    };
                }
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ============ GET STUDENT PROFILE ============
        builder
            .addCase(getStudentProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudentProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.studentProfile = action.payload;
            })
            .addCase(getStudentProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ============ GET TPO PROFILE ============
        builder
            .addCase(getTPOProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTPOProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.tpoProfile = action.payload;
            })
            .addCase(getTPOProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ============ TOGGLE STUDENT STATUS ============
        builder
            .addCase(toggleStudentStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleStudentStatus.fulfilled, (state, action) => {
                state.loading = false;
                // state.success = 'Student status updated';
                state.students = state.students.map(student =>
                    student.userId._id === action.payload.userId
                        ? {
                            ...student,
                            userId: {
                                ...student.userId,
                                isActive: action.payload.isActive
                            }
                        }
                        : student
                );
            })
            .addCase(toggleStudentStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ============ TOGGLE TPO STATUS ============
        builder
            .addCase(toggleTPOStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleTPOStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'TPO status updated';
                const tpo = state.tpos.find(t => t._id === action.payload.userId);
                if (tpo) {
                    tpo.isActive = action.payload.isActive;
                }
            })
            .addCase(toggleTPOStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // ============ BULK UPLOAD STUDENTS ============
        builder
            .addCase(bulkUploadStudents.pending, (state) => {
                state.bulkLoading = true;
                state.bulkError = null;
            })
            .addCase(bulkUploadStudents.fulfilled, (state, action) => {
                state.bulkLoading = false;
                state.bulkResult = action.payload;
                state.success = 'Bulk upload completed';
            })
            .addCase(bulkUploadStudents.rejected, (state, action) => {
                state.bulkLoading = false;
                state.bulkError = action.payload;
            });

        // ============ BULK UPLOAD ACADEMIC ============
        builder
            .addCase(bulkUploadAcademic.pending, (state) => {
                state.bulkLoading = true;
                state.bulkError = null;
            })
            .addCase(bulkUploadAcademic.fulfilled, (state, action) => {
                state.bulkLoading = false;
                state.bulkResult = action.payload;
                state.success = 'Academic data uploaded successfully';
            })
            .addCase(bulkUploadAcademic.rejected, (state, action) => {
                state.bulkLoading = false;
                state.bulkError = action.payload;
            });

        // ============ BULK CREATE TPOs ============
        builder
            .addCase(bulkCreateTPOs.pending, (state) => {
                state.bulkLoading = true;
                state.bulkError = null;
            })
            .addCase(bulkCreateTPOs.fulfilled, (state, action) => {
                state.bulkLoading = false;
                state.bulkResult = action.payload;
                state.success = 'TPO bulk creation completed';
            })
            .addCase(bulkCreateTPOs.rejected, (state, action) => {
                state.bulkLoading = false;
                state.bulkError = action.payload;
            });
    },
});

export const { clearError, clearSuccess, clearBulkResult } = adminSlice.actions;
export default adminSlice.reducer;
