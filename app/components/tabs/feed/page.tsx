'use client';
import React from "react";
// import Image from 'next/image';
import {
  Heart,
  MessageSquare,
  Share,
  MapPin,
  DollarSign,
  Video,
  CheckCircle,
  Eye,
  Camera,
  Mic,
  Filter,
  Send,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useActiveTab } from "@/app/context/ActiveTabContext";

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
  video?: string[];
  likes: number;
  comments: number;
  shares: number;
  type: string;
  price?: string;
  tags?: string[];
  category: string;
};



const feedPage = () => {
    const activeTabContext = useActiveTab();
    const setActiveTab = activeTabContext?.setActiveTab ?? (() => {});
  const { theme, setTheme } = useTheme();
  const avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s";
  const posts: Post[] = [
    {
      id: 1,
      farmer: "Sarah Johnson",
      location: "Iowa, USA",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s",
      time: "2 hours ago",
      verified: true,
      farmSize: "50 acres",
      content:
        "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
      images: [
        "https://newwinerealty.com.ng/wp-content/uploads/2024/11/Farmland-in-Ibadan.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ65z3xcwuEMLE8QeCnS2M_EhL8EkB21Ipvkw&s",
      ],
      video: [
        "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4",
        "https://cdn.pixabay.com/video/2023/03/01/152740-803732906_large.mp4",
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
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s",
      time: "4 hours ago",
      verified: true,
      farmSize: "2,500 acres",
      content:
        "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
      video: [
        "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4",
        "https://cdn.pixabay.com/video/2023/03/01/152740-803732906_large.mp4",
      ],
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
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s",
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
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s",
      time: "2 hours ago",
      verified: true,
      farmSize: "50 acres",
      content:
        "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?",
      images: [
        "https://barbadostoday.bb/wp-content/uploads/2021/02/farmer-pic-1024x640.jpg",
        "https://african.land/oc-content/plugins/blog/img/blog/698.jpg",
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
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s",
      time: "4 hours ago",
      verified: true,
      farmSize: "2,500 acres",
      content:
        "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.",
      video: [
        "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4",
        "https://cdn.pixabay.com/video/2023/03/01/152740-803732906_large.mp4",
      ],
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
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s",
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

  return (
    <div>
      <div className="space-y-8 sm:px-6 md:px-0">
        <div
          className={` ${
            theme === "dark"
              ? "bg-gradient-to-br from-white/10 to-white/15 text-white border-1"
              : "bg-gradient-to-br from-green-600 via- to-green-900"
          } rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden`}
        >
          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black mb-2">Post Feed 📰</h2>
                <p className="text-pink-100 text-lg">
                  Discover the latest updates and stories from the community
                </p>
              </div>
              <div className="text-6xl opacity-20">🐄</div>
            </div>
          </div>
        </div>

        {/* Post input card */}
        <div
          className={`${
            theme === "dark" ? "bg-black text-white" : "bg-white"
          } rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6`}
        >
          <div className="flex items-start space-x-4">
            <div onClick={() => { setActiveTab("profile") }} className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 border-none rounded-full ">
              <img className="rounded-full" src={avatar} alt="" />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="What's happening on your farm today?"
                className={`w-full p-3 sm:p-4 border border-gray-100 rounded-2xl resize-none  ${
                  theme === "dark"
                    ? "focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-gray-100"
                    : "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-2 border-gray-300 text-gray-700 placeholder-gray-400"
                } text-sm sm:text-base`}
                rows={3}
              />
              <div className="flex flex-wrap justify-between items-center mt-4 gap-2 sm:gap-4">
                <div className="flex flex-wrap space-x-2 sm:space-x-4">
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-green-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-green-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Photo</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-blue-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-blue-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Video</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-red-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-red-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Audio</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-purple-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-purple-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Location</span>
                  </button>
                </div>

                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-full md:px-66 sm:px-8 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-95 flex items-center justify-center space-x-2 text-sm sm:text-base whitespace-nowrap">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Share Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feed header */}
        <div
          className={`${
            theme === "dark" ? "text-white" : "bg-white"
          } rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 flex justify-between items-center`}
        >
          <h3
            className={`text-lg sm:text-xl font-bold  ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Community Feed
          </h3>
          <button
            className={`flex items-center space-x-1 sm:space-x-2 ${
              theme === "dark" ? "text-white" : "text-gray-600"
            } hover:text-green-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-green-50 text-xs sm:text-sm whitespace-nowrap`}
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">Filter</span>
          </button>
        </div>

        {/* Posts list */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`${theme === 'dark' ? '' : 'bg-white'} rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300`}
            >
              <div className="p-3">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div onClick={() => { setActiveTab("user_profile") }} className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full ">
                        <img className="rounded-full" src={post.avatar} alt="" />
                      </div>
                      {post.verified && (
                        <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-7 mb-1">
                        <h3 className={`font-bold text-lg  ${theme === 'dark' ? '' : 'text-gray-900'}`}>
                          {post.farmer}
                        </h3>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {post.category === "commercial"
                            ? "Commercial"
                            : post.category === "cooperative"
                            ? "Cooperative"
                            : "Small Scale"}
                        </span>
                      </div>

                      <div className={`flex items-center space-x-5 text-sm ${theme === 'dark' ? '' : 'text-gray-500'}`}>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 " />
                          {post.location}
                        </div>
                        {/* <span>{post.farmSize}</span> */}•
                        <span> {post.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className={` leading-relaxed ${theme === 'dark' ? '' : 'text-gray-700'}`}>
                    {post.content}
                  </p>

                  {/* PRICE */}
                  {post.price && (
                    <div className="mt-3 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>{post.price}</span>
                    </div>
                  )}
                </div>

                {/* TAGS */}
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

                {/* IMAGE */}
                {post.images && post.images.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    {post.images.map((img: string, i: number) => (
                      <div
                        key={i}
                        className="rounded-2xl w-full relative overflow-hidden"
                      >
                        <img
                          src={img}
                          alt="..."
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* VIDEO */}
                {post.video && (
                  <div className=" rounded-2xl   grid md:grid-cols-2 gap-3 text-white relative overflow-hidden">
                    <div className="absolute inset-0 "></div>
                    {post.video.map((vid: string, i: number) => (
                      <div
                        key={i}
                        className="relative w-full rounded-2xl overflow-hidden"
                      >
                        <video
                          autoPlay
                          controls
                          muted
                          playsInline
                          src={vid}
                          className="h-[500px] object-cover"
                        />
                      </div>
                    ))}

                    {/* <div className="relative z-10 text-center">
      <Video className="w-16 h-16 mx-auto mb-3" />
      <p className="font-bold text-lg">Watch Full Video</p>
    </div> */}
                  </div>
                )}
              </div>


                {/* Action btn */}
              <div className="border-t border-gray-100 px-3 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 lg:space-x-10">
                    <button className={`flex items-center space-x-2 ${theme === 'dark' ? '' : 'text-gray-600'} hover:text-red-500 transition-colors`}>
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button className={`flex items-center space-x-2 ${theme === 'dark' ? '' : 'text-gray-600'} hover:text-blue-500 transition-colors`}>
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                    <button className={`flex items-center space-x-2 ${theme === 'dark' ? '' : 'text-gray-600'} hover:text-green-500 transition-colors`}>
                      <Share className="w-5 h-5" />
                      <span className="font-semibold">{post.shares}</span>
                    </button>
                  </div>

                  <div className={`text-sm ${theme === 'dark' ? '' : ' text-gray-500'} hover:text-green-500 transition-colors`}>
                    <Eye className="w-4 h-4 inline mr-1" />
                    {post.likes + post.comments * 3} views
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default feedPage;
