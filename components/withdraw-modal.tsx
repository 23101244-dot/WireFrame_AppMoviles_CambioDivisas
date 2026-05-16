"use client"

import { useState } from "react"
import { X, Wallet, CreditCard, Smartphone, FileText } from "lucide-react"
import { CurrencySelector, ALL_CURRENCIES } from "./currency-selector"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

type PaymentMethod = "paypal" | "visa" | "yape"

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ElementType; color: string; bgColor: string }[] = [
  { id: "paypal", label: "PayPal", icon: Wallet, color: "text-blue-700", bgColor: "bg-blue-100" },
  { id: "visa", label: "Visa", icon: CreditCard, color: "text-indigo-700", bgColor: "bg-indigo-100" },
  { id: "yape", label: "Yape", icon: Smartphone, color: "text-purple-700", bgColor: "bg-purple-100" },
]

export function WithdrawModal({ isOpen, onClose, isDarkMode = false }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(["PEN"])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [showMultiCurrencySummary, setShowMultiCurrencySummary] = useState(false)

  const primaryCurrency = ALL_CURRENCIES.find(c => c.code === selectedCurrencies[0])
  const isMultiCurrency = selectedCurrencies.length > 1

  const handleConfirm = () => {
    if (amount && paymentMethod) {
      if (isMultiCurrency) {
        setShowMultiCurrencySummary(true)
      } else {
        alert(`Retiro de ${primaryCurrency?.symbol}${amount} via ${paymentMethod} confirmado`)
        handleClose()
      }
    }
  }

  const handleConfirmMultiCurrency = () => {
    const currencyNames = selectedCurrencies.map(code => {
      const curr = ALL_CURRENCIES.find(c => c.code === code)
      return `${curr?.symbol}${amount} ${curr?.code}`
    }).join(", ")
    alert(`Retiro multidivisa confirmado: ${currencyNames} via ${paymentMethod}`)
    handleClose()
  }

  const handleClose = () => {
    setAmount("")
    setPaymentMethod(null)
    setSelectedCurrencies(["PEN"])
    setShowMultiCurrencySummary(false)
    onClose()
  }

  if (!isOpen) return null

  // Resumen Multidivisa Modal
  if (showMultiCurrencySummary) {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center">
        <div 
          className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => setShowMultiCurrencySummary(false)}
        />
        <div className={`relative w-full rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <div className="flex justify-center pt-3 pb-2">
            <div className={`w-10 h-1 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`} />
          </div>

          <div className={`flex items-center justify-between px-5 pb-4 border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-100"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-blue-900/50" : "bg-blue-100"
              }`}>
                <FileText className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
              </div>
              <div>
                <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Resumen Multidivisa
                </h2>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {selectedCurrencies.length} monedas seleccionadas
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowMultiCurrencySummary(false)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <X className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <p className={`text-xs font-medium mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                DETALLE DE RETIROS
              </p>
              <div className="space-y-3">
                {selectedCurrencies.map((code) => {
                  const currency = ALL_CURRENCIES.find(c => c.code === code)
                  return (
                    <div key={code} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{currency?.flag}</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {currency?.code}
                        </span>
                        <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          ({currency?.name})
                        </span>
                      </div>
                      <span className={`font-bold ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                        {currency?.symbol}{amount}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={`rounded-xl p-4 border ${
              isDarkMode ? "bg-blue-900/20 border-blue-800" : "bg-blue-50 border-blue-200"
            }`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}>
                  Total de operaciones:
                </span>
                <span className={`text-lg font-bold ${isDarkMode ? "text-blue-400" : "text-blue-700"}`}>
                  {selectedCurrencies.length} retiros
                </span>
              </div>
            </div>

            <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Se procesarán {selectedCurrencies.length} retiros independientes, uno por cada moneda seleccionada, 
              con el monto de {amount} en cada divisa via {paymentMethod}.
            </div>

            <button
              onClick={handleConfirmMultiCurrency}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              Confirmar Retiros Multidivisa
            </button>
            
            <button
              onClick={() => setShowMultiCurrencySummary(false)}
              className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
                isDarkMode 
                  ? "text-gray-400 hover:bg-gray-700" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Volver a editar
            </button>
          </div>

          <div className="h-6" />
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      {/* Overlay oscuro */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Bottom Sheet */}
      <div className={`relative w-full rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out animate-in slide-in-from-bottom max-h-[85vh] overflow-y-auto ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 sticky top-0 z-10" style={{ background: 'inherit' }}>
          <div className={`w-10 h-1 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`} />
        </div>

        {/* Header */}
        <div className={`flex items-center justify-between px-5 pb-4 border-b sticky top-6 z-10 ${
          isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-100 bg-white"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-blue-900/50" : "bg-blue-100"
            }`}>
              <Wallet className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Retirar Dinero</h2>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Envía fondos a tu cuenta externa</p>
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
                {primaryCurrency?.symbol}
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
            {isMultiCurrency && (
              <p className={`text-xs mt-2 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                Este monto se aplicará a cada moneda seleccionada
              </p>
            )}
          </div>

          {/* Selector de moneda - Nuevo componente */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Seleccionar moneda(s)
              </label>
              <span className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                29 disponibles
              </span>
            </div>
            <CurrencySelector
              selectedCurrencies={selectedCurrencies}
              onSelectionChange={setSelectedCurrencies}
              multiSelect={true}
              isDarkMode={isDarkMode}
              accentColor="blue"
            />
          </div>

          {/* Métodos de cobro */}
          <div>
            <label className={`text-xs font-medium mb-2 block ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
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

          {/* Botones de acción */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleConfirm}
              disabled={!amount || !paymentMethod || selectedCurrencies.length === 0}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                amount && paymentMethod && selectedCurrencies.length > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isMultiCurrency 
                ? `Ver Resumen (${selectedCurrencies.length} monedas)` 
                : "Confirmar Retiro"
              }
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
