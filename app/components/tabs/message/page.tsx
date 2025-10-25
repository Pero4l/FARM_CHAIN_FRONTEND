import React from "react";
import {
  Home,
  Users,
  MessageCircle,
  Store,
  Cloud,
  Plus,
  Heart,
  MessageSquare,
  Share,
  TrendingUp,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Filter,
  Star,
  Calendar,
  DollarSign,
  Truck,
  Leaf,
  BarChart3,
  Camera,
  Video,
  Mic,
  Send,
  Phone,
  Mail,
  Globe,
  Zap,
  Target,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  PieChart,
  Search,
} from "lucide-react";

type Message = {
  id: number;
  sender: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
};

const messages: Message[] = [
  {
    id: 1,
    sender: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Thanks for the planting schedule! This will help a lot.",
    time: "5 min ago",
    unread: true,
    online: true,
  },
  {
    id: 2,
    sender: "AgriTech Solutions",
    avatar: "AS",
    lastMessage: "We'd like to discuss a partnership opportunity.",
    time: "1 hour ago",
    unread: true,
    online: false,
  },
  {
    id: 3,
    sender: "Miguel Rodriguez",
    avatar: "MR",
    lastMessage: "Perfect! When can we arrange the corn trade?",
    time: "3 hours ago",
    unread: false,
    online: true,
  },
];

const message = () => {
  return (
    <div>
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black mb-2">Messages 💬</h2>
                <p className="text-purple-100 text-lg">
                  Stay connected with the farming community
                </p>
              </div>
              <div className="text-6xl opacity-20">📨</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Conversations</h3>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Call"
                >
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>New Message</span>
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {message.avatar}
                    </div>
                    {message.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {message.sender}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {message.time}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        message.unread
                          ? "text-gray-900 font-medium"
                          : "text-gray-600"
                      }`}
                    >
                      {message.lastMessage}
                    </p>
                  </div>

                  {message.unread && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default message;
