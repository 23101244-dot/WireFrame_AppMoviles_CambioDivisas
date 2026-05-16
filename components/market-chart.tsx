"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"

const timeFilters = ["1D", "1W", "1M", "1Y"]

// Paths SVG para diferentes temporalidades
const svgPaths: Record<string, { buy: string; sell: string; price: number }> = {
  "1D": {
    buy: "M 0 80 Q 50 70, 80 85 T 160 75 T 240 80 T 320 65 T 400 70",
    sell: "M 0 60 Q 50 50, 80 65 T 160 55 T 240 60 T 320 45 T 400 50",
    price: 3.7540
  },
  "1W": {
    buy: "M 0 90 Q 60 60, 100 75 T 200 50 T 300 70 T 400 55",
    sell: "M 0 70 Q 60 40, 100 55 T 200 30 T 300 50 T 400 35",
    price: 3.7320
  },
  "1M": {
    buy: "M 0 100 Q 80 85, 140 60 T 260 80 T 340 50 T 400 65",
    sell: "M 0 80 Q 80 65, 140 40 T 260 60 T 340 30 T 400 45",
    price: 3.7180
  },
  "1Y": {
    buy: "M 0 40 Q 70 90, 120 70 T 220 100 T 300 60 T 400 75",
    sell: "M 0 20 Q 70 70, 120 50 T 220 80 T 300 40 T 400 55",
    price: 3.6950
  }
}

interface MarketChartProps {
  isDarkMode?: boolean
}

export function MarketChart({ isDarkMode = false }: MarketChartProps) {
  const [activeFilter, setActiveFilter] = useState("1D")
  
  const currentPaths = svgPaths[activeFilter]

  return (
    <div className="px-4 py-3 flex-1">
      <div className={`rounded-2xl border shadow-sm p-4 h-full flex flex-col ${
        isDarkMode 
          ? "bg-gray-800 border-gray-700" 
          : "bg-white border-gray-100"
      }`}>
        {/* Header del grafico */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-emerald-900/50" : "bg-emerald-100"
            }`}>
              <TrendingUp className={`w-4 h-4 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>USD/PEN</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  isDarkMode ? "bg-emerald-900/50 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                }`}>
                  +0.12%
                </span>
              </div>
              <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                S/. {currentPaths.price.toFixed(4)}
              </p>
            </div>
          </div>
          
          {/* Selectores de tiempo */}
          <div className={`flex gap-1 rounded-lg p-0.5 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-white shadow-sm"
                    : isDarkMode 
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Leyenda */}
        <div className="flex gap-4 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Compra</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className={`text-[10px] ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Venta</span>
          </div>
        </div>

        {/* Grafico SVG Nativo */}
        <div className={`flex-1 min-h-[140px] rounded-xl p-2 relative overflow-hidden ${
          isDarkMode 
            ? "bg-gradient-to-b from-gray-700 to-gray-800" 
            : "bg-gradient-to-b from-gray-50 to-white"
        }`}>
          {/* Grid de fondo */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="50" height="25" patternUnits="userSpaceOnUse">
                <path 
                  d="M 50 0 L 0 0 0 25" 
                  fill="none" 
                  stroke={isDarkMode ? "#374151" : "#e5e7eb"} 
                  strokeWidth="0.5" 
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Lineas del grafico */}
          <svg 
            viewBox="0 0 400 150" 
            className="w-full h-32 relative z-10"
            preserveAspectRatio="none"
          >
            {/* Linea azul (Compra) */}
            <path
              d={currentPaths.buy}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500 ease-in-out"
            />
            
            {/* Linea verde (Venta) */}
            <path
              d={currentPaths.sell}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500 ease-in-out"
            />
            
            {/* Puntos finales */}
            <circle cx="400" cy="70" r="4" fill="#2563eb" className="animate-pulse" />
            <circle cx="400" cy="50" r="4" fill="#10b981" className="animate-pulse" />
          </svg>
        </div>

        {/* Precios actuales */}
        <div className={`flex justify-between mt-3 pt-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div className="text-center flex-1">
            <p className={`text-[10px] mb-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Precio Compra</p>
            <p className="text-sm font-bold text-blue-600">S/. {(currentPaths.price - 0.02).toFixed(4)}</p>
          </div>
          <div className={`w-px ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
          <div className="text-center flex-1">
            <p className={`text-[10px] mb-0.5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Precio Venta</p>
            <p className="text-sm font-bold text-emerald-600">S/. {currentPaths.price.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
