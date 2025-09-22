import { QuickInfoCategory } from '../types/user';

export const QUICK_INFO: QuickInfoCategory[] = [
  {
    id: 'admissions',
    title: 'Admissions',
    icon: 'GraduationCap',
    items: [
      {
        question: 'What are the requirements for undergraduate admission?',
        answer: 'At MAU, you need at least 5 credits in WAEC/NECO/NABTEB including English and Mathematics, plus JAMB UTME with the required cutoff. Check faculty requirements at [MAU Admissions](https://mau.edu.ng/admissions).'
      },
      {
        question: 'How do I check my admission status?',
        answer: 'Go to the [MAU Undergraduate Admission Portal](https://mautech.safapply.com/) or log into [JAMB CAPS](https://efacility.jamb.gov.ng/).'
      },
      {
        question: 'How do I generate my admission letter?',
        answer: 'Log in to the [JAMB portal](https://efacility.jamb.gov.ng/) to accept admission, then download your JAMB admission letter. The Exams & Records Unit will issue the MAU admission letter after clearance.'
      },
      {
        question: 'What documents do I need for clearance?',
        answer: 'JAMB admission letter, WAEC/NECO/NABTEB results, birth certificate, local government ID, 8 passport photographs, and evidence of school fees payment.'
      },
      {
        question: 'How do I defer my admission?',
        answer: 'Write a formal letter to the Registrar through your Head of Department. Pay the deferment fee (if applicable) at the bursary and process it at Exams & Records.'
      }
    ]
  },
  {
    id: 'fees',
    title: 'Fees & Payment',
    icon: 'CreditCard',
    items: [
      {
        question: 'How much is the school fees?',
        answer: 'Fees vary by faculty and level. Check the latest breakdown at [MAU Portals](https://mau.edu.ng/portals). On average: **₦40,000 – ₦70,000 per session** (excluding hostel).'
      },
      {
        question: 'How do I pay my school fees online?',
        answer: 'Log into the [MAU Student Portal](https://mau.edu.ng/portals), generate your RRR (Remita), pay online or at the bank, then return to the portal to confirm payment.'
      },
      {
        question: 'How do I generate my RRR (Remita)?',
        answer: 'Log in to the student portal → Fees → Generate Invoice → Copy the RRR. You can pay online or at any commercial bank.'
      },
      {
        question: 'Can I pay in installments?',
        answer: 'No. MAU requires full payment before course registration.'
      },
      {
        question: 'Can I pay school fees after the deadline?',
        answer: 'Yes, but you must pay a late registration penalty fee as approved by Senate.'
      },
      {
        question: 'Where can I collect my payment receipt?',
        answer: 'After successful payment, print your e-receipt from the portal. For stamped receipts, visit the Bursary with your evidence of payment.'
      }
    ]
  },
  {
    id: 'hostel',
    title: 'Accommodation',
    icon: 'MapPin',
    items: [
      {
        question: 'How do I get hostel accommodation?',
        answer: 'Apply on the portal (Hostel Allocation) immediately after paying school fees. Spaces are limited and allocated on a first-come, first-served basis.'
      },
      {
        question: 'How much is hostel fee and how do I pay?',
        answer: 'On average: **₦15,000 – ₦25,000 per session**. Pay through Remita and confirm at the Student Affairs Division.'
      },
      {
        question: 'When does hostel application open?',
        answer: 'Immediately after resumption and payment of school fees. Spaces are limited.'
      },
      {
        question: 'Can I choose the hostel I want?',
        answer: 'Allocation is usually based on availability. Preferences may be considered but are not guaranteed.'
      },
      {
        question: 'Can I change my hostel after allocation?',
        answer: 'Only if you apply at Student Affairs and pay the change-of-allocation fee (if allowed).'
      },
      {
        question: 'Who do I report hostel issues to?',
        answer: 'Report to the Hall Supervisor or Student Affairs Division.'
      }
    ]
  },
  {
    id: 'academic',
    title: 'Academic',
    icon: 'FileText',
    items: [
      {
        question: 'How do I register for courses?',
        answer: 'Course registration is done through the Student Portal during designated registration periods. Ensure all fees are paid and you have your advisor\'s approval.'
      },
      {
        question: 'What is the grading system?',
        answer: 'MAU uses a 5-point grading system: A (5.0), B (4.0), C (3.0), D (2.0), E (1.0), F (0.0).'
      },
      {
        question: 'How do I check my results?',
        answer: 'Results are available through the Student Portal. Log in with your student ID and password to view your academic records.'
      },
      {
        question: 'How do I get my transcript?',
        answer: 'Apply for transcripts at the Academic Office. Submit the required form with payment receipt and valid ID.'
      },
      {
        question: 'When is course registration?',
        answer: 'Course registration periods are announced on the university website and Student Portal. Usually at the beginning of each semester.'
      }
    ]
  },
  {
    id: 'campus',
    title: 'Campus Life',
    icon: 'Users',
    items: [
      {
        question: 'Where is MAU located?',
        answer: 'Modibbo Adama University is located at PMB 2076, Yola, Adamawa State, Nigeria.'
      },
      {
        question: 'What are the library hours?',
        answer: 'Library hours: Monday-Friday 8:00 AM - 10:00 PM, Saturday 9:00 AM - 6:00 PM. Closed on Sundays and public holidays.'
      },
      {
        question: 'What clubs can I join?',
        answer: 'MAU has various student organizations including academic societies, sports clubs, and cultural groups. Visit Student Affairs for a complete list.'
      },
      {
        question: 'Are there sports facilities?',
        answer: 'Yes, MAU has sports facilities including football field, basketball court, and gymnasium. Contact Sports Department for schedules.'
      },
      {
        question: 'How do I get student ID card?',
        answer: 'Apply for student ID at the Student Affairs Office with passport photographs and admission letter.'
      }
    ]
  },
  {
    id: 'contacts',
    title: 'Contacts & Support',
    icon: 'Phone',
    items: [
      {
        question: 'What are the emergency contacts?',
        answer: 'Security: Campus Security Office, Medical: University Health Center, Fire: Contact Security immediately.'
      },
      {
        question: 'Who do I contact for academic issues?',
        answer: 'Contact your Faculty Academic Office, Head of Department, or Academic Advisor for academic matters.'
      },
      {
        question: 'ICT support contact?',
        answer: 'ICT Help Desk is available Monday-Friday 8:00 AM - 5:00 PM for technical support and Student Portal issues.'
      },
      {
        question: 'Who is the Vice-Chancellor?',
        answer: 'The current Vice-Chancellor of MAU is Prof. Abdullahi Liman Tukur.'
      },
      {
        question: 'How do I contact the university?',
        answer: 'Main contact: +234-75-627-094, Email: info@mau.edu.ng, Website: https://mau.edu.ng'
      }
    ]
  }
];