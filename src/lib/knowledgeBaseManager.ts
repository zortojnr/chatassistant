import { supabase, isUsingDemoCredentials } from './supabase';

export interface UnansweredQuestion {
  id: string;
  question: string;
  student_id: string;
  student_name: string;
  asked_at: string;
  frequency: number;
  status: 'pending' | 'answered' | 'ignored';
  category?: string;
}

export interface KnowledgeBaseEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  created_at: string;
  updated_at: string;
  created_by: string;
}

// Store unanswered questions
export async function storeUnansweredQuestion(
  question: string, 
  studentId: string, 
  studentName: string
): Promise<void> {
  try {
    if (!isUsingDemoCredentials) {
      // Check if question already exists
      const { data: existing } = await supabase
        .from('unanswered_questions')
        .select('*')
        .ilike('question', `%${question}%`)
        .single();

      if (existing) {
        // Increment frequency
        await supabase
          .from('unanswered_questions')
          .update({ frequency: existing.frequency + 1 })
          .eq('id', existing.id);
      } else {
        // Insert new question
        await supabase
          .from('unanswered_questions')
          .insert({
            question,
            student_id: studentId,
            student_name: studentName,
            frequency: 1,
            status: 'pending'
          });
      }
    } else {
      // Demo mode - use localStorage
      const unansweredQuestions = JSON.parse(localStorage.getItem('unansweredQuestions') || '[]');
      
      const existingIndex = unansweredQuestions.findIndex((q: any) => 
        q.question.toLowerCase().includes(question.toLowerCase().substring(0, 20))
      );

      if (existingIndex >= 0) {
        unansweredQuestions[existingIndex].frequency += 1;
      } else {
        unansweredQuestions.push({
          id: Date.now().toString(),
          question,
          student_id: studentId,
          student_name: studentName,
          asked_at: new Date().toISOString(),
          frequency: 1,
          status: 'pending'
        });
      }

      localStorage.setItem('unansweredQuestions', JSON.stringify(unansweredQuestions));
    }
  } catch (error) {
    console.error('Error storing unanswered question:', error);
  }
}

// Get unanswered questions for admin
export async function getUnansweredQuestions(): Promise<UnansweredQuestion[]> {
  try {
    if (!isUsingDemoCredentials) {
      const { data, error } = await supabase
        .from('unanswered_questions')
        .select('*')
        .order('frequency', { ascending: false })
        .order('asked_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } else {
      // Demo mode
      const unansweredQuestions = JSON.parse(localStorage.getItem('unansweredQuestions') || '[]');
      return unansweredQuestions.sort((a: any, b: any) => b.frequency - a.frequency);
    }
  } catch (error) {
    console.error('Error fetching unanswered questions:', error);
  }
  
  return [];
}

// Add answer to knowledge base
export async function addToKnowledgeBase(
  question: string,
  answer: string,
  category: string,
  keywords: string[],
  adminId: string
): Promise<boolean> {
  try {
    if (!isUsingDemoCredentials) {
      const { error } = await supabase
        .from('knowledge_base')
        .insert({
          question,
          answer,
          category,
          keywords,
          created_by: adminId
        });

      return !error;
    } else {
      // Demo mode
      const knowledgeBase = JSON.parse(localStorage.getItem('customKnowledgeBase') || '[]');
      
      knowledgeBase.push({
        id: Date.now().toString(),
        question,
        answer,
        category,
        keywords,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: adminId
      });

      localStorage.setItem('customKnowledgeBase', JSON.stringify(knowledgeBase));
      return true;
    }
  } catch (error) {
    console.error('Error adding to knowledge base:', error);
    return false;
  }
}

// Update question status
export async function updateQuestionStatus(
  questionId: string, 
  status: 'pending' | 'answered' | 'ignored'
): Promise<void> {
  try {
    if (!isUsingDemoCredentials) {
      await supabase
        .from('unanswered_questions')
        .update({ status })
        .eq('id', questionId);
    } else {
      // Demo mode
      const unansweredQuestions = JSON.parse(localStorage.getItem('unansweredQuestions') || '[]');
      const questionIndex = unansweredQuestions.findIndex((q: any) => q.id === questionId);
      
      if (questionIndex >= 0) {
        unansweredQuestions[questionIndex].status = status;
        localStorage.setItem('unansweredQuestions', JSON.stringify(unansweredQuestions));
      }
    }
  } catch (error) {
    console.error('Error updating question status:', error);
  }
}

// Get custom knowledge base entries
export async function getCustomKnowledgeBase(): Promise<KnowledgeBaseEntry[]> {
  try {
    if (!isUsingDemoCredentials) {
      const { data, error } = await supabase
        .from('knowledge_base')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } else {
      // Demo mode
      return JSON.parse(localStorage.getItem('customKnowledgeBase') || '[]');
    }
  } catch (error) {
    console.error('Error fetching custom knowledge base:', error);
  }
  
  return [];
}

// Search custom knowledge base
export function searchCustomKnowledgeBase(query: string, customKB: KnowledgeBaseEntry[]): string | null {
  const lowerQuery = query.toLowerCase();
  
  const match = customKB.find(entry => 
    entry.keywords.some(keyword => lowerQuery.includes(keyword.toLowerCase())) ||
    lowerQuery.includes(entry.question.toLowerCase().substring(0, 15)) ||
    entry.question.toLowerCase().includes(lowerQuery.substring(0, 15))
  );
  
  return match ? match.answer : null;
}