import React, { useState } from 'react';
import { GraduationCap, Building2, Mail, User, Phone, FileText, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitRegistrationRequest } from "../../api/requestApi";

const RequestAccessPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('campus');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [campusFormData, setCampusFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    instituteName: '',
    designation: '',
    instituteWebsite: '',
    message: ''
  });

  const [companyFormData, setCompanyFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    designation: '',
    companyWebsite: '',
    industry: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleCampusInputChange = (e) => {
    const { name, value } = e.target;
    setCampusFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    const formData = activeTab === 'campus' ? campusFormData : companyFormData;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (activeTab === 'campus') {
      if (!formData.instituteName.trim()) {
        newErrors.instituteName = 'Institute name is required';
      }
      if (!formData.designation.trim()) {
        newErrors.designation = 'Designation is required';
      }
    } else {
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (!formData.designation.trim()) {
        newErrors.designation = 'Designation is required';
      }
      if (!formData.industry.trim()) {
        newErrors.industry = 'Industry is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const formData = activeTab === 'campus' ? campusFormData : companyFormData;
    const requestType = activeTab === 'campus' ? "CAMPUS" : "COMPANY";
    const instituteOrCompanyName = activeTab === 'campus' ? formData.instituteName : formData.companyName;
    const website = activeTab === 'campus' ? formData.instituteWebsite : formData.companyWebsite;
    const payload = {
      requestType,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      instituteOrCompanyName,
      website,
      additionalInformation: formData.message,
      designation: formData.designation,
      industry: formData.industry
    };

    try {
      const response = await submitRegistrationRequest(payload);
      alert("Form Submitted Successfully! Team will contact you soon");
      console.log("Request submitted:", response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
    // setTimeout(() => {
    //   setIsLoading(false);
    //   const formData = activeTab === 'campus' ? campusFormData : companyFormData;
    //   console.log('Request submitted:', { type: activeTab, data: formData });
    //   setIsSubmitted(true);
    // }, 1500);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    if (activeTab === 'campus') {
      setCampusFormData({
        fullName: '',
        email: '',
        phone: '',
        instituteName: '',
        designation: '',
        instituteWebsite: '',
        message: ''
      });
    } else {
      setCompanyFormData({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        designation: '',
        companyWebsite: '',
        industry: '',
        message: ''
      });
    }
    setErrors({});
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSubmitted(false);
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your access request has been received. Our team will review your application and get back to you within 24-48 hours.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 text-yellow-800">
                <Clock className="w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-sm">Status: Pending Approval</p>
                  <p className="text-xs mt-1">You'll receive an email once your request is processed.</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formData = activeTab === 'campus' ? campusFormData : companyFormData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">On-Campus Placement Management System</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our comprehensive placement ecosystem designed to bridge the gap between educational institutions and leading organizations. 
            Submit your access request below to get started with our platform.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => handleTabChange('campus')}
              className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === 'campus'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Campus Request
            </button>
            <button
              onClick={() => handleTabChange('company')}
              className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === 'company'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Company Request
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={activeTab === 'campus' ? handleCampusInputChange : handleCompanyInputChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email & Phone - Two Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={activeTab === 'campus' ? handleCampusInputChange : handleCompanyInputChange}
                      placeholder="you@example.com"
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={activeTab === 'campus' ? handleCampusInputChange : handleCompanyInputChange}
                      placeholder="9876543210"
                      className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              {/* Campus Specific Fields */}
              {activeTab === 'campus' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institute Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="instituteName"
                        value={formData.instituteName}
                        onChange={handleCampusInputChange}
                        placeholder="Enter Institute Name"
                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.instituteName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.instituteName && <p className="mt-1 text-sm text-red-600">{errors.instituteName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation *
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleCampusInputChange}
                        placeholder="e.g., Training & Placement Officer"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.designation ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institute Website
                      </label>
                      <input
                        type="url"
                        name="instituteWebsite"
                        value={formData.instituteWebsite}
                        onChange={handleCampusInputChange}
                        placeholder="https://institute.edu"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Company Specific Fields */}
              {activeTab === 'company' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleCompanyInputChange}
                        placeholder="Enter Company Name"
                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.companyName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation *
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleCompanyInputChange}
                        placeholder="e.g., HR Manager, Recruiter"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.designation ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                      </label>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleCompanyInputChange}
                        placeholder="e.g., IT, Finance, Manufacturing"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                          errors.industry ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Website
                    </label>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleCompanyInputChange}
                      placeholder="https://company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </>
              )}

              {/* Message/Additional Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={activeTab === 'campus' ? handleCampusInputChange : handleCompanyInputChange}
                    placeholder="Any additional details you'd like to share..."
                    rows="4"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Note:</span> All access requests are processed securely. 
                  You'll receive an email notification once your account credentials are ready.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-lg ${
                  isLoading 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-blue-700 hover:shadow-xl active:scale-95'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6" onClick={() => navigate('/login  ')}>
          Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default RequestAccessPage;