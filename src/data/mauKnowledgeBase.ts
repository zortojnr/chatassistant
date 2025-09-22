// MAU Student Knowledge Base - Comprehensive Academic Information
export const mauKnowledgeBase = {
  university: {
    name: "Modibbo Adama University",
    location: "Yola, Adamawa State, Nigeria",
    established: "1988",
    type: "Federal University",
    motto: "Knowledge for Development",
    vision: "To be a world-class university that provides excellent education, research and community service for sustainable development.",
    mission: "To provide quality higher education, conduct cutting-edge research, and render community service that will contribute to national and global development.",
    website: "https://mau.edu.ng",
    viceChancellor: "Prof. Abdullahi Liman Tukur",
    deputyVCs: [
      "Deputy VC (Academic)",
      "Deputy VC (Administration)"
    ]
  }
};

// Enhanced Q&A Database with exact responses
export const qnaDatabase = [
  // Admissions
  {
    question: "What are the requirements for undergraduate admission?",
    answer: "At MAU, you need at least 5 credits in WAEC/NECO/NABTEB including English and Mathematics, plus JAMB UTME with the required cutoff. Check faculty requirements at [MAU Admissions](https://mau.edu.ng/admissions).",
    category: "admissions",
    keywords: ["requirements", "undergraduate", "jamb", "waec", "neco", "nabteb", "admission"]
  },
  {
    question: "How do I check my admission status?",
    answer: "Go to the [MAU Undergraduate Admission Portal](https://mautech.safapply.com/) or log into [JAMB CAPS](https://efacility.jamb.gov.ng/).",
    category: "admissions",
    keywords: ["admission status", "jamb", "caps", "check", "portal"]
  },
  {
    question: "How do I generate my admission letter?",
    answer: "Log in to the [JAMB portal](https://efacility.jamb.gov.ng/) to accept admission, then download your JAMB admission letter. The Exams & Records Unit will issue the MAU admission letter after clearance.",
    category: "admissions",
    keywords: ["admission letter", "jamb", "acceptance", "download", "generate"]
  },
  {
    question: "What documents do I need for clearance?",
    answer: "JAMB admission letter, WAEC/NECO/NABTEB results, birth certificate, local government ID, 8 passport photographs, and evidence of school fees payment.",
    category: "admissions",
    keywords: ["clearance", "documents", "admission", "registration", "requirements"]
  },
  {
    question: "How do I defer my admission?",
    answer: "Write a formal letter to the Registrar through your Head of Department. Pay the deferment fee (if applicable) at the bursary and process it at Exams & Records.",
    category: "admissions",
    keywords: ["deferment", "defer", "admission", "postpone"]
  },

  // Fees
  {
    question: "How much is the school fees?",
    answer: "Fees vary by faculty and level. Check the latest breakdown at [MAU Portals](https://mau.edu.ng/portals). On average: **₦40,000 – ₦70,000 per session** (excluding hostel).",
    category: "fees",
    keywords: ["school fees", "cost", "tuition", "amount", "price"]
  },
  {
    question: "How do I pay my school fees online?",
    answer: "Log into the [MAU Student Portal](https://mau.edu.ng/portals), generate your RRR (Remita), pay online or at the bank, then return to the portal to confirm payment.",
    category: "fees",
    keywords: ["school fees", "payment", "online", "remita", "portal"]
  },
  {
    question: "Can I pay in installments?",
    answer: "No. MAU requires full payment before course registration.",
    category: "fees",
    keywords: ["installment", "partial payment", "split payment"]
  },
  {
    question: "How do I generate my RRR (Remita)?",
    answer: "Log in to the student portal → Fees → Generate Invoice → Copy the RRR. You can pay online or at any commercial bank.",
    category: "fees",
    keywords: ["remita", "rrr", "generate invoice", "payment code"]
  },
  {
    question: "Where can I collect my payment receipt?",
    answer: "After successful payment, print your e-receipt from the portal. For stamped receipts, visit the Bursary with your evidence of payment.",
    category: "fees",
    keywords: ["receipt", "bursary", "payment evidence", "proof"]
  },
  {
    question: "Can I pay school fees after the deadline?",
    answer: "Yes, but you must pay a late registration penalty fee as approved by Senate.",
    category: "fees",
    keywords: ["late payment", "deadline", "penalty", "after deadline"]
  },
  {
    question: "What happens if I don't pay school fees?",
    answer: "You will not be able to register courses or sit for exams.",
    category: "fees",
    keywords: ["school fees", "not paid", "restriction", "consequences"]
  },
  {
    question: "Can someone else pay school fees for me?",
    answer: "Yes. Anyone can pay using your generated RRR, but ensure the payment is confirmed on your student portal.",
    category: "fees",
    keywords: ["third party", "payment", "sponsor", "someone else"]
  },
  {
    question: "Is there a separate fee for acceptance?",
    answer: "Yes. Newly admitted students must pay an acceptance fee before clearance.",
    category: "fees",
    keywords: ["acceptance fee", "fresh students", "new students"]
  },

  // Hostel
  {
    question: "How do I get hostel accommodation?",
    answer: "Apply on the portal (Hostel Allocation) immediately after paying school fees. Spaces are limited and allocated on a first-come, first-served basis.",
    category: "hostel",
    keywords: ["accommodation", "hostel", "apply", "allocation"]
  },
  {
    question: "How much is hostel fee and how do I pay?",
    answer: "On average: **₦15,000 – ₦25,000 per session**. Pay through Remita and confirm at the Student Affairs Division.",
    category: "hostel",
    keywords: ["hostel fees", "payment", "accommodation", "cost"]
  },
  {
    question: "When does hostel application open?",
    answer: "Immediately after resumption and payment of school fees. Spaces are limited.",
    category: "hostel",
    keywords: ["application", "hostel", "allocation", "when", "timing"]
  },
  {
    question: "Can I choose the hostel I want?",
    answer: "Allocation is usually based on availability. Preferences may be considered but are not guaranteed.",
    category: "hostel",
    keywords: ["hostel choice", "preference", "selection"]
  },
  {
    question: "Can I change my hostel after allocation?",
    answer: "Only if you apply at Student Affairs and pay the change-of-allocation fee (if allowed).",
    category: "hostel",
    keywords: ["change hostel", "reallocation", "transfer"]
  },
  {
    question: "Is hostel fee refundable if I don't stay?",
    answer: "No. Once paid and allocated, hostel fees are not refundable.",
    category: "hostel",
    keywords: ["refund", "hostel fees", "withdrawal", "refundable"]
  },
  {
    question: "Who do I report hostel issues to?",
    answer: "Report to the Hall Supervisor or Student Affairs Division.",
    category: "hostel",
    keywords: ["complaint", "hostel", "issues", "management", "problems"]
  },

  // Academic
  {
    question: "How do I register for courses?",
    answer: "Course registration is done through the Student Portal during designated registration periods. Ensure all fees are paid and you have your advisor's approval.",
    category: "academic",
    keywords: ["course registration", "register", "courses", "portal"]
  },
  {
    question: "What is the grading system?",
    answer: "MAU uses a 5-point grading system: A (70-100) = 5.0 points, B (60-69) = 4.0 points, C (50-59) = 3.0 points, D (45-49) = 2.0 points, E (40-44) = 1.0 points, F (0-39) = 0.0 points.",
    category: "academic",
    keywords: ["grading", "grades", "cgpa", "gpa", "points"]
  },
  {
    question: "How do I check my results?",
    answer: "Results are available through the Student Portal. Log in with your student ID and password to view your academic records.",
    category: "academic",
    keywords: ["results", "check results", "portal", "grades"]
  },
  {
    question: "How do I get my transcript?",
    answer: "Apply for transcripts at the Academic Office. Submit the required form with payment receipt and valid ID.",
    category: "academic",
    keywords: ["transcript", "academic records", "certificate"]
  },
  {
    question: "When is course registration?",
    answer: "Course registration periods are announced on the university website and Student Portal. Usually at the beginning of each semester.",
    category: "academic",
    keywords: ["registration period", "when", "timing", "semester"]
  },

  // Campus
  {
    question: "Where is MAU located?",
    answer: "Modibbo Adama University is located at PMB 2076, Yola, Adamawa State, Nigeria.",
    category: "campus",
    keywords: ["location", "address", "where", "campus"]
  },
  {
    question: "What are the library hours?",
    answer: "Library hours: Monday-Friday 8:00 AM - 10:00 PM, Saturday 9:00 AM - 6:00 PM. Closed on Sundays and public holidays.",
    category: "campus",
    keywords: ["library", "hours", "opening", "time"]
  },
  {
    question: "What clubs can I join?",
    answer: "MAU has various student organizations including academic societies, sports clubs, and cultural groups. Visit Student Affairs for a complete list.",
    category: "campus",
    keywords: ["clubs", "organizations", "societies", "activities"]
  },
  {
    question: "Are there sports facilities?",
    answer: "Yes, MAU has sports facilities including football field, basketball court, and gymnasium. Contact Sports Department for schedules.",
    category: "campus",
    keywords: ["sports", "facilities", "gym", "recreation"]
  },
  {
    question: "How do I get student ID card?",
    answer: "Apply for student ID at the Student Affairs Office with passport photographs and admission letter.",
    category: "campus",
    keywords: ["student id", "id card", "identification"]
  },

  // Contacts
  {
    question: "What are the emergency contacts?",
    answer: "Security: Campus Security Office, Medical: University Health Center, Fire: Contact Security immediately.",
    category: "contacts",
    keywords: ["emergency", "security", "medical", "fire"]
  },
  {
    question: "Who do I contact for academic issues?",
    answer: "Contact your Faculty Academic Office, Head of Department, or Academic Advisor for academic matters.",
    category: "contacts",
    keywords: ["academic issues", "faculty", "department", "advisor"]
  },
  {
    question: "ICT support contact?",
    answer: "ICT Help Desk is available Monday-Friday 8:00 AM - 5:00 PM for technical support and Student Portal issues.",
    category: "contacts",
    keywords: ["ict", "technical support", "portal issues", "help desk"]
  },
  {
    question: "Who is the Vice-Chancellor?",
    answer: "The current Vice-Chancellor of MAU is Prof. Abdullahi Liman Tukur.",
    category: "contacts",
    keywords: ["vice chancellor", "vc", "leadership"]
  },
  {
    question: "How do I contact the university?",
    answer: "Main contact: +234-75-627-094, Email: info@mau.edu.ng, Website: https://mau.edu.ng",
    category: "contacts",
    keywords: ["contact", "phone", "email", "website"]
  }
];

export function searchMauKnowledgeBase(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // First search the Q&A database for keyword matches
  const matchedQA = qnaDatabase.find(qa => 
    qa.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase())) ||
    lowerQuery.includes(qa.question.toLowerCase().substring(0, 15))
  );
  
  if (matchedQA) {
    return matchedQA.answer;
  }

  // Additional general MAU information for broader queries
  if (lowerQuery.includes('mau') || lowerQuery.includes('modibbo adama') || lowerQuery.includes('university')) {
    if (lowerQuery.includes('about') || lowerQuery.includes('information')) {
      return `**About Modibbo Adama University (MAU)**

MAU is a Federal University established in 1988, located in Yola, Adamawa State, Nigeria. The university's motto is "Knowledge for Development" and it's committed to providing excellent education, research and community service.

**Key Information:**
• **Location:** PMB 2076, Yola, Adamawa State
• **Vice-Chancellor:** Prof. Abdullahi Liman Tukur
• **Website:** [https://mau.edu.ng](https://mau.edu.ng)
• **Contact:** +234-75-627-094, info@mau.edu.ng

**Faculties:** Agriculture, Computing, Education, Engineering, Life Sciences, Physical Sciences

For specific questions about admissions, fees, accommodation, or academic matters, just ask!`;
    }
  }

  // Fallback response for unmatched queries
  return `I can help you with information about Modibbo Adama University (MAU) including:

**📚 Academic:** Course registration, grading system, results, transcripts
**🎓 Admissions:** Requirements, status check, admission letters, clearance
**💰 Fees:** Payment methods, RRR generation, receipts, deadlines
**🏠 Accommodation:** Hostel application, fees, allocation
**🏛️ Campus:** Location, library hours, facilities, student services
**📞 Contacts:** University contacts, emergency numbers, support

**Quick Links:**
• [MAU Website](https://mau.edu.ng)
• [Student Portal](https://mau.edu.ng/portals)
• [Admissions Portal](https://mautech.safapply.com/)

What specific information would you like to know about MAU?`;
}