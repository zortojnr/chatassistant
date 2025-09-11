export interface UserData {
  studentId: string;
  faculty: string;
  level: string;
  year: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  intent?: string;
  confidence?: number;
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