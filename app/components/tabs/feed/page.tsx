import React from 'react'
import {
  Heart,
  MessageSquare,
  Share,
  MapPin,
  DollarSign,
  Video,
  CheckCircle,
  Eye,
} from "lucide-react";

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


// POST CARD
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

const feedPage = () => {

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

  return (
    <div>
      
    </div>
  )
}

export default feedPage
