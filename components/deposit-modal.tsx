"use client"

import { useState } from "react"
import { X, Smartphone, CreditCard, Check } from "lucide-react"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
}

const currencies = [
  { code: "PEN", name: "Soles", symbol: "S/." },
  { code: "USD", name: "Dólares", symbol: "$" },
]

const paymentMethods = [
  { id: "yape", name: "Yape", icon: Smartphone, color: "bg-purple-500" },
  { id: "visa", name: "Visa/MC", icon: CreditCard, color: "bg-blue-600" },
]

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("PEN")
  const [selectedMethod, setSelectedMethod] = useState("yape")

  if (!isOpen) return null

  const handleDeposit = () => {
    if (!amount) return
    // Simulación de depósito
    alert(`Depositando ${currencies.find(c => c.code === selectedCurrency)?.symbol}${amount} vía ${paymentMethods.find(m => m.id === selectedMethod)?.name}`)
    onClose()
    setAmount("")
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Depositar Fondos</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Monto */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Monto a depositar
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                {currencies.find(c => c.code === selectedCurrency)?.symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Moneda */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Seleccionar moneda
            </label>
            <div className="grid grid-cols-2 gap-2">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency.code)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                    selectedCurrency === currency.code
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {selectedCurrency === currency.code && (
                    <Check className="w-4 h-4 text-emerald-600" />
                  )}
                  <span className={`font-semibold ${
                    selectedCurrency === currency.code ? "text-emerald-700" : "text-gray-700"
                  }`}>
                    {currency.code}
                  </span>
                  <span className="text-xs text-gray-500">({currency.name})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Método de pago */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Método de pago
            </label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`font-semibold text-sm ${
                    selectedMethod === method.id ? "text-emerald-700" : "text-gray-700"
                  }`}>
                    {method.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Botón de depósito */}
          <button
            onClick={handleDeposit}
            disabled={!amount}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
              amount
                ? "bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Confirmar Depósito
          </button>
        </div>

        {/* Safe area padding */}
        <div className="h-6" />
      </div>
    </>
  )
}
