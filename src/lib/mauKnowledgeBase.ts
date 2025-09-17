// MAU Knowledge Base - Official University Information
export const mauKnowledgeBase = {
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
    sessionStructure: "Two semesters per academic session",
    gradingSystem: {
      "A": "70-100 (Excellent)",
      "B": "60-69 (Very Good)", 
      "C": "50-59 (Good)",
      "D": "45-49 (Fair)",
      "E": "40-44 (Pass)",
      "F": "0-39 (Fail)"
    },
    creditSystem: "Course Credit Unit (CCU) system",
    minimumGraduation: "120 credit units for undergraduate programs"
  },

  faculties: {
    computing: {
      name: "Faculty of Computing",
      departments: ["Computer Science", "Information Technology", "Software Engineering"],
      programs: ["B.Sc Computer Science", "B.Sc Information Technology", "B.Sc Software Engineering"],
      facilities: ["Computer Labs", "Software Development Center", "ICT Center"]
    },
    agriculture: {
      name: "Faculty of Agriculture", 
      departments: ["Agricultural Economics", "Animal Science", "Crop Production", "Soil Science"],
      programs: ["B.Sc Agricultural Economics", "B.Sc Animal Science", "B.Sc Crop Production"],
      facilities: ["Research Farm", "Animal House", "Soil Laboratory"]
    },
    education: {
      name: "Faculty of Education",
      departments: ["Educational Psychology", "Curriculum Studies", "Educational Administration"],
      programs: ["B.Ed Educational Psychology", "B.Ed Curriculum Studies", "B.Ed Educational Administration"],
      facilities: ["Micro-Teaching Laboratory", "Educational Resource Center"]
    },
    engineering: {
      name: "Faculty of Engineering",
      departments: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering"],
      programs: ["B.Eng Civil Engineering", "B.Eng Electrical Engineering", "B.Eng Mechanical Engineering"],
      facilities: ["Engineering Workshops", "CAD Laboratory", "Materials Testing Lab"]
    },
    "life-sciences": {
      name: "Faculty of Life Sciences",
      departments: ["Biology", "Botany", "Zoology", "Microbiology", "Biochemistry"],
      programs: ["B.Sc Biology", "B.Sc Botany", "B.Sc Zoology", "B.Sc Microbiology"],
      facilities: ["Biology Laboratory", "Herbarium", "Museum", "Greenhouse"]
    },
    "physical-sciences": {
      name: "Faculty of Physical Sciences",
      departments: ["Physics", "Mathematics", "Statistics", "Geology"],
      programs: ["B.Sc Physics", "B.Sc Mathematics", "B.Sc Statistics", "B.Sc Geology"],
      facilities: ["Physics Laboratory", "Mathematics Resource Center", "Geology Museum"]
    }
  },

  admissions: {
    requirements: {
      utme: "Minimum of 180 in JAMB UTME",
      olevel: "Five O'Level credits including English and Mathematics",
      postUtme: "Candidates must participate in Post-UTME screening"
    },
    process: [
      "Apply through JAMB for UTME",
      "Choose MAU as first choice",
      "Meet cut-off marks",
      "Participate in Post-UTME screening",
      "Check admission status online",
      "Accept admission offer",
      "Complete registration"
    ]
  },

  studentServices: {
    accommodation: "On-campus hostels available for students",
    library: "Central Library with digital resources and study spaces",
    healthcare: "University Health Center providing medical services",
    sports: "Sports complex with various recreational facilities",
    counseling: "Student counseling and guidance services",
    ict: "ICT support and internet services across campus"
  },

  fees: {
    undergraduate: {
      tuition: "Varies by faculty and level",
      accommodation: "Hostel fees apply for on-campus residence",
      other: "Registration, library, sports, and development fees"
    },
    payment: "Fees can be paid online through the university portal"
  },

  contact: {
    address: "PMB 2076, Yola, Adamawa State, Nigeria",
    phone: "+234-75-627-094",
    email: "info@mau.edu.ng",
    registrar: "registrar@mau.edu.ng",
    admissions: "admissions@mau.edu.ng"
  },

  procedures: {
    registration: [
      "Log into student portal",
      "Pay required fees",
      "Select courses for the semester", 
      "Print course registration form",
      "Submit to faculty for approval"
    ],
    examinations: [
      "Continuous assessment (30%)",
      "Final examination (70%)",
      "Minimum 75% attendance required",
      "Results published on student portal"
    ],
    graduation: [
      "Complete all required courses",
      "Achieve minimum CGPA of 1.0",
      "Clear all financial obligations",
      "Submit final project/thesis",
      "Apply for graduation"
    ]
  }
};

export function searchKnowledgeBase(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Search for specific topics
  if (lowerQuery.includes('faculty') || lowerQuery.includes('faculties')) {
    const facultyNames = Object.values(mauKnowledgeBase.faculties).map(f => f.name).join(', ');
    return `MAU has six faculties: ${facultyNames}. Each faculty offers various undergraduate and postgraduate programs with modern facilities and experienced faculty members.`;
  }
  
  if (lowerQuery.includes('admission') || lowerQuery.includes('requirements')) {
    return `MAU admission requirements include: minimum 180 in JAMB UTME, five O'Level credits including English and Mathematics, and participation in Post-UTME screening. The admission process involves applying through JAMB, choosing MAU as first choice, meeting cut-off marks, and completing Post-UTME screening.`;
  }
  
  if (lowerQuery.includes('fee') || lowerQuery.includes('payment')) {
    return `University fees vary by faculty and level. Students can pay fees online through the university portal. Fees include tuition, registration, library, sports, and development fees. Hostel fees apply for on-campus accommodation.`;
  }
  
  if (lowerQuery.includes('registration') || lowerQuery.includes('course')) {
    return `Course registration involves logging into the student portal, paying required fees, selecting courses for the semester, printing the registration form, and submitting to your faculty for approval. This process must be completed each semester.`;
  }
  
  if (lowerQuery.includes('grading') || lowerQuery.includes('grade')) {
    return `MAU uses a grading system where A (70-100) is Excellent, B (60-69) is Very Good, C (50-59) is Good, D (45-49) is Fair, E (40-44) is Pass, and F (0-39) is Fail. The university operates on a Course Credit Unit (CCU) system.`;
  }
  
  if (lowerQuery.includes('contact') || lowerQuery.includes('address')) {
    return `MAU is located at PMB 2076, Yola, Adamawa State, Nigeria. You can contact the university at +234-75-627-094 or email info@mau.edu.ng. For admissions inquiries, email admissions@mau.edu.ng.`;
  }
  
  if (lowerQuery.includes('vision') || lowerQuery.includes('mission')) {
    return `MAU's vision is "To be a world-class university that provides excellent education, research and community service for sustainable development." The mission is "To provide quality higher education, conduct cutting-edge research, and render community service that will contribute to national and global development." The university motto is "Knowledge for Development."`;
  }
  
  return '';
}