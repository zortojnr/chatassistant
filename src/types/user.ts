export interface UserData {
  studentId: string;
  faculty: string;
  level: string;
  year: string;
}

export interface AuthUser extends UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  studentType?: string;
  department?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages?: ChatMessage[];
}

export interface QuickInfoCategory {
  id: string;
  title: string;
  icon: string;
  items: QuickInfoItem[];
}

export interface QuickInfoItem {
  question: string;
  answer: string;
}