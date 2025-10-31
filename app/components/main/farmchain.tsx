"use client";
import React, { useState } from "react";
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
import { useActiveTab } from "@/app/context/ActiveTabContext";

// TABS
import WeatherPage from "../tabs/weather/page";
import Dashboard from "../tabs/dashboard/page";
import Profile from "../tabs/profile/page"
import Message from "../tabs/message/page"
import MarketPage from "../tabs/market_place/page";
import AnalyticsPage from "../tabs/analytics/page"

// SIDE BAR
import WeatherSide from "../tabs/weather/weather_side/page"

// type ButtonProps = {
//   onClose?: () => void;
// };

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

// Post tab

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
    <div className="p-3">
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
            <div className="flex items-center space-x-7 mb-1">
              <h3 className="font-bold text-lg text-gray-900">{post.farmer}</h3>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {post.category === "commercial"
                  ? "Commercial"
                  : post.category === "cooperative"
                  ? "Cooperative"
                  : "Small Scale"}
              </span>
            </div>

            <div className="flex items-center space-x-5 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 " />
                {post.location}
              </div>
              {/* <span>{post.farmSize}</span> */}•<span> {post.time}</span>
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
            <span
              key={idx}
              className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer hover:underline"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {post.images && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {post.images.map((img, i) => (
            <div
              key={i}
              className={`${img} rounded-2xl h-48 flex items-center justify-center text-white text-6xl relative overflow-hidden`}
            >
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

    <div className="border-t border-gray-100 px-3 py-4">
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
  const { activeTab, setActiveTab } = useActiveTab();
  const [notifications, setNotifications] = useState(3);
  const [mainMenu, setMainMenu] = useState(false);

  const posts: Post[] = [
    {
      id: 1,
      farmer: "Sarah Johnson",
      location: "Iowa, USA",
      avatar: "SJ",
      time: "2 hours ago",
      verified: true,
      farmSize: "50 acres",
      content:
        "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
      images: [
        "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500",
        "bg-gradient-to-br from-green-500 to-emerald-600",
      ],
      likes: 142,
      comments: 34,
      shares: 18,
      type: "success-story",
      tags: [
        "#OrganicFarming",
        "#CompanionPlanting",
        "#SustainableAgriculture",
      ],
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
      content:
        "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
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
      content:
        "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.",
      likes: 67,
      comments: 29,
      shares: 12,
      type: "trade",
      price: "$1,200 value",
      tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"],
      category: "small-scale",
    },
    {
      id: 4,
      farmer: "Sarah Johnson",
      location: "Iowa, USA",
      avatar: "SJ",
      time: "2 hours ago",
      verified: true,
      farmSize: "50 acres",
      content:
        "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
      images: [
        "bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500",
        "bg-gradient-to-br from-green-500 to-emerald-600",
      ],
      likes: 142,
      comments: 34,
      shares: 18,
      type: "success-story",
      tags: [
        "#OrganicFarming",
        "#CompanionPlanting",
        "#SustainableAgriculture",
      ],
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
      content:
        "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
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
      content:
        "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.",
      likes: 67,
      comments: 29,
      shares: 12,
      type: "trade",
      price: "$1,200 value",
      tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"],
      category: "small-scale",
    },
  ];

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* BODY */}
      <div className="max-w-[1600px] mx-auto px-2 py-8 mt-20 lg:mt-10">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:mt-9">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div
              className='hidden lg:block bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sticky top-2'
            >
              <nav onClick={() => setMainMenu(false)} className="space-y-2">
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

              {/*  CREATE POST BUTTON ON LG */}
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


          {/* TABS */}

          {/* Dashboard */}
          <div className="lg:col-span-7">
            {activeTab === "dashboard" && (
            <Dashboard/>
            )}


            {/* profile */}
            {activeTab === "profile" && (
              <Profile/>
            )}

            {/* Feed */}
            {activeTab === "feed" && (
              <div className="space-y-8 sm:px-6 md:px-0">
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

                        <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 sm:px-8 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-sm sm:text-base whitespace-nowrap">
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>Share Post</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Feed header */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 flex justify-between items-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Community Feed
                  </h3>
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

            {/* Message tab */}
            {activeTab === "messages" && (
                <Message/>
            )}

            {/* Marketplace tab */}
            {activeTab === "marketplace" && (
              <MarketPage/>
            )}

            {/* Weather tab */}
            {activeTab === "weather" && (
              <WeatherPage/>
            )}

            {/* Analytics tab */}
            {activeTab === "analytics" && (
              <AnalyticsPage/>
            )}
          </div>

          {/* TABS END */}




          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-6 sticky top-28">
              {/* weather */}
              <WeatherSide/>


              {/* trending now */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Trending Topics
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      tag: "#OrganicFarming",
                      posts: "2.1k posts",
                      trend: "+12%",
                    },
                    {
                      tag: "#ClimateResilience",
                      posts: "891 posts",
                      trend: "+45%",
                    },
                    {
                      tag: "#SustainableAgriculture",
                      posts: "1.5k posts",
                      trend: "+8%",
                    },
                    {
                      tag: "#PrecisionFarming",
                      posts: "743 posts",
                      trend: "+23%",
                    },
                    { tag: "#CropRotation", posts: "564 posts", trend: "+15%" },
                  ].map((topic, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-green-600 group-hover:text-green-700">
                            {topic.tag}
                          </p>
                          <p className="text-gray-500 text-xs">{topic.posts}</p>
                        </div>
                        <span className="text-green-500 text-sm font-bold">
                          {topic.trend}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* market price */}

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

              {/* online users */}

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  Farmers Online
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      farm: "Organic Valley",
                      status: "online",
                      avatar: "SJ",
                    },
                    {
                      name: "Mike Chen",
                      farm: "Green Acres",
                      status: "online",
                      avatar: "MC",
                    },
                    {
                      name: "AgriTech Co.",
                      farm: "Commercial",
                      status: "busy",
                      avatar: "AC",
                    },
                    {
                      name: "Emma Rodriguez",
                      farm: "Heritage Farm",
                      status: "online",
                      avatar: "ER",
                    },
                    {
                      name: "Tech Innovations",
                      farm: "Smart Farming",
                      status: "online",
                      avatar: "TI",
                    },
                  ].map((farmer, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {farmer.avatar}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            farmer.status === "online"
                              ? "bg-green-500"
                              : farmer.status === "busy"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {farmer.name}
                        </p>
                        <p className="text-gray-500 text-xs truncate flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          {farmer.farm}
                        </p>
                      </div>
                      <button
                        className="p-2 hover:bg-green-100 rounded-full transition-colors"
                        title="Send Message"
                      >
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
