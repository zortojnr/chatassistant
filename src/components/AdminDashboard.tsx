import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    fetchDashboardStats();
    fetchRealtimeChats();
    
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

  const filteredChats = realtimeChats.filter(chat =>
    chat.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.chat_sessions?.students?.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-mau-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-mau-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mau-primary">{stats.totalStudents}</div>
            <p className="text-xs text-gray-500">Registered users</p>
          </CardContent>
        </Card>

        <Card className="border-mau-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-mau-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mau-primary">{stats.totalChats}</div>
            <p className="text-xs text-gray-500">Chat sessions</p>
          </CardContent>
        </Card>

        <Card className="border-mau-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-mau-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-mau-primary">{stats.activeToday}</div>
            <p className="text-xs text-gray-500">Users today</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-mau-primary">Frequently Asked Questions</CardTitle>
          <CardDescription>Most common student queries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.topQuestions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-mau-light rounded-lg">
                <span className="text-sm text-gray-700">{item.question}</span>
                {item.count && (
                  <span className="text-sm font-medium text-mau-primary">{item.count}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
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
          onClick={fetchRealtimeChats}
          className="bg-mau-primary hover:bg-mau-secondary"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <Card>
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
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No chat messages found</p>
                <p className="text-sm">Messages will appear here as students interact with the assistant</p>
              </div>
            ) : (
            filteredChats.map((chat, index) => (
              <div key={index} className="border-l-4 border-mau-primary pl-4 py-2">
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
              </div>
            ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'chats', label: 'Real-time Chats', icon: MessageSquare },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'chats' && renderRealtimeChats()}
          {activeTab === 'settings' && (
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
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;