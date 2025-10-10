'use client'
import React, { useState } from "react";
import {
  Home, Users, MessageCircle, Store, Cloud, Plus, 
  Heart, MessageSquare, Share, TrendingUp, MapPin, Thermometer,
  Droplets, Wind, Sun, Filter, Star,
  Calendar, DollarSign, Truck, Leaf, BarChart3, Camera,
  Video, Mic, Send, Phone, Mail, Globe, Zap, Target, ShoppingCart,
  CheckCircle, AlertCircle, Clock, Eye, PieChart, Menu, X,Search
} from "lucide-react";


type ButtonProps = {
  onClose?: () => void;
};

/* ================= TYPES ================= */
type Post = {
  id: number;
  farmer: string;
  location: string;
  avatar: string;
  time: string;
  verified: boolean;
  farmSize: string;
  content: string;
  images?: string[];
  video?: boolean;
  likes: number;
  comments: number;
  shares: number;
  type: string;
  price?: string;
  tags?: string[];
  category: string;
};

type Message = {
  id: number;
  sender: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
};

type MarketplaceItem = {
  id: number;
  title: string;
  quantity?: string;
  price: string;
  pricePerUnit?: string;
  seller: string;
  location: string;
  rating: number;
  image: string;
  certified?: string;
  harvestDate?: string;
  category: string;
  condition?: string;
  shipping?: string;
  specifications?: string;
  availability?: string;
  verified?: boolean;
  insurance?: string;
  varieties?: string;
  readyDate?: string;
  organic?: boolean;
  guarantee?: string;
  flowerSource?: string;
  tested?: string;
  wholesale?: boolean;
};

type WeatherDay = {
  day: string;
  high: string;
  low: string;
  condition: string;
  precipitation: string;
  icon: React.ReactNode;
};

type WeatherData = {
  location: string;
  current: {
    temp: string;
    condition: string;
    humidity: string;
    wind: string;
    pressure: string;
    uvIndex: number;
    visibility: string;
    icon: React.ReactNode;
  };
  forecast: WeatherDay[];
  alerts: { type: string; message: string; severity: string }[];
};

type Insight = {
  title: string;
  value: string;
  status: string;
  icon: React.ReactNode;
};

type AnalyticsData = {
  farmPerformance: {
    metric: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }[];
  cropData: {
    crop: string;
    planted: string;
    expected: string;
    revenue: string;
  }[];
};

/* ================ SMALL COMPONENTS ================ */
const TabButton: React.FC<{
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  badge?: number;
}> = ({ id, icon: Icon, label, isActive, onClick, badge }) => (
  <button
    onClick={() => onClick(id)}
    className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 w-full ${
      isActive
        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:scale-105"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-semibold">{label}</span>
    {badge && badge > 0 && (
      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {post.avatar}
            </div>
            {post.verified && (
              <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-bold text-lg text-gray-900">{post.farmer}</h3>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {post.category === "commercial"
                  ? "Commercial"
                  : post.category === "cooperative"
                  ? "Cooperative"
                  : "Small Scale"}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {post.location}
              </div>
              •
              <span>{post.farmSize}</span>
              •
              <span>{post.time}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>

        {post.price && (
          <div className="mt-3 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
            <DollarSign className="w-4 h-4" />
            <span>{post.price}</span>
          </div>
        )}
      </div>

      {post.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer hover:underline">
              {tag}
            </span>
          ))}
        </div>
      )}

      {post.images && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {post.images.map((img, i) => (
            <div key={i} className={`${img} rounded-2xl h-48 flex items-center justify-center text-white text-6xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <span className="relative z-10">🌱</span>
            </div>
          ))}
        </div>
      )}

      {post.video && (
        <div className="mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl h-64 flex items-center justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center">
            <Video className="w-16 h-16 mx-auto mb-3" />
            <p className="font-bold text-lg">Watch Full Video</p>
          </div>
        </div>
      )}
    </div>

    <div className="border-t border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
            <Share className="w-5 h-5" />
            <span className="font-semibold">{post.shares}</span>
          </button>
        </div>

        <div className="text-sm text-gray-500">
          <Eye className="w-4 h-4 inline mr-1" />
          {post.likes + post.comments * 3} views
        </div>
      </div>
    </div>
  </div>
);




/* ================= MAIN COMPONENT ================= */
const FarmChain: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notifications, setNotifications] = useState(3);
  const [mainMenu, setMainMenu] = useState(false)

  const posts: Post[] = [
    {
      id: 1,
      farmer: "Sarah Johnson",
      location: "Iowa, USA",
      avatar: "SJ",
      time: "2 hours ago",
      verified: true,
      farmSize: "50 acres",
      content: "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
      images: [
        "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500",
        "bg-gradient-to-br from-green-500 to-emerald-600",
      ],
      likes: 142,
      comments: 34,
      shares: 18,
      type: "success-story",
      tags: ["#OrganicFarming", "#CompanionPlanting", "#SustainableAgriculture"],
      category: "small-scale",
    },
    {
      id: 2,
      farmer: "AgriTech Solutions",
      location: "California, USA",
      avatar: "AS",
      time: "4 hours ago",
      verified: true,
      farmSize: "2,500 acres",
      content: "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
      video: true,
      likes: 1200,
      comments: 67,
      shares: 45,
      type: "alert",
      tags: ["#DroughtAlert", "#WaterConservation", "#SmartFarming"],
      category: "commercial",
    },
    {
      id: 3,
      farmer: "Miguel Rodriguez",
      location: "Texas, USA",
      avatar: "MR",
      time: "8 hours ago",
      verified: false,
      farmSize: "15 acres",
      content: "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.",
      likes: 67,
      comments: 29,
      shares: 12,
      type: "trade",
      price: "$1,200 value",
      tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"],
      category: "small-scale",
    },
        {id: 4,
      farmer: "Sarah Johnson",
      location: "Iowa, USA",
      avatar: "SJ",
      time: "2 hours ago",
      verified: true,
      farmSize: "50 acres",
      content: "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
      images: [
        "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500",
        "bg-gradient-to-br from-green-500 to-emerald-600",
      ],
      likes: 142,
      comments: 34,
      shares: 18,
      type: "success-story",
      tags: ["#OrganicFarming", "#CompanionPlanting", "#SustainableAgriculture"],
      category: "small-scale",
    },
    {
      id: 5,
      farmer: "AgriTech Solutions",
      location: "California, USA",
      avatar: "AS",
      time: "4 hours ago",
      verified: true,
      farmSize: "2,500 acres",
      content: "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
      video: true,
      likes: 289,
      comments: 67,
      shares: 45,
      type: "alert",
      tags: ["#DroughtAlert", "#WaterConservation", "#SmartFarming"],
      category: "commercial",
    },
    {
      id: 6,
      farmer: "Miguel Rodriguez",
      location: "Texas, USA",
      avatar: "MR",
      time: "8 hours ago",
      verified: false,
      farmSize: "15 acres",
      content: "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.",
      likes: 67,
      comments: 29,
      shares: 12,
      type: "trade",
      price: "$1,200 value",
      tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"],
      category: "small-scale",
    }
  ];

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

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: 1,
      title: "Premium Organic Wheat",
      quantity: "5,000 lbs",
      price: "$2,450",
      pricePerUnit: "$0.49/lb",
      seller: "Sunset Organic Farm",
      location: "Nebraska, USA",
      rating: 4.9,
      image: "bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400",
      certified: "USDA Organic",
      harvestDate: "This week",
      category: "grain",
      condition: "Fresh",
      shipping: "Available"
    },
    {
      id: 2,
      title: "John Deere 5075E Tractor",
      condition: "Excellent (2019)",
      price: "$850/week",
      pricePerUnit: "$120/day",
      seller: "Equipment Solutions Co-op",
      location: "Iowa, USA",
      rating: 4.8,
      image: "bg-gradient-to-br from-green-600 via-green-500 to-emerald-600",
      specifications: "75 HP, 4WD, 450 hours",
      availability: "Next week",
      category: "equipment",
      verified: true,
      insurance: "Included"
    },
    {
      id: 3,
      title: "Heirloom Tomato Seedlings",
      quantity: "500 plants",
      price: "$375",
      pricePerUnit: "$0.75 each",
      seller: "Heritage Seeds Farm",
      location: "California, USA",
      rating: 5.0,
      image: "bg-gradient-to-br from-red-500 via-pink-400 to-orange-500",
      varieties: "Cherokee Purple, Brandywine",
      readyDate: "April 15th",
      category: "seeds",
      organic: true,
      guarantee: "90% germination"
    },
    {
      id: 4,
      title: "Raw Honey Bulk Sale",
      quantity: "200 jars (12 oz each)",
      price: "$1,800",
      pricePerUnit: "$9/jar",
      seller: "Golden Bee Apiary",
      location: "Montana, USA",
      rating: 4.9,
      image: "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500",
      flowerSource: "Wildflower & Clover",
      harvestDate: "Last month",
      category: "products",
      tested: "Lab certified pure",
      wholesale: true
    }
  ];

  const weatherData: WeatherData = {
    location: "Your Location",
    current: {
      temp: "74°F",
      condition: "Partly Cloudy",
      humidity: "68%",
      wind: "12 mph NE",
      pressure: "30.15 in",
      uvIndex: 6,
      visibility: "10 miles",
      icon: <Cloud className="w-12 h-12" />,
    },
    forecast: [
      {
        day: "Today",
        high: "78°",
        low: "65°",
        condition: "Sunny",
        precipitation: "0%",
        icon: <Sun className="w-12 h-12 text-yellow-500" />,
      },
      {
        day: "Tomorrow",
        high: "72°",
        low: "60°",
        condition: "Cloudy",
        precipitation: "20%",
        icon: <Cloud className="w-12 h-12 text-gray-400" />,
      },
      {
        day: "Wednesday",
        high: "69°",
        low: "58°",
        condition: "Rain",
        precipitation: "85%",
        icon: <Droplets className="w-12 h-12 text-blue-500" />,
      },
    ],
    alerts: [
      {
        type: "warning",
        message: "Frost warning for Thursday night",
        severity: "moderate",
      },
      {
        type: "info",
        message: "Perfect planting conditions this weekend",
        severity: "low",
      },
    ],
  };

  const farmingInsights: Insight[] = [
    {
      title: "Soil Moisture",
      value: "72%",
      status: "optimal",
      icon: <Droplets className="w-6 h-6" />,
    },
    {
      title: "Growing Days",
      value: "145",
      status: "good",
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: "Market Price",
      value: "+12%",
      status: "up",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Yield Prediction",
      value: "94%",
      status: "excellent",
      icon: <Target className="w-6 h-6" />,
    },
  ];

  const analyticsData: AnalyticsData = {
    farmPerformance: [
      {
        metric: "Total Revenue",
        value: "$145,200",
        change: "+15.3%",
        trend: "up",
      },
      { metric: "Crop Yield", value: "89%", change: "+8.2%", trend: "up" },
      { metric: "Cost Efficiency", value: "92%", change: "+5.7%", trend: "up" },
      {
        metric: "Sustainability Score",
        value: "87%",
        change: "+12.1%",
        trend: "up",
      },
    ],
    cropData: [
      {
        crop: "Corn",
        planted: "125 acres",
        expected: "8,750 bushels",
        revenue: "$52,500",
      },
      {
        crop: "Soybeans",
        planted: "85 acres",
        expected: "4,250 bushels",
        revenue: "$42,500",
      },
      {
        crop: "Wheat",
        planted: "65 acres",
        expected: "3,900 bushels",
        revenue: "$31,200",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      

      {/* BODY */}
      <div className="max-w-[1600px] mx-auto px-6 py-8 mt-20"> 

        <div className="flex gap-3 items-center">
          <div className='md:hidden text-3xl' onClick={()=> setMainMenu(!mainMenu)}>
          {mainMenu ? <X/> : <Menu/>}
          </div>

              <div className="lg:hidden flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 w-96">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search farmers, products, insights..."
                  className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className={mainMenu? " bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sticky top-28": "hidden lg:block sticky top-28"}>
              <nav className="space-y-2">
                <TabButton
                  id="dashboard"
                  icon={Home}
                  label="Dashboard"
                  isActive={activeTab === "dashboard"}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="feed"
                  icon={TrendingUp}
                  label="Feed"
                  isActive={activeTab === "feed"}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="messages"
                  icon={MessageCircle}
                  label="Messages"
                  isActive={activeTab === "messages"}
                  onClick={setActiveTab}
                  badge={2}
                />
                <TabButton
                  id="marketplace"
                  icon={Store}
                  label="Marketplace"
                  isActive={activeTab === "marketplace"}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="weather"
                  icon={Cloud}
                  label="Weather"
                  isActive={activeTab === "weather"}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="analytics"
                  icon={BarChart3}
                  label="Analytics"
                  isActive={activeTab === "analytics"}
                  onClick={setActiveTab}
                />
              </nav>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Post</span>
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <Store className="w-5 h-5" />
                  <span>List Product</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-7">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black mb-2 flex items-center">
                          <Zap className="w-8 h-8 mr-3" />
                          Welcome back, Farmer! 🌱
                        </h2>
                        <p className="text-green-100 text-lg">
                          Your farm is thriving. Here's what's happening today.
                        </p>
                      </div>
                      <div className="text-7xl opacity-20">🚜</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {farmingInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-green-100 text-green-600">
                          {insight.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                          {insight.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-gray-600 text-sm font-medium mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-2xl font-black text-gray-900">
                        {insight.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-7 h-7 mr-3 text-green-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {posts.slice(0, 2).map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {post.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {post.farmer}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {post.content.substring(0, 60)}...
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">{post.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "feed" && (
             <div className="space-y-8 px-4 sm:px-6 md:px-0">
  {/* Post input card */}
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6">
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
        U
      </div>
      <div className="flex-1">
        <textarea
          placeholder="What's happening on your farm today?"
          className="w-full p-3 sm:p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base"
          rows={3}
        />
        <div className="flex flex-wrap justify-between items-center mt-4 gap-2 sm:gap-4">
          <div className="flex flex-wrap space-x-2 sm:space-x-4">
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-green-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-green-50 text-xs sm:text-sm whitespace-nowrap">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Photo</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-blue-50 text-xs sm:text-sm whitespace-nowrap">
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Video</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-red-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-red-50 text-xs sm:text-sm whitespace-nowrap">
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Audio</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-purple-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-purple-50 text-xs sm:text-sm whitespace-nowrap">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Location</span>
            </button>
          </div>

          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 sm:px-8 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-sm sm:text-base whitespace-nowrap">
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Share Post</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Community Feed header */}
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 flex justify-between items-center">
    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Community Feed</h3>
    <button className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-green-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-green-50 text-xs sm:text-sm whitespace-nowrap">
      <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="font-semibold">Filter</span>
    </button>
  </div>

  {/* Posts list */}
  <div className="space-y-8">
    {posts.map((post) => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
</div>

            )}

            {activeTab === "messages" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black mb-2">
                          Messages 💬
                        </h2>
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
                      <h3 className="text-xl font-bold text-gray-900">
                        Conversations
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Call">
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
            )}

            {activeTab === "marketplace" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-black mb-2">Farm Marketplace 🛒</h2>
                        <p className="text-blue-100 text-lg">Buy, sell, and trade agricultural products & equipment</p>
                      </div>
                      <div className="text-6xl opacity-20">🏪</div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">2,847</div>
                        <div className="text-blue-200 text-sm">Active Listings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">$4.2M</div>
                        <div className="text-blue-200 text-sm">Total Volume</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">98.5%</div>
                        <div className="text-blue-200 text-sm">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {marketplaceItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className={`h-48 ${item.image} flex items-center justify-center text-white text-6xl relative`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <span className="relative z-10">
                          {item.category === 'equipment' ? '🚜' :
                            item.category === 'grain' ? '🌾' :
                            item.category === 'products' ? '🍯' : '🌱'}
                        </span>
                        {item.certified && (
                          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {item.certified}
                          </div>
                        )}
                        {item.verified && (
                          <CheckCircle className="absolute top-4 left-4 w-8 h-8 text-white bg-blue-500 rounded-full p-1" />
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">{item.title}</h3>
                            <div className="flex items-center space-x-4 mb-2">
                              <span className="text-3xl font-black text-green-600">{item.price}</span>
                              <span className="text-gray-500 text-sm">({item.pricePerUnit})</span>
                            </div>
                            {item.quantity && (
                              <p className="text-gray-600 font-medium">Quantity: {item.quantity}</p>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Seller:</span>
                            <span className="font-semibold text-gray-900">{item.seller}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Location:</span>
                            <span className="font-medium text-gray-700 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {item.location}
                            </span>
                          </div>
                          {item.condition && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Condition:</span>
                              <span className="font-medium text-gray-700">{item.condition}</span>
                            </div>
                          )}
                          {item.harvestDate && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Harvest:</span>
                              <span className="font-medium text-green-600">{item.harvestDate}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {item.organic && (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                              <Leaf className="w-3 h-3 mr-1" />
                              Organic
                            </span>
                          )}
                          {item.shipping && (
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                              <Truck className="w-3 h-3 mr-1" />
                              Shipping Available
                            </span>
                          )}
                          {item.wholesale && (
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Wholesale
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                            <MessageCircle className="w-4 h-4" />
                            <span>Contact</span>
                          </button>
                          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Buy Now</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "weather" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black mb-2">
                          Weather Hub
                        </h2>
                        <p className="text-blue-100 text-lg">
                          Advanced weather insights for smart farming
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-black mb-2">
                          {weatherData.current.temp}
                        </div>
                        <p className="text-blue-200">
                          {weatherData.current.condition}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Calendar className="w-7 h-7 mr-3 text-green-500" />
                    3-Day Forecast
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {weatherData.forecast.map((day, i) => (
                      <div
                        key={i}
                        className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="font-bold text-lg text-gray-900 mb-3">
                          {day.day}
                        </div>
                        <div className="flex justify-center mb-4">
                          {day.icon}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {day.condition}
                        </div>
                        <div className="font-bold text-lg text-gray-900 mb-2">
                          <span className="text-xl">{day.high}</span> /{" "}
                          <span className="text-gray-600">{day.low}</span>
                        </div>
                        <div className="text-xs text-blue-600 font-semibold">
                          {day.precipitation} rain
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {weatherData.alerts.length > 0 && (
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <AlertCircle className="w-7 h-7 mr-3 text-orange-500" />
                      Weather Alerts
                    </h3>
                    <div className="space-y-4">
                      {weatherData.alerts.map((alert, i) => (
                        <div
                          key={i}
                          className={`p-4 rounded-2xl border-l-4 ${
                            alert.severity === "moderate"
                              ? "bg-orange-50 border-orange-500"
                              : "bg-blue-50 border-blue-500"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <AlertCircle
                              className={`w-5 h-5 ${
                                alert.severity === "moderate"
                                  ? "text-orange-500"
                                  : "text-blue-500"
                              }`}
                            />
                            <p className="font-semibold text-gray-900">
                              {alert.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black mb-2">
                          Farm Analytics
                        </h2>
                        <p className="text-purple-100 text-lg">
                          Data-driven insights for better decisions
                        </p>
                      </div>
                      <div className="text-6xl opacity-20">📊</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {analyticsData.farmPerformance.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                          <BarChart3 className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            metric.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {metric.change}
                        </span>
                      </div>
                      <h3 className="text-gray-600 text-sm font-medium mb-2">
                        {metric.metric}
                      </h3>
                      <p className="text-2xl font-black text-gray-900">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <PieChart className="w-7 h-7 mr-3 text-purple-500" />
                    Crop Overview
                  </h3>
                  <div className="space-y-6">
                    {analyticsData.cropData.map((crop, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-gray-900">
                            {crop.crop}
                          </h4>
                          <span className="text-2xl font-black text-green-600">
                            {crop.revenue}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Planted:</span>
                            <span className="font-semibold text-gray-900 ml-2">
                              {crop.planted}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Expected:</span>
                            <span className="font-semibold text-gray-900 ml-2">
                              {crop.expected}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6 sticky top-28">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2" />
                    Weather Now
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-black mb-2">
                      {weatherData.current.temp}
                    </div>
                    <p className="text-blue-100 text-sm mb-4">
                      {weatherData.current.condition}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Droplets className="w-4 h-4 mx-auto mb-1" />
                        <div className="font-semibold">
                          {weatherData.current.humidity}
                        </div>
                        <div className="text-xs text-blue-200">Humidity</div>
                      </div>
                      <div>
                        <Wind className="w-4 h-4 mx-auto mb-1" />
                        <div className="font-semibold">
                          {weatherData.current.wind.split(" ")[0]}
                        </div>
                        <div className="text-xs text-blue-200">Wind</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Trending Topics
                </h3>
                <div className="space-y-4">
                  {[
                    { tag: '#OrganicFarming', posts: '2.1k posts', trend: '+12%' },
                    { tag: '#ClimateResilience', posts: '891 posts', trend: '+45%' },
                    { tag: '#SustainableAgriculture', posts: '1.5k posts', trend: '+8%' },
                    { tag: '#PrecisionFarming', posts: '743 posts', trend: '+23%' },
                    { tag: '#CropRotation', posts: '564 posts', trend: '+15%' }
                  ].map((topic, index) => (
                    <button key={index} className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-green-600 group-hover:text-green-700">{topic.tag}</p>
                          <p className="text-gray-500 text-xs">{topic.posts}</p>
                        </div>
                        <span className="text-green-500 text-sm font-bold">{topic.trend}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Market Prices
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      crop: "Corn",
                      price: "$6.45",
                      change: "+2.3%",
                      status: "up",
                    },
                    {
                      crop: "Soybeans",
                      price: "$14.23",
                      change: "-1.2%",
                      status: "down",
                    },
                    {
                      crop: "Wheat",
                      price: "$8.91",
                      change: "+0.8%",
                      status: "up",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.crop}
                        </p>
                        <p className="text-gray-600 text-sm">per bushel</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          {item.price}
                        </p>
                        <span
                          className={`text-sm font-semibold ${
                            item.status === "up"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Farmers Online
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Johnson', farm: 'Organic Valley', status: 'online', avatar: 'SJ' },
                    { name: 'Mike Chen', farm: 'Green Acres', status: 'online', avatar: 'MC' },
                    { name: 'AgriTech Co.', farm: 'Commercial', status: 'busy', avatar: 'AC' },
                    { name: 'Emma Rodriguez', farm: 'Heritage Farm', status: 'online', avatar: 'ER' },
                    { name: 'Tech Innovations', farm: 'Smart Farming', status: 'online', avatar: 'TI' }
                  ].map((farmer, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {farmer.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          farmer.status === 'online' ? 'bg-green-500' :
                          farmer.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{farmer.name}</p>
                        <p className="text-gray-500 text-xs truncate flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          {farmer.farm}
                        </p>
                      </div>
                      <button className="p-2 hover:bg-green-100 rounded-full transition-colors" title="Send Message">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-green-600 hover:text-green-700 font-semibold text-sm py-2 hover:bg-green-50 rounded-xl transition-colors">
                  View All (1,247 online)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmChain;