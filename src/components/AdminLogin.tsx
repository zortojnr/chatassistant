import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { loginAdmin } from '../lib/auth';

interface AdminLoginProps {
  onLogin: (adminData: any) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin form submit - Username:', formData.username, 'Password:', formData.password);
    
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        console.log('Attempting admin login with credentials:', formData.username, formData.password);
        const adminData = await loginAdmin(formData.username, formData.password);
        console.log('Admin login result:', adminData);
        
        if (adminData) {
          console.log('Admin login successful, calling onLogin');
          onLogin(adminData);
        } else {
          console.log('Admin login failed');
          setErrors({ general: 'Invalid username or password' });
        }
      } catch (error) {
        console.error('Admin login error:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-mau-primary via-mau-secondary to-mau-primary flex items-center justify-center p-4">
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
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h1 className="text-white text-2xl md:text-3xl font-bold tracking-wider">
            MAU ADMIN
          </h1>
          <p className="text-mau-light text-sm mt-2">System Administration</p>
          <p className="text-white/80 text-sm mt-2">System Administration</p>
        </motion.div>

        {/* Admin Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-mau-primary flex items-center justify-center gap-2">
                <Shield size={24} />
                Admin Access
              </CardTitle>
              <CardDescription>
                Secure login for system administrators
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
                    Username
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter admin username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={errors.username ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter admin password"
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

                <Button 
                  type="submit" 
                  className="w-full bg-mau-primary hover:bg-mau-primary/90 text-white py-2 rounded-md transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Access Dashboard'}
                </Button>

                <Button
                  type="button"
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-mau-primary text-mau-primary hover:bg-mau-primary/10"
                >
                  Back to Student Login
                </Button>
              </form>

              <div className="mt-4 p-3 bg-mau-light rounded-md">
                <p className="text-xs text-gray-600 text-center">
                  Demo credentials: admin / admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;