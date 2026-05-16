"use client"

import { useState } from "react"
import { ChevronLeft, ChevronDown, ChevronUp, X } from "lucide-react"

const currencyPairs = [
  { id: 1, base: "USD", quote: "PEN", buyPrice: 3.72, sellPrice: 3.68, change: 0.15 },
  { id: 2, base: "EUR", quote: "PEN", buyPrice: 4.05, sellPrice: 4.01, change: -0.08 },
  { id: 3, base: "USD", quote: "EUR", buyPrice: 0.92, sellPrice: 0.91, change: 0.05 },
  { id: 4, base: "GBP", quote: "PEN", buyPrice: 4.72, sellPrice: 4.68, change: 0.22 },
  { id: 5, base: "GBP", quote: "USD", buyPrice: 1.27, sellPrice: 1.26, change: -0.03 },
  { id: 6, base: "EUR", quote: "USD", buyPrice: 1.09, sellPrice: 1.08, change: 0.02 },
]

const generateOrderBook = () => ({
  bids: [
    { price: 3.71, amount: 1250.00, total: 4637.50 },
    { price: 3.70, amount: 890.50, total: 3294.85 },
    { price: 3.69, amount: 2100.00, total: 7749.00 },
    { price: 3.68, amount: 1500.00, total: 5520.00 },
    { price: 3.67, amount: 3200.00, total: 11744.00 },
  ],
  asks: [
    { price: 3.72, amount: 980.00, total: 3645.60 },
    { price: 3.73, amount: 1450.00, total: 5408.50 },
    { price: 3.74, amount: 750.00, total: 2805.00 },
    { price: 3.75, amount: 2200.00, total: 8250.00 },
    { price: 3.76, amount: 1800.00, total: 6768.00 },
  ],
})

interface OrderFormProps {
  type: "buy" | "sell" | "buyImmediate" | "sellImmediate"
  pair: { base: string; quote: string }
  onClose: () => void
  onConfirm: () => void
}

function OrderForm({ type, pair, onClose, onConfirm }: OrderFormProps) {
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")

  const titles: Record<string, string> = {
    buy: "Generar Orden de Compra",
    sell: "Generar Oferta de Venta",
    buyImmediate: "Compra Inmediata",
    sellImmediate: "Venta Inmediata",
  }

  const isImmediate = type === "buyImmediate" || type === "sellImmediate"

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-[400px] rounded-t-3xl p-5 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">{titles[type]}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="bg-emerald-50 rounded-xl p-3 mb-4">
          <p className="text-sm text-emerald-700 font-medium">
            Par: {pair.base}/{pair.quote}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad ({pair.base})
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
            />
          </div>

          {!isImmediate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio por unidad ({pair.quote})
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              />
            </div>
          )}

          {isImmediate && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-sm text-amber-700">
                Se ejecutara al mejor precio disponible en el mercado.
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total estimado:</span>
              <span className="font-bold text-gray-900">
                {amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : "0.00"} {pair.quote}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`w-full py-4 rounded-xl font-bold text-white transition-colors ${
              type.includes("buy")
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Confirmar {type.includes("buy") ? "Compra" : "Venta"}
          </button>
        </div>
      </div>
    </div>
  )
}

interface OrderBookProps {
  pair: typeof currencyPairs[0]
  onBack: () => void
}

function OrderBook({ pair, onBack }: OrderBookProps) {
  const [orderForm, setOrderForm] = useState<{
    type: "buy" | "sell" | "buyImmediate" | "sellImmediate"
  } | null>(null)
  const orderBook = generateOrderBook()

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {pair.base}/{pair.quote}
          </h2>
          <p className="text-xs text-gray-500">Libro de Ordenes</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-lg font-bold text-emerald-600">{pair.buyPrice.toFixed(2)}</p>
          <p className={`text-xs ${pair.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            {pair.change >= 0 ? "+" : ""}{pair.change.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Order Book */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-gray-100">
            {/* Bids (Compra) */}
            <div>
              <div className="bg-emerald-50 px-3 py-2">
                <p className="text-xs font-bold text-emerald-700 text-center">COMPRA (Bids)</p>
              </div>
              <div className="divide-y divide-gray-50">
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="px-3 py-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-emerald-600 font-medium">{bid.price.toFixed(2)}</span>
                      <span className="text-gray-600">{bid.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asks (Venta) */}
            <div>
              <div className="bg-red-50 px-3 py-2">
                <p className="text-xs font-bold text-red-700 text-center">VENTA (Asks)</p>
              </div>
              <div className="divide-y divide-gray-50">
                {orderBook.asks.map((ask, index) => (
                  <div key={index} className="px-3 py-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-red-500 font-medium">{ask.price.toFixed(2)}</span>
                      <span className="text-gray-600">{ask.amount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setOrderForm({ type: "buy" })}
            className="bg-emerald-600 text-white py-3 px-3 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Generar Orden de Compra
          </button>
          <button
            onClick={() => setOrderForm({ type: "sell" })}
            className="bg-red-500 text-white py-3 px-3 rounded-xl text-xs font-bold hover:bg-red-600 transition-colors"
          >
            Generar Oferta de Venta
          </button>
          <button
            onClick={() => setOrderForm({ type: "buyImmediate" })}
            className="bg-emerald-100 text-emerald-700 py-3 px-3 rounded-xl text-xs font-bold hover:bg-emerald-200 transition-colors border border-emerald-200"
          >
            Compra Inmediata
          </button>
          <button
            onClick={() => setOrderForm({ type: "sellImmediate" })}
            className="bg-red-100 text-red-700 py-3 px-3 rounded-xl text-xs font-bold hover:bg-red-200 transition-colors border border-red-200"
          >
            Venta Inmediata
          </button>
        </div>
      </div>

      {orderForm && (
        <OrderForm
          type={orderForm.type}
          pair={{ base: pair.base, quote: pair.quote }}
          onClose={() => setOrderForm(null)}
          onConfirm={() => {}}
        />
      )}
    </div>
  )
}

interface CurrenciesScreenProps {
  isDarkMode?: boolean
}

export function CurrenciesScreen({ isDarkMode = false }: CurrenciesScreenProps) {
  const [selectedPair, setSelectedPair] = useState<typeof currencyPairs[0] | null>(null)
  const [collapsed, setCollapsed] = useState(false)

  const displayedPairs = collapsed
    ? currencyPairs.filter((p) => p.quote === "PEN")
    : currencyPairs

  if (selectedPair) {
    return <OrderBook pair={selectedPair} onBack={() => setSelectedPair(null)} />
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Pares de Monedas</h2>
        <p className="text-xs text-gray-500 mt-1">Selecciona un par para operar</p>
      </div>

      {/* Collapse Button */}
      <div className="px-4 pt-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {collapsed ? (
            <>
              <ChevronDown className="w-4 h-4" />
              Mostrar todos los pares
            </>
          ) : (
            <>
              <ChevronUp className="w-4 h-4" />
              Colapsar duplicados (solo PEN)
            </>
          )}
        </button>
      </div>

      {/* Currency Pairs List */}
      <div className="p-4 space-y-3">
        {displayedPairs.map((pair) => (
          <button
            key={pair.id}
            onClick={() => setSelectedPair(pair)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{pair.base}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {pair.base}/{pair.quote}
                  </p>
                  <p className="text-xs text-gray-500">Par de divisas</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{pair.buyPrice.toFixed(2)}</p>
                <p className={`text-xs font-medium ${pair.change >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                  {pair.change >= 0 ? "+" : ""}{pair.change.toFixed(2)}%
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
