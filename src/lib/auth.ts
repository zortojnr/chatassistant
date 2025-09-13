import { supabase } from './supabase';
import { UserData } from '../types/user';

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
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('student_id', studentId)
      .single();

    if (error || !data) {
      return null;
    }

    // For now, use default password "password" for all students
    if (password !== 'password') {
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
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function registerStudent(userData: any): Promise<AuthUser | null> {
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

    if (error || !data) {
      console.error('Registration error:', error);
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
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

export async function loginAdmin(username: string, password: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      return null;
    }

    // For now, use simple password check
    if (password !== 'admin123') {
      return null;
    }

    return {
      id: data.id,
      username: data.username,
      role: data.role,
    };
  } catch (error) {
    console.error('Admin login error:', error);
    return null;
  }
}