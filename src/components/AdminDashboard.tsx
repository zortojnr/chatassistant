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
  Search
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface DashboardStats {
  totalStudents: number;
  totalChats: number;
  activeToday: number;
  topQuestions: { question: string; count: number }[];
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

  useEffect(() => {
    fetchDashboardStats();
    fetchRealtimeChats();
    
    // Set up real-time subscription for new messages
    const subscription = supabase
      .channel('chat_messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => {
          fetchRealtimeChats();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total students
      const { count: studentCount } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

      // Fetch total chat sessions
      const { count: chatCount } = await supabase
        .from('chat_sessions')
        .select('*', { count: 'exact', head: true });

      // Fetch today's active users
      const today = new Date().toISOString().split('T')[0];
      const { count: activeToday } = await supabase
        .from('chat_sessions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      setStats({
        totalStudents: studentCount || 0,
        totalChats: chatCount || 0,
        activeToday: activeToday || 0,
        topQuestions: [
          { question: "How do I register for courses?", count: 45 },
          { question: "What are the payment methods?", count: 32 },
          { question: "Where is the library located?", count: 28 },
          { question: "How do I check my results?", count: 24 },
          { question: "What is the grading system?", count: 19 }
        ]
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchRealtimeChats = async () => {
    try {
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
        .limit(20);

      if (!error && data) {
        setRealtimeChats(data);
      }
    } catch (error) {
      console.error('Error fetching realtime chats:', error);
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
                <span className="text-sm font-medium text-mau-primary">{item.count}</span>
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
        >
          Refresh
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
            {filteredChats.map((chat, index) => (
              <div key={index} className="border-l-4 border-mau-primary pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-mau-primary">
                    {chat.chat_sessions?.students?.student_id || 'Unknown Student'}
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
            ))}
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