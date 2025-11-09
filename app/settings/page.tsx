'use client';

import { User, Lock, Bell, Palette, Save, LogOut } from "lucide-react";

export default function SettingsPage() {
  // const handleSubmit = () => {
  //   // e.preventDefault();
  //   alert("Settings saved successfully!");
  // };

  return (
    <div className="max-w-3xl mx-auto pt-4 md:pt-10 px-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-700 to-emerald-500 rounded-3xl shadow-xl text-white p-8 py-10 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 flex items-center space-x-2">
            <User className="w-7 h-7" />
            <span>Account Settings</span>
          </h2>
          <p className="text-green-100 text-lg pt-2">
            Manage your profile, preferences, and security settings 🌱
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <form
        
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 space-y-8"
      >
        {/* Profile Section */}
        <section>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-green-600" /> Profile Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="border-t pt-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-amber-600" /> Security
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter a new password"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="border-t pt-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" /> Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
              <span>Email Notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
              <span>SMS Alerts</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
              <span>App Push Notifications</span>
            </label>
          </div>
        </section>

        {/* Theme */}
        <section className="border-t pt-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-purple-600" /> Appearance
          </h3>
          <select className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 outline-none">
            <option>System Default</option>
            <option>Light Mode</option>
            <option>Dark Mode</option>
          </select>
        </section>

        {/* Save Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 w-full rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Logout */}
        <div className="pt-2 text-center">
          <button
            type="button"
            className="text-gray-500 hover:text-red-600 font-medium flex items-center justify-center mx-auto mt-2 space-x-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </form>
    </div>
  );
}
