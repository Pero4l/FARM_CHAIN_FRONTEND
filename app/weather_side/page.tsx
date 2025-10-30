import React from 'react'
import {
  Home,
  Users,
  MessageCircle,
  Store,
  Cloud,
  Plus,
  Heart,
  MessageSquare,
  Share,
  TrendingUp,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Filter,
  Star,
  Calendar,
  DollarSign,
  Truck,
  Leaf,
  BarChart3,
  Camera,
  Video,
  Mic,
  Send,
  Phone,
  Mail,
  Globe,
  Zap,
  Target,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  PieChart,
  Search,
} from "lucide-react";

type WeatherData = {
  location: string;
  current: {
    temp: string;
    condition: string;
    humidity: string;
    wind: string;
    pressure: string;
    uvIndex: number;
    visibility: string;
    icon: React.ReactNode;
  };
  forecast: WeatherDay[];
  alerts: { type: string; message: string; severity: string }[];
};

type WeatherDay = {
  day: string;
  high: string;
  low: string;
  condition: string;
  precipitation: string;
  icon: React.ReactNode;
};

const WeatherSide = () => {

      const weatherData: WeatherData = {
    location: "Your Location",
    current: {
      temp: "74°F",
      condition: "Partly Cloudy",
      humidity: "68%",
      wind: "12 mph NE",
      pressure: "30.15 in",
      uvIndex: 6,
      visibility: "10 miles",
      icon: <Cloud className="w-12 h-12" />,
    },
    forecast: [
      {
        day: "Today",
        high: "78°",
        low: "65°",
        condition: "Sunny",
        precipitation: "0%",
        icon: <Sun className="w-12 h-12 text-yellow-500" />,
      },
      {
        day: "Tomorrow",
        high: "72°",
        low: "60°",
        condition: "Cloudy",
        precipitation: "20%",
        icon: <Cloud className="w-12 h-12 text-gray-400" />,
      },
      {
        day: "Wednesday",
        high: "69°",
        low: "58°",
        condition: "Rain",
        precipitation: "85%",
        icon: <Droplets className="w-12 h-12 text-blue-500" />,
      },
    ],
    alerts: [
      {
        type: "warning",
        message: "Frost warning for Thursday night",
        severity: "moderate",
      },
      {
        type: "info",
        message: "Perfect planting conditions this weekend",
        severity: "low",
      },
    ],
  };

  return (
    <div className='pt-32'>
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">

                 <div className='flex items-center justify-between'>
                   <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2" />
                    Weather Now
                  </h3>

                  <h1 className='text-sm'>Location: <span>Abuja</span></h1>
                 </div>

                  <div className="text-center">
                    <div className="text-3xl font-black mb-2">
                      {weatherData.current.temp}
                    </div>
                    <p className="text-blue-100 text-sm mb-4">
                      {weatherData.current.condition}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Droplets className="w-4 h-4 mx-auto mb-1" />
                        <div className="font-semibold">
                          {weatherData.current.humidity}
                        </div>
                        <div className="text-xs text-blue-200">Humidity</div>
                      </div>
                      <div>
                        <Wind className="w-4 h-4 mx-auto mb-1" />
                        <div className="font-semibold">
                          {weatherData.current.wind.split(" ")[0]}
                        </div>
                        <div className="text-xs text-blue-200">Wind</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default WeatherSide
