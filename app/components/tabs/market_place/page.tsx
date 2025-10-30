import React from 'react'
import {
  MessageCircle,
  MapPin,
  Star,
  Truck,
  Leaf,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

const MarketPage = () => {
  return (
    <div>
         <div className="space-y-8">
                        {/* market header */}
                        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden">
                          <div className="absolute inset-0 bg-black/10"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h2 className="text-3xl font-black mb-2">
                                  Farm Marketplace 🛒
                                </h2>
                                <p className="text-blue-100 text-lg">
                                  Buy, sell, and trade agricultural products & equipment
                                </p>
                              </div>
                              <div className="text-6xl opacity-20">🏪</div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold">2,847</div>
                                <div className="text-blue-200 text-sm">
                                  Active Listings
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">$4.2M</div>
                                <div className="text-blue-200 text-sm">
                                  Total Volume
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold">98.5%</div>
                                <div className="text-blue-200 text-sm">
                                  Success Rate
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
        
                        {/* Market content */}
                        <div className="grid lg:grid-cols-2 gap-8">
                          {marketplaceItems.map((item) => (
                            <div
                              key={item.id}
                              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                              <div
                                className={`h-48 ${item.image} flex items-center justify-center text-white text-6xl relative`}
                              >
                                <div className="absolute inset-0 bg-black/20"></div>
                                <span className="relative z-10">
                                  {item.category === "equipment"
                                    ? "🚜"
                                    : item.category === "grain"
                                    ? "🌾"
                                    : item.category === "products"
                                    ? "🍯"
                                    : "🌱"}
                                </span>
                                {item.certified && (
                                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {item.certified}
                                  </div>
                                )}
                                {item.verified && (
                                  <CheckCircle className="absolute top-4 left-4 w-8 h-8 text-white bg-blue-500 rounded-full p-1" />
                                )}
                              </div>
        
                              <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex-1">
                                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                                      {item.title}
                                    </h3>
                                    <div className="flex items-center space-x-4 mb-2">
                                      <span className="text-3xl font-black text-green-600">
                                        {item.price}
                                      </span>
                                      <span className="text-gray-500 text-sm">
                                        ({item.pricePerUnit})
                                      </span>
                                    </div>
                                    {item.quantity && (
                                      <p className="text-gray-600 font-medium">
                                        Quantity: {item.quantity}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-semibold text-gray-700">
                                      {item.rating}
                                    </span>
                                  </div>
                                </div>
        
                                <div className="space-y-3 mb-6">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Seller:</span>
                                    <span className="font-semibold text-gray-900">
                                      {item.seller}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Location:</span>
                                    <span className="font-medium text-gray-700 flex items-center">
                                      <MapPin className="w-4 h-4 mr-1" />
                                      {item.location}
                                    </span>
                                  </div>
                                  {item.condition && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-gray-500">Condition:</span>
                                      <span className="font-medium text-gray-700">
                                        {item.condition}
                                      </span>
                                    </div>
                                  )}
                                  {item.harvestDate && (
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-gray-500">Harvest:</span>
                                      <span className="font-medium text-green-600">
                                        {item.harvestDate}
                                      </span>
                                    </div>
                                  )}
                                </div>
        
                                <div className="flex flex-wrap gap-2 mb-6">
                                  {item.organic && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                                      <Leaf className="w-3 h-3 mr-1" />
                                      Organic
                                    </span>
                                  )}
                                  {item.shipping && (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                                      <Truck className="w-3 h-3 mr-1" />
                                      Shipping Available
                                    </span>
                                  )}
                                  {item.wholesale && (
                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                                      Wholesale
                                    </span>
                                  )}
                                </div>
        
                                <div className="grid grid-cols-2 gap-3">
                                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Contact</span>
                                  </button>
                                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    <span>Buy Now</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
    </div>
  )
}

export default MarketPage
