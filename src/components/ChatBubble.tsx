import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '../types/user';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 mb-4 ${
        message.isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        message.isUser 
          ? 'bg-green-600 text-white' 
          : 'bg-gray-200 text-gray-600'
      }`}>
        {message.isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div className={`max-w-[80%] ${message.isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 rounded-lg ${
          message.isUser
            ? 'bg-green-600 text-white rounded-br-sm'
            : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${
          message.isUser ? 'text-right' : 'text-left'
        }`}>
          {format(message.timestamp, 'HH:mm')}
          {message.intent && (
            <span className="ml-2 text-blue-500">
              • {message.intent}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBubble;