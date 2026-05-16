"use client"

import { useState } from "react"
import { X, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Transaction {
  id: number
  type: "buy" | "sell"
  pair: string
  amount: number
  price: number
  total: number
  status: "pending" | "partial"
  filled: number
  createdAt: string
}

const initialBuyOrders: Transaction[] = [
  { id: 1, type: "buy", pair: "USD/PEN", amount: 500, price: 3.71, total: 1855, status: "pending", filled: 0, createdAt: "Hace 2 min" },
  { id: 2, type: "buy", pair: "EUR/PEN", amount: 200, price: 4.02, total: 804, status: "partial", filled: 45, createdAt: "Hace 15 min" },
  { id: 3, type: "buy", pair: "USD/PEN", amount: 1000, price: 3.70, total: 3700, status: "pending", filled: 0, createdAt: "Hace 1 hora" },
]

const initialSellOrders: Transaction[] = [
  { id: 4, type: "sell", pair: "USD/PEN", amount: 300, price: 3.73, total: 1119, status: "partial", filled: 60, createdAt: "Hace 5 min" },
  { id: 5, type: "sell", pair: "GBP/PEN", amount: 150, price: 4.70, total: 705, status: "pending", filled: 0, createdAt: "Hace 30 min" },
  { id: 6, type: "sell", pair: "EUR/PEN", amount: 400, price: 4.05, total: 1620, status: "pending", filled: 0, createdAt: "Hace 2 horas" },
]

interface TransactionCardProps {
  transaction: Transaction
  onCancel: (id: number) => void
}

function TransactionCard({ transaction, onCancel, isDarkMode = false }: TransactionCardProps & { isDarkMode?: boolean }) {
  const isBuy = transaction.type === "buy"

  return (
    <div className={`rounded-xl p-4 shadow-sm border ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBuy ? "bg-emerald-100" : "bg-red-100"
          }`}>
            {isBuy ? (
              <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
            ) : (
              <ArrowUpRight className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div>
            <p className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{transaction.pair}</p>
            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{transaction.createdAt}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          transaction.status === "partial" 
            ? "bg-amber-100 text-amber-700" 
            : isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
        }`}>
          {transaction.status === "partial" ? `${transaction.filled}% Parcial` : "Pendiente"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className={`rounded-lg p-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Cantidad</p>
          <p className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{transaction.amount.toFixed(2)}</p>
        </div>
        <div className={`rounded-lg p-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Precio</p>
          <p className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{transaction.price.toFixed(2)}</p>
        </div>
        <div className={`rounded-lg p-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
          <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Total</p>
          <p className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{transaction.total.toFixed(2)}</p>
        </div>
      </div>

      {transaction.status === "partial" && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Progreso</span>
            <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{transaction.filled}%</span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <div 
              className={`h-full rounded-full ${isBuy ? "bg-emerald-500" : "bg-red-500"}`}
              style={{ width: `${transaction.filled}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => onCancel(transaction.id)}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
          isDarkMode
            ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
            : "bg-red-50 text-red-600 hover:bg-red-100"
        }`}
      >
        <X className="w-4 h-4" />
        Cancelar Orden
      </button>
    </div>
  )
}

interface TransactionsScreenProps {
  isDarkMode?: boolean
}

export function TransactionsScreen({ isDarkMode = false }: TransactionsScreenProps) {
  const [buyOrders, setBuyOrders] = useState(initialBuyOrders)
  const [sellOrders, setSellOrders] = useState(initialSellOrders)
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")

  const handleCancelBuy = (id: number) => {
    setBuyOrders(buyOrders.filter(order => order.id !== id))
  }

  const handleCancelSell = (id: number) => {
    setSellOrders(sellOrders.filter(order => order.id !== id))
  }

  return (
    <div className={`flex-1 overflow-y-auto pb-20 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className={`px-4 py-4 border-b ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Operaciones Activas</h2>
        <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Gestiona tus ordenes pendientes</p>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className={`rounded-xl p-1 flex shadow-sm ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <button
            onClick={() => setActiveTab("buy")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === "buy"
                ? "bg-emerald-500 text-white"
                : isDarkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ArrowDownLeft className="w-4 h-4" />
            Compras ({buyOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("sell")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === "sell"
                ? "bg-red-500 text-white"
                : isDarkMode ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            Ventas ({sellOrders.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {activeTab === "buy" ? (
          buyOrders.length > 0 ? (
            buyOrders.map((order) => (
              <TransactionCard
                key={order.id}
                transaction={order}
                onCancel={handleCancelBuy}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <div className={`rounded-xl p-8 text-center ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}>
                <Clock className={`w-8 h-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
              </div>
              <p className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>No tienes ordenes de compra activas</p>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Ve a Monedas para crear una orden</p>
            </div>
          )
        ) : (
          sellOrders.length > 0 ? (
            sellOrders.map((order) => (
              <TransactionCard
                key={order.id}
                transaction={order}
                onCancel={handleCancelSell}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <div className={`rounded-xl p-8 text-center ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}>
                <Clock className={`w-8 h-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
              </div>
              <p className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>No tienes ordenes de venta activas</p>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>Ve a Monedas para crear una orden</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
