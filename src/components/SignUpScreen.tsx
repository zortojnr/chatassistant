import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft } from 'lucide-react';

interface SignUpScreenProps {
  onBack: () => void;
  onSignUp: (userData: any) => void;
}

const STUDENT_TYPES = [
  'Regular Undergraduate',
  'Distance Learning',
  'Pre-Degree',
  'IJMB (Interim Joint Matriculation Board)',
  'Postgraduate (Masters)',
  'Postgraduate (PhD)'
];

const FACULTIES = [
  'Agriculture',
  'Computing', 
  'Engineering',
  'Life Sciences',
  'Education',
  'Physical Sciences'
];

const ACADEMIC_LEVELS = [
  '100 Level',
  '200 Level',
  '300 Level',
  '400 Level',
  '500 Level',
  'Pre-Degree',
  'IJMB',
  'Masters',
  'PhD'
];

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBack, onSignUp }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    studentType: '',
    faculty: '',
    level: '',
    department: '',
    year: new Date().getFullYear().toString()
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.studentType) newErrors.studentType = 'Please select student type';
    if (!formData.level) newErrors.level = 'Please select your academic level';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Generate temporary student ID for new users
        const tempId = `TEMP/${new Date().getFullYear().toString().slice(-2)}U/${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
        
        const userData = {
          ...formData,
          studentId: tempId,
          isNewUser: true
        };
        
        // Call the signup function which should handle registration
        onSignUp(userData);
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mau-primary via-mau-secondary to-mau-primary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
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
          <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wider">
            MODIBBO ADAMA UNIVERSITY
          </h1>
          <p className="text-mau-light text-sm mt-2">Knowledge and Humanism</p>
          <p className="text-white/80 text-sm mt-2">Knowledge and Humanism</p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-between mb-4">
                <Button
                  onClick={onBack}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-mau-primary hover:text-mau-secondary"
                >
                  <ArrowLeft size={16} />
                  Back
                </Button>
                <div></div>
              </div>
              <CardTitle className="text-2xl text-mau-primary">New Student Registration</CardTitle>
              <CardDescription>
                Create your MAU Assistant account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={errors.firstName ? 'border-red-500' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={errors.lastName ? 'border-red-500' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    placeholder="08012345678"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={errors.phoneNumber ? 'border-red-500' : ''}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Faculty (Optional)
                  </label>
                  <Select onValueChange={(value) => handleInputChange('studentType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your student type" />
                    </SelectTrigger>
                    <SelectContent>
                      {STUDENT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Faculty *
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
                      Academic Level *
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Computer Science"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-mau-primary hover:bg-mau-primary/90 text-white py-2 rounded-md transition-colors"
                >
                  Create Account & Access MAU Assistant
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpScreen;