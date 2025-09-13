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
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        student_id: studentId,
        title: title,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating chat session:', error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error('Error creating chat session:', error);
    return null;
  }
}

export async function getChatSessions(studentId: string): Promise<ChatSession[]> {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('student_id', studentId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching chat sessions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return [];
  }
}

export async function saveChatMessage(sessionId: string, message: ChatMessage): Promise<void> {
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

    if (error) {
      console.error('Error saving chat message:', error);
    }
  } catch (error) {
    console.error('Error saving chat message:', error);
  }
}

export async function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching chat messages:', error);
      return [];
    }

    return (data || []).map(msg => ({
      id: msg.id,
      content: msg.content,
      isUser: msg.is_user,
      timestamp: new Date(msg.created_at),
      intent: msg.intent,
      confidence: msg.confidence,
    }));
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
}

export async function updateChatSession(sessionId: string, title: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('chat_sessions')
      .update({ 
        title: title,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (error) {
      console.error('Error updating chat session:', error);
    }
  } catch (error) {
    console.error('Error updating chat session:', error);
  }
}