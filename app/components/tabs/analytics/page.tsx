import React from 'react'
import { useTheme } from "next-themes";

import {
  BarChart3,
  PieChart,
} from "lucide-react";


type AnalyticsData = {
  farmPerformance: {
    metric: string;
    value: string;
    change: string;
    trend: "up" | "down";
  }[];
  cropData: {
    crop: string;
    planted: string;
    expected: string;
    revenue: string;
  }[];
};

const analyticsPage = () => {
const { theme, setTheme } = useTheme();
      const analyticsData: AnalyticsData = {
    farmPerformance: [
      {
        metric: "Total Revenue",
        value: "$145,200",
        change: "+15.3%",
        trend: "up",
      },
      { metric: "Crop Yield", value: "89%", change: "+8.2%", trend: "up" },
      { metric: "Cost Efficiency", value: "92%", change: "+5.7%", trend: "up" },
      {
        metric: "Sustainability Score",
        value: "87%",
        change: "+12.1%",
        trend: "up",
      },
    ],
    cropData: [
      {
        crop: "Corn",
        planted: "125 acres",
        expected: "8,750 bushels",
        revenue: "$52,500",
      },
      {
        crop: "Soybeans",
        planted: "85 acres",
        expected: "4,250 bushels",
        revenue: "$42,500",
      },
      {
        crop: "Wheat",
        planted: "65 acres",
        expected: "3,900 bushels",
        revenue: "$31,200",
      },
    ],
  };

  return (
    <div>
         <div className="space-y-8">
                <div className={`  rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden${theme === 'dark' ? 'bg-black border-1' : 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600'} `}>
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
                      className={`rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-black border-1' : 'bg-white'} ` }
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
                      <h3 className={`  text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-600'} `}>
                        {metric.metric}
                      </h3>
                      <p className={` text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'} `}>
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className={` rounded-3xl shadow-xl border border-gray-100 p-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'} `}>
                  <h3 className={` text-2xl font-bold mb-6 flex items-center"${theme === 'dark' ? 'text-white' : 'text-gray-900'} `}>
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
                          <h4 className={`text-xl font-bold  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {crop.crop}
                          </h4>
                          <span className="text-2xl font-black text-green-600">
                            {crop.revenue}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className={`${ theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>Planted:</span>
                            <span className={`font-semibold  ml-2${ theme === 'dark' ? 'text-white' : 'text-gray-900'} `}>
                              {crop.planted}
                            </span>
                          </div>
                          <div>
                            <span className={` ${ theme === 'dark' ? 'text-white' : 'text-gray-500'}`}>Expected:</span>
                            <span className={`font-semibold ml-2 ${ theme === 'dark' ? 'text-white' : 'text-gray-900'} `}>
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
