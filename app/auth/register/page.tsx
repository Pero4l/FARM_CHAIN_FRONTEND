'use client';

import React, { useState, useRef, useEffect } from 'react';
import LoginPage from '@/app/components/loginChain';
import RegisterChain from '@/app/components/registerChain';
import { FaGoogle, FaFacebookF } from 'react-icons/fa6';

const FarmChainAuth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    if (showModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  const openModal = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 flex items-center justify-center p-2">
      <div className="text-center space-x-4">
        <button
          onClick={() => openModal(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
        >
          Sign In
        </button>
        <button
          onClick={() => openModal(false)}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
          aria-modal="true"
          role="dialog"
        >
          <div ref={modalRef} className="relative w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 rounded-2xl p-2 mb-6 mt-2">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    isLogin
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    !isLogin
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Forms */}
              {isLogin ? <LoginPage /> : <RegisterChain />}

              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <span className="mr-5 text-2xl">
                      <FaGoogle />
                    </span>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <span className="mr-5 text-2xl">
                      <FaFacebookF />
                    </span>
                    Facebook
                  </button>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmChainAuth;
