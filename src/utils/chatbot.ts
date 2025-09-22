import { UserData } from '../types/user';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';
import { mauStudentKnowledgeBase, searchMauKnowledgeBase } from '../data/mauKnowledgeBase';

interface ChatResponse {
  content: string;
  intent: string;
  confidence: number;
}

// Intent classification patterns
const INTENT_PATTERNS = {
  greeting: [
    /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
    /^(how are you|what's up|sup)/i
  ],
  academic: [
    /\b(course|registration|register|grade|grading|result|transcript|cgpa|gpa)\b/i,
    /\b(exam|examination|test|assignment|semester|academic)\b/i,
    /\b(class|lecture|timetable|schedule)\b/i
  ],
  payment: [
    /\b(fee|fees|payment|pay|money|cost|price|tuition)\b/i,
    /\b(bank|transfer|online payment|pos)\b/i,
    /\b(receipt|installment|deadline)\b/i
  ],
  registration: [
    /\b(register|registration|enroll|enrollment|course registration)\b/i,
    /\b(add course|drop course|withdraw)\b/i,
    /\b(late registration|registration period)\b/i
  ],
  campus: [
    /\b(campus|location|address|hostel|accommodation|library)\b/i,
    /\b(facility|facilities|building|office|department)\b/i,
    /\b(transport|parking|security)\b/i
  ],
  contact: [
    /\b(contact|phone|email|office|help|support)\b/i,
    /\b(emergency|urgent|assistance)\b/i
  ],
  leadership: [
    /\b(vice chancellor|vc|deputy|management|leadership)\b/i,
    /\b(administration|staff|faculty head)\b/i
  ]
};

// Entity extraction patterns
const ENTITY_PATTERNS = {
  courseCode: /\b[A-Z]{3}\s?\d{3}\b/g,
  level: /\b\d{3}\s?level\b/gi,
  faculty: /\bfaculty\s+of\s+\w+/gi
};

function classifyIntent(message: string): { intent: string; confidence: number } {
  const normalizedMessage = message.toLowerCase().trim();
  
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(normalizedMessage)) {
        return { intent, confidence: 0.8 };
      }
    }
  }
  
  return { intent: 'general', confidence: 0.5 };
}

function extractEntities(message: string): Record<string, string[]> {
  const entities: Record<string, string[]> = {};
  
  for (const [entityType, pattern] of Object.entries(ENTITY_PATTERNS)) {
    const matches = message.match(pattern);
    if (matches) {
      entities[entityType] = matches;
    }
  }
  
  return entities;
}

function generateResponse(intent: string, message: string, userData: UserData): string {
  const entities = extractEntities(message);
  
  // First try to get response from the comprehensive knowledge base
  const kbResponse = searchMauKnowledgeBase(message);
  if (kbResponse && !kbResponse.includes('What specific information would you like to know')) {
    return kbResponse;
  }
  
  switch (intent) {
    case 'greeting':
      return `Hello! I'm your MAU Assistant. I can help you with academic information, course registration, fee payments, campus services, and more. What would you like to know?`;
    
    case 'academic':
      if (message.toLowerCase().includes('grading') || message.toLowerCase().includes('grade')) {
        return searchMauKnowledgeBase('grading system');
      }
      
      if (message.toLowerCase().includes('registration') || message.toLowerCase().includes('register')) {
        return searchMauKnowledgeBase('course registration');
      }
      
      if (message.toLowerCase().includes('result') || message.toLowerCase().includes('transcript')) {
        return `To access your academic records:

Check Results:
• Log into the Student Portal with your student ID
• Navigate to Academic Records
• View semester results and CGPA
• Results published 4-6 weeks after exams

Get Transcript:
• Visit the Registry Office
• Submit transcript application form
• Provide payment receipt and valid ID
• Processing takes 3-5 working days

Need help with your Student Portal login? Contact ICT Support at ict@mau.edu.ng`;
      }
      
      return `I can help you with academic matters including:
• Course registration and add/drop procedures
• Grading system and CGPA calculation
• Result checking and transcript requests
• Academic calendar and important dates
• Examination procedures

What specific academic information do you need?`;
    
    case 'payment':
      return searchMauKnowledgeBase('fees payment');
    
    case 'registration':
      return searchMauKnowledgeBase('course registration');
    
    case 'campus':
      if (message.toLowerCase().includes('location') || message.toLowerCase().includes('address')) {
        return searchMauKnowledgeBase('campus location');
      }
      
      if (message.toLowerCase().includes('library')) {
        return searchMauKnowledgeBase('library');
      }
      
      if (message.toLowerCase().includes('hostel') || message.toLowerCase().includes('accommodation')) {
        return searchMauKnowledgeBase('accommodation hostel');
      }
      
      return searchMauKnowledgeBase('campus facilities');
    
    case 'contact':
      return searchMauKnowledgeBase('contact information');
    
    case 'leadership':
      return `MAU Leadership Structure:

Vice-Chancellor: Prof. Ibrahim Umar

Deputy Vice-Chancellors:
• Deputy VC (Academic)
• Deputy VC (Administration)

Key Administrative Officers:
• Registrar
• Bursar  
• Librarian
• Dean of Student Affairs
• Various Faculty Deans

Each faculty has its own Dean and administrative structure. The university leadership is committed to academic excellence and student welfare.

For specific leadership contacts, visit the university website at https://mau.edu.ng`;
    
    default:
      return searchMauKnowledgeBase('general information');
  }
}

export async function processMessage(message: string, userData: UserData): Promise<ChatResponse> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { intent, confidence } = classifyIntent(message);
  const content = generateResponse(intent, message, userData);
  
  return {
    content,
    intent,
    confidence
  };
}