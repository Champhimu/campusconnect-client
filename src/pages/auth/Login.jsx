import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, LogIn, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: ''
  });

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'tpo', label: 'TPO' },
    { value: 'admin', label: 'Admin' },
    { value: 'company', label: 'Company' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleSelect = (roleValue) => {
    setFormData(prev => ({
      ...prev,
      role: roleValue
    }));
    setErrors(prev => ({ ...prev, role: '' }));
    setShowRoleDropdown(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login Data:', formData);
      alert(`Login Successful\nRole: ${formData.role}`);
    }, 1500);
  };

  const selectedRole = roles.find(r => r.value === formData.role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-6">
          <div className="inline-flex w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-3">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold">On-Campus Placement Management System</h1>
        </div>

        {/* Role */}
        <div className="mb-5 relative">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Role <span className="text-red-500">*</span>
          </label>

          <button
            type="button"
            onClick={() => setShowRoleDropdown(prev => !prev)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between bg-white focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-gray-700">
              {selectedRole ? selectedRole.label : 'Choose Role'}
            </span>
            <ChevronDown
              className={`transition-transform duration-200 ${
                showRoleDropdown ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown */}
          {showRoleDropdown && (
            <div className="absolute z-20 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => handleRoleSelect(role.value)}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition ${
                    formData.role === role.value
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Email */}
        <label className="block mb-2 text-sm font-medium">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder='Email Address'
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 py-3 border rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <label className="block mb-2 text-sm font-medium">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder='password'
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-10 py-3 border rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-600">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>


      <button
  onClick={handleSubmit}
  disabled={isLoading}
  className={`w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-lg ${
    isLoading 
      ? 'opacity-70 cursor-not-allowed' 
      : 'hover:bg-blue-700 hover:shadow-xl active:scale-95'
  }`}
>

          {isLoading ? 'Logging in...' : <><LogIn /> Login</>}
        </button>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{' '}
          <button onClick={() => navigate('/requestTrial')} className="text-blue-600 underline">
            Request here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
