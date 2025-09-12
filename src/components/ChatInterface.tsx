import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, LogOut, Loader2, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import ChatBubble from './ChatBubble';
import ChatSidebar from './ChatSidebar';
import { UserData, ChatMessage } from '../types/user';
import { processMessage } from '../utils/chatbot';

interface ChatInterfaceProps {
  userData: UserData;
  onLogout: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userData, onLogout }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `Welcome to MAU Assistant, ${userData.studentId}! 👋\n\nI'm here to help you with academic information, registration, payments, campus services, and more. How can I assist you today?`,
      isUser: false,
      timestamp: new Date(),
      intent: 'greeting'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await processMessage(inputMessage, userData);
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: response.content,
          isUser: false,
          timestamp: new Date(),
          intent: response.intent,
          confidence: response.confidence
        };

        setMessages(prev => [...prev, botMessage]);
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
    const quickMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: false,
      timestamp: new Date(),
      intent: 'quick_info'
    };

    setMessages(prev => [...prev, quickMessage]);
    setSidebarOpen(false); // Close sidebar after quick reply
  };

  return (
    <div className="h-screen flex bg-mau-gray relative overflow-hidden">
      {/* Fixed Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-48 h-48 opacity-3">
          <img 
            src="/MAU.jpg" 
            alt="MAU Logo Background" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col relative z-10 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="bg-mau-primary shadow-sm border-b border-mau-secondary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center p-1.5">
                <img 
                  src="/MAU.jpg" 
                  alt="MAU Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  MAU Assistant
                </h1>
                <p className="text-sm text-blue-200">
                  {userData.faculty} • {userData.level}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4">
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
                Quick Help
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
              MAU Assistant can help with academic, administrative, and campus information
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