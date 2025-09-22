// MAU Student Knowledge Base - Comprehensive Academic Information
export const mauStudentKnowledgeBase = {
  university: {
    name: "Modibbo Adama University",
    location: "Yola, Adamawa State, Nigeria",
    established: "1988",
    type: "Federal University",
    motto: "Knowledge for Development",
    vision: "To be a world-class university that provides excellent education, research and community service for sustainable development.",
    mission: "To provide quality higher education, conduct cutting-edge research, and render community service that will contribute to national and global development.",
    website: "https://mau.edu.ng"
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
      utme: "Minimum of 180 in JAMB UTME",
      olevel: "Five O'Level credits including English and Mathematics",
      postUtme: "Candidates must participate in Post-UTME screening",
      directEntry: "Available for HND/NCE holders with relevant qualifications"
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
    cutOffMarks: "Varies by faculty - check university website for current cut-offs"
  },

  fees: {
    undergraduate: {
      tuition: "Varies by faculty and level (N45,000 - N65,000 per session)",
      accommodation: "N25,000 - N35,000 per session for hostel accommodation",
      registration: "N5,000 per session",
      library: "N2,000 per session",
      sports: "N1,000 per session",
      development: "N10,000 per session",
      medical: "N2,500 per session"
    },
    payment: {
      methods: ["Online payment via student portal", "Bank transfer", "POS at designated centers"],
      deadlines: "Announced each semester - usually 4 weeks into semester",
      installments: "Available in special cases - contact Bursary Department",
      penalties: "Late payment attracts 10% penalty after deadline"
    }
  },

  studentServices: {
    accommodation: {
      types: ["Male hostels", "Female hostels", "Postgraduate accommodation"],
      facilities: ["Basic furnishing", "Common rooms", "Study areas", "Laundry facilities"],
      application: "Through Student Affairs Office with required documents",
      allocation: "Based on level, distance from home, and availability"
    },
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

export function searchMauKnowledgeBase(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Academic and Registration queries
  if (lowerQuery.includes('registration') || lowerQuery.includes('register') || lowerQuery.includes('course')) {
    return `Course registration at MAU follows these steps:

1. Log into the student portal with your credentials
2. Ensure all fees are paid for the semester
3. Select courses based on your level and faculty requirements
4. Print course registration form from portal
5. Submit form to faculty office for approval
6. Keep approved copy for your records

Registration opens 2 weeks before each semester begins. Late registration is available with penalty fees. You can add/drop courses during the first 2 weeks of the semester.

Requirements: All fees paid, academic standing met, faculty advisor approval required.`;
  }
  
  if (lowerQuery.includes('grading') || lowerQuery.includes('grade') || lowerQuery.includes('cgpa') || lowerQuery.includes('gpa')) {
    return `MAU uses a 5-point grading system:

• A: 70-100% (Excellent) - 5.0 points
• B: 60-69% (Very Good) - 4.0 points  
• C: 50-59% (Good) - 3.0 points
• D: 45-49% (Fair) - 2.0 points
• E: 40-44% (Pass) - 1.0 points
• F: 0-39% (Fail) - 0.0 points

Your CGPA is calculated using the Course Credit Unit (CCU) system. Minimum CGPA of 1.0 is required for graduation. You need 120 credit units minimum for undergraduate programs.`;
  }

  if (lowerQuery.includes('exam') || lowerQuery.includes('examination') || lowerQuery.includes('test')) {
    return `MAU examination system:

Assessment Structure:
• Continuous Assessment: 30% (tests, assignments, practicals)
• Final Examination: 70% (end of semester exam)

Requirements to sit for exams:
• Minimum 75% attendance in all courses
• All course requirements completed
• Fees fully paid
• Valid student ID card

Exam Guidelines:
• Arrive 30 minutes before exam time
• Bring valid ID and required materials only
• No electronic devices allowed
• Follow all examination regulations

Results are published on the student portal 4-6 weeks after exams.`;
  }

  // Fees and Payment queries
  if (lowerQuery.includes('fee') || lowerQuery.includes('payment') || lowerQuery.includes('pay') || lowerQuery.includes('cost')) {
    return `MAU Fee Structure (per session):

Undergraduate Fees:
• Tuition: N45,000 - N65,000 (varies by faculty)
• Accommodation: N25,000 - N35,000 (hostel)
• Registration: N5,000
• Library: N2,000
• Sports: N1,000
• Development: N10,000
• Medical: N2,500

Payment Methods:
• Online payment via student portal
• Bank transfer
• POS at designated campus centers

Important Notes:
• Payment deadlines announced each semester
• Late payment attracts 10% penalty
• Installment options available in special cases (contact Bursary)
• Keep payment receipts for records`;
  }

  // Faculty and Department queries
  if (lowerQuery.includes('faculty') || lowerQuery.includes('faculties') || lowerQuery.includes('department')) {
    return `MAU has six faculties:

1. Faculty of Agriculture
   - Departments: Agricultural Economics, Animal Science, Crop Production, Soil Science
   - Facilities: Research Farm, Animal House, Soil Laboratory

2. Faculty of Computing  
   - Departments: Computer Science, Information Technology, Software Engineering
   - Facilities: Computer Labs, Software Development Center, ICT Center

3. Faculty of Education
   - Departments: Educational Psychology, Curriculum Studies, Educational Administration
   - Facilities: Micro-Teaching Laboratory, Educational Resource Center

4. Faculty of Engineering
   - Departments: Civil, Electrical, Mechanical, Chemical Engineering
   - Facilities: Engineering Workshops, CAD Laboratory, Materials Testing Lab

5. Faculty of Life Sciences
   - Departments: Biology, Botany, Zoology, Microbiology, Biochemistry
   - Facilities: Biology Laboratory, Herbarium, Museum, Greenhouse

6. Faculty of Physical Sciences
   - Departments: Physics, Mathematics, Statistics, Geology, Chemistry
   - Facilities: Physics Laboratory, Mathematics Resource Center, Chemistry Lab`;
  }

  // Admission queries
  if (lowerQuery.includes('admission') || lowerQuery.includes('requirements') || lowerQuery.includes('jamb') || lowerQuery.includes('utme')) {
    return `MAU Admission Requirements:

UTME Requirements:
• Minimum 180 in JAMB UTME
• Five O'Level credits including English and Mathematics
• Choose MAU as first choice institution
• Meet faculty-specific cut-off marks
• Participate in Post-UTME screening

Admission Process:
1. Apply through JAMB for UTME
2. Choose MAU as first choice
3. Meet cut-off marks (varies by faculty)
4. Participate in Post-UTME screening
5. Check admission status on JAMB CAPS
6. Accept admission offer online
7. Complete registration and pay fees

Direct Entry is also available for HND/NCE holders with relevant qualifications.`;
  }

  // Campus and Facilities queries
  if (lowerQuery.includes('campus') || lowerQuery.includes('location') || lowerQuery.includes('address') || lowerQuery.includes('hostel') || lowerQuery.includes('accommodation')) {
    return `MAU Campus Information:

Location: PMB 2076, Yola, Adamawa State, Nigeria
Phone: +234-75-627-094
Email: info@mau.edu.ng
Website: https://mau.edu.ng

Accommodation:
• Male and female hostels available
• Postgraduate accommodation
• Fees: N25,000 - N35,000 per session
• Apply through Student Affairs Office
• Allocation based on level, distance, and availability

Campus Facilities:
• Central Library (Mon-Fri: 8AM-10PM, Sat: 9AM-6PM)
• University Health Center (24/7 emergency)
• Sports complex with various facilities
• Computer labs and ICT centers
• Student Affairs Office for support services`;
  }

  // Library queries
  if (lowerQuery.includes('library')) {
    return `MAU Central Library Services:

Operating Hours:
• Monday-Friday: 8:00 AM - 10:00 PM
• Saturday: 9:00 AM - 6:00 PM
• Closed Sundays and public holidays

Services Available:
• Study spaces and reading rooms
• Computer lab with internet access
• Research assistance from librarians
• Digital resources and online databases
• Printing and photocopying services

Resources:
• Academic books and journals
• Past examination questions
• Project materials and theses
• Online databases and e-books
• Reference materials

Facilities:
• Individual study areas
• Group study rooms
• Computer workstations
• Printing services
• Free WiFi access`;
  }

  // Contact and Support queries
  if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email') || lowerQuery.includes('help') || lowerQuery.includes('support')) {
    return `MAU Contact Information:

Main Contacts:
• Address: PMB 2076, Yola, Adamawa State
• Phone: +234-75-627-094
• Email: info@mau.edu.ng

Department Contacts:
• Registrar: registrar@mau.edu.ng
• Admissions: admissions@mau.edu.ng
• Bursary: bursary@mau.edu.ng
• Student Affairs: studentaffairs@mau.edu.ng
• ICT Support: ict@mau.edu.ng

Emergency Contacts:
• Security: Campus Security Office (24/7)
• Medical: University Health Center (24/7)
• Fire Emergency: Contact Security immediately

ICT Support:
• Help Desk: Monday-Friday, 8:00 AM - 5:00 PM
• Services: Student portal, email setup, WiFi assistance`;
  }

  // Student Life queries
  if (lowerQuery.includes('student life') || lowerQuery.includes('activities') || lowerQuery.includes('clubs') || lowerQuery.includes('organizations')) {
    return `MAU Student Life:

Student Organizations:
• Student Union Government (SUG)
• Faculty and departmental associations
• Religious organizations
• Cultural groups and societies
• Sports clubs and teams
• Academic societies

Activities:
• Orientation week for new students
• Inter-faculty competitions
• Cultural festivals and events
• Academic conferences and seminars
• Career fairs and job placement
• Leadership training programs

Support Services:
• Peer mentoring programs
• Study groups and academic support
• Career counseling and guidance
• Financial aid information
• Personal counseling services

Contact Student Affairs Office for more information about joining organizations and participating in activities.`;
  }

  // Graduation queries
  if (lowerQuery.includes('graduation') || lowerQuery.includes('graduate') || lowerQuery.includes('certificate')) {
    return `MAU Graduation Requirements:

Academic Requirements:
• Complete all required courses for your program
• Achieve minimum CGPA of 1.0
• Submit final project/thesis (where applicable)
• Meet all faculty-specific requirements

Administrative Requirements:
• Clear all financial obligations
• Complete NYSC registration (Nigerian students)
• Apply for graduation through student portal
• Submit all required documents

Graduation Process:
• Graduation ceremony held annually (usually December)
• Certificates available 3 months after ceremony
• Transcripts can be requested from Registry
• Alumni registration encouraged

Contact the Registry for specific graduation procedures and requirements for your program.`;
  }

  // Default response for unmatched queries
  return `I can help you with information about MAU including:

• Academic: Course registration, grading system, examinations
• Admissions: Requirements, JAMB, Post-UTME, Direct Entry
• Fees: Payment methods, fee structure, deadlines
• Facilities: Library, hostels, sports, health center
• Student Life: Organizations, activities, support services
• Contacts: Department contacts, emergency numbers
• Graduation: Requirements, procedures, certificates

What specific information would you like to know about MAU?`;
}