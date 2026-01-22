import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/admin/userMgmtSlice';
import collaborationsReducer from "./slices/collaborationsSlice";
import jobDriveReducer from "./slices/jobDriveSlice";
import companyCollaborationsReducer from './slices/companyCollaborationSlice';
import companyDriveReducer from './slices/companyDriveSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    collaborations: collaborationsReducer,
    jobDrive: jobDriveReducer,
    companyCollaborations: companyCollaborationsReducer,
    companyDrives: companyDriveReducer,
  },
});

export default store;
