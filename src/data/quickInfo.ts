import { QuickInfoCategory } from '../types/user';

export const QUICK_INFO: QuickInfoCategory[] = [
  {
    id: 'academic',
    title: 'Academic',
    icon: 'GraduationCap',
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
      }
    ]
  },
  {
    id: 'registration',
    title: 'Registration',
    icon: 'FileText',
    items: [
      {
        question: 'When is course registration?',
        answer: 'Course registration periods are announced on the university website and Student Portal. Usually at the beginning of each semester.'
      },
      {
        question: 'Can I add/drop courses?',
        answer: 'Yes, during the add/drop period (usually first 2 weeks of semester). Use the Student Portal or visit the Academic Office.'
      },
      {
        question: 'What if I miss registration?',
        answer: 'Late registration may be possible with penalty fees. Contact the Academic Office immediately for assistance.'
      }
    ]
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: 'CreditCard',
    items: [
      {
        question: 'How do I pay school fees?',
        answer: 'Pay through: Online via Student Portal, Bank transfer, or POS at designated campus centers. Contact Bursary for current bank details.'
      },
      {
        question: 'What are the payment deadlines?',
        answer: 'Payment deadlines are announced each semester. Late payments may incur penalty fees.'
      },
      {
        question: 'Can I pay in installments?',
        answer: 'Installment payment options may be available. Contact the Bursary Department for specific arrangements.'
      }
    ]
  },
  {
    id: 'campus',
    title: 'Campus',
    icon: 'MapPin',
    items: [
      {
        question: 'Where is MAU located?',
        answer: 'Modibbo Adama University is located in Sangere, Girei LGA, Adamawa State, Nigeria.'
      },
      {
        question: 'How do I get accommodation?',
        answer: 'Apply for hostel accommodation through the Student Affairs Office. Submit application with required documents and fees.'
      },
      {
        question: 'What are the library hours?',
        answer: 'Library hours: Monday-Friday 8:00 AM - 10:00 PM, Saturday 9:00 AM - 6:00 PM. Closed on Sundays and public holidays.'
      }
    ]
  },
  {
    id: 'student-life',
    title: 'Student Life',
    icon: 'Users',
    items: [
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
    title: 'Contacts',
    icon: 'Phone',
    items: [
      {
        question: 'Emergency contacts?',
        answer: 'Security: Campus Security Office, Medical: University Health Center, Fire: Contact Security immediately.'
      },
      {
        question: 'Who do I contact for academic issues?',
        answer: 'Contact your Faculty Academic Office, Head of Department, or Academic Advisor for academic matters.'
      },
      {
        question: 'ICT support contact?',
        answer: 'ICT Help Desk is available Monday-Friday 8:00 AM - 5:00 PM for technical support and Student Portal issues.'
      }
    ]
  }
];