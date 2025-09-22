import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, LogOut, Loader2, Menu, X, Plus, History, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import ChatBubble from './ChatBubble';
import ChatSidebar from './ChatSidebar';
import { AuthUser, ChatMessage, ChatSession } from '../types/user';
import { processMessage } from '../utils/chatbot';
import { 
  createChatSession, 
  getChatSessions, 
  saveChatMessage, 
  getChatMessages,
  updateChatSession 
} from '../lib/chatHistory';
import { generateAIResponse } from '../lib/openai';

interface ChatInterfaceProps {
  userData: AuthUser;
  onLogout: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userData, onLogout }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeChat();
  }, [userData.id]);

  const initializeChat = async () => {
    // Load chat sessions
    const sessions = await getChatSessions(userData.id);
    setChatSessions(sessions);

    if (sessions.length > 0) {
      // Load the most recent session
      const latestSession = sessions[0];
      setCurrentSessionId(latestSession.id);
      const sessionMessages = await getChatMessages(latestSession.id);
      setMessages(sessionMessages);
    } else {
      // Create a new session
      await createNewChat();
    }
  };

  const createNewChat = async () => {
    const sessionId = await createChatSession(userData.id, 'New Chat');
    if (sessionId) {
      setCurrentSessionId(sessionId);
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: `Welcome to MAU Assistant, ${userData.firstName || userData.studentId}! 👋\n\nI'm here to help you with academic information, registration, payments, campus services, and more. How can I assist you today?`,
        isUser: false,
        timestamp: new Date(),
        intent: 'greeting'
      };
      setMessages([welcomeMessage]);
      await saveChatMessage(sessionId, welcomeMessage);
      
      // Refresh sessions list
      const sessions = await getChatSessions(userData.id);
      setChatSessions(sessions);
    }
  };

  const loadChatSession = async (sessionId: string) => {
    setCurrentSessionId(sessionId);
    const sessionMessages = await getChatMessages(sessionId);
    setMessages(sessionMessages);
    setShowHistory(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Save user message
    if (currentSessionId) {
      await saveChatMessage(currentSessionId, userMessage);
      
      // Update session title if it's the first user message
      if (messages.length === 1) {
        const title = inputMessage.length > 30 
          ? inputMessage.substring(0, 30) + '...' 
          : inputMessage;
        updateChatSession(currentSessionId, title);
      }
    }
    
    setInputMessage('');
    setIsTyping(true);

    try {
      // Try AI response first, fallback to rule-based
      let responseContent: string;
      const response = await processMessage(inputMessage, userData);
      responseContent = response.content;
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          isUser: false,
          timestamp: new Date(),
          intent: 'ai_response',
          confidence: 0.9
        };

        setMessages(prev => [...prev, botMessage]);
        
        // Save bot message
        if (currentSessionId) {
          saveChatMessage(currentSessionId, botMessage);
        }
        
        setIsTyping(false);
      }, 800 + Math.random() * 400);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (message: string) => {
    // Set the message in the input field and trigger send
    setInputMessage(message);
    
    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    setSidebarOpen(false); // Close sidebar after quick reply
  };

  const renderChatHistory = () => (
    <div className="absolute top-16 left-4 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-mau-primary">Chat History</h3>
          <Button
            onClick={() => setShowHistory(false)}
            variant="ghost"
            className="bg-mau-primary text-white px-4 md:px-6 py-2 rounded-lg hover:bg-mau-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[44px]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="p-2">
        <Button
          onClick={createNewChat}
          className="w-full mb-2 bg-mau-primary hover:bg-mau-secondary text-white flex items-center gap-2"
          size="sm"
        >
          <Plus size={16} />
          New Chat
        </Button>
        <div className="space-y-1">
          {chatSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => loadChatSession(session.id)}
              className={`w-full text-left p-2 rounded hover:bg-mau-light transition-colors ${
                currentSessionId === session.id ? 'bg-mau-light border border-mau-primary' : ''
              }`}
            >
              <div className="font-medium text-sm text-gray-800 truncate">
                {session.title}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(session.updated_at).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-mau-primary hover:bg-mau-secondary text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
        >
          <Menu size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-mau-gray relative overflow-hidden">
      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="bg-mau-primary shadow-sm border-b border-mau-secondary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 p-4">
              <div className="flex flex-col justify-center">
                <h1 className="text-lg font-semibold text-white leading-tight">
                  MAU Assistant
                </h1>
                <p className="text-xs md:text-sm text-blue-200 leading-snug">
                  Your intelligent assistant for MAU academic support
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4">
              {/* Minimize Button */}
              <Button
                onClick={() => setIsMinimized(true)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-mau-secondary"
              >
                <Minimize2 size={16} />
              </Button>
              
              {/* Chat History Button */}
              <Button
                onClick={() => setShowHistory(!showHistory)}
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 text-white hover:bg-mau-secondary"
              >
                <History size={16} />
                History
              </Button>
              
              {/* Mobile Menu Button */}
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-mau-secondary"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
              
              {/* Desktop Quick Help Button */}
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="sm"
                className="hidden md:flex items-center gap-2 text-white hover:bg-mau-secondary"
              >
                <Menu size={16} />
                Quick Ask a Question
              </Button>
              
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-white hover:bg-mau-secondary"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Chat History Dropdown */}
        {showHistory && renderChatHistory()}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto relative">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 mb-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mau-light text-mau-primary flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin" />
                </div>
                <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-bl-sm shadow-sm border">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-mau-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-mau-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-mau-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-end gap-3">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about MAU..."
                className="flex-1 rounded-2xl border-gray-300 focus:border-mau-primary focus:ring-mau-primary resize-none min-h-[44px] py-3"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-mau-primary hover:bg-mau-secondary text-white rounded-2xl px-4 py-3 h-[44px] transition-all duration-200"
              >
                <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              MAU Assistant • Powered by AI • Chat history saved automatically
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        <ChatSidebar
          onQuickReply={handleQuickReply}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>
    </div>
  );
};

export default ChatInterface;