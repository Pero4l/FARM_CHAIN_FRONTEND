import React from 'react'

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
