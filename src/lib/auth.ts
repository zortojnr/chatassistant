import { supabase } from './supabase';
import { isUsingDemoCredentials } from './supabase';
import { UserData } from '../types/user';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// Mock data for development when Supabase is not available
const MOCK_STUDENTS = [
  {
    id: '1',
    student_id: 'CSC/20U/1234',
    email: 'student@mau.edu.ng',
    first_name: 'John',
    last_name: 'Atsale',
    faculty: 'Faculty of Computing',
    level: '300 Level',
    year: '2024',
    phone_number: '08012345678',
    student_type: 'Regular Undergraduate',
    department: 'Computer Science'
  },
  {
    id: '2',
    student_id: 'ENG/21U/5678',
    email: 'jane@mau.edu.ng',
    first_name: 'Jane',
    last_name: 'Okoro',
    faculty: 'Faculty of Engineering',
    level: '200 Level',
    year: '2024',
    phone_number: '08087654321',
    student_type: 'Regular Undergraduate',
    department: 'Civil Engineering'
  },
  {
    id: '3',
    student_id: 'PHY/22U/9012',
    email: 'physics@mau.edu.ng',
    first_name: 'Ahmed',
    last_name: 'Ibrahim',
    faculty: 'Faculty of Physical Science',
    level: '100 Level',
    year: '2024',
    phone_number: '08098765432',
    student_type: 'Regular Undergraduate',
    department: 'Physics'
  },
  {
    id: '4',
    student_id: 'BIO/20U/3456',
    email: 'biology@mau.edu.ng',
    first_name: 'Fatima',
    last_name: 'Yusuf',
    faculty: 'Faculty of Life Science',
    level: '400 Level',
    year: '2024',
    phone_number: '08076543210',
    student_type: 'Regular Undergraduate',
    department: 'Biology'
  },
  {
    id: '5',
    student_id: 'EDU/19U/7890',
    email: 'education@mau.edu.ng',
    first_name: 'Musa',
    last_name: 'Aliyu',
    faculty: 'Faculty of Education',
    level: '500 Level',
    year: '2024',
    phone_number: '08065432109',
    student_type: 'Regular Undergraduate',
    department: 'Educational Psychology'
  }
];

const MOCK_ADMIN = {
  id: 'admin1',
  username: 'admin',
  role: 'administrator'
};

export interface AuthUser extends UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  studentType?: string;
  department?: string;
}

export async function loginStudent(studentId: string, password: string): Promise<AuthUser | null> {
  const result = await loginStudentWithTimeout(studentId, password);
  
  // Track user login for admin dashboard
  if (result && isUsingDemoCredentials) {
    const demoUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    const existingUser = demoUsers.find((user: any) => user.studentId === result.studentId);
    
    if (!existingUser) {
      demoUsers.push({
        ...result,
        loginTime: new Date().toISOString()
      });
      localStorage.setItem('demoUsers', JSON.stringify(demoUsers));
    }
  }
  
  return result;
}

export async function registerStudent(userData: any): Promise<AuthUser | null> {
  try {
    if (!isUsingDemoCredentials) {
      const { data, error } = await supabase
        .from('students')
        .insert({
          student_id: userData.studentId,
          email: userData.email,
          password_hash: 'password', // Default password
          faculty: userData.faculty,
          level: userData.level,
          year: userData.year,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone_number: userData.phoneNumber,
          student_type: userData.studentType,
          department: userData.department,
        })
        .select()
        .single();

      if (!error && data) {
        return {
          id: data.id,
          studentId: data.student_id,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          faculty: data.faculty,
          level: data.level,
          year: data.year,
          phoneNumber: data.phone_number,
          studentType: data.student_type,
          department: data.department,
        };
      }
    }

    const newStudent = {
      id: Date.now().toString(),
      studentId: userData.studentId || `TEMP/${new Date().getFullYear().toString().slice(-2)}/${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      faculty: userData.faculty,
      level: userData.level,
      year: userData.year,
      phoneNumber: userData.phoneNumber,
      studentType: userData.studentType,
      department: userData.department,
    };

    // Track new user registration for admin dashboard
    if (isUsingDemoCredentials) {
      const demoUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
      demoUsers.push({
        ...newStudent,
        loginTime: new Date().toISOString()
      });
      localStorage.setItem('demoUsers', JSON.stringify(demoUsers));
    }

    return newStudent;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

export async function loginAdmin(username: string, password: string): Promise<any> {
  try {
    console.log('Admin login attempt - Username:', username, 'Password:', password);
    
    // Skip Supabase if using demo credentials
    if (!isUsingDemoCredentials) {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (!error && data) {
        // For now, use simple password check
        if (password !== 'admin123') {
          return null;
        }

        return {
          id: data.id,
          username: data.username,
          role: data.role,
        };
      }
    }

    // Fallback to mock admin
    console.log('Checking credentials against mock admin...');
    
    if (username.toLowerCase().trim() !== 'admin') {
      console.log('Invalid username - Expected: admin, Got:', username.toLowerCase().trim());
      return null;
    }

    if (password.trim() !== 'admin123') {
      console.log('Invalid password - Expected: admin123, Got:', password.trim());
      return null;
    }

    console.log('Admin login successful');
    return {
      id: MOCK_ADMIN.id,
      username: MOCK_ADMIN.username,
      role: MOCK_ADMIN.role,
    };
  } catch (error) {
    console.error('Admin login error:', error);
    return null;
  }
}

export async function loginStudentWithTimeout(studentId: string, password: string): Promise<AuthUser | null> {
  try {
    console.log('Attempting login with:', studentId, password);
    
    // Check if password is correct first
    if (password !== 'password') {
      console.log('Password mismatch');
      return null;
    }

    // Validate student ID format (XXX/YYZ/NNNN)
    const studentIdPattern = /^[A-Z]{3}\/\d{2}[A-Z]\/\d{4}$/;
    if (!studentIdPattern.test(studentId)) {
      console.log('Invalid student ID format');
      return null;
    }

    // Skip Supabase if using demo credentials
    if (!isUsingDemoCredentials) {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_id', studentId)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          studentId: data.student_id,
          email: data.email,
          firstName: data.first_name,
          lastName: data.last_name,
          faculty: data.faculty,
          level: data.level,
          year: data.year,
          phoneNumber: data.phone_number,
          studentType: data.student_type,
          department: data.department,
        };
      }
    }

    // Generate student data from ID format for any valid student ID
    const facultyMap: { [key: string]: string } = {
      'CSC': 'Faculty of Computing',
      'AGR': 'Faculty of Agriculture',
      'EDU': 'Faculty of Education',
      'ENG': 'Faculty of Engineering',
      'CHE': 'Faculty of Engineering',
      'CIV': 'Faculty of Engineering',
      'EEE': 'Faculty of Engineering',
      'MEE': 'Faculty of Engineering',
      'PHY': 'Faculty of Physical Science',
      'MAT': 'Faculty of Physical Science',
      'STA': 'Faculty of Physical Science',
      'GEO': 'Faculty of Physical Science',
      'BIO': 'Faculty of Life Science',
      'BOT': 'Faculty of Life Science',
      'ZOO': 'Faculty of Life Science',
      'MIC': 'Faculty of Life Science',
      'BCH': 'Faculty of Life Science'
    };

    const departmentCode = studentId.substring(0, 3);
    const yearCode = studentId.substring(4, 6);
    const faculty = facultyMap[departmentCode] || 'Faculty of Computing';
    
    // Generate level based on current year and admission year
    const currentYear = new Date().getFullYear();
    const admissionYear = 2000 + parseInt(yearCode);
    const yearsSinceAdmission = currentYear - admissionYear;
    let level = '100 Level';
    
    if (yearsSinceAdmission >= 4) level = '500 Level';
    else if (yearsSinceAdmission >= 3) level = '400 Level';
    else if (yearsSinceAdmission >= 2) level = '300 Level';
    else if (yearsSinceAdmission >= 1) level = '200 Level';

    console.log('Login successful for:', studentId);
    return {
      id: Date.now().toString(),
      studentId: studentId,
      email: `${studentId.toLowerCase().replace(/\//g, '.')}@mau.edu.ng`,
      firstName: 'Student',
      lastName: 'User',
      faculty: faculty,
      level: level,
      year: currentYear.toString(),
      phoneNumber: '08012345678',
      studentType: 'Regular Undergraduate',
      department: departmentCode,
    };
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}
