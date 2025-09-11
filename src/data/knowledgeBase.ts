export const KNOWLEDGE_BASE = {
  grading: {
    system: "MAU uses a 5-point grading system",
    grades: {
      'A': { points: 5.0, range: '70-100%' },
      'B': { points: 4.0, range: '60-69%' },
      'C': { points: 3.0, range: '50-59%' },
      'D': { points: 2.0, range: '45-49%' },
      'E': { points: 1.0, range: '40-44%' },
      'F': { points: 0.0, range: '0-39%' }
    }
  },
  
  leadership: {
    viceChancellor: "Prof. Ibrahim Umar",
    deputyVCs: [
      "Deputy VC (Academic)",
      "Deputy VC (Administration)"
    ]
  },

  campus: {
    location: "Sangere, Girei LGA, Adamawa State",
    established: "1981",
    renamed: "2021",
    motto: "Knowledge and Humanism"
  },

  services: {
    library: {
      hours: "Monday-Friday: 8:00 AM - 10:00 PM, Saturday: 9:00 AM - 6:00 PM",
      services: ["Study spaces", "Computer lab", "Research assistance", "Digital resources"]
    },
    ict: {
      support: "ICT Help Desk available Monday-Friday 8:00 AM - 5:00 PM",
      services: ["Student portal support", "Email setup", "WiFi assistance", "Technical troubleshooting"]
    }
  },

  payments: {
    methods: ["Online payment via Student Portal", "Bank transfer", "POS payment at designated centers"],
    bankDetails: "Contact Bursary Department for current bank details"
  },

  registration: {
    process: "Course registration is done through the Student Portal during designated periods",
    requirements: ["Clear all outstanding fees", "Meet academic requirements", "Advisor approval"]
  }
};