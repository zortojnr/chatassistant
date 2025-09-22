import { UserData } from '../types/user';
import { searchMauKnowledgeBase } from '../data/mauKnowledgeBase';

interface ChatResponse {
  content: string;
  intent: string;
  confidence: number;
}

// Simplified intent classification
function classifyIntent(message: string): { intent: string; confidence: number } {
  const lowerQuery = message.toLowerCase();
  
  // Check for specific keywords to determine intent
  if (lowerQuery.includes('admission') || lowerQuery.includes('jamb') || lowerQuery.includes('requirements')) {
    return { intent: 'admissions', confidence: 0.9 };
  }
  
  if (lowerQuery.includes('fee') || lowerQuery.includes('payment') || lowerQuery.includes('pay') || lowerQuery.includes('rrr')) {
    return { intent: 'fees', confidence: 0.9 };
  }
  
  if (lowerQuery.includes('hostel') || lowerQuery.includes('accommodation')) {
    return { intent: 'hostel', confidence: 0.9 };
  }
  
  if (lowerQuery.includes('course') || lowerQuery.includes('registration') || lowerQuery.includes('grade') || lowerQuery.includes('result')) {
    return { intent: 'academic', confidence: 0.9 };
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email')) {
    return { intent: 'contacts', confidence: 0.9 };
  }
  
  if (lowerQuery.includes('location') || lowerQuery.includes('library') || lowerQuery.includes('campus')) {
    return { intent: 'campus', confidence: 0.9 };
  }
  
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return { intent: 'greeting', confidence: 0.9 };
  }
  
  return { intent: 'general', confidence: 0.7 };
}

function generateResponse(intent: string, message: string, userData: UserData): string {
  // Always try the knowledge base first
  const kbResponse = searchMauKnowledgeBase(message);
  
  // If knowledge base has a specific answer, use it
  if (kbResponse && !kbResponse.includes('What specific information would you like to know about MAU?')) {
    return kbResponse;
  }
  
  // Handle greetings specially
  if (intent === 'greeting') {
    return `Hello! I'm your MAU Assistant. 👋

I can help you with:
• **Admissions** - Requirements, status check, documents
• **Fees & Payment** - School fees, RRR generation, receipts  
• **Accommodation** - Hostel application, fees, allocation
• **Academic** - Course registration, grading, results
• **Campus Life** - Facilities, contacts, student services

What would you like to know about MAU?`;
  }
  
  // For all other cases, return the knowledge base response
  return kbResponse;
}

export async function processMessage(message: string, userData: UserData): Promise<ChatResponse> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const { intent, confidence } = classifyIntent(message);
  const content = generateResponse(intent, message, userData);
  
  return {
    content,
    intent,
    confidence
  };
}