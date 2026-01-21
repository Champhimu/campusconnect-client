import { useEffect, useState } from "react";
import { GraduationCap, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { ROLES } from "../../utils/roles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { clearError } from "../../redux/slices/admin/userMgmtSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { loading, error, isAuthenticated, user } = auth;

  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (error) {
      alert(error); // exact backend message
      // optional: clear after showing
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (user.role) {  
        case "STUDENT":
          navigate("/student");
          break;
        case "TPO":
          navigate("/tpo");
          break;  
        case "CADMIN":
          navigate("/admin");
          break;  
        case "COMPANY":
          navigate("/company");
          break;
        case "SUPERADMIN":
          navigate("/superadmin");
          break;
        default:
          navigate("/");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <div className="inline-flex w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mx-auto mb-3">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold">
            On-Campus Placement Management System
          </h1>
        </CardHeader>

        <CardContent>
          {/* Role */}
          <div className="mb-4">
            <Label>Select Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose role" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label>Email *</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label>Password *</Label>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4"
          >
            {loading ? "Logging in..." : <><LogIn /> Login</>}
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