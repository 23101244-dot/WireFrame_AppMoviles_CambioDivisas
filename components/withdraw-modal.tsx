"use client"

import { useState } from "react"
import { X, Wallet, CreditCard, Smartphone } from "lucide-react"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

type PaymentMethod = "paypal" | "visa" | "yape"
type Currency = "PEN" | "USD"

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ElementType; color: string; bgColor: string }[] = [
  { id: "paypal", label: "PayPal", icon: Wallet, color: "text-blue-700", bgColor: "bg-blue-100" },
  { id: "visa", label: "Visa", icon: CreditCard, color: "text-indigo-700", bgColor: "bg-indigo-100" },
  { id: "yape", label: "Yape", icon: Smartphone, color: "text-purple-700", bgColor: "bg-purple-100" },
]

const currencies: { id: Currency; symbol: string; label: string }[] = [
  { id: "PEN", symbol: "S/.", label: "Soles" },
  { id: "USD", symbol: "$", label: "Dolares" },
]

export function WithdrawModal({ isOpen, onClose, isDarkMode = false }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<Currency>("PEN")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)

  const selectedCurrency = currencies.find((c) => c.id === currency)

  const handleConfirm = () => {
    if (amount && paymentMethod) {
      alert(`Retiro de ${selectedCurrency?.symbol}${amount} via ${paymentMethod} confirmado`)
      setAmount("")
      setPaymentMethod(null)
      onClose()
    }
  }

  const handleClose = () => {
    setAmount("")
    setPaymentMethod(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Overlay oscuro */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Bottom Sheet */}
      <div className={`relative w-full rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className={`w-10 h-1 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 pb-4 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-100"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-blue-900/50" : "bg-blue-100"
            }`}>
              <Wallet className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Retirar Dinero</h2>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Envia fondos a tu cuenta externa</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <X className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-5">
          {/* Campo de monto */}
          <div>
            <label className={`text-xs font-medium mb-2 block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Monto a retirar
            </label>
            <div className="relative">
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                {selectedCurrency?.symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`w-full pl-12 pr-4 py-3.5 border rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-500" 
                    : "bg-gray-50 border-gray-200 text-gray-900"
                }`}
              />
            </div>
          </div>

          {/* Selector de moneda */}
          <div>
            <label className={`text-xs font-medium mb-2 block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Moneda
            </label>
            <div className="grid grid-cols-2 gap-2">
              {currencies.map((curr) => (
                <button
                  key={curr.id}
                  onClick={() => setCurrency(curr.id)}
                  className={`py-3 px-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                    currency === curr.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : isDarkMode 
                        ? "border-gray-600 bg-gray-700 text-gray-200 hover:border-gray-500" 
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold">{curr.symbol}</span>
                  <span className="text-sm">{curr.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Metodos de cobro */}
          <div>
            <label className={`text-xs font-medium mb-2 block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Metodo de cobro
            </label>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-3 px-2 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1.5 ${
                    paymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : isDarkMode 
                        ? "border-gray-600 bg-gray-700 hover:border-gray-500" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`w-9 h-9 ${method.bgColor} rounded-full flex items-center justify-center`}>
                    <method.icon className={`w-4 h-4 ${method.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${
                    paymentMethod === method.id 
                      ? "text-blue-700" 
                      : isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {method.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Botones de accion */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirm}
              disabled={!amount || !paymentMethod}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                amount && paymentMethod
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirmar Retiro
            </button>
            <button
              onClick={handleClose}
              className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
                isDarkMode 
                  ? "text-gray-400 hover:bg-gray-700" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Safe area para iPhone */}
        <div className="h-6" />
      </div>
    </div>
  )
}
