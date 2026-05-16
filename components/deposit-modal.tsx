"use client"

import { useState } from "react"
import { X, Smartphone, CreditCard, Check, FileText } from "lucide-react"
import { CurrencySelector, ALL_CURRENCIES } from "./currency-selector"

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode?: boolean
}

const paymentMethods = [
  { id: "yape", name: "Yape", icon: Smartphone, color: "bg-purple-500" },
  { id: "visa", name: "Visa/MC", icon: CreditCard, color: "bg-blue-600" },
]

export function DepositModal({ isOpen, onClose, isDarkMode = false }: DepositModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(["PEN"])
  const [selectedMethod, setSelectedMethod] = useState("yape")
  const [showMultiCurrencySummary, setShowMultiCurrencySummary] = useState(false)

  if (!isOpen) return null

  const primaryCurrency = ALL_CURRENCIES.find(c => c.code === selectedCurrencies[0])
  const isMultiCurrency = selectedCurrencies.length > 1

  const handleDeposit = () => {
    if (!amount) return
    
    if (isMultiCurrency) {
      setShowMultiCurrencySummary(true)
    } else {
      alert(`Depositando ${primaryCurrency?.symbol}${amount} via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`)
      handleClose()
    }
  }

  const handleConfirmMultiCurrency = () => {
    const currencyNames = selectedCurrencies.map(code => {
      const curr = ALL_CURRENCIES.find(c => c.code === code)
      return `${curr?.symbol}${amount} ${curr?.code}`
    }).join(", ")
    alert(`Depósito multidivisa confirmado: ${currencyNames} via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`)
    handleClose()
  }

  const handleClose = () => {
    setAmount("")
    setSelectedCurrencies(["PEN"])
    setShowMultiCurrencySummary(false)
    onClose()
  }

  // Resumen Multidivisa Modal
  if (showMultiCurrencySummary) {
    return (
      <>
        <div 
          className="absolute inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setShowMultiCurrencySummary(false)}
        />
        <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl z-50 animate-in slide-in-from-bottom duration-300 ${
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
                isDarkMode ? "bg-emerald-900/50" : "bg-emerald-100"
              }`}>
                <FileText className={`w-5 h-5 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />
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
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDarkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <X className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            <div className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <p className={`text-xs font-medium mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                DETALLE DE DEPÓSITOS
              </p>
              <div className="space-y-3">
                {selectedCurrencies.map((code, index) => {
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
                      <span className={`font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                        {currency?.symbol}{amount}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={`rounded-xl p-4 border ${
              isDarkMode ? "bg-emerald-900/20 border-emerald-800" : "bg-emerald-50 border-emerald-200"
            }`}>
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                  Total de operaciones:
                </span>
                <span className={`text-lg font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                  {selectedCurrencies.length} depósitos
                </span>
              </div>
            </div>

            <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Se procesarán {selectedCurrencies.length} depósitos independientes, uno por cada moneda seleccionada, 
              con el monto de {amount} en cada divisa.
            </div>

            <button
              onClick={handleConfirmMultiCurrency}
              className="w-full py-4 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] transition-all"
            >
              Confirmar Depósitos Multidivisa
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
      </>
    )
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Bottom Sheet */}
      <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl z-50 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto ${
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
          <h2 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Depositar Fondos</h2>
          <button 
            onClick={handleClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <X className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Monto */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Monto a depositar
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
                className={`w-full pl-12 pr-4 py-3 border rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
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

          {/* Moneda - Nuevo selector */}
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
              accentColor="emerald"
            />
          </div>

          {/* Metodo de pago */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
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
                      : isDarkMode 
                        ? "border-gray-600 bg-gray-700 hover:border-gray-500" 
                        : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                    <method.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`font-semibold text-sm ${
                    selectedMethod === method.id 
                      ? "text-emerald-700" 
                      : isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}>
                    {method.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Boton de deposito */}
          <button
            onClick={handleDeposit}
            disabled={!amount || selectedCurrencies.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
              amount && selectedCurrencies.length > 0
                ? "bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {isMultiCurrency 
              ? `Ver Resumen (${selectedCurrencies.length} monedas)` 
              : "Confirmar Depósito"
            }
          </button>
        </div>

        {/* Safe area padding */}
        <div className="h-6" />
      </div>
    </>
  )
}
