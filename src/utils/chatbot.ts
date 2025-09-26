import { UserData } from '../types/user';
import { searchMauKnowledgeBase } from '../data/mauKnowledgeBase';
import { storeUnansweredQuestion, getCustomKnowledgeBase, searchCustomKnowledgeBase } from '../lib/knowledgeBaseManager';

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

async function generateResponse(intent: string, message: string, userData: UserData): Promise<string> {
  // Always try the knowledge base first
  const kbResponse = await searchMauKnowledgeBase(message);
  
  // If knowledge base has a specific answer, use it
  if (kbResponse && !kbResponse.includes('What specific information would you like to know about MAU?')) {
    return kbResponse;
  }
  
  // Handle greetings specially
  if (intent === 'greeting') {
    return `Hello! I'm your MAU Assistant. 👋

I can help you with:
• Admissions - Requirements, status check, documents
• Fees & Payment - School fees, RRR generation, receipts  
• Accommodation - Hostel application, fees, allocation
• Academic - Course registration, grading, results
• Campus Life - Facilities, contacts, student services

What would you like to know about MAU?`;
  }
  
  // For all other cases, return the knowledge base response
  return kbResponse;
}

export async function processMessage(message: string, userData: UserData, studentName?: string): Promise<ChatResponse> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // First check custom knowledge base
  const customKB = await getCustomKnowledgeBase();
  const customResponse = searchCustomKnowledgeBase(message, customKB);
  
  if (customResponse) {
    return {
      content: customResponse,
      intent: 'custom_knowledge',
      confidence: 0.95
    };
  }
  
  const { intent, confidence } = classifyIntent(message);
  const content = await generateResponse(intent, message, userData);
  
  // If no specific response found, provide a helpful fallback
  if (!content || content.includes('What specific information would you like to know about MAU?')) {
    // Store as unanswered question for admin review
    await storeUnansweredQuestion(
      message, 
      userData.studentId, 
      studentName || `${userData.studentId} User`
    );
    
    return {
      content: `I can help you with information about Modibbo Adama University (MAU) including:

📚 Academic: Course registration, grading system, results, transcripts
🎓 Admissions: Requirements, status check, admission letters, clearance
💰 Fees: Payment methods, RRR generation, receipts, deadlines
🏠 Accommodation: Hostel application, fees, allocation
🏛️ Campus: Location, library hours, facilities, student services
📞 Contacts: University contacts, emergency numbers, support

Quick Links:
• MAU Website: https://mau.edu.ng
• Student Portal: https://mau.edu.ng/portals
• Admissions Portal: https://mautech.safapply.com/

What specific information would you like to know about MAU?`,
      intent: 'general_help',
      confidence: 0.8
    };
  }
  
  // If we found a response but confidence is low, still store for potential improvement
  if (confidence < 0.8) {
    await storeUnansweredQuestion(message, userData.studentId, studentName || `${userData.studentId} User`);
  }
  
  return {
    content,
    intent,
    confidence
  };
}