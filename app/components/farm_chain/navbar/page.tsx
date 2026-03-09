'use client'

import { useState, useRef, useEffect } from 'react';
import React from 'react'
import {
  Bell, Search, User, Settings, LogOut, Award, Bookmark, MessageCircle, Menu, X, Home, TrendingUp, Store, Cloud, BarChart3, PlusCircle, Bot
} from "lucide-react";
import { useTheme } from 'next-themes'
import { API_BASE_URL } from '@/app/config/api';
import { useActiveTab } from "@/app/context/ActiveTabContext";
import Link from 'next/link';
import { useCurrentUser } from "@/app/components/currentUser";
import { useRouter } from 'next/navigation';
import axios from "axios";

const MainNavPage = () => {
  const { userProfile, setUserProfile } = useCurrentUser();
  const { token } = useCurrentUser();
  const activeTabContext = useActiveTab();
  const setActiveTab = activeTabContext?.setActiveTab ?? (() => { });
  const [notifications, setNotifications] = useState(0);
  const [message, setMessage] = useState(5);
  const [userOption, setUserOption] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const avatar = userProfile?.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s";

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/notification`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (Array.isArray(result.data)) {
        setNotifications(result.data.length);
      } else {
        setNotifications(0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    if (token) fetchNotifications();
  }, [token]);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const filtered = res.data.filter((u: any) =>
          `${u.first_name} ${u.last_name} ${u.state} ${u.country}`.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, token]);

  if (!mounted) return null;

  return (
    <>
      {/* HEADER */}
      <header className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white/80'} backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm`}>
        <div className="max-w-[1600px] mx-auto px-2">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="hidden w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl md:flex items-center justify-center text-2xl shadow-lg">
                  🌾
                </div>

                <div className="flex items-center gap-1 relative">
                  <input id="mobile-menu-toggle" type="checkbox" className="sr-only peer md:hidden" />

                  <div className="flex items-center gap-2">
                    <div>
                      <h1 onClick={() => { setActiveTab("dashboard"); setIsMenuOpen(false); }} className="text-3xl md:text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        FarmChain
                      </h1>
                      <p className="hidden lg:flex text-xs text-gray-500 font-semibold">Revolutionizing Agriculture Together</p>
                    </div>
                  </div>

                  {/* Mobile nav search and add btn */}
                  <div className={`hidden peer-checked:flex flex-col absolute left-0 md:-left-12 top-full mt-2 w-full md:w-60 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} rounded-2xl shadow-lg border border-gray-100 p-2 md:p-5 z-[100]`}>
                    <label
                      htmlFor="mobile-menu-toggle"
                      onClick={() => { setActiveTab("dashboard"); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100'} cursor-pointer text-sm flex items-center`}
                    >
                      <p suppressHydrationWarning className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mr-2`}>
                        <Home className="w-4 h-4" />
                      </p>
                      Dashboard
                    </label>

                    <label
                      htmlFor="mobile-menu-toggle"
                      onClick={() => { setActiveTab("feed"); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100'} cursor-pointer text-sm flex items-center`}
                    >
                      <p suppressHydrationWarning className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mr-2`}>
                        <TrendingUp className="w-4 h-4" />
                      </p>
                      Feed
                    </label>

                    <label
                      htmlFor="mobile-menu-toggle"
                      onClick={() => { setActiveTab("marketplace"); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100'} cursor-pointer text-sm flex items-center`}
                    >
                      <p suppressHydrationWarning className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mr-2`}>
                        <Store className="w-4 h-4" />
                      </p>
                      Marketplace
                    </label>

                    <label
                      htmlFor="mobile-menu-toggle"
                      onClick={() => { setActiveTab("messages"); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100'} cursor-pointer text-sm flex items-center`}
                    >
                      <p suppressHydrationWarning className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mr-2`}>
                        <MessageCircle className="w-4 h-4" />
                      </p>
                      Messages
                    </label>

                    <label
                      htmlFor="mobile-menu-toggle"
                      onClick={() => { setActiveTab("weather"); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100'} cursor-pointer text-sm flex items-center`}
                    >
                      <p suppressHydrationWarning className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mr-2`}>
                        <Cloud className="w-4 h-4" />
                      </p>
                      Weather
                    </label>

                    <label
                      htmlFor="mobile-menu-toggle"
                      onClick={() => { setActiveTab("analytics"); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100'} cursor-pointer text-sm flex items-center`}
                    >
                      <p suppressHydrationWarning className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mr-2`}>
                        <BarChart3 className="w-4 h-4" />
                      </p>
                      Analytics
                    </label>


                    <label
                      htmlFor="mobile-menu-toggle"
                      onClick={() => { setActiveTab("AI_bot"); setIsMenuOpen(false); }}
                      className={`px-3 py-2 rounded-md ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-gray-100'} cursor-pointer text-sm flex items-center`}
                    >
                      <p suppressHydrationWarning className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mr-2`}>
                        <Bot className="w-4 h-4" />
                      </p>
                      AI Bot
                    </label>


                  </div>
                </div>
              </div>

              <div className="hidden lg:flex flex-col relative">
                <div className="flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 w-96 font-normal">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search farmers, products, insights..."
                    className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Search Results Dropdown */}
                {searchQuery.length >= 2 && (
                  <div className={`absolute top-full mt-2 w-full rounded-2xl shadow-2xl border ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-100'} z-50 max-h-96 overflow-y-auto overflow-x-hidden p-2`}>
                    {isSearching ? (
                      <div className="p-4 text-center text-sm opacity-50">Searching...</div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-4 text-center text-sm opacity-50">No farmers found</div>
                    ) : (
                      searchResults.map((u) => (
                        <div key={u.id} className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'} transition-colors cursor-pointer`}>
                          <div className="flex items-center space-x-3" onClick={() => {
                            router.push(`/main?id=${u.id}`);
                            setActiveTab("user_profile");
                            setSearchQuery("");
                          }}>
                            <img src={u.Profile?.avatar || avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                            <div>
                              <p className="font-bold text-sm">{u.first_name} {u.last_name}</p>
                              <p className="text-[10px] opacity-50">{u.state}, {u.country}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center lg:space-x-4">
              <button onClick={() => { setActiveTab("create_post") }} className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-colors" title="plus">
                <PlusCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
              </button>

              <button onClick={() => { setActiveTab("messages"); setIsMenuOpen(false); }} className={`relative p-3 ${theme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-gray-100'} rounded-xl transition-colors`} title="Messages">
                <MessageCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
                {message > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {message}
                  </span>
                )}
              </button>

              <button onClick={() => { setActiveTab("notification"); setIsMenuOpen(false); }} className={`relative p-3 ${theme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-gray-100'} rounded-xl transition-colors`} title="Notifications">
                <Bell className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/*  */}
              <div className="relative hidden md:flex" ref={menuRef}>
                <div
                  onClick={() => setUserOption(prev => !prev)}
                  className="w-13 h-13 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full cursor-pointer hover:scale-110 transition-transform"
                >
                  <img className='rounded-full w-13 h-13' src={avatar} alt="" />
                </div>

                {/* lg user */}
                {userOption && (
                  <div className={`absolute right-0 top-14 w-52 rounded-2xl shadow-xl border border-gray-100 z-50 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <div className="p-3 space-y-1">
                      <button
                        onClick={() => { setActiveTab("profile"); setUserOption(false) }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-black/10'} rounded-xl transition-colors text-left`}>
                        <User className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
                        <span className={`${theme === 'dark' ? 'text-white text-sm font-medium' : 'text-sm font-medium text-gray-700'}`}>Profile</span>
                      </button>

                      <button className={`w-full flex items-center space-x-3 px-3 py-2 ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-black/10'} rounded-xl transition-colors text-left`}>
                        <Award className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
                        <span className={`${theme === 'dark' ? 'text-white text-sm font-medium' : 'text-sm font-medium text-gray-700'}`}>Achievements</span>
                      </button>

                      <button onClick={() => { setActiveTab("settings"); setUserOption(false) }} className={`w-full flex items-center space-x-3 px-3 py-2 ${theme === 'dark' ? 'hover:bg-white/15' : 'hover:bg-black/10'} rounded-xl transition-colors text-left`}>
                        <Settings className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
                        <span className={`${theme === 'dark' ? 'text-white text-sm font-medium' : 'text-sm font-medium text-gray-700'}`}>Settings</span>
                      </button>

                      <hr className="my-2" />
                      <button onClick={() => router.push('/')} className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-100 rounded-xl transition-colors text-left">
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* Mobile */}
          <div className='lg:hidden flex flex-row w-full relative'>
            <label
              htmlFor="mobile-menu-toggle"
              className="flex items-center gap-2 cursor-pointer select-none mb-3 -mt-2 lg:hidden w-full"
            >
              <span onClick={() => setIsMenuOpen(!isMenuOpen)} className={`w-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                {isMenuOpen ? <X /> : <Menu />}
              </span>

              <div className="flex-1 flex items-center bg-green-100/50 rounded-2xl px-4 py-2 w-full min-w-0 border border-green-200">
                <Search className="w-5 h-5 text-gray-500 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent flex-1 min-w-0 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </label>

            {/* Mobile Search Results */}
            {searchQuery.length >= 2 && (
              <div className={`absolute top-full left-0 right-0 mt-[-8px] rounded-2xl shadow-xl border ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-gray-100'} z-[101] max-h-80 overflow-y-auto p-2`}>
                {isSearching ? (
                  <div className="p-4 text-center text-sm opacity-50">Searching...</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-4 text-center text-sm opacity-50">No results</div>
                ) : (
                  searchResults.map((u) => (
                    <div key={u.id} className="flex items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5" onClick={() => {
                      router.push(`/main?id=${u.id}`);
                      setActiveTab("user_profile");
                      setSearchQuery("");
                    }}>
                      <img src={u.Profile?.avatar || avatar} className="w-8 h-8 rounded-full mr-3" alt="" />
                      <span className="text-sm font-medium">{u.first_name} {u.last_name}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="relative md:hidden bottom-2" ref={menuRef}>
            <div
              onClick={() => setUserOption(prev => !prev)}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full cursor-pointer hover:scale-110 transition-transform"
            >
              <img className='rounded-full w-10 h-10' src={avatar} alt="" />
            </div>

            {userOption && (
              <div className={`absolute right-0 top-14 w-52 rounded-2xl shadow-xl border border-gray-100 z-50 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <div className="p-3 space-y-1">
                  <button
                    onClick={() => { setActiveTab("profile"); setUserOption(false); setIsMenuOpen(false); }}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                  >
                    <User className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
                    <span className={`${theme === 'dark' ? 'text-white text-sm font-medium' : 'text-sm font-medium text-gray-700'}`}>Profile</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <Award className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
                    <span className={`${theme === 'dark' ? 'text-white text-sm font-medium' : 'text-sm font-medium text-gray-700'}`}>Achievements</span>
                  </button>

                  <button onClick={() => { setActiveTab("settings"); setUserOption(false) }} className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <Settings className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
                    <span className={`${theme === 'dark' ? 'text-white text-sm font-medium' : 'text-sm font-medium text-gray-700'}`}>Settings</span>
                  </button>
                  <hr className="my-2" />

                  <button onClick={() => router.push('/')} className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-50 rounded-xl transition-colors text-left">
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-600">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default MainNavPage;
