"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp } from "lucide-react"

const timeFilters = ["1D", "1W", "1M", "1Y"]

// Datos simulados del mercado USD/PEN por temporalidad
const marketDataByTime: Record<string, { time: string; buy: number; sell: number }[]> = {
  "1D": [
    { time: "09:00", buy: 3.72, sell: 3.74 },
    { time: "10:00", buy: 3.73, sell: 3.75 },
    { time: "11:00", buy: 3.71, sell: 3.73 },
    { time: "12:00", buy: 3.74, sell: 3.76 },
    { time: "13:00", buy: 3.73, sell: 3.75 },
    { time: "14:00", buy: 3.72, sell: 3.74 },
    { time: "15:00", buy: 3.75, sell: 3.77 },
    { time: "16:00", buy: 3.73, sell: 3.75 },
  ],
  "1W": [
    { time: "Lun", buy: 3.70, sell: 3.72 },
    { time: "Mar", buy: 3.72, sell: 3.74 },
    { time: "Mié", buy: 3.68, sell: 3.70 },
    { time: "Jue", buy: 3.71, sell: 3.73 },
    { time: "Vie", buy: 3.74, sell: 3.76 },
    { time: "Sáb", buy: 3.73, sell: 3.75 },
    { time: "Dom", buy: 3.73, sell: 3.75 },
  ],
  "1M": [
    { time: "Sem1", buy: 3.65, sell: 3.67 },
    { time: "Sem2", buy: 3.70, sell: 3.72 },
    { time: "Sem3", buy: 3.68, sell: 3.70 },
    { time: "Sem4", buy: 3.73, sell: 3.75 },
  ],
  "1Y": [
    { time: "Ene", buy: 3.80, sell: 3.82 },
    { time: "Mar", buy: 3.75, sell: 3.77 },
    { time: "May", buy: 3.65, sell: 3.67 },
    { time: "Jul", buy: 3.60, sell: 3.62 },
    { time: "Sep", buy: 3.68, sell: 3.70 },
    { time: "Nov", buy: 3.73, sell: 3.75 },
  ],
}

export function MarketChart() {
  const [activeFilter, setActiveFilter] = useState("1D")
  
  const marketData = marketDataByTime[activeFilter]
  const latestData = marketData[marketData.length - 1]

  return (
    <div className="px-4 py-3 flex-1">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 h-full flex flex-col">
        {/* Header del gráfico */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">USD/PEN</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                  +0.12%
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">S/. {latestData.sell.toFixed(4)}</p>
            </div>
          </div>
          
          {/* Selectores de tiempo */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-1 text-[10px] font-medium rounded-md transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-white shadow-sm"
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
            <span className="text-[10px] text-gray-600">Compra</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-gray-600">Venta</span>
          </div>
        </div>

        {/* Gráfico */}
        <div className="flex-1 min-h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: '#9CA3AF' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={['dataMin - 0.02', 'dataMax + 0.02']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: '#9CA3AF' }}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '11px',
                  padding: '8px',
                }}
                formatter={(value: number) => [`S/. ${value.toFixed(4)}`, '']}
              />
              <Line
                type="monotone"
                dataKey="buy"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                name="Compra"
                animationDuration={500}
              />
              <Line
                type="monotone"
                dataKey="sell"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                name="Venta"
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Precios actuales */}
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="text-center flex-1">
            <p className="text-[10px] text-gray-500 mb-0.5">Precio Compra</p>
            <p className="text-sm font-bold text-blue-600">S/. {latestData.buy.toFixed(4)}</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center flex-1">
            <p className="text-[10px] text-gray-500 mb-0.5">Precio Venta</p>
            <p className="text-sm font-bold text-emerald-600">S/. {latestData.sell.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
