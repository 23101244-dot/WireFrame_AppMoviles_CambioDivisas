"use client"

import { useState } from "react"
import { X, Wallet, CreditCard, Smartphone } from "lucide-react"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
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
  { id: "USD", symbol: "$", label: "Dólares" },
]

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState<Currency>("PEN")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)

  const selectedCurrency = currencies.find((c) => c.id === currency)

  const handleConfirm = () => {
    if (amount && paymentMethod) {
      alert(`Retiro de ${selectedCurrency?.symbol}${amount} vía ${paymentMethod} confirmado`)
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
      <div className="relative w-full bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Retirar Dinero</h2>
              <p className="text-xs text-gray-500">Envía fondos a tu cuenta externa</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-5 space-y-5">
          {/* Campo de monto */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">
              Monto a retirar
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                {selectedCurrency?.symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Selector de moneda */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">
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
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold">{curr.symbol}</span>
                  <span className="text-sm">{curr.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Métodos de cobro */}
          <div>
            <label className="text-xs font-medium text-gray-600 mb-2 block">
              Método de cobro
            </label>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-3 px-2 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1.5 ${
                    paymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`w-9 h-9 ${method.bgColor} rounded-full flex items-center justify-center`}>
                    <method.icon className={`w-4 h-4 ${method.color}`} />
                  </div>
                  <span className={`text-xs font-medium ${
                    paymentMethod === method.id ? "text-blue-700" : "text-gray-600"
                  }`}>
                    {method.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
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
              className="w-full py-3 rounded-xl font-medium text-sm text-gray-600 hover:bg-gray-100 transition-colors"
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
