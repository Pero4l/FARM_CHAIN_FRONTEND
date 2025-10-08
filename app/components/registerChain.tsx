import React from 'react'
import { useState } from 'react';

const RegisterChain = () => {

      const [currentStep, setCurrentStep] = useState(1);
    
      const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
      };
    
      const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
      };

  return (
    <div>
        <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Farm Chain</h2>
                <p className="text-gray-600">Create your account and start growing</p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Step {currentStep} of 3</span>
                  <span className="text-xs font-medium text-gray-500">{Math.round((currentStep / 3) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className={`text-xs ${currentStep >= 1 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                    Personal Info
                  </div>
                  <div className={`text-xs ${currentStep >= 2 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                    Location
                  </div>
                  <div className={`text-xs ${currentStep >= 3 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                    Security
                  </div>
                </div>
              </div>

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your fisrt name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className='text-red-500'>*</span>
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white">
                      <option value="">Select your gender</option>
                      <option value="us">Male</option>
                      <option value="ca">Female</option>
                      <option value="other">Unkonwn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Location Details */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Street address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State/Province <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your state or province"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country <span className='text-red-500'>*</span>
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white">
                      <option value="">Select your country</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="in">India</option>
                      <option value="ng">Nigeria</option>
                      <option value="ke">Kenya</option>
                      <option value="za">South Africa</option>
                      <option value="br">Brazil</option>
                      <option value="mx">Mexico</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Create a strong password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">At least 8 characters with numbers and letters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300"
                      />
                      <p className="text-gray-700 text-sm">
                        I agree to the{' '}
                        <button type="button" className="text-green-600 hover:text-green-700 font-medium underline">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button type="button" className="text-green-600 hover:text-green-700 font-medium underline">
                          Privacy Policy
                        </button>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              )}
            </div>
    </div>
  )
}

export default RegisterChain
