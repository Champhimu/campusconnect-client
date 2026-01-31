import axiosInstance from "../api/axiosInstance";

export const uploadResumeAndExtractSkills = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await axiosInstance.post(`/student/resume/upload`,formData);
    console.log('Upload response:', response);
    return response.data;
  } catch (error) {
    console.error('Upload error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    throw error.response?.data || { message: 'Resume upload failed' };
  }
};

export const updateStudentProfile = async (payload) => {
  try{
    console.log("Updating student profile with payload:", payload);
    const response = await axiosInstance.put(`/student/updateStudentProfile`,payload);

    return response.data;
  } catch (error) {
    console.error('Profile update error details:', {
      message: error.message,
      status: error.response?.status,
    });
    throw error.response?.data || { message: 'Profile update failed' };
  }
};

export const getStudentProfile = async () => {
  try{
    const response = await axiosInstance.get(`/student/getProfile`);
    return response.data;
  } catch (error) {
    console.error('Get profile error details:', {
      message: error.message,
      status: error.response?.status,
    });
    throw error.response?.data || { message: 'Get profile failed' };
  } 
};
