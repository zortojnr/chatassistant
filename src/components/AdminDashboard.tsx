import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Eye,
  TrendingUp,
  Clock,
  Search,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { supabase, isUsingDemoCredentials } from '../lib/supabase';
import { 
  getUnansweredQuestions, 
  addToKnowledgeBase, 
  updateQuestionStatus, 
  getCustomKnowledgeBase,
  UnansweredQuestion,
  KnowledgeBaseEntry 
} from '../lib/knowledgeBaseManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface DashboardStats {
  totalStudents: number;
  totalChats: number;
  activeToday: number;
  topQuestions: { question: string; count?: number }[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  console.log('AdminDashboard component rendered');
  
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalChats: 0,
    activeToday: 0,
    topQuestions: []
  });
  const [realtimeChats, setRealtimeChats] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unansweredQuestions, setUnansweredQuestions] = useState<UnansweredQuestion[]>([]);
  const [customKnowledgeBase, setCustomKnowledgeBase] = useState<KnowledgeBaseEntry[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<UnansweredQuestion | null>(null);
  const [answerForm, setAnswerForm] = useState({
    answer: '',
    category: '',
    keywords: ''
  });

  useEffect(() => {
    setIsLoading(true);
    fetchDashboardStats();
    fetchRealtimeChats();
    fetchUnansweredQuestions();
    fetchCustomKnowledgeBase();
    
    // Set up real-time subscription for new messages
    let subscription;
    
    if (!isUsingDemoCredentials) {
      subscription = supabase
        .channel('chat_messages')
        .on('postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'chat_messages' },
          (payload) => {
            console.log('New message received:', payload);
            fetchRealtimeChats();
            fetchDashboardStats();
          }
        )
        .subscribe();
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      let totalStudents = 0;
      let totalChats = 0;
      let activeToday = 0;
      let topQuestions: { question: string; count?: number }[] = [];

      if (isUsingDemoCredentials) {
        // Use localStorage to track demo users
        const demoUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
        const demoChats = JSON.parse(localStorage.getItem('demoChats') || '[]');
        
        totalStudents = demoUsers.length;
        totalChats = demoChats.length;
        
        // Count today's chats
        const today = new Date().toDateString();
        activeToday = demoChats.filter((chat: any) => 
          new Date(chat.created_at).toDateString() === today
        ).length;
        
        topQuestions = [
          { question: "How do I register for courses?" },
          { question: "What are the payment methods?" },
          { question: "Where is the library located?" },
          { question: "How do I check my results?" },
          { question: "What is the grading system?" }
        ]
      } else {
        // Fetch real data from Supabase
        const { count: studentCount } = await supabase
          .from('students')
          .select('*', { count: 'exact', head: true });

        const { count: chatCount } = await supabase
          .from('chat_sessions')
          .select('*', { count: 'exact', head: true });

        const today = new Date().toISOString().split('T')[0];
        const { count: activeTodayCount } = await supabase
          .from('chat_sessions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today);

        totalStudents = studentCount || 0;
        totalChats = chatCount || 0;
        activeToday = activeTodayCount || 0;
        
        // Get frequently asked questions from chat messages
        const { data: messages } = await supabase
          .from('chat_messages')
          .select('content')
          .eq('is_user', true)
          .limit(100);
          
        if (messages) {
          // Simple frequency analysis of user messages
          const questionCounts: { [key: string]: number } = {};
          messages.forEach(msg => {
            const content = msg.content.toLowerCase();
            if (content.includes('register') || content.includes('registration')) {
              questionCounts['How do I register for courses?'] = (questionCounts['How do I register for courses?'] || 0) + 1;
            }
            if (content.includes('payment') || content.includes('fee') || content.includes('pay')) {
              questionCounts['What are the payment methods?'] = (questionCounts['What are the payment methods?'] || 0) + 1;
            }
            if (content.includes('library')) {
              questionCounts['Where is the library located?'] = (questionCounts['Where is the library located?'] || 0) + 1;
            }
            if (content.includes('result') || content.includes('grade')) {
              questionCounts['How do I check my results?'] = (questionCounts['How do I check my results?'] || 0) + 1;
            }
            if (content.includes('grading') || content.includes('system')) {
              questionCounts['What is the grading system?'] = (questionCounts['What is the grading system?'] || 0) + 1;
            }
          });
          
          topQuestions = Object.entries(questionCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([question, count]) => ({ question, count }));
        }
        
        if (topQuestions.length === 0) {
          topQuestions = [
            { question: "How do I register for courses?" },
            { question: "What are the payment methods?" },
            { question: "Where is the library located?" },
            { question: "How do I check my results?" },
            { question: "What is the grading system?" }
          ];
        }
      }
      
      setStats({
        totalStudents,
        totalChats,
        activeToday,
        topQuestions
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Fallback to basic stats
      setStats({
        totalStudents: 0,
        totalChats: 0,
        activeToday: 0,
        topQuestions: [
          { question: "How do I register for courses?" },
          { question: "What are the payment methods?" },
          { question: "Where is the library located?" },
          { question: "How do I check my results?" },
          { question: "What is the grading system?" }
        ]
      });
    }
  };

  const fetchRealtimeChats = async () => {
    setIsRefreshing(true);
    try {
      if (isUsingDemoCredentials) {
        // Get real demo chats from localStorage
        const demoChats = JSON.parse(localStorage.getItem('demoChats') || '[]');
        setRealtimeChats(demoChats);
      } else {
        const { data, error } = await supabase
          .from('chat_messages')
          .select(`
            *,
            chat_sessions (
              title,
              students (
                student_id,
                first_name,
                last_name
              )
            )
          `)
          .order('created_at', { ascending: false })
          .limit(50);

        if (!error && data) {
          setRealtimeChats(data);
        }
      }
    } catch (error) {
      console.error('Error fetching realtime chats:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchUnansweredQuestions = async () => {
    try {
      const questions = await getUnansweredQuestions();
      setUnansweredQuestions(questions);
    } catch (error) {
      console.error('Error fetching unanswered questions:', error);
    }
  };

  const fetchCustomKnowledgeBase = async () => {
    try {
      const kb = await getCustomKnowledgeBase();
      setCustomKnowledgeBase(kb);
    } catch (error) {
      console.error('Error fetching custom knowledge base:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      fetchDashboardStats(),
      fetchRealtimeChats(),
      fetchUnansweredQuestions(),
      fetchCustomKnowledgeBase()
    ]);
    setIsRefreshing(false);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'chats') {
      fetchRealtimeChats();
    } else if (tabId === 'knowledge') {
      fetchUnansweredQuestions();
      fetchCustomKnowledgeBase();
    }
  };

  const handleAddAnswer = async () => {
    if (!selectedQuestion || !answerForm.answer.trim()) return;

    const keywords = answerForm.keywords.split(',').map(k => k.trim()).filter(k => k);
    
    const success = await addToKnowledgeBase(
      selectedQuestion.question,
      answerForm.answer,
      answerForm.category || 'general',
      keywords,
      'admin' // In real app, use actual admin ID
    );

    if (success) {
      await updateQuestionStatus(selectedQuestion.id, 'answered');
      setSelectedQuestion(null);
      setAnswerForm({ answer: '', category: '', keywords: '' });
      await fetchUnansweredQuestions();
      await fetchCustomKnowledgeBase();
    }
  };

  const handleIgnoreQuestion = async (questionId: string) => {
    await updateQuestionStatus(questionId, 'ignored');
    await fetchUnansweredQuestions();
  };

  const filteredChats = realtimeChats.filter(chat =>
    chat.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.chat_sessions?.students?.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOverview = () => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Students', value: stats.totalStudents, icon: Users, desc: 'Registered users' },
          { title: 'Total Chats', value: stats.totalChats, icon: MessageSquare, desc: 'Chat sessions' },
          { title: 'Active Today', value: stats.activeToday, icon: TrendingUp, desc: 'Users today' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-mau-primary/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-mau-primary" />
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="text-2xl font-bold text-mau-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-xs text-gray-500">{stat.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-mau-primary">Frequently Asked Questions</CardTitle>
            <CardDescription>Most common student queries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topQuestions.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-mau-light rounded-lg hover:bg-mau-light/80 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-sm text-gray-700">{item.question}</span>
                  {item.count && (
                    <span className="text-sm font-medium text-mau-primary">{item.count}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  const renderRealtimeChats = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search chats or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          onClick={handleRefresh}
          className="bg-mau-primary hover:bg-mau-secondary"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-mau-primary flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Real-time Chat Monitor
            </CardTitle>
            <CardDescription>Live view of student conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <motion.div 
                  className="text-center py-8 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No chat messages found</p>
                  <p className="text-sm">Messages will appear here as students interact with the assistant</p>
                </motion.div>
              ) : (
              filteredChats.map((chat, index) => (
                <motion.div 
                  key={index} 
                  className="border-l-4 border-mau-primary pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-mau-primary">
                      {chat.chat_sessions?.students?.student_id || chat.student_id || 'Unknown Student'}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(chat.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                    {chat.content}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      chat.is_user 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {chat.is_user ? 'Student' : 'Assistant'}
                    </span>
                    {chat.intent && (
                      <span className="text-xs px-2 py-1 rounded bg-mau-light text-mau-primary">
                        {chat.intent}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderKnowledgeBase = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unanswered Questions */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-mau-primary flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Unanswered Questions ({unansweredQuestions.filter(q => q.status === 'pending').length})
            </CardTitle>
            <CardDescription>Questions that need admin attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {unansweredQuestions.filter(q => q.status === 'pending').map((question) => (
                <motion.div 
                  key={question.id}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        {question.question}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Asked by: {question.student_name}</span>
                        <span>•</span>
                        <span>Frequency: {question.frequency}</span>
                        <span>•</span>
                        <span>{new Date(question.asked_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedQuestion(question)}
                      className="bg-mau-primary hover:bg-mau-secondary text-white"
                    >
                      Add Answer
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleIgnoreQuestion(question.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Ignore
                    </Button>
                  </div>
                </motion.div>
              ))}
              {unansweredQuestions.filter(q => q.status === 'pending').length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending questions</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Custom Knowledge Base */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-mau-primary flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Custom Knowledge Base ({customKnowledgeBase.length})
            </CardTitle>
            <CardDescription>Admin-added Q&A entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {customKnowledgeBase.map((entry) => (
                <motion.div 
                  key={entry.id}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    Q: {entry.question}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    A: {entry.answer.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-mau-light rounded">
                      {entry.category}
                    </span>
                    <span>•</span>
                    <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
              {customKnowledgeBase.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No custom entries yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Answer Form Modal */}
      {selectedQuestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-lg font-semibold text-mau-primary mb-4">
              Add Answer to Knowledge Base
            </h3>
            
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-sm font-medium text-gray-800">Question:</p>
              <p className="text-sm text-gray-600">{selectedQuestion.question}</p>
              <p className="text-xs text-gray-500 mt-1">
                Asked by: {selectedQuestion.student_name} • Frequency: {selectedQuestion.frequency}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Answer *
                </label>
                <textarea
                  value={answerForm.answer}
                  onChange={(e) => setAnswerForm(prev => ({ ...prev, answer: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-mau-primary focus:border-mau-primary"
                  rows={4}
                  placeholder="Provide a comprehensive answer..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={answerForm.category}
                  onChange={(e) => setAnswerForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-mau-primary focus:border-mau-primary"
                >
                  <option value="">Select category</option>
                  <option value="admissions">Admissions</option>
                  <option value="fees">Fees & Payment</option>
                  <option value="academic">Academic</option>
                  <option value="hostel">Accommodation</option>
                  <option value="campus">Campus Life</option>
                  <option value="contacts">Contacts & Support</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords (comma-separated)
                </label>
                <Input
                  value={answerForm.keywords}
                  onChange={(e) => setAnswerForm(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="e.g., registration, course, fees, payment"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleAddAnswer}
                className="bg-mau-primary hover:bg-mau-secondary text-white"
                disabled={!answerForm.answer.trim()}
              >
                Add to Knowledge Base
              </Button>
              <Button
                onClick={() => setSelectedQuestion(null)}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mau-primary via-mau-secondary to-mau-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full shadow-lg flex items-center justify-center p-2">
            <img 
              src="/MAU.jpg" 
              alt="MAU Logo" 
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <motion.h1 
            className="text-white text-2xl font-bold mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Admin Dashboard...
          </motion.h1>
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-mau-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center p-1.5">
                <img 
                  src="/MAU.jpg" 
                  alt="MAU Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">MAU Admin Dashboard</h1>
                <p className="text-sm text-blue-200">System Administration</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-mau-secondary flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm"
        >
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'chats', label: 'Real-time Chats', icon: MessageSquare },
            { id: 'knowledge', label: 'Knowledge Base', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-mau-primary text-white'
                    : 'text-gray-600 hover:text-mau-primary hover:bg-mau-light'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'chats' && renderRealtimeChats()}
            {activeTab === 'knowledge' && renderKnowledgeBase()}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-mau-primary">System Settings</CardTitle>
                    <CardDescription>Configure system parameters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          OpenAI API Key
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter OpenAI API key..."
                          className="max-w-md"
                        />
                      </div>
                      <Button className="bg-mau-primary hover:bg-mau-secondary">
                        Save Settings
                      </Button>
                      <Button 
                        onClick={handleRefresh}
                        variant="outline"
                        className="border-mau-primary text-mau-primary hover:bg-mau-primary/10"
                        disabled={isRefreshing}
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;