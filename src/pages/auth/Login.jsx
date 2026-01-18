import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, LogIn, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input"; // Assuming you have an Input component
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

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

      switch (formData.role) {
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'tpo':
          navigate('/dashboard/tpo');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'company':
          navigate('/dashboard/company');
          break;
        default:
          navigate('/');
      }
    }, 1500);
  };

  const selectedRole = roles.find(r => r.value === formData.role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 backdrop-blur">
        <Card className="w-full shadow-xl rounded-2xl" style={{maxWidth: "450px"}}>
        <CardHeader>
          <div className="text-center mb-6">
            <div className="inline-flex w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-3">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-xl font-bold">On-Campus Placement Management System</h1>
          </div>
        </CardHeader>

        <CardContent>
          {/* Role */}
          <div className="mb-5 relative">
            <Label>Select Role <span className="text-red-500">*</span></Label>

            <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Round" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value} onClick={() => handleRoleSelect(role.value)}>{role.label}</SelectItem>
                  ))}
                </SelectContent>
            </Select>

            {/* <Button
              variant="outline"
              onClick={() => setShowRoleDropdown(prev => !prev)}
              className="w-full flex items-center justify-between"
            >
              <span className="text-gray-700">{selectedRole ? selectedRole.label : 'Choose Role'}</span>
              <ChevronDown className={`transition-transform duration-200 ${showRoleDropdown ? 'rotate-180' : ''}`} />
            </Button> */}

            {/* Dropdown */}
            {/* {showRoleDropdown && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="absolute z-20 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {roles.map((role) => (
                      <DropdownMenuItem
                        key={role.value}
                        onClick={() => handleRoleSelect(role.value)}
                        className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition ${
                          formData.role === role.value ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {role.label}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuTrigger>
              </DropdownMenu>
            )} */}
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label>Email Address <span className="text-red-500">*</span></Label>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="mb-6">
            <Label>Password <span className="text-red-500">*</span></Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleInputChange}
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
              <span className="text-white-600">Remember me</span>
            </label>

            <Button variant="link" onClick={() => navigate('/forgot-password')}>
              Forgot Password?
            </Button>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 shadow-lg ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-xl active:scale-95'
            }`}
          >
            {isLoading ? 'Logging in...' : <><LogIn /> Login</>}
          </Button>

          {/* Sign up link */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{' '}
            <Button variant="link" onClick={() => navigate('/requestTrial')}>
              Request here
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
