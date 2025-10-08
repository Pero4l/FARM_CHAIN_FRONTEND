'use client'
import { useState } from 'react';
import React from 'react'
import {
  Bell, Search,User, Settings, LogOut, Award, Bookmark, MessageCircle
} from "lucide-react";

const MainNavPage = () => {
      const [notifications, setNotifications] = useState(3);
      const [message, setMessge] = useState(5)
  return (
    <div>
          {/* HEADER */}
              <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-[1600px] mx-auto px-6">
                  <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                          🌾
                        </div>
        
                        <div>
                          <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Farm Chain
                          </h1>
                          <p className="text-xs text-gray-500 font-semibold">
                            Revolutionizing Agriculture Together
                          </p>
                        </div>
                      </div>
        
                      <div className="hidden lg:flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 w-96">
                        <Search className="w-5 h-5 text-gray-400 mr-3" />
                        <input
                          type="text"
                          placeholder="Search farmers, products, insights..."
                          className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                        />
                      </div>
                    </div>
        
                    <div className="flex items-center lg:space-x-4">

                        <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors" title="Notifications">
                        <MessageCircle className="w-6 h-6 text-gray-700" />
                        {message > 0 && (
                          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {message}
                          </span>
                        )}
                      </button>

                      <button className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors" title="Notifications">
                        <Bell className="w-6 h-6 text-gray-700" />
                        {notifications > 0 && (
                          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {notifications}
                          </span>
                        )}
                      </button>
                      <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors" title="Bookmarks">
                        <Bookmark className="w-6 h-6 text-gray-700" />
                      </button>
                    
                      <div className="relative group">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform">
                          U
                        </div>
                        <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                          <div className="p-3 space-y-1">
                            <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                              <User className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">Profile</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                              <Award className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">Achievements</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                              <Settings className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium text-gray-700">Settings</span>
                            </button>
                            <hr className="my-2" />
                            <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-red-50 rounded-xl transition-colors text-left">
                              <LogOut className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-600">Logout</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>  
    </div>
  )
}

export default MainNavPage
