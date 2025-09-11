import { UserData } from '../types/user';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';

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
  
  switch (intent) {
    case 'greeting':
      return `Hello! I'm your MAU Assistant. I can help you with academic information, course registration, fee payments, campus services, and more. What would you like to know?`;
    
    case 'academic':
      if (message.toLowerCase().includes('grading') || message.toLowerCase().includes('grade')) {
        return `MAU uses a 5-point grading system:
        
• A: 5.0 points (70-100%)
• B: 4.0 points (60-69%)
• C: 3.0 points (50-59%)
• D: 2.0 points (45-49%)
• E: 1.0 points (40-44%)
• F: 0.0 points (0-39%)

Your CGPA is calculated based on the total grade points earned divided by total credit units attempted.`;
      }
      
      if (message.toLowerCase().includes('registration') || message.toLowerCase().includes('register')) {
        return `Course registration at MAU is done through the Student Portal during designated periods. Here's what you need to know:

📋 **Requirements:**
• Clear all outstanding fees
• Meet academic requirements for your level
• Get advisor approval

🖥️ **Process:**
1. Log into the Student Portal
2. Navigate to Course Registration
3. Select courses for the semester
4. Submit for advisor approval
5. Print registration slip

⏰ Registration periods are announced on the university website and Student Portal.`;
      }
      
      if (message.toLowerCase().includes('result') || message.toLowerCase().includes('transcript')) {
        return `To access your academic records:

📊 **Check Results:**
• Log into the Student Portal with your student ID
• Navigate to Academic Records
• View semester results and CGPA

📜 **Get Transcript:**
• Visit the Academic Office
• Submit transcript application form
• Provide payment receipt and valid ID
• Processing takes 3-5 working days

Need help with your Student Portal login? Contact ICT Support.`;
      }
      
      return `I can help you with academic matters including:
• Course registration and add/drop procedures
• Grading system and CGPA calculation
• Result checking and transcript requests
• Academic calendar and important dates
• Examination procedures

What specific academic information do you need?`;
    
    case 'payment':
      return `MAU offers several payment methods for school fees:

💳 **Payment Options:**
• Online payment via Student Portal
• Bank transfer to university account
• POS payment at designated campus centers

🏦 **Bank Details:**
Contact the Bursary Department for current bank account details.

⏰ **Important Notes:**
• Payment deadlines are announced each semester
• Late payments may incur penalty fees
• Keep payment receipts for your records
• Installment options may be available (contact Bursary)

Need help with online payment? Contact ICT Support at the Help Desk.`;
    
    case 'registration':
      return `Course registration information for ${userData.level} students:

📅 **Registration Periods:**
• Announced on university website and Student Portal
• Usually at the beginning of each semester
• Late registration available with penalty fees

✅ **Requirements:**
• All fees must be paid
• Academic standing requirements met
• Advisor approval required

🔄 **Add/Drop Period:**
• First 2 weeks of semester
• Use Student Portal or visit Academic Office
• May require additional approvals

📞 **Need Help?**
Contact your Faculty Academic Office or visit the main Academic Office for assistance.`;
    
    case 'campus':
      if (message.toLowerCase().includes('location') || message.toLowerCase().includes('address')) {
        return `🏛️ **MAU Campus Location:**
Modibbo Adama University
Sangere, Girei LGA
Adamawa State, Nigeria

🏫 **Established:** 1981 (Renamed in 2021)
🎯 **Motto:** "Knowledge and Humanism"

The campus is easily accessible by public transport and private vehicles. Parking facilities are available on campus.`;
      }
      
      if (message.toLowerCase().includes('library')) {
        return `📚 **MAU Library Services:**

⏰ **Operating Hours:**
• Monday-Friday: 8:00 AM - 10:00 PM
• Saturday: 9:00 AM - 6:00 PM
• Closed on Sundays and public holidays

🔧 **Services Available:**
• Study spaces and reading rooms
• Computer lab with internet access
• Research assistance
• Digital resources and databases
• Printing and photocopying

📖 **Resources:**
• Academic books and journals
• Past questions and project materials
• Online databases and e-books

Visit the library for quiet study spaces and research support!`;
      }
      
      if (message.toLowerCase().includes('hostel') || message.toLowerCase().includes('accommodation')) {
        return `🏠 **MAU Accommodation:**

📝 **Application Process:**
• Apply through Student Affairs Office
• Submit required documents
• Pay accommodation fees
• Allocation based on availability

📋 **Requirements:**
• Completed accommodation form
• Passport photographs
• Admission letter (for new students)
• Payment receipt

🏢 **Facilities:**
• Male and female hostels available
• Basic furnishing provided
• Common areas and study spaces

📞 **Contact:** Student Affairs Office for current availability and rates.`;
      }
      
      return `I can provide information about MAU campus including:
• Campus location and directions
• Library services and hours
• Hostel accommodation
• Campus facilities and buildings
• Transportation and parking

What specific campus information do you need?`;
    
    case 'contact':
      return `📞 **MAU Contact Information:**

🆘 **Emergency Contacts:**
• Security: Campus Security Office
• Medical: University Health Center
• Fire Emergency: Contact Security immediately

🎓 **Academic Support:**
• Faculty Academic Office
• Head of Department
• Academic Advisor
• Main Academic Office

💻 **ICT Support:**
• ICT Help Desk
• Hours: Monday-Friday, 8:00 AM - 5:00 PM
• Services: Student Portal, email setup, WiFi assistance

🏢 **Administrative Offices:**
• Bursary Department (fees and payments)
• Student Affairs (accommodation, student life)
• Registry (transcripts, certificates)

Need a specific department contact? Let me know what you're looking for!`;
    
    case 'leadership':
      return `🏛️ **MAU Leadership:**

👨‍🎓 **Vice-Chancellor:**
Prof. Ibrahim Umar

👥 **Deputy Vice-Chancellors:**
• Deputy VC (Academic)
• Deputy VC (Administration)

🏢 **Administrative Structure:**
• Registrar
• Bursar
• Librarian
• Various Deans of Faculties

Each faculty has its own Dean and administrative structure. The university leadership is committed to academic excellence and student welfare.`;
    
    default:
      return `I'm here to help you with information about MAU! I can assist with:

🎓 **Academic:** Course registration, grading, results, transcripts
💳 **Payments:** Fee payment methods and procedures
🏛️ **Campus:** Location, facilities, library, accommodation
📞 **Contacts:** Department contacts and emergency information
👥 **Student Life:** Clubs, activities, and campus services

What would you like to know more about?`;
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