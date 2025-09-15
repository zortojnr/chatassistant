import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FACULTIES, ACADEMIC_LEVELS } from '../data/faculties';
import { AuthUser } from '../types/user';
import { loginStudent } from '../lib/auth';

interface LoginScreenProps {
  onLogin: (userData: AuthUser) => void;
  onSignUp: () => void;
  onAdminLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, onAdminLogin }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
    faculty: '',
    level: '',
    year: new Date().getFullYear().toString()
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const universityName = "MODIBBO ADAMA UNIVERSITY";

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, universityName.length * 100 + 1000);

    return () => clearTimeout(timer);
  }, []);

  const validateStudentId = (id: string): boolean => {
    const pattern = /^[A-Z]{3}\/\d{2}[A-Z]\/\d{4}$/;
    return pattern.test(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    const newErrors: Record<string, string> = {};

    if (!formData.studentId) {
      newErrors.studentId = 'Student ID is required';
    } else if (!validateStudentId(formData.studentId)) {
      newErrors.studentId = 'Invalid format. Use: CSC/20U/1234';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.faculty) {
      newErrors.faculty = 'Please select your faculty';
    }

    if (!formData.level) {
      newErrors.level = 'Please select your academic level';
    }

    setErrors(newErrors);
    console.log('Validation errors:', newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      console.log('Attempting login...');
      try {
        const userData = await loginStudent(formData.studentId, formData.password);
        console.log('Login result:', userData);
        if (userData) {
          onLogin(userData);
        } else {
          setErrors({ general: 'Invalid student ID or password' });
        }
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mau-primary via-mau-secondary to-mau-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* University Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center p-2">
            <img 
              src="/MAU.jpg" 
              alt="MAU Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Animated University Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-white text-xl md:text-2xl font-bold tracking-wider">
            {universityName.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: universityName.length * 0.1 + 0.5 }}
            className="text-mau-light text-sm mt-2"
          >
            Knowledge and Humanism
          </motion.p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationComplete ? 1 : 0, 
            y: animationComplete ? 0 : 20 
          }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-mau-primary">Student Login</CardTitle>
              <CardDescription>
                Access your MAU Assistant Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student ID
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., CSC/20U/1234"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value.toUpperCase())}
                    className={errors.studentId ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.studentId && (
                    <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Faculty
                  </label>
                  <Select onValueChange={(value) => handleInputChange('faculty', value)}>
                    <SelectTrigger className={errors.faculty ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your faculty" />
                    </SelectTrigger>
                    <SelectContent>
                      {FACULTIES.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.faculty && (
                    <p className="text-red-500 text-xs mt-1">{errors.faculty}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Academic Level
                  </label>
                  <Select onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger className={errors.level ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACADEMIC_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.level && (
                    <p className="text-red-500 text-xs mt-1">{errors.level}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-mau-primary hover:bg-mau-secondary text-white py-2 rounded-md transition-colors mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Access MAU Assistant'}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Don't have a student ID yet?
                  </p>
                  <Button
                    type="button"
                    onClick={onSignUp}
                    variant="outline"
                    className="w-full border-mau-primary text-mau-primary hover:bg-mau-light flex items-center justify-center gap-2"
                  >
                    <UserPlus size={16} />
                    Sign Up as New Student
                  </Button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    onClick={onAdminLogin}
                    variant="ghost"
                    className="w-full text-mau-primary hover:bg-mau-light flex items-center justify-center gap-2"
                  >
                    <Shield size={16} />
                    Admin Access
                  </Button>
                </div>
              </form>

              <div className="mt-4 p-3 bg-mau-light rounded-md">
                <p className="text-xs text-gray-600 text-center">
                  Use any valid Student ID format (e.g., CSC/20U/1234, ENG/21U/5678, PHY/22U/9012) + password "password"
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;