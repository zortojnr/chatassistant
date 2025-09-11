import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, LogOut, Loader2 } from 'lucide-react';
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

    // Simulate typing delay
    setTimeout(async () => {
      const response = await processMessage(inputMessage, userData);
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
    }, 1000 + Math.random() * 1000);
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
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center p-1">
                <img 
                  src="/MAU.jpg" 
                  alt="MAU Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  MAU Assistant
                </h1>
                <p className="text-sm text-gray-600">
                  {userData.faculty} • {userData.level}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="outline"
                size="sm"
                className="md:hidden"
              >
                Quick Help
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 mb-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin" />
                </div>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about MAU..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
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
      <ChatSidebar
        onQuickReply={handleQuickReply}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
};

export default ChatInterface;