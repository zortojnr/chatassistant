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
  },

  academics: {
    sessionStructure: "Two semesters per academic session (First and Second Semester)",
    gradingSystem: {
      "A": "70-100 (Excellent) - 5.0 points",
      "B": "60-69 (Very Good) - 4.0 points", 
      "C": "50-59 (Good) - 3.0 points",
      "D": "45-49 (Fair) - 2.0 points",
      "E": "40-44 (Pass) - 1.0 points",
      "F": "0-39 (Fail) - 0.0 points"
    },
    creditSystem: "Course Credit Unit (CCU) system",
    minimumGraduation: "120 credit units for undergraduate programs",
    attendanceRequirement: "Minimum 75% attendance required for all courses",
    cgpaRequirement: "Minimum CGPA of 1.0 required for graduation"
  },

  registration: {
    process: [
      "Log into student portal with your credentials",
      "Ensure all fees are paid for the semester",
      "Select courses based on your level and faculty requirements",
      "Print course registration form from portal",
      "Submit form to faculty office for approval",
      "Keep approved copy for your records"
    ],
    timing: "Registration opens 2 weeks before semester begins",
    lateRegistration: "Available with penalty fees - contact Academic Office",
    addDropPeriod: "First 2 weeks of semester for course changes",
    requirements: [
      "All outstanding fees must be cleared",
      "Academic standing requirements met",
      "Faculty advisor approval required"
    ]
  },

  faculties: {
    agriculture: {
      name: "Faculty of Agriculture",
      departments: ["Agricultural Economics", "Animal Science", "Crop Production", "Soil Science", "Agricultural Extension"],
      programs: ["B.Sc Agricultural Economics", "B.Sc Animal Science", "B.Sc Crop Production", "B.Sc Soil Science"],
      facilities: ["Research Farm", "Animal House", "Soil Laboratory", "Greenhouse Complex"]
    },
    computing: {
      name: "Faculty of Computing",
      departments: ["Computer Science", "Information Technology", "Software Engineering", "Cyber Security"],
      programs: ["B.Sc Computer Science", "B.Sc Information Technology", "B.Sc Software Engineering"],
      facilities: ["Computer Labs", "Software Development Center", "ICT Center", "Network Laboratory"]
    },
    education: {
      name: "Faculty of Education",
      departments: ["Educational Psychology", "Curriculum Studies", "Educational Administration", "Adult Education"],
      programs: ["B.Ed Educational Psychology", "B.Ed Curriculum Studies", "B.Ed Educational Administration"],
      facilities: ["Micro-Teaching Laboratory", "Educational Resource Center", "Psychology Lab"]
    },
    engineering: {
      name: "Faculty of Engineering",
      departments: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Chemical Engineering"],
      programs: ["B.Eng Civil Engineering", "B.Eng Electrical Engineering", "B.Eng Mechanical Engineering"],
      facilities: ["Engineering Workshops", "CAD Laboratory", "Materials Testing Lab", "Power Systems Lab"]
    },
    lifeSciences: {
      name: "Faculty of Life Sciences",
      departments: ["Biology", "Botany", "Zoology", "Microbiology", "Biochemistry", "Biotechnology"],
      programs: ["B.Sc Biology", "B.Sc Botany", "B.Sc Zoology", "B.Sc Microbiology", "B.Sc Biochemistry"],
      facilities: ["Biology Laboratory", "Herbarium", "Museum", "Greenhouse", "Tissue Culture Lab"]
    },
    physicalSciences: {
      name: "Faculty of Physical Sciences",
      departments: ["Physics", "Mathematics", "Statistics", "Geology", "Chemistry"],
      programs: ["B.Sc Physics", "B.Sc Mathematics", "B.Sc Statistics", "B.Sc Geology", "B.Sc Chemistry"],
      facilities: ["Physics Laboratory", "Mathematics Resource Center", "Geology Museum", "Chemistry Lab"]
    }
  },

  admissions: {
    requirements: {
      undergraduate: {
        olevel: "At least 5 credits in WAEC/NECO/NABTEB including English and Mathematics",
        utme: "JAMB UTME with the required cutoff mark",
        postUtme: "Candidates must participate in Post-UTME screening",
        directEntry: "Available for HND/NCE holders with relevant qualifications"
      }
    },
    process: [
      "Apply through JAMB for UTME",
      "Choose MAU as first choice institution",
      "Meet faculty-specific cut-off marks",
      "Participate in Post-UTME screening",
      "Check admission status on JAMB CAPS",
      "Accept admission offer online",
      "Complete registration and pay fees"
    ],
    statusCheck: {
      portal: "https://mautech.safapply.com/",
      jamb: "https://efacility.jamb.gov.ng/"
    },
    admissionLetter: {
      process: "Log in to JAMB portal to accept admission, then download JAMB admission letter. MAU admission letter issued by Exams & Records Unit after clearance.",
      jamb: "https://efacility.jamb.gov.ng/"
    },
    clearanceDocuments: [
      "JAMB admission letter",
      "WAEC/NECO/NABTEB results",
      "Birth certificate",
      "Local government ID",
      "8 passport photographs",
      "Evidence of school fees payment"
    ],
    deferment: {
      process: "Write formal letter to Registrar through Head of Department. Pay deferment fee at bursary and process at Exams & Records."
    },
    cutOffMarks: "Varies by faculty - check university website for current cut-offs"
  },

  fees: {
    undergraduate: {
      range: "₦40,000 – ₦70,000 per session (excluding hostel)",
      tuition: "Varies by faculty and level",
      accommodation: "₦15,000 – ₦25,000 per session for hostel",
      acceptance: "Newly admitted students must pay acceptance fee before clearance",
      registration: "N5,000 per session",
      library: "N2,000 per session",
      sports: "N1,000 per session",
      development: "N10,000 per session",
      medical: "N2,500 per session"
    },
    payment: {
      methods: ["Online payment via student portal using Remita", "Bank payment using RRR", "POS at designated centers"],
      portal: "https://mau.edu.ng/portals",
      process: [
        "Log into MAU Student Portal",
        "Generate your RRR (Remita)",
        "Pay online or at any commercial bank",
        "Return to portal to confirm payment"
      ],
      installments: "No. MAU requires full payment before course registration",
      deadlines: "Announced each semester - usually 4 weeks into semester",
      penalties: "Late payment attracts penalty fee as approved by Senate",
      thirdParty: "Anyone can pay using your generated RRR, but ensure payment is confirmed on your student portal",
      receipt: "Print e-receipt from portal. For stamped receipts, visit Bursary with payment evidence",
      consequences: "Cannot register courses or sit for exams if fees not paid"
    },
    rrr: {
      generation: "Log in to student portal → Fees → Generate Invoice → Copy the RRR"
    }
  },

  accommodation: {
    application: {
      process: "Apply on portal (Hostel Allocation) immediately after paying school fees",
      timing: "Immediately after resumption and payment of school fees",
      basis: "First-come, first-served basis - spaces are limited"
    },
    fees: {
      range: "₦15,000 – ₦25,000 per session",
      payment: "Pay through Remita and confirm at Student Affairs Division",
      refund: "No. Once paid and allocated, hostel fees are not refundable"
    },
    allocation: {
      choice: "Based on availability. Preferences may be considered but not guaranteed",
      change: "Only if you apply at Student Affairs and pay change-of-allocation fee (if allowed)"
    },
    management: {
      issues: "Report to Hall Supervisor or Student Affairs Division"
    },
    types: ["Male hostels", "Female hostels", "Postgraduate accommodation"],
    facilities: ["Basic furnishing", "Common rooms", "Study areas", "Laundry facilities"]
  },

  studentServices: {
    library: {
      name: "Central Library",
      hours: "Monday-Friday: 8:00 AM - 10:00 PM, Saturday: 9:00 AM - 6:00 PM",
      services: ["Study spaces", "Computer lab", "Research assistance", "Digital resources"],
      resources: ["Academic books", "Journals", "Past questions", "Project materials", "Online databases"],
      facilities: ["Reading rooms", "Group study areas", "Printing services", "Internet access"]
    },
    healthcare: {
      facility: "University Health Center",
      services: ["General medical care", "Emergency services", "Health education", "Counseling"],
      hours: "24/7 for emergencies, 8:00 AM - 4:00 PM for routine care",
      staff: ["Medical doctors", "Nurses", "Pharmacists", "Lab technicians"]
    },
    sports: {
      facilities: ["Sports complex", "Football field", "Basketball court", "Tennis court", "Gymnasium"],
      activities: ["Inter-faculty competitions", "Sports clubs", "Fitness programs"],
      equipment: "Available for loan to registered students"
    },
    counseling: {
      services: ["Academic counseling", "Career guidance", "Personal counseling", "Psychological support"],
      availability: "Monday-Friday, 9:00 AM - 4:00 PM",
      contact: "Student Affairs Office"
    },
    ict: {
      services: ["Student portal support", "Email setup", "WiFi assistance", "Technical troubleshooting"],
      support: "ICT Help Desk - Monday-Friday, 8:00 AM - 5:00 PM",
      facilities: ["Computer labs", "Internet access points", "Printing services"]
    }
  },

  examinations: {
    structure: {
      continuous: "30% - Tests, assignments, practicals",
      final: "70% - End of semester examination"
    },
    requirements: [
      "Minimum 75% attendance to qualify for exams",
      "All course requirements completed",
      "Fees fully paid",
      "Valid student ID card"
    ],
    conduct: [
      "Arrive 30 minutes before exam time",
      "Bring valid ID and required materials only",
      "No electronic devices allowed",
      "Follow all examination regulations"
    ],
    results: "Published on student portal 4-6 weeks after exams"
  },

  graduation: {
    requirements: [
      "Complete all required courses for your program",
      "Achieve minimum CGPA of 1.0",
      "Clear all financial obligations",
      "Submit final project/thesis (where applicable)",
      "Complete NYSC registration (for Nigerian students)",
      "Apply for graduation through student portal"
    ],
    ceremony: "Held annually - usually in December",
    certificates: "Available 3 months after graduation ceremony"
  },

  contact: {
    main: {
      address: "PMB 2076, Yola, Adamawa State, Nigeria",
      phone: "+234-75-627-094",
      email: "info@mau.edu.ng",
      website: "https://mau.edu.ng"
    },
    departments: {
      registrar: "registrar@mau.edu.ng",
      admissions: "admissions@mau.edu.ng",
      bursary: "bursary@mau.edu.ng",
      studentAffairs: "studentaffairs@mau.edu.ng",
      ict: "ict@mau.edu.ng"
    },
    emergency: {
      security: "Campus Security Office - 24/7",
      medical: "University Health Center - 24/7",
      fire: "Contact Security immediately"
    }
  },

  studentLife: {
    organizations: [
      "Student Union Government (SUG)",
      "Faculty associations",
      "Departmental associations", 
      "Religious organizations",
      "Cultural groups",
      "Sports clubs",
      "Academic societies"
    ],
    activities: [
      "Orientation week for new students",
      "Inter-faculty competitions",
      "Cultural festivals",
      "Academic conferences",
      "Career fairs",
      "Leadership training"
    ],
    support: [
      "Peer mentoring programs",
      "Study groups",
      "Academic support centers",
      "Career counseling",
      "Financial aid information"
    ]
  }
};

// Enhanced Q&A Database with new entries
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
  }
];

export function searchMauKnowledgeBase(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // First search the Q&A database for exact matches
  const exactMatch = qnaDatabase.find(qa => 
    qa.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase())) ||
    lowerQuery.includes(qa.question.toLowerCase().substring(0, 20))
  );
  
  if (exactMatch) {
    return exactMatch.answer;
  }

  // Leadership queries
  if (lowerQuery.includes('vice chancellor') || lowerQuery.includes('vc') || lowerQuery.includes('leadership')) {
    return `MAU Leadership:

**Vice-Chancellor:** Prof. Abdullahi Liman Tukur

**Deputy Vice-Chancellors:**
• Deputy VC (Academic)
• Deputy VC (Administration)

**Key Administrative Officers:**
• Registrar
• Bursar
• Librarian
• Dean of Student Affairs
• Various Faculty Deans

The university leadership is committed to academic excellence and student welfare. For more information, visit [MAU Website](https://mau.edu.ng).`;
  }

  // Academic and Registration queries
  if (lowerQuery.includes('registration') || lowerQuery.includes('register') || lowerQuery.includes('course')) {
    return `Course registration at MAU follows these steps:

1. **Log into the student portal** with your credentials
2. **Ensure all fees are paid** for the semester
3. **Select courses** based on your level and faculty requirements
4. **Print course registration form** from portal
5. **Submit form to faculty office** for approval
6. **Keep approved copy** for your records

**Important Notes:**
• Registration opens 2 weeks before each semester begins
• Late registration is available with penalty fees
• You can add/drop courses during the first 2 weeks of the semester
• All fees must be paid before registration

**Requirements:** All fees paid, academic standing met, faculty advisor approval required.

Need help? Contact your Faculty Academic Office or visit [MAU Student Portal](https://mau.edu.ng/portals).`;
  }
  
  if (lowerQuery.includes('grading') || lowerQuery.includes('grade') || lowerQuery.includes('cgpa') || lowerQuery.includes('gpa')) {
    return `MAU uses a 5-point grading system:

**Grade Scale:**
• **A:** 70-100% (Excellent) - 5.0 points
• **B:** 60-69% (Very Good) - 4.0 points  
• **C:** 50-59% (Good) - 3.0 points
• **D:** 45-49% (Fair) - 2.0 points
• **E:** 40-44% (Pass) - 1.0 points
• **F:** 0-39% (Fail) - 0.0 points

**Key Information:**
• Your CGPA is calculated using the Course Credit Unit (CCU) system
• Minimum CGPA of 1.0 is required for graduation
• You need 120 credit units minimum for undergraduate programs
• Minimum 75% attendance required for all courses

Check your results on the [MAU Student Portal](https://mau.edu.ng/portals).`;
  }

  if (lowerQuery.includes('exam') || lowerQuery.includes('examination') || lowerQuery.includes('test')) {
    return `MAU examination system:

**Assessment Structure:**
• **Continuous Assessment:** 30% (tests, assignments, practicals)
• **Final Examination:** 70% (end of semester exam)

**Requirements to sit for exams:**
• Minimum 75% attendance in all courses
• All course requirements completed
• Fees fully paid
• Valid student ID card

**Exam Guidelines:**
• Arrive 30 minutes before exam time
• Bring valid ID and required materials only
• No electronic devices allowed
• Follow all examination regulations

**Results:** Published on the student portal 4-6 weeks after exams.

Access your results at [MAU Student Portal](https://mau.edu.ng/portals).`;
  }

  // Faculty and Department queries
  if (lowerQuery.includes('faculty') || lowerQuery.includes('faculties') || lowerQuery.includes('department')) {
    return `MAU has six faculties:

**1. Faculty of Agriculture**
   - Departments: Agricultural Economics, Animal Science, Crop Production, Soil Science
   - Facilities: Research Farm, Animal House, Soil Laboratory

**2. Faculty of Computing**  
   - Departments: Computer Science, Information Technology, Software Engineering
   - Facilities: Computer Labs, Software Development Center, ICT Center

**3. Faculty of Education**
   - Departments: Educational Psychology, Curriculum Studies, Educational Administration
   - Facilities: Micro-Teaching Laboratory, Educational Resource Center

**4. Faculty of Engineering**
   - Departments: Civil, Electrical, Mechanical, Chemical Engineering
   - Facilities: Engineering Workshops, CAD Laboratory, Materials Testing Lab

**5. Faculty of Life Sciences**
   - Departments: Biology, Botany, Zoology, Microbiology, Biochemistry
   - Facilities: Biology Laboratory, Herbarium, Museum, Greenhouse

**6. Faculty of Physical Sciences**
   - Departments: Physics, Mathematics, Statistics, Geology, Chemistry
   - Facilities: Physics Laboratory, Mathematics Resource Center, Chemistry Lab

For more details, visit [MAU Website](https://mau.edu.ng).`;
  }

  // Campus and Facilities queries
  if (lowerQuery.includes('campus') || lowerQuery.includes('location') || lowerQuery.includes('address')) {
    return `**MAU Campus Information:**

**Location:** PMB 2076, Yola, Adamawa State, Nigeria
**Phone:** +234-75-627-094
**Email:** info@mau.edu.ng
**Website:** [https://mau.edu.ng](https://mau.edu.ng)

**Campus Facilities:**
• Central Library (Mon-Fri: 8AM-10PM, Sat: 9AM-6PM)
• University Health Center (24/7 emergency)
• Sports complex with various facilities
• Computer labs and ICT centers
• Student Affairs Office for support services
• Modern lecture halls and laboratories

**Getting There:**
MAU is easily accessible by road from major cities in Nigeria. The campus is located in Yola, the capital of Adamawa State.`;
  }

  // Library queries
  if (lowerQuery.includes('library')) {
    return `**MAU Central Library Services:**

**Operating Hours:**
• Monday-Friday: 8:00 AM - 10:00 PM
• Saturday: 9:00 AM - 6:00 PM
• Closed Sundays and public holidays

**Services Available:**
• Study spaces and reading rooms
• Computer lab with internet access
• Research assistance from librarians
• Digital resources and online databases
• Printing and photocopying services

**Resources:**
• Academic books and journals
• Past examination questions
• Project materials and theses
• Online databases and e-books
• Reference materials

**Facilities:**
• Individual study areas
• Group study rooms
• Computer workstations
• Printing services
• Free WiFi access

The library is a hub for academic excellence at MAU!`;
  }

  // Contact and Support queries
  if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email') || lowerQuery.includes('help') || lowerQuery.includes('support')) {
    return `**MAU Contact Information:**

**Main Contacts:**
• **Address:** PMB 2076, Yola, Adamawa State
• **Phone:** +234-75-627-094
• **Email:** info@mau.edu.ng
• **Website:** [https://mau.edu.ng](https://mau.edu.ng)

**Department Contacts:**
• **Registrar:** registrar@mau.edu.ng
• **Admissions:** admissions@mau.edu.ng
• **Bursary:** bursary@mau.edu.ng
• **Student Affairs:** studentaffairs@mau.edu.ng
• **ICT Support:** ict@mau.edu.ng

**Emergency Contacts:**
• **Security:** Campus Security Office (24/7)
• **Medical:** University Health Center (24/7)
• **Fire Emergency:** Contact Security immediately

**ICT Support:**
• Help Desk: Monday-Friday, 8:00 AM - 5:00 PM
• Services: Student portal, email setup, WiFi assistance

**Student Portals:** [https://mau.edu.ng/portals](https://mau.edu.ng/portals)`;
  }

  // Student Life queries
  if (lowerQuery.includes('student life') || lowerQuery.includes('activities') || lowerQuery.includes('clubs') || lowerQuery.includes('organizations')) {
    return `**MAU Student Life:**

**Student Organizations:**
• Student Union Government (SUG)
• Faculty and departmental associations
• Religious organizations
• Cultural groups and societies
• Sports clubs and teams
• Academic societies

**Activities:**
• Orientation week for new students
• Inter-faculty competitions
• Cultural festivals and events
• Academic conferences and seminars
• Career fairs and job placement
• Leadership training programs

**Support Services:**
• Peer mentoring programs
• Study groups and academic support
• Career counseling and guidance
• Financial aid information
• Personal counseling services

Contact Student Affairs Office for more information about joining organizations and participating in activities.`;
  }

  // Graduation queries
  if (lowerQuery.includes('graduation') || lowerQuery.includes('graduate') || lowerQuery.includes('certificate')) {
    return `**MAU Graduation Requirements:**

**Academic Requirements:**
• Complete all required courses for your program
• Achieve minimum CGPA of 1.0
• Submit final project/thesis (where applicable)
• Meet all faculty-specific requirements

**Administrative Requirements:**
• Clear all financial obligations
• Complete NYSC registration (Nigerian students)
• Apply for graduation through student portal
• Submit all required documents

**Graduation Process:**
• Graduation ceremony held annually (usually December)
• Certificates available 3 months after ceremony
• Transcripts can be requested from Registry
• Alumni registration encouraged

Contact the Registry for specific graduation procedures and requirements for your program.`;
  }

  // Default response for unmatched queries
  return `I can help you with information about MAU including:

**📚 Academic:** Course registration, grading system, examinations
**🎓 Admissions:** Requirements, JAMB, Post-UTME, Direct Entry
**💰 Fees:** Payment methods, fee structure, deadlines, RRR generation
**🏠 Accommodation:** Hostel application, fees, allocation
**🏛️ Facilities:** Library, sports, health center, ICT services
**👥 Student Life:** Organizations, activities, support services
**📞 Contacts:** Department contacts, emergency numbers
**🎓 Graduation:** Requirements, procedures, certificates

**Quick Links:**
• [MAU Website](https://mau.edu.ng)
• [Student Portal](https://mau.edu.ng/portals)
• [Admissions Portal](https://mautech.safapply.com/)
• [JAMB Portal](https://efacility.jamb.gov.ng/)

What specific information would you like to know about MAU?`;
}