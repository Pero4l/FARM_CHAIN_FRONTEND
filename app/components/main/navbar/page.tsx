'use client'
import { useState, useRef, useEffect } from 'react';
import React from 'react'
import {
  Bell, Search, User, Settings, LogOut, Award, Bookmark, MessageCircle, Menu, X,Home,TrendingUp,Store,Cloud,BarChart3,PlusCircle
} from "lucide-react";
import { useTheme } from 'next-themes'

import { useActiveTab } from "@/app/context/ActiveTabContext";

const MainNavPage = () => {
  const activeTabContext = useActiveTab();
  const setActiveTab = activeTabContext?.setActiveTab ?? (() => {});
  const [notifications, setNotifications] = useState(2);
  const [message, setMessage] = useState(5);
  const [userOption, setUserOption] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useTheme();
 

 const menuRef = useRef<HTMLDivElement | null>(null);


  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //    if (
  //   menuRef.current &&
  //   event.target instanceof Node &&
  //   !menuRef.current.contains(event.target)
  // ) {
  //   setUserOption(false);
  // }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <>
      {/* HEADER */}
      <header className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white/80'} backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm`}>
        <div className="max-w-[1600px] mx-auto px-3">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="hidden w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl md:flex items-center justify-center text-2xl shadow-lg">
                  🌾
                </div>

                <div className="flex items-center gap-1 relative">
                  {/* checkbox + peer trick so we don't need extra hooks for mobile menu */}
                  <input id="mobile-menu-toggle" type="checkbox" className="sr-only peer md:hidden" />

                  {/* Logo is no longer wrapped by the label so clicks on it won't toggle the mobile menu */}
                  <div className="flex items-center gap-2">
                  <div>
                    <h1 className="text-3xl md:text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Farm Chain
                    </h1>
                    <p className="hidden lg:flex text-xs text-gray-500 font-semibold">Revolutionizing Agriculture Together</p>
                  </div>
                  </div>

                  {/* mobile dropdown (shows when checkbox is checked) */}
                    <div className="hidden peer-checked:flex flex-col absolute left-0 md:-left-12 top-full mt-17 w-44 md:w-60 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 md:p-5 z-40">
                    <label
                    htmlFor="mobile-menu-toggle"
                    onClick={() => { setActiveTab("dashboard"); setIsMenuOpen(false); }}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                    >
                    <span className="w-4 h-4 text-gray-600 mr-2">
                      <Home className="w-4 h-4" />
                    </span>
                    Dashboard
                    </label>

                    <label
                    htmlFor="mobile-menu-toggle"
                    onClick={() => { setActiveTab("feed"); setIsMenuOpen(false); }}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                    >
                    <span className="w-4 h-4 text-gray-600 mr-2">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    Feed
                    </label>

                    <label
                    htmlFor="mobile-menu-toggle"
                    onClick={() => { setActiveTab("marketplace"); setIsMenuOpen(false); }}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                    >
                    <span className="w-4 h-4 text-gray-600 mr-2">
                      <Store className="w-4 h-4" />
                    </span>
                    Marketplace
                    </label>

                    <label
                    htmlFor="mobile-menu-toggle"
                    onClick={() => { setActiveTab("messages"); setIsMenuOpen(false); }}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                    >
                    <span className="w-4 h-4 text-gray-600 mr-2">
                      <MessageCircle className="w-4 h-4" />
                    </span>
                    Messages
                    </label>

                    <label
                    htmlFor="mobile-menu-toggle"
                    onClick={() => { setActiveTab("weather"); setIsMenuOpen(false); }}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                    >
                    <span className="w-4 h-4 text-gray-600 mr-2">
                      <Cloud className="w-4 h-4" />
                    </span>
                    Weather
                    </label>

                    <label
                    htmlFor="mobile-menu-toggle"
                    onClick={() => { setActiveTab("analytics"); setIsMenuOpen(false); }}
                    className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                    >
                    <span className="w-4 h-4 text-gray-600 mr-2">
                      <BarChart3 className="w-4 h-4" />
                    </span>
                    Analytics
                    </label>
                    </div>
                </div>
              </div>
              


              {/* search bar */}
              <div className="hidden lg:flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 w-96">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search farmers, products, insights..."
                  className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>

            {/* nav button */}
            <div className="flex items-center lg:space-x-4">


              {/* Create post */}
              <button onClick={() => { setActiveTab("create_post") }} className="lg:hidden p-3 hover:bg-gray-100 rounded-xl transition-colors" title="plus">
                <PlusCircle className="w-6 h-6 text-gray-700" />
              </button>

              {/* Messages */}
              <button onClick={() => { setActiveTab("messages"); setIsMenuOpen(false); }} className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors" title="Messages">
                <MessageCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} />
                {message > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {message}
                  </span>
                )}
              </button>

                {/* Notification */}
              <button onClick={() => { setActiveTab("notification"); setIsMenuOpen(false); }} className="relative p-3 hover:bg-gray-100 rounded-xl transition-colors" title="Notifications">
                <Bell className="w-6 h-6 text-gray-700" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              
              

              {/* USER MENU */}
              <div className="relative hidden md:flex" ref={menuRef}>
                <div
                  onClick={() => setUserOption(prev => !prev)}
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
                >
                  UP
                </div>

                {userOption && (
                  <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                    <div className="p-3 space-y-1">

                      <button
                        onClick={() => { setActiveTab("profile"); setUserOption(false) }}
                        className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Profile</span>
                      </button>

                      <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                        <Award className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Achievements</span>
                      </button>

                      <button onClick={() => { setActiveTab("settings"); setUserOption(false) }} className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
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
                )}
              </div>
              {/* END USER MENU */}
            </div>
 
          </div>

          {/* Hamburger, user profile and search for mobile*/}
          <div className='lg:hidden flex gap-2'>
            <label
            htmlFor="mobile-menu-toggle"
            className="flex items-center gap-2 cursor-pointer select-none mb-3 -mt-2 lg:hidden"
          >
            <span onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-6 text-gray-700">
              {isMenuOpen ? <X /> : <Menu />}
            </span>

            <div className="flex-1 flex items-center bg-green-100 rounded-2xl px-6 py-2.5 w-full">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Search farmers, products, insights..."
                className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400 w-full md:w-[630px]"
              />
            </div>
          </label>

          {/* place the user avatar outside the mobile label so clicking it doesn't toggle the mobile menu */}
          <div className="relative md:hidden bottom-2" ref={menuRef}>
            <div
              onClick={() => setUserOption(prev => !prev)}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-110 transition-transform"
            >
              U
            </div>

            {userOption && (
              <div className="absolute right-0 top-14 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 z-50">
                <div className="p-3 space-y-1">
                  <button
                    onClick={() => { setActiveTab("profile"); setUserOption(false); setIsMenuOpen(false); }}
                    className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left"
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Profile</span>
                  </button>

                  <button className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
                    <Award className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Achievements</span>
                  </button>

                  <button onClick={() => { setActiveTab("settings"); setUserOption(false) }} className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors text-left">
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
            )}
          </div>
          </div>

        </div>
      </header>
    </>
  )
}

export default MainNavPage;

