import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          student_id: string
          email: string
          password_hash: string
          faculty: string
          level: string
          year: string
          first_name: string
          last_name: string
          phone_number: string
          student_type: string
          department: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          email: string
          password_hash: string
          faculty: string
          level: string
          year: string
          first_name: string
          last_name: string
          phone_number?: string
          student_type?: string
          department?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          email?: string
          password_hash?: string
          faculty?: string
          level?: string
          year?: string
          first_name?: string
          last_name?: string
          phone_number?: string
          student_type?: string
          department?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          student_id: string
          title: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          title: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          title?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          session_id: string
          content: string
          is_user: boolean
          intent: string
          confidence: number
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          content: string
          is_user: boolean
          intent?: string
          confidence?: number
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          content?: string
          is_user?: boolean
          intent?: string
          confidence?: number
        }
      }
      admin_users: {
        Row: {
          id: string
          username: string
          password_hash: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          username: string
          password_hash: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          password_hash?: string
          role?: string
        }
      }
    }
  }
}