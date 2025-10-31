import React from 'react'
import {
  BarChart3,
  PieChart,
} from "lucide-react";

const analyticsPage = () => {
  return (
    <div>
         <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-black mb-2">
                          Farm Analytics
                        </h2>
                        <p className="text-purple-100 text-lg">
                          Data-driven insights for better decisions
                        </p>
                      </div>
                      <div className="text-6xl opacity-20">📊</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {analyticsData.farmPerformance.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                          <BarChart3 className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            metric.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {metric.change}
                        </span>
                      </div>
                      <h3 className="text-gray-600 text-sm font-medium mb-2">
                        {metric.metric}
                      </h3>
                      <p className="text-2xl font-black text-gray-900">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <PieChart className="w-7 h-7 mr-3 text-purple-500" />
                    Crop Overview
                  </h3>
                  <div className="space-y-6">
                    {analyticsData.cropData.map((crop, i) => (
                      <div
                        key={i}
                        className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-gray-900">
                            {crop.crop}
                          </h4>
                          <span className="text-2xl font-black text-green-600">
                            {crop.revenue}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Planted:</span>
                            <span className="font-semibold text-gray-900 ml-2">
                              {crop.planted}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Expected:</span>
                            <span className="font-semibold text-gray-900 ml-2">
                              {crop.expected}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
    </div>
  )
}

export default analyticsPage
