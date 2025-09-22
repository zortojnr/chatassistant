import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  GraduationCap, 
  FileText, 
  CreditCard, 
  MapPin, 
  Users, 
  Phone
} from 'lucide-react';
import { QUICK_INFO } from '../data/quickInfo';

interface ChatSidebarProps {
  onQuickReply: (message: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const iconMap = {
  GraduationCap,
  FileText,
  CreditCard,
  MapPin,
  Users,
  Phone
};

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onQuickReply, isOpen, onToggle }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById('chat-sidebar');
        if (sidebar && !sidebar.contains(event.target as Node)) {
          onToggle();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleQuickReply = (answer: string) => {
    // Instead of sending the answer directly, send the question to make it feel natural
    const parentItem = QUICK_INFO.find(category => 
      category.items.some(item => item.answer === answer)
    );
    
    if (parentItem) {
      const questionItem = parentItem.items.find(item => item.answer === answer);
      if (questionItem) {
        onQuickReply(questionItem.question);
        return;
      }
    }
    
    // Fallback to the answer if question not found
    onQuickReply(answer);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        id="chat-sidebar"
        initial={{ x: '100%' }}
        animate={{ 
          x: isOpen ? 0 : window.innerWidth < 768 ? '100%' : 0 
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed md:relative right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-40 md:z-0 md:shadow-sm"
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-mau-light">
            <h2 className="text-lg font-semibold text-gray-800">Quick Ask a Question</h2>
            <p className="text-sm text-gray-600">Find answers instantly</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {QUICK_INFO.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              const isExpanded = expandedCategories.includes(category.id);

              return (
                <div key={category.id} className="border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-3 flex items-center justify-between text-left hover:bg-mau-light/50 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent size={18} className="text-mau-primary" />
                      <span className="font-medium text-gray-800">
                        {category.title}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 space-y-2">
                          {category.items.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(item.answer)}
                              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-mau-light hover:text-mau-primary rounded transition-colors"
                            >
                              {item.question}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-200 bg-mau-light/30">
            <div className="text-center">
              <p className="text-xs text-gray-600">
                MAU Assistant • Available 24/7
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatSidebar;