import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const uploadResumeAndExtractSkills = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
  console.log('API URL:', `${process.env.REACT_APP_BASE_URL}/student/resume/upload`);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/student/resume/upload`,
      formData,
      {
        headers: getAuthHeaders()
      }
    );
    console.log('Upload response:', response.data);
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

export const enhanceResume = async (data) => {
  // MOCK RESPONSE (for now)
  return [
    "Use more action verbs in your resume",
    "Quantify your achievements with numbers",
    "Match keywords from job description",
    "Improve formatting for better readability",
  ];
};
