import React from 'react'
import { Thermometer, Droplets, Wind } from 'lucide-react'


const WeatherSide = () => {
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-4 flex items-center">
                    <Thermometer className="w-5 h-5 mr-2" />
                    Weather Now
                  </h3>
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
