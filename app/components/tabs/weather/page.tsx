// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   MapPin,
//   Calendar,
//   AlertCircle,
//   Search,
//   Cloud,
//   Sun,
//   CloudRain,
//   CloudSnow,
// } from "lucide-react";

// const OPENWEATHER_API_KEY: string = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";

// // --- TYPES ---
// interface ForecastDay {
//   day: string;
//   high: string;
//   low: string;
//   condition: string;
//   icon: React.ReactElement;
//   precipitation: string;
// }

// interface CurrentWeather {
//   temp: string;
//   condition: string;
//   icon: React.ReactElement;
//   city: string;
// }

// interface WeatherData {
//   current: CurrentWeather;
//   forecast: ForecastDay[];
// }

// // --- ICON HELPER ---
// const getWeatherIcon = (condition: string): React.ReactElement => {
//   const desc = (condition || '').toLowerCase();
//   switch (true) {
//     case desc.includes('clear'):
//       return <Sun className="w-12 h-12 text-yellow-500" />;
//     case desc.includes('cloud'):
//       return <Cloud className="w-12 h-12 text-gray-500" />;
//     case desc.includes('rain'):
//       return <CloudRain className="w-12 h-12 text-blue-500" />;
//     case desc.includes('snow'):
//       return <CloudSnow className="w-12 h-12 text-cyan-500" />;
//     default:
//       return <Cloud className="w-12 h-12 text-gray-500" />;
//   }
// };

// const WeatherPage: React.FC = () => {
//   const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
//   const [city, setCity] = useState<string>("London");
//   const [searchInput, setSearchInput] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // --- FETCH WEATHER ---
//   const fetchWeather = async (location: string) => {
//     try {
//       setLoading(true);
//       setError(null);

//       if (!OPENWEATHER_API_KEY) {
//         throw new Error("Missing API Key (check .env.local)");
//       }

//       // 🌤 Current Weather
//       const currentRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${OPENWEATHER_API_KEY}&units=metric`
//       );
//       if (!currentRes.ok) throw new Error("City not found.");
//       const currentData = await currentRes.json();

//       // 📅 3-Day Forecast
//       const forecastRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${OPENWEATHER_API_KEY}&units=metric`
//       );
//       const forecastData = await forecastRes.json();

//       // Transform 3-day forecast (API gives 3-hour intervals — pick 1 per day)
//       const dailyForecast: ForecastDay[] = forecastData.list
//         .filter((_: any, index: number) => index % 8 === 0)
//         .slice(0, 3)
//         .map((day: any) => {
//           const date = new Date(day.dt * 1000);
//           return {
//             day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//             high: Math.round(day.main.temp_max) + '°',
//             low: Math.round(day.main.temp_min) + '°',
//             condition: day.weather?.[0]?.description ?? 'Unknown',
//             icon: getWeatherIcon(day.weather?.[0]?.description ?? ''),
//             precipitation: `${Math.round(day.pop * 100)}%`,
//           };
//         });

//       const current: CurrentWeather = {
//         temp: Math.round(currentData.main.temp) + '°C',
//         condition: currentData.weather?.[0]?.description ?? 'Unknown',
//         icon: getWeatherIcon(currentData.weather?.[0]?.description ?? ''),
//         city: currentData.name,
//       };

//       setWeatherData({ current, forecast: dailyForecast });
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Failed to fetch weather data.");
//       setWeatherData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWeather(city);
//   }, [city]);

//   const handleSearchClick = () => {
//     if (searchInput.trim()) {
//       setCity(searchInput.trim());
//       setSearchInput("");
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') handleSearchClick();
//   };

//   // --- RENDER LOGIC ---
//   let content: React.ReactNode;

//   if (loading) {
//     content = <div className="text-center p-12 text-lg text-gray-500">Loading weather data...</div>;
//   } else if (error) {
//     content = (
//       <div className="text-center p-12 bg-red-100 border border-red-400 text-red-700 rounded-2xl">
//         <AlertCircle className="w-8 h-8 mx-auto mb-3" />
//         <p className="font-bold mb-2">Error</p>
//         <p>{error}</p>
//       </div>
//     );
//   } else if (weatherData) {
//     content = (
//       <div className="space-y-8">
//         {/* 🌤 Main Weather Card */}
//         <div className="bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="relative z-10">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-3xl font-black mb-2">
//                   Weather in {weatherData.current.city}
//                 </h2>
//                 <p className="text-blue-100 text-lg">
//                   Smart farming weather insights 🌾
//                 </p>
//               </div>
//               <div className="text-right">
//                 <div className="flex items-center justify-end text-right gap-2">
//                   {weatherData.current.icon}
//                   <div className="text-5xl font-black">
//                     {weatherData.current.temp}
//                   </div>
//                 </div>
//                 <p className="text-blue-200 capitalize">
//                   {weatherData.current.condition}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 📅 3-Day Forecast */}
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
//           <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//             <Calendar className="w-7 h-7 mr-3 text-green-500" />
//             3-Day Forecast
//           </h3>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//             {weatherData.forecast.map((day, i) => (
//               <div
//                 key={i}
//                 className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
//               >
//                 <div className="font-bold text-lg text-gray-900 mb-3">
//                   {day.day}
//                 </div>
//                 <div className="flex justify-center mb-4">
//                   {day.icon}
//                 </div>
//                 <div className="text-sm text-gray-600 mb-2 capitalize">
//                   {day.condition}
//                 </div>
//                 <div className="font-bold text-lg text-gray-900 mb-2">
//                   <span className="text-xl">{day.high}</span> /{" "}
//                   <span className="text-gray-600">{day.low}</span>
//                 </div>
//                 <div className="text-xs text-blue-600 font-semibold">
//                   {day.precipitation} Precipitation
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     content = <div className="text-center p-12 text-lg text-gray-500">Search for a city to see the weather.</div>;
//   }

//   return (
//     <div>
//       {/* 🔍 Search Bar */}
//       <div className="relative mb-8">
//         <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
//         <input
//           type="text"
//           aria-label="Search location"
//           placeholder="Search a location"
//           value={searchInput}
//           onChange={(e) => setSearchInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="w-full bg-gray-200 rounded-2xl py-4 pl-12 pr-14 sm:py-3.5 sm:pl-14 sm:pr-20 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//           disabled={loading}
//         />
//         <button
//           type="button"
//           onClick={handleSearchClick}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           aria-label="Search"
//           disabled={loading || !searchInput.trim()}
//         >
//           <Search className="w-4 h-4" />
//           <span className="hidden sm:inline text-sm font-semibold">Search</span>
//         </button>
//       </div>

//       {content}
//     </div>
//   );
// };

// export default WeatherPage;




'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  AlertCircle,
  Search,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
} from "lucide-react";

const OPENWEATHER_API_KEY: string = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "bbc866c78ccd689ab15a1de21e627ba0";

interface ForecastDay {
  day: string;
  high: string;
  low: string;
  condition: string;
  icon: React.ReactElement;
  precipitation: string;
}

interface CurrentWeather {
  temp: string;
  condition: string;
  city: string;
  icon: React.ReactElement;
}

interface Alert {
  message: string;
  severity: 'moderate' | 'mild';
}

interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  alerts: Alert[];
}

const getWeatherIcon = (condition: string): React.ReactElement => {
  const desc = (condition || '').toLowerCase();
  switch (true) {
    case desc.includes('clear'):
      return <Sun className="w-12 h-12 text-yellow-500" />;
    case desc.includes('cloud'):
      return <Cloud className="w-12 h-12 text-gray-500" />;
    case desc.includes('rain'):
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    case desc.includes('snow'):
      return <CloudSnow className="w-12 h-12 text-cyan-500" />;
    default:
      return <Cloud className="w-12 h-12 text-gray-500" />;
  }
};

const WeatherPage: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("Nigeria");
  const [searchInput, setSearchInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!OPENWEATHER_API_KEY) throw new Error("Missing API Key (check .env.local)");

      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      if (!currentRes.ok) throw new Error("City not found.");
      const currentData = await currentRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      const dailyForecast: ForecastDay[] = forecastData.list
        .filter((_: any, index: number) => index % 8 === 0)
        .slice(0, 3)
        .map((day: any) => {
          const date = new Date(day.dt * 1000);
          return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            high: Math.round(day.main.temp_max) + '°',
            low: Math.round(day.main.temp_min) + '°',
            condition: day.weather?.[0]?.description ?? 'Unknown',
            icon: getWeatherIcon(day.weather?.[0]?.description ?? ''),
            precipitation: `${Math.round(day.pop * 100)}%`,
          };
        });

      const current: CurrentWeather = {
        temp: Math.round(currentData.main.temp) + '°C',
        condition: currentData.weather?.[0]?.description ?? 'Unknown',
        city: currentData.name,
        icon: getWeatherIcon(currentData.weather?.[0]?.description ?? ''),
      };

      // 🌩️ Example alerts (you can later replace with a real weather alerts API)
      const alerts: Alert[] = currentData.weather[0].main.includes('Rain')
        ? [{ message: "Expect rain — adjust irrigation plans.", severity: 'moderate' }]
        : [{ message: "Clear weather — optimal for planting.", severity: 'mild' }];

      setWeatherData({ current, forecast: dailyForecast, alerts });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch weather data.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearchClick = () => {
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  if (loading) {
    return (
      <div className="text-center p-12 text-lg text-gray-500">
        Loading weather data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-12 bg-red-100 border border-red-400 text-red-700 rounded-2xl">
        <AlertCircle className="w-8 h-8 mx-auto mb-3" />
        <p className="font-bold mb-2">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-center p-12 text-lg text-gray-500">
        Search for a city to see the weather.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 🌤 Header */}
      <div className="bg-gradient-to-br from-blue-500 via-sky-500 to-cyan-500 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black mb-2">Weather Hub</h2>
              <p className="text-blue-100 text-lg">
                Advanced weather insights for smart farming
              </p>
              <p className="text-blue-200 text-sm mt-1">Location: {weatherData.current.city}</p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-black mb-2">
                {weatherData.current.temp}
              </div>
              <div className="flex justify-end">{weatherData.current.icon}</div>
              <p className="text-blue-200 capitalize">
                {weatherData.current.condition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          aria-label="Search location"
          placeholder="Search a location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-200 rounded-2xl py-4 pl-12 pr-14 sm:py-3.5 sm:pl-14 sm:pr-20 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-semibold">Search</span>
        </button>
      </div>

      {/* 📅 3-Day Forecast */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Calendar className="w-7 h-7 mr-3 text-green-500" />
          3-Day Forecast
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {weatherData.forecast.map((day, i) => (
            <div
              key={i}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="font-bold text-lg text-gray-900 mb-3">{day.day}</div>
              <div className="flex justify-center mb-4">{day.icon}</div>
              <div className="text-sm text-gray-600 mb-2 capitalize">{day.condition}</div>
              <div className="font-bold text-lg text-gray-900 mb-2">
                <span className="text-xl">{day.high}</span> /{" "}
                <span className="text-gray-600">{day.low}</span>
              </div>
              <div className="text-xs text-blue-600 font-semibold">
                {day.precipitation} rain
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⚠️ Alerts */}
      {weatherData.alerts.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertCircle className="w-7 h-7 mr-3 text-orange-500" />
            Weather Alerts
          </h3>
          <div className="space-y-4">
            {weatherData.alerts.map((alert, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border-l-4 ${
                  alert.severity === "moderate"
                    ? "bg-orange-50 border-orange-500"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle
                    className={`w-5 h-5 ${
                      alert.severity === "moderate"
                        ? "text-orange-500"
                        : "text-blue-500"
                    }`}
                  />
                  <p className="font-semibold text-gray-900">
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;