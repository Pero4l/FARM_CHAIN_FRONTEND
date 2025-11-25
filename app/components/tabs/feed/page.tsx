"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ClockFading,
  EllipsisVertical
} from "lucide-react";
import { useTheme } from "next-themes";
import { useActiveTab } from "@/app/context/ActiveTabContext";
import axios from "axios";
import { useCurrentUser } from "@/app/components/currentUser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// Keep your Post type as you defined it
type Post = {
  id: number;
  user_id: number;
  farmer: string;
  location: string;
  avatar: string;
  time: string;
  verified: boolean;
  farmSize?: string;
  content: string;
  images?: string[];
  videos?: string[];
  likes: number;
  comments: number;
  shares: number;
  type: string;
  price?: string;
  tags?: string[];
  category: string;
  createdAt: string;
};

const FeedPage: React.FC = () => {
  // state holds an array of posts
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const [edit, setEdit] = useState(false);

  const activeTabContext = useActiveTab();
  const setActiveTab = activeTabContext?.setActiveTab ?? (() => {});
  const { theme } = useTheme();
  const { token } = useCurrentUser();
  const id = useCurrentUser()?.user?.userId;

  // Fetch posts
  async function fetchPosts() {
    if (!token) {
      // if there's no token we still might want to fetch public posts or bail out
      // here we'll try to fetch but without Authorization header as fallback
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://farmchain.onrender.com/post/all",
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        }
      );

      // expect response.data.posts to be an array
      const posts = response?.data?.posts ?? [];

      if (!Array.isArray(posts)) {
        console.warn("Expected posts array but received:", posts);
        setData([]);
      } else {
        setData(posts as Post[]);
      }
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError(err?.message ?? "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avatar = data[0]?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s";
console.log("Posts data:", data);
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
            {/* top img */}
            <div
              onClick={() => {
                setActiveTab("profile");
              }}
              className="w-14 h-14  border-none rounded-full "
            >
              <img className="rounded-full w-full h-full" src={avatar} alt="avatar" />
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
          {loading && <div className="text-center text-4xl py-6">Loading posts...</div>}

          {error && (
            <div className="text-center text-red-500 py-6">{error}</div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="text-center text-4xl py-6">No posts to show</div>
          )}

          {data.map((post) => (
            <div
              key={post.id}
              className={`${
                theme === "dark" ? "" : "bg-white"
              } rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300`}
            >
              <div className="p-3 py-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Link
                      href={{
                        pathname: "/main",
                        query: { id: post.user_id },
                      }}
                    >
                      <div className="relative">
                        {/* profile post img */}
                        <div
                          onClick={() => {
                            setActiveTab("user_profile");
                          }}
                          className="w-14 h-14  rounded-full "
                        >
                          <img
                           
                            className="h-full w-full rounded-full"
                            src={post.avatar || avatar}
                            alt=""
                            
                          />
                        </div>
                        {post.verified === false && (
                          <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                        )}
                      </div>
                    </Link>

                    <div className="flex-1">

                    <div className="flex items-center w-full">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="min-w-0">
                          <h3
                            className={`font-bold text-lg truncate ${
                              theme === "dark" ? "" : "text-gray-900"
                            }`}
                          >
                            {post.farmer}
                          </h3>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>

                        <div className="flex items-center space-x-2 ml-30 lg:ml-[560px]">
                        <button
                          className={`p-1 ${theme === 'dark' ? "text-gray-100 hover:text-gray-500" : "text-gray-600 hover:text-gray-500"} rounded-full ${post.user_id == id ? '' : 'hidden'}`}
                          aria-label="more"
                          onClick={(e) => {
                          e.stopPropagation();
                          const m = document.getElementById(`post-modal-${post.id}`);
                          if (m) m.classList.remove("hidden");
                          }}
                        >
                          <EllipsisVertical />
                        </button>

                        {/* Modal (hidden by default) */}
                        <div
                          id={`post-modal-${post.id}`}
                          className="hidden fixed inset-0 z-50 flex items-center justify-center"
                          onClick={(e) => {
                          // click on overlay closes modal
                          if (e.target === e.currentTarget) {
                            const m = document.getElementById(`post-modal-${post.id}`);
                            m?.classList.add("hidden");
                          }
                          }}
                        >
                          <div className="absolute inset-0 bg-black/50" />

                          <div
                          className={`relative z-10 ${theme === 'dark' ? "border-1 bg-black" : " bg-white dark:bg-white"} rounded-xl shadow-lg p-6 w-[90%] max-w-md`}
                          onClick={(e) => e.stopPropagation()}
                          >
                          <h4 className="text-lg font-bold mb-2">
                            Manage post
                          </h4>

                          {/* <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 truncate">
                            {post.content}
                          </p> */}

                          <div className="flex justify-end gap-3">
                            {/* <button
                            className="px-3 py-2 rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            onClick={async (e) => {
                              e.stopPropagation();
                              // simple inline edit using prompt to avoid extra hooks/state
                              const newContent = window.prompt(
                              "Edit post content",
                              post.content
                              );
                              if (newContent === null) return;
                              try {
                              await axios.patch(
                                `https://farmchain.onrender.com/post/${post.id}`,
                                { content: newContent },
                                {
                                headers: token
                                  ? { Authorization: `Bearer ${token}` }
                                  : undefined,
                                }
                              );
                              // refresh posts list
                              await fetchPosts();
                              const m = document.getElementById(
                                `post-modal-${post.id}`
                              );
                              m?.classList.add("hidden");
                              } catch (err) {
                              console.error(err);
                              alert("Failed to update post");
                              }
                            }}
                            >
                            Edit
                            </button> */}

                            <button
  className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
  onClick={async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(
        `https://farmchain.onrender.com/post/delete`,
         {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    data: { id: post.id }
  }
      );

      await fetchPosts();

      const m = document.getElementById(`post-modal-${post.id}`);
      m?.classList.add("hidden");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  }}
>
  Delete
</button>


                            <button
                            className="px-3 py-2 rounded-lg bg-green-400 hover:bg-green-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              const m = document.getElementById(
                              `post-modal-${post.id}`
                              );
                              m?.classList.add("hidden");
                            }}
                            >
                            Cancel
                            </button>
                          </div>
                          </div>
                        </div>
                        </div>
                    </div>

                      <div
                        className={`flex flex-col-reverse  md:space-x-7 text-sm ${
                          theme === "dark" ? "" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1 " />
                          {post.location}
                        </div>
                        {/*  */}
                        <div className="flex items-center ">
                          <ClockFading className="w-3 h-3 mr-1"/>
                          {dayjs(post.createdAt).fromNow()}
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p
                    className={` leading-relaxed ${
                      theme === "dark" ? "" : "text-gray-700"
                    }`}
                  >
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
                        <Image
                          src={img}
                          width={500}
                          height={300}
                          alt="Images"
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* VIDEO */}
                {post.videos && (
                  <div className=" rounded-2xl   grid md:grid-cols-2 gap-3 text-white relative overflow-hidden">
                    <div className="absolute inset-0 "></div>
                    {post.videos.map((vid: string, i: number) => (
                      <div
                        key={i}
                        className="relative w-full rounded-2xl overflow-hidden"
                      >
                        <video
                          autoPlay
                          controls
                          
                          playsInline
                          src={vid}
                          className="h-[500px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action btn */}
              <div className="border-t border-gray-100 px-3 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 lg:space-x-10">
                    <button
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "" : "text-gray-600"
                      } hover:text-red-500 transition-colors`}
                    >
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "" : "text-gray-600"
                      } hover:text-blue-500 transition-colors`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                    <button
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "" : "text-gray-600"
                      } hover:text-green-500 transition-colors`}
                    >
                      <Share className="w-5 h-5" />
                      <span className="font-semibold">{post.shares}</span>
                    </button>
                  </div>

                  <div
                    className={`text-sm ${
                      theme === "dark" ? "" : " text-gray-500"
                    } hover:text-green-500 transition-colors`}
                  >
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

export default FeedPage;

// const posts: Post[] = [
//  // { // id: 1, // farmer: "Farmer", 
// // location: "Iowa, USA",
//  // avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s", 
// 
// time: "2 hours ago", // verified: true, // farmSize: "50 acres", // content: // "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?", // images: [ // "https://newwinerealty.com.ng/wp-content/uploads/2024/11/Farmland-in-Ibadan.jpg", // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ65z3xcwuEMLE8QeCnS2M_EhL8EkB21Ipvkw&s", // ], // video: [ // "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4", // "https://cdn.pixabay.com/video/2023/03/01/152740-803732906_large.mp4", // ], // likes: 142, // comments: 34, // shares: 18, // type: "success-story", // tags: [ // "#OrganicFarming", // "#CompanionPlanting", // "#SustainableAgriculture", // ], // category: "small-scale", // }, // { // id: 2, // farmer: "AgriTech Solutions", // location: "California, USA", // avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s", // time: "4 hours ago", // verified: true, // farmSize: "2,500 acres", // content: // "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.", // video: [ // "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4", // "https://cdn.pixabay.com/video/2023/03/01/152740-803732906_large.mp4", // ], // likes: 1200, // comments: 67, // shares: 45, // type: "alert", // tags: ["#DroughtAlert", "#WaterConservation", "#SmartFarming"], // category: "commercial", // }, // { // id: 3, // farmer: "Miguel Rodriguez", // location: "Texas, USA", // avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s", // time: "8 hours ago", // verified: false, // farmSize: "15 acres", // content: // "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.", // likes: 67, // comments: 29, // shares: 12, // type: "trade", // price: "$1,200 value", // tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"], // category: "small-scale", // }, // { // id: 4, // farmer: "Sarah Johnson", // location: "Iowa, USA", // avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s", // time: "2 hours ago", // verified: true, // farmSize: "50 acres", // content: // "BREAKTHROUGH HARVEST! My companion planting experiment yielded 40% more tomatoes than last season! Planting basil and marigolds alongside tomatoes not only increased yield but naturally repelled pests. Zero pesticides used! Who wants the detailed planting schedule?", // images: [ // "https://barbadostoday.bb/wp-content/uploads/2021/02/farmer-pic-1024x640.jpg", // "https://african.land/oc-content/plugins/blog/img/blog/698.jpg", // ], // likes: 142, // comments: 34, // shares: 18, // type: "success-story", // tags: [ // "#OrganicFarming", // "#CompanionPlanting", // "#SustainableAgriculture", // ], // category: "small-scale", // }, // { // id: 5, // farmer: "AgriTech Solutions", // location: "California, USA", // avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s", // time: "4 hours ago", // verified: true, // farmSize: "2,500 acres", // content: // "WEATHER ALERT: Severe drought conditions predicted for Central Valley next month. We're implementing advanced drip irrigation and moisture sensors across all fields. Sharing our water conservation protocol with the community - together we can overcome this challenge.", // video: [ // "https://cdn.pixabay.com/video/2019/03/18/22070-325253460_large.mp4", // "https://cdn.pixabay.com/video/2023/03/01/152740-803732906_large.mp4", // ], // likes: 289, // comments: 67, // shares: 45, // type: "alert", // tags: ["#DroughtAlert", "#WaterConservation", "#SmartFarming"], // category: "commercial", // }, // { // id: 6, // farmer: "Miguel Rodriguez", // location: "Texas, USA", // avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s", // time: "8 hours ago", // verified: false, // farmSize: "15 acres", // content: // "TRADE OPPORTUNITY: 800 lbs of premium organic corn ready for harvest next week. Looking to trade for quality hay or small equipment rental. This corn tested 99% organic certified. Local Houston area preferred but willing to arrange transport for serious inquiries.", // likes: 67, // comments: 29, // shares: 12, // type: "trade", // price: "$1,200 value", // tags: ["#OrganicCorn", "#TradeOpportunity", "#Houston"], // category: "small-scale", // }, // ];



// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import {
//   Heart,
//   MessageSquare,
//   Share,
//   MapPin,
//   DollarSign,
//   Video,
//   CheckCircle,
//   Eye,
//   Camera,
//   Mic,
//   Filter,
//   Send,
//   ClockFading,
//   EllipsisVertical,
// } from "lucide-react";
// import { useTheme } from "next-themes";
// import { useActiveTab } from "@/app/context/ActiveTabContext";
// import axios from "axios";
// import { useCurrentUser } from "@/app/components/currentUser";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(relativeTime);

// type Post = {
//   id: number;
//   user_id: number;
//   farmer: string;
//   location: string;
//   avatar: string;
//   time: string;
//   verified: boolean;
//   farmSize?: string;
//   content: string;
//   images?: string[];
//   video?: string[];
//   likes: number;
//   comments: number;
//   shares: number;
//   type: string;
//   price?: string;
//   tags?: string[];
//   category: string;
//   createdAt: string;
// };

// const FeedPage: React.FC = () => {
//   const [data, setData] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const activeTabContext = useActiveTab();
//   const setActiveTab = activeTabContext?.setActiveTab ?? (() => {});
//   const { theme } = useTheme();
//   const { token } = useCurrentUser();

//   const fetchPosts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("https://farmchain.onrender.com/post/all", {
//         headers: token ? { Authorization: `Bearer ${token}` } : undefined,
//       });
//       const posts = response?.data?.posts ?? [];
//       setData(Array.isArray(posts) ? posts : []);
//     } catch (err: any) {
//       console.error(err);
//       setError(err?.message || "Failed to fetch posts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const avatar = data[0]?.avatar || "https://i.pravatar.cc/150";

//   return (
//     <div className="space-y-8 sm:px-6 md:px-0">
//       {/* Header */}
//       <div
//         className={`relative rounded-3xl p-8 shadow-2xl overflow-hidden ${
//           theme === "dark"
//             ? "bg-gradient-to-br from-white/10 to-white/15 text-white border border-gray-700"
//             : "bg-gradient-to-br from-green-600 to-green-900 text-white"
//         }`}
//       >
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="relative z-10 flex justify-between items-center">
//           <div>
//             <h2 className="text-3xl font-black mb-2">Post Feed 📰</h2>
//             <p className="text-lg text-pink-100">
//               Discover the latest updates and stories from the community
//             </p>
//           </div>
//           <div className="text-6xl opacity-20">🐄</div>
//         </div>
//       </div>

//       {/* New Post Card */}
//       <div
//         className={`rounded-3xl shadow-xl border p-4 sm:p-6 ${
//           theme === "dark" ? "bg-black text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"
//         }`}
//       >
//         <div className="flex space-x-4">
//           <div
//             onClick={() => setActiveTab("profile")}
//             className="w-14 h-14 rounded-full overflow-hidden cursor-pointer"
//           >
//             <img className="w-full h-full object-cover" src={avatar} alt="avatar" />
//           </div>
//           <div className="flex-1 flex flex-col">
//             <textarea
//               placeholder="What's happening on your farm today?"
//               rows={3}
//               className={`w-full p-4 rounded-2xl resize-none ${
//                 theme === "dark"
//                   ? "bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   : "bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
//               }`}
//             />
//             <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
//               <div className="flex space-x-2">
//                 {[{ icon: Camera, label: "Photo", color: "green" },
//                   { icon: Video, label: "Video", color: "blue" },
//                   { icon: Mic, label: "Audio", color: "red" },
//                   { icon: MapPin, label: "Location", color: "purple" }].map((btn) => (
//                   <button
//                     key={btn.label}
//                     className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm hover:bg-${btn.color}-50 transition-colors ${
//                       theme === "dark" ? "text-white" : `text-gray-600 hover:text-${btn.color}-600`
//                     }`}
//                   >
//                     <btn.icon className="w-4 h-4 sm:w-5 sm:h-5" />
//                     <span>{btn.label}</span>
//                   </button>
//                 ))}
//               </div>
//               <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 px-6 rounded-xl font-bold hover:shadow-lg transition-transform hover:scale-95 flex items-center space-x-2 text-sm sm:text-base">
//                 <Send className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <span>Share Post</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Feed Header */}
//       <div
//         className={`flex justify-between items-center rounded-3xl shadow-xl border p-4 sm:p-6 ${
//           theme === "dark" ? "text-white border-gray-700" : "bg-white border-gray-200"
//         }`}
//       >
//         <h3 className="text-lg sm:text-xl font-bold">Community Feed</h3>
//         <button className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm ${
//           theme === "dark" ? "text-white hover:text-green-400" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
//         }`}>
//           <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
//           <span className="font-semibold">Filter</span>
//         </button>
//       </div>

//       {/* Posts */}
//       <div className="space-y-8">
//         {loading && <div className="text-center text-xl py-6">Loading posts...</div>}
//         {error && <div className="text-center text-red-500 py-6">{error}</div>}
//         {!loading && !error && data.length === 0 && <div className="text-center text-xl py-6">No posts to show</div>}

//         {data.map((post) => (
//           <div
//             key={post.id}
//             className={`rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition duration-300 ${
//               theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"
//             }`}
//           >
//             <div className="p-5 space-y-4">
//               {/* User info */}
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start space-x-4">
//                   <Link href={{ pathname: "/main", query: { id: post.user_id } }}>
//                     <div
//                       onClick={() => setActiveTab("user_profile")}
//                       className="w-14 h-14 rounded-full overflow-hidden cursor-pointer relative"
//                     >
//                       <img
//                         src={post.avatar || avatar}
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                       {post.verified === false && (
//                         <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
//                       )}
//                     </div>
//                   </Link>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-center mb-1">
//                       <div className="flex items-center space-x-3 min-w-0">
//                         <h3 className="font-bold text-lg truncate">{post.farmer}</h3>
//                         <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
//                           {post.category}
//                         </span>
//                       </div>
//                       <EllipsisVertical className="text-gray-500 hover:text-green-500 cursor-pointer" />
//                     </div>
//                     <div className="flex flex-wrap text-sm text-gray-500 space-x-3">
//                       <div className="flex items-center">
//                         <MapPin className="w-3 h-3 mr-1" />
//                         {post.location}
//                       </div>
//                       <div className="flex items-center">
//                         <ClockFading className="w-3 h-3 mr-1" />
//                         {dayjs(post.createdAt).fromNow()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Content */}
//               <p className={`${theme === "dark" ? "text-gray-100" : "text-gray-700"} leading-relaxed`}>
//                 {post.content}
//               </p>

//               {/* Price */}
//               {post.price && (
//                 <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
//                   <DollarSign className="w-4 h-4" />
//                   <span>{post.price}</span>
//                 </div>
//               )}

//               {/* Tags */}
//               {post.tags && (
//                 <div className="flex flex-wrap gap-2">
//                   {post.tags.map((tag, idx) => (
//                     <span
//                       key={idx}
//                       className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer hover:underline"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {/* Images */}
//               {post.images && post.images.length > 0 && (
//                 <div className="grid md:grid-cols-2 gap-3 rounded-xl overflow-hidden">
//                   {post.images.map((img, i) => (
//                     <div key={i} className="relative w-full h-60 rounded-xl overflow-hidden">
//                       <Image src={img} alt="post image" fill className="object-cover" unoptimized />
//                       <div className="absolute inset-0 bg-black/10"></div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Video */}
//               {post.video && post.video.length > 0 && (
//                 <div className="grid md:grid-cols-2 gap-3 rounded-xl overflow-hidden">
//                   {post.video.map((vid, i) => (
//                     <video
//                       key={i}
//                       src={vid}
//                       controls
//                       muted
//                       autoPlay
//                       className="w-full h-60 object-cover rounded-xl"
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="border-t border-gray-200 px-5 py-3 flex justify-between items-center">
//               <div className="flex items-center space-x-6">
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
//                   <Heart className="w-5 h-5" /> <span>{post.likes}</span>
//                 </button>
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
//                   <MessageSquare className="w-5 h-5" /> <span>{post.comments}</span>
//                 </button>
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
//                   <Share className="w-5 h-5" /> <span>{post.shares}</span>
//                 </button>
//               </div>
//               <div className="text-sm text-gray-500 hover:text-green-500 transition-colors flex items-center">
//                 <Eye className="w-4 h-4 mr-1" />
//                 {post.likes + post.comments * 3} views
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedPage;
