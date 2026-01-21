import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/admin/userMgmtSlice';
import collaborationsReducer from "./slices/collaborationsSlice";
import jobDriveReducer from "./slices/jobDriveSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    collaborations: collaborationsReducer,
    jobDrive: jobDriveReducer,
  },
});

export default store;
