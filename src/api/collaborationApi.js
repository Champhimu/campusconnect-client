// import axios from 'axios';

// // Get JWT token from localStorage
// const getAuthToken = () => {
//   const token = localStorage.getItem('token') || localStorage.getItem('authToken');
//   return token;
// };

// // Create axios instance with default headers
// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
//   timeout: 10000,
// });

// // Add JWT token to all requests
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// /**
//  * Get all companies available for collaboration (not yet collaborated with college)
//  */
// export const getAvailableCompanies = async () => {
//   try {
//     const response = await axiosInstance.get('/tpo/companies/available');
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to fetch available companies',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// /**
//  * Send collaboration requests to multiple registered companies
//  * @param {Array<string>} companyIds - Array of company IDs
//  * @param {string} message - Optional message to include with request
//  */
// export const sendCollaborationRequests = async (companyIds, message = '') => {
//   try {
//     const response = await axiosInstance.post('/tpo/collaborations/send', {
//       companyIds,
//       message,
//     });
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to send collaboration requests',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// /**
//  * Send bulk collaboration invites to unregistered companies via email
//  * @param {Array<string>} emails - Array of email addresses
//  * @param {string} message - Optional message to include with invite
//  */
// export const sendBulkCompanyInvites = async (emails, message = '') => {
//   try {
//     const response = await axiosInstance.post('/tpo/collaborations/bulk-invite', {
//       emails,
//       message,
//     });
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to send bulk invites',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// /**
//  * Get all accepted collaborations for TPO's college
//  */
// export const getAcceptedCollaborations = async () => {
//   try {
//     const response = await axiosInstance.get('/tpo/collaborations/accepted');
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to fetch accepted collaborations',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// /**
//  * Get all pending collaboration requests for TPO's college
//  */
// export const getPendingCollaborations = async () => {
//   try {
//     const response = await axiosInstance.get('/tpo/collaborations/pending');
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to fetch pending collaborations',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// /**
//  * Accept a collaboration request
//  * @param {string} collaborationId - Collaboration ID
//  */
// export const acceptCollaborationRequest = async (collaborationId) => {
//   try {
//     const response = await axiosInstance.patch(
//       `/tpo/collaborations/${collaborationId}/accept`,
//       {}
//     );
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to accept collaboration',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// /**
//  * Reject a collaboration request
//  * @param {string} collaborationId - Collaboration ID
//  * @param {string} reason - Reason for rejection
//  */
// export const rejectCollaborationRequest = async (collaborationId, reason = '') => {
//   try {
//     const response = await axiosInstance.patch(
//       `/tpo/collaborations/${collaborationId}/reject`,
//       { reason }
//     );
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to reject collaboration',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// /**
//  * Create a job drive after collaboration acceptance
//  * @param {Object} jobDriveData - Job drive details
//  */
// export const createJobDrive = async (jobDriveData) => {
//   try {
//     const response = await axiosInstance.post('/tpo/job-drives', jobDriveData);
//     return response.data;
//   } catch (error) {
//     throw {
//       message: error.response?.data?.message || 'Failed to create job drive',
//       status: error.response?.status,
//       error,
//     };
//   }
// };

// export default axiosInstance;
