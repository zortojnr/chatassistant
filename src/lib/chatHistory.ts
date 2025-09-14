import { supabase } from './supabase';
import { ChatMessage } from '../types/user';

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export async function createChatSession(studentId: string, title: string): Promise<string | null> {
  try {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert({
          student_id: studentId,
          title: title,
        })
        .select()
        .single();

      if (!error && data) {
        return data.id;
      }
    } catch (supabaseError) {
      console.log('Supabase not available, using mock session');
    }

    // Fallback to mock session ID
    return `session_${Date.now()}`;
  } catch (error) {
    console.error('Error creating chat session:', error);
    return null;
  }
}

export async function getChatSessions(studentId: string): Promise<ChatSession[]> {
  try {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('student_id', studentId)
        .order('updated_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } catch (supabaseError) {
      console.log('Supabase not available, returning empty sessions');
    }

    // Fallback to empty array
    return [];
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return [];
  }
}

export async function saveChatMessage(sessionId: string, message: ChatMessage): Promise<void> {
  try {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          content: message.content,
          is_user: message.isUser,
          intent: message.intent || '',
          confidence: message.confidence || 0,
        });

      if (!error) {
        return;
      }
    } catch (supabaseError) {
      console.log('Supabase not available, message not saved');
    }

    // Fallback - do nothing (message not saved in development)
  } catch (error) {
    console.error('Error saving chat message:', error);
  }
}

export async function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  try {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (!error && data) {
        return data.map(msg => ({
          id: msg.id,
          content: msg.content,
          isUser: msg.is_user,
          timestamp: new Date(msg.created_at),
          intent: msg.intent,
          confidence: msg.confidence,
        }));
      }
    } catch (supabaseError) {
      console.log('Supabase not available, returning empty messages');
    }

    // Fallback to empty array
    return [];
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
}

export async function updateChatSession(sessionId: string, title: string): Promise<void> {
  try {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ 
          title: title,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId);

      if (!error) {
        return;
      }
    } catch (supabaseError) {
      console.log('Supabase not available, session not updated');
    }

    // Fallback - do nothing (session not updated in development)
  } catch (error) {
    console.error('Error updating chat session:', error);
  }
}