import { supabase } from './supabase';
import { UserData } from '../types/user';

// Mock data for development when Supabase is not available
const MOCK_STUDENTS = [
  {
    id: '1',
    student_id: 'CSC/20U/1234',
    email: 'student@mau.edu.ng',
    first_name: 'John',
    last_name: 'Doe',
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
    last_name: 'Smith',
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
  try {
    console.log('Attempting login with:', studentId, password);
    
    // Try Supabase first, fallback to mock data
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('student_id', studentId)
        .single();

      if (!error && data) {
        // For now, use default password "password" for all students
        if (password !== 'password') {
          console.log('Password mismatch for Supabase user');
          return null;
        }

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
    } catch (supabaseError) {
      console.log('Supabase not available, using mock data');
    }

    // Fallback to mock data
    const mockStudent = MOCK_STUDENTS.find(s => s.student_id === studentId);
    console.log('Found mock student:', mockStudent);
    
    if (!mockStudent) {
      console.log('No student found with ID:', studentId);
      return null;
    }

    if (password !== 'password') {
      console.log('Password mismatch for mock user');
      return null;
    }

    console.log('Login successful for:', mockStudent.student_id);
    return {
      id: mockStudent.id,
      studentId: mockStudent.student_id,
      email: mockStudent.email,
      firstName: mockStudent.first_name,
      lastName: mockStudent.last_name,
      faculty: mockStudent.faculty,
      level: mockStudent.level,
      year: mockStudent.year,
      phoneNumber: mockStudent.phone_number,
      studentType: mockStudent.student_type,
      department: mockStudent.department,
    };
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function registerStudent(userData: any): Promise<AuthUser | null> {
  try {
    // Try Supabase first, fallback to mock registration
    try {
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
    } catch (supabaseError) {
      console.log('Supabase not available, using mock registration');
    }

    // Fallback to mock registration
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

    return newStudent;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

export async function loginAdmin(username: string, password: string): Promise<any> {
  try {
    // Try Supabase first, fallback to mock data
    try {
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
    } catch (supabaseError) {
      console.log('Supabase not available, using mock admin');
    }

    // Fallback to mock admin
    if (username !== 'admin') {
      return null;
    }

    if (password !== 'admin123') {
      return null;
    }

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