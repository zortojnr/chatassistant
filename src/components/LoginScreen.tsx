import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FACULTIES, ACADEMIC_LEVELS } from '../data/faculties';
import { UserData } from '../types/user';

interface LoginScreenProps {
  onLogin: (userData: UserData) => void;
  onSignUp: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    faculty: '',
    level: '',
    year: new Date().getFullYear().toString()
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.studentId) {
      newErrors.studentId = 'Student ID is required';
    } else if (!validateStudentId(formData.studentId)) {
      newErrors.studentId = 'Invalid format. Use: CSC/20U/1234';
    }

    if (!formData.faculty) {
      newErrors.faculty = 'Please select your faculty';
    }

    if (!formData.level) {
      newErrors.level = 'Please select your academic level';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mau-blue via-mau-dark-blue to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* University Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center p-3">
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
            className="text-green-200 text-sm mt-2"
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
              <CardTitle className="text-2xl text-mau-blue">Student Login</CardTitle>
              <CardDescription>
                Access your MAU Assistant Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  />
                  {errors.studentId && (
                    <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>
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
                  className="w-full bg-mau-blue hover:bg-mau-dark-blue text-white py-2 rounded-md transition-colors mb-4"
                >
                  Access MAU Assistant
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-3">
                    Don't have a student ID yet?
                  </p>
                  <Button
                    type="button"
                    onClick={onSignUp}
                    variant="outline"
                    className="w-full border-mau-blue text-mau-blue hover:bg-blue-50 flex items-center justify-center gap-2"
                  >
                    <UserPlus size={16} />
                    Sign Up as New Student
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginScreen;