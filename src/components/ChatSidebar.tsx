import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  GraduationCap, 
  FileText, 
  CreditCard, 
  MapPin, 
  Users, 
  Phone,
  X,
  Menu
} from 'lucide-react';
import { QUICK_INFO } from '../data/quickInfo';
import { Button } from './ui/button';

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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleQuickReply = (answer: string) => {
    onQuickReply(answer);
    if (window.innerWidth < 768) {
      onToggle(); // Close sidebar on mobile after selection
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        onClick={onToggle}
        className="md:hidden fixed top-4 right-4 z-50 bg-mau-blue hover:bg-mau-dark-blue text-white p-2 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
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
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed md:relative right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-40 md:z-0 md:translate-x-0 md:shadow-none"
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Quick Help</h2>
            <p className="text-sm text-gray-600">Find answers instantly</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {QUICK_INFO.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              const isExpanded = expandedCategories.includes(category.id);

              return (
                <div key={category.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent size={18} className="text-mau-blue" />
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
                              className="w-full text-left p-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-mau-blue rounded transition-colors"
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

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                <img 
                  src="/MAU.jpg" 
                  alt="MAU Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
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