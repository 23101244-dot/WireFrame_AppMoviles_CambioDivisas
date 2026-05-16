"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, Zap } from "lucide-react"

type HistoryType = "buy" | "sell" | "buyImmediate" | "sellImmediate"

interface HistoryItem {
  id: number
  pair: string
  amount: number
  price: number
  total: number
  date: string
  time: string
}

const generateHistory = (type: HistoryType): HistoryItem[] => {
  const baseData = {
    buy: [
      { id: 1, pair: "USD/PEN", amount: 500, price: 3.71, total: 1855, date: "15/01/2024", time: "14:32" },
      { id: 2, pair: "EUR/PEN", amount: 200, price: 4.02, total: 804, date: "14/01/2024", time: "10:15" },
      { id: 3, pair: "USD/PEN", amount: 1000, price: 3.70, total: 3700, date: "13/01/2024", time: "16:45" },
      { id: 4, pair: "GBP/PEN", amount: 150, price: 4.68, total: 702, date: "12/01/2024", time: "09:20" },
      { id: 5, pair: "USD/PEN", amount: 750, price: 3.69, total: 2767.50, date: "11/01/2024", time: "11:00" },
      { id: 6, pair: "EUR/PEN", amount: 300, price: 4.01, total: 1203, date: "10/01/2024", time: "15:30" },
      { id: 7, pair: "USD/PEN", amount: 2000, price: 3.72, total: 7440, date: "09/01/2024", time: "08:45" },
      { id: 8, pair: "GBP/PEN", amount: 100, price: 4.70, total: 470, date: "08/01/2024", time: "17:20" },
      { id: 9, pair: "USD/PEN", amount: 400, price: 3.68, total: 1472, date: "07/01/2024", time: "12:10" },
      { id: 10, pair: "EUR/PEN", amount: 500, price: 4.03, total: 2015, date: "06/01/2024", time: "14:00" },
      { id: 11, pair: "USD/PEN", amount: 800, price: 3.70, total: 2960, date: "05/01/2024", time: "10:30" },
      { id: 12, pair: "USD/PEN", amount: 600, price: 3.71, total: 2226, date: "04/01/2024", time: "16:15" },
    ],
    sell: [
      { id: 1, pair: "USD/PEN", amount: 300, price: 3.73, total: 1119, date: "15/01/2024", time: "13:20" },
      { id: 2, pair: "GBP/PEN", amount: 150, price: 4.70, total: 705, date: "14/01/2024", time: "09:45" },
      { id: 3, pair: "EUR/PEN", amount: 400, price: 4.05, total: 1620, date: "13/01/2024", time: "15:10" },
      { id: 4, pair: "USD/PEN", amount: 250, price: 3.74, total: 935, date: "12/01/2024", time: "11:30" },
      { id: 5, pair: "USD/PEN", amount: 1200, price: 3.72, total: 4464, date: "11/01/2024", time: "14:50" },
      { id: 6, pair: "EUR/PEN", amount: 180, price: 4.04, total: 727.20, date: "10/01/2024", time: "10:00" },
      { id: 7, pair: "GBP/PEN", amount: 200, price: 4.71, total: 942, date: "09/01/2024", time: "16:40" },
      { id: 8, pair: "USD/PEN", amount: 550, price: 3.73, total: 2051.50, date: "08/01/2024", time: "08:15" },
    ],
    buyImmediate: [
      { id: 1, pair: "USD/PEN", amount: 100, price: 3.75, total: 375, date: "15/01/2024", time: "14:05" },
      { id: 2, pair: "EUR/PEN", amount: 50, price: 4.08, total: 204, date: "14/01/2024", time: "11:20" },
      { id: 3, pair: "USD/PEN", amount: 200, price: 3.76, total: 752, date: "12/01/2024", time: "09:55" },
      { id: 4, pair: "GBP/PEN", amount: 75, price: 4.75, total: 356.25, date: "10/01/2024", time: "15:40" },
      { id: 5, pair: "USD/PEN", amount: 150, price: 3.74, total: 561, date: "08/01/2024", time: "12:30" },
      { id: 6, pair: "EUR/PEN", amount: 80, price: 4.07, total: 325.60, date: "06/01/2024", time: "10:15" },
    ],
    sellImmediate: [
      { id: 1, pair: "USD/PEN", amount: 120, price: 3.68, total: 441.60, date: "15/01/2024", time: "13:45" },
      { id: 2, pair: "EUR/PEN", amount: 60, price: 3.98, total: 238.80, date: "13/01/2024", time: "16:20" },
      { id: 3, pair: "USD/PEN", amount: 180, price: 3.67, total: 660.60, date: "11/01/2024", time: "11:10" },
      { id: 4, pair: "GBP/PEN", amount: 90, price: 4.65, total: 418.50, date: "09/01/2024", time: "14:35" },
      { id: 5, pair: "USD/PEN", amount: 250, price: 3.69, total: 922.50, date: "07/01/2024", time: "09:00" },
    ],
  }
  return baseData[type]
}

const ITEMS_PER_PAGE = 5

const tabs: { key: HistoryType; label: string; shortLabel: string; color: string }[] = [
  { key: "buy", label: "Compra", shortLabel: "Compra", color: "emerald" },
  { key: "sell", label: "Venta", shortLabel: "Venta", color: "red" },
  { key: "buyImmediate", label: "Compra Inmediata", shortLabel: "C. Inmed.", color: "blue" },
  { key: "sellImmediate", label: "Venta Inmediata", shortLabel: "V. Inmed.", color: "orange" },
]

interface HistoryScreenProps {
  isDarkMode?: boolean
}

export function HistoryScreen({ isDarkMode = false }: HistoryScreenProps) {
  const [activeTab, setActiveTab] = useState<HistoryType>("buy")
  const [currentPage, setCurrentPage] = useState(1)

  const data = generateHistory(activeTab)
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleTabChange = (tab: HistoryType) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const getIcon = (type: HistoryType) => {
    switch (type) {
      case "buy":
        return <ArrowDownLeft className="w-4 h-4" />
      case "sell":
        return <ArrowUpRight className="w-4 h-4" />
      case "buyImmediate":
        return <Zap className="w-4 h-4" />
      case "sellImmediate":
        return <Zap className="w-4 h-4" />
    }
  }

  const getColorClasses = (type: HistoryType, isActive: boolean) => {
    const colors = {
      buy: isActive ? "bg-emerald-500 text-white" : "text-emerald-600 hover:bg-emerald-50",
      sell: isActive ? "bg-red-500 text-white" : "text-red-600 hover:bg-red-50",
      buyImmediate: isActive ? "bg-blue-500 text-white" : "text-blue-600 hover:bg-blue-50",
      sellImmediate: isActive ? "bg-orange-500 text-white" : "text-orange-600 hover:bg-orange-50",
    }
    return colors[type]
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Historial</h2>
        <p className="text-xs text-gray-500 mt-1">Registro de todas tus operaciones</p>
      </div>

      {/* Tabs - 4 columnas */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-4 gap-1 bg-white rounded-xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`py-2 px-1 rounded-lg text-xs font-medium transition-colors flex flex-col items-center gap-1 ${getColorClasses(
                tab.key,
                activeTab === tab.key
              )}`}
            >
              {getIcon(tab.key)}
              <span className="leading-tight text-center">{tab.shortLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Total de operaciones</p>
              <p className="text-2xl font-bold text-gray-900">{data.length}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Volumen total</p>
              <p className="text-lg font-bold text-emerald-600">
                S/ {data.reduce((acc, item) => acc + item.total, 0).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="p-4 space-y-2">
        {paginatedData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-3 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeTab.includes("buy") ? "bg-emerald-100" : "bg-red-100"
                }`}>
                  {getIcon(activeTab)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.pair}</p>
                  <p className="text-xs text-gray-400">{item.date} - {item.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-sm">S/ {item.total.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{item.amount} @ {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-xl p-3 shadow-sm flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-emerald-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
