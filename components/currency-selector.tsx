"use client"

import { useState, useMemo } from "react"
import { Search, X, Check, Plus, ChevronDown } from "lucide-react"

// Lista completa de 29 monedas soportadas
export const ALL_CURRENCIES = [
  // Monedas principales (acceso rápido)
  { code: "PEN", name: "Sol Peruano", symbol: "S/.", flag: "🇵🇪", region: "principal" },
  { code: "USD", name: "Dólar Estadounidense", symbol: "$", flag: "🇺🇸", region: "principal" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", region: "principal" },
  { code: "GBP", name: "Libra Esterlina", symbol: "£", flag: "🇬🇧", region: "principal" },
  
  // Monedas Latinoamericanas
  { code: "MXN", name: "Peso Mexicano", symbol: "$", flag: "🇲🇽", region: "latam" },
  { code: "ARS", name: "Peso Argentino", symbol: "$", flag: "🇦🇷", region: "latam" },
  { code: "CLP", name: "Peso Chileno", symbol: "$", flag: "🇨🇱", region: "latam" },
  { code: "COP", name: "Peso Colombiano", symbol: "$", flag: "🇨🇴", region: "latam" },
  { code: "BRL", name: "Real Brasileño", symbol: "R$", flag: "🇧🇷", region: "latam" },
  { code: "UYU", name: "Peso Uruguayo", symbol: "$U", flag: "🇺🇾", region: "latam" },
  { code: "PYG", name: "Guaraní Paraguayo", symbol: "₲", flag: "🇵🇾", region: "latam" },
  { code: "BOB", name: "Boliviano", symbol: "Bs", flag: "🇧🇴", region: "latam" },
  { code: "VES", name: "Bolívar Venezolano", symbol: "Bs.S", flag: "🇻🇪", region: "latam" },
  { code: "CRC", name: "Colón Costarricense", symbol: "₡", flag: "🇨🇷", region: "latam" },
  { code: "PAB", name: "Balboa Panameño", symbol: "B/.", flag: "🇵🇦", region: "latam" },
  { code: "DOP", name: "Peso Dominicano", symbol: "RD$", flag: "🇩🇴", region: "latam" },
  { code: "GTQ", name: "Quetzal Guatemalteco", symbol: "Q", flag: "🇬🇹", region: "latam" },
  { code: "HNL", name: "Lempira Hondureño", symbol: "L", flag: "🇭🇳", region: "latam" },
  
  // Monedas Internacionales
  { code: "JPY", name: "Yen Japonés", symbol: "¥", flag: "🇯🇵", region: "internacional" },
  { code: "CNY", name: "Yuan Chino", symbol: "¥", flag: "🇨🇳", region: "internacional" },
  { code: "CHF", name: "Franco Suizo", symbol: "CHF", flag: "🇨🇭", region: "internacional" },
  { code: "CAD", name: "Dólar Canadiense", symbol: "C$", flag: "🇨🇦", region: "internacional" },
  { code: "AUD", name: "Dólar Australiano", symbol: "A$", flag: "🇦🇺", region: "internacional" },
  { code: "NZD", name: "Dólar Neozelandés", symbol: "NZ$", flag: "🇳🇿", region: "internacional" },
  { code: "KRW", name: "Won Surcoreano", symbol: "₩", flag: "🇰🇷", region: "internacional" },
  { code: "INR", name: "Rupia India", symbol: "₹", flag: "🇮🇳", region: "internacional" },
  { code: "SGD", name: "Dólar de Singapur", symbol: "S$", flag: "🇸🇬", region: "internacional" },
  { code: "HKD", name: "Dólar de Hong Kong", symbol: "HK$", flag: "🇭🇰", region: "internacional" },
  { code: "SEK", name: "Corona Sueca", symbol: "kr", flag: "🇸🇪", region: "internacional" },
]

export const MAIN_CURRENCIES = ALL_CURRENCIES.filter(c => c.region === "principal")

export type Currency = typeof ALL_CURRENCIES[number]

interface CurrencySelectorProps {
  selectedCurrencies: string[]
  onSelectionChange: (currencies: string[]) => void
  multiSelect?: boolean
  isDarkMode?: boolean
  accentColor?: "emerald" | "blue"
}

export function CurrencySelector({ 
  selectedCurrencies, 
  onSelectionChange, 
  multiSelect = false,
  isDarkMode = false,
  accentColor = "emerald"
}: CurrencySelectorProps) {
  const [showAllCurrencies, setShowAllCurrencies] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const accentClasses = {
    emerald: {
      selected: "border-emerald-500 bg-emerald-50",
      selectedText: "text-emerald-700",
      selectedDark: "border-emerald-500 bg-emerald-900/30",
      selectedTextDark: "text-emerald-400",
      check: "text-emerald-600",
      button: "bg-emerald-500 hover:bg-emerald-600",
      ring: "focus:ring-emerald-500"
    },
    blue: {
      selected: "border-blue-500 bg-blue-50",
      selectedText: "text-blue-700",
      selectedDark: "border-blue-500 bg-blue-900/30",
      selectedTextDark: "text-blue-400",
      check: "text-blue-600",
      button: "bg-blue-500 hover:bg-blue-600",
      ring: "focus:ring-blue-500"
    }
  }

  const colors = accentClasses[accentColor]

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return ALL_CURRENCIES
    const query = searchQuery.toLowerCase()
    return ALL_CURRENCIES.filter(
      c => c.code.toLowerCase().includes(query) || 
           c.name.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleCurrencyToggle = (code: string) => {
    if (multiSelect) {
      if (selectedCurrencies.includes(code)) {
        onSelectionChange(selectedCurrencies.filter(c => c !== code))
      } else {
        onSelectionChange([...selectedCurrencies, code])
      }
    } else {
      onSelectionChange([code])
    }
  }

  const getCurrencyByCode = (code: string) => ALL_CURRENCIES.find(c => c.code === code)

  return (
    <div className="space-y-3">
      {/* Quick Access - Monedas principales */}
      <div className="flex flex-wrap gap-2">
        {MAIN_CURRENCIES.map((currency) => {
          const isSelected = selectedCurrencies.includes(currency.code)
          return (
            <button
              key={currency.code}
              onClick={() => handleCurrencyToggle(currency.code)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all ${
                isSelected
                  ? isDarkMode ? colors.selectedDark : colors.selected
                  : isDarkMode 
                    ? "border-gray-600 bg-gray-700 hover:border-gray-500" 
                    : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {multiSelect && isSelected && (
                <Check className={`w-4 h-4 ${colors.check}`} />
              )}
              <span className="text-base">{currency.flag}</span>
              <span className={`font-semibold text-sm ${
                isSelected 
                  ? isDarkMode ? colors.selectedTextDark : colors.selectedText
                  : isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                {currency.code}
              </span>
            </button>
          )
        })}
        
        {/* Botón Ver todas */}
        <button
          onClick={() => setShowAllCurrencies(true)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 border-dashed transition-all ${
            isDarkMode 
              ? "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300" 
              : "border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Más</span>
        </button>
      </div>

      {/* Monedas seleccionadas adicionales (no principales) */}
      {selectedCurrencies.some(code => !MAIN_CURRENCIES.find(c => c.code === code)) && (
        <div className="flex flex-wrap gap-2">
          {selectedCurrencies
            .filter(code => !MAIN_CURRENCIES.find(c => c.code === code))
            .map(code => {
              const currency = getCurrencyByCode(code)
              if (!currency) return null
              return (
                <div
                  key={code}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 ${
                    isDarkMode ? colors.selectedDark : colors.selected
                  }`}
                >
                  {multiSelect && (
                    <Check className={`w-4 h-4 ${colors.check}`} />
                  )}
                  <span className="text-base">{currency.flag}</span>
                  <span className={`font-semibold text-sm ${
                    isDarkMode ? colors.selectedTextDark : colors.selectedText
                  }`}>
                    {currency.code}
                  </span>
                  <button
                    onClick={() => handleCurrencyToggle(code)}
                    className={`ml-1 p-0.5 rounded-full ${
                      isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                    }`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )
            })}
        </div>
      )}

      {/* Modal de todas las monedas */}
      {showAllCurrencies && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowAllCurrencies(false)}
          />
          <div className={`fixed inset-x-4 top-1/2 -translate-y-1/2 max-h-[70vh] rounded-2xl shadow-2xl z-50 flex flex-col ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
            {/* Header del modal */}
            <div className={`flex items-center justify-between p-4 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-100"
            }`}>
              <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Seleccionar Moneda{multiSelect ? "s" : ""}
              </h3>
              <button 
                onClick={() => setShowAllCurrencies(false)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <X className={`w-4 h-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
              </button>
            </div>

            {/* Buscador */}
            <div className="p-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar moneda..."
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none ${colors.ring} focus:border-transparent ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400" 
                      : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                />
              </div>
            </div>

            {/* Lista de monedas */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {/* Principales */}
              <div className="mb-4">
                <p className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  PRINCIPALES
                </p>
                <div className="space-y-1">
                  {filteredCurrencies.filter(c => c.region === "principal").map((currency) => (
                    <CurrencyItem 
                      key={currency.code}
                      currency={currency}
                      isSelected={selectedCurrencies.includes(currency.code)}
                      onToggle={() => handleCurrencyToggle(currency.code)}
                      isDarkMode={isDarkMode}
                      multiSelect={multiSelect}
                      colors={colors}
                    />
                  ))}
                </div>
              </div>

              {/* Latinoamericanas */}
              {filteredCurrencies.some(c => c.region === "latam") && (
                <div className="mb-4">
                  <p className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    LATINOAMÉRICA
                  </p>
                  <div className="space-y-1">
                    {filteredCurrencies.filter(c => c.region === "latam").map((currency) => (
                      <CurrencyItem 
                        key={currency.code}
                        currency={currency}
                        isSelected={selectedCurrencies.includes(currency.code)}
                        onToggle={() => handleCurrencyToggle(currency.code)}
                        isDarkMode={isDarkMode}
                        multiSelect={multiSelect}
                        colors={colors}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Internacionales */}
              {filteredCurrencies.some(c => c.region === "internacional") && (
                <div>
                  <p className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    INTERNACIONALES
                  </p>
                  <div className="space-y-1">
                    {filteredCurrencies.filter(c => c.region === "internacional").map((currency) => (
                      <CurrencyItem 
                        key={currency.code}
                        currency={currency}
                        isSelected={selectedCurrencies.includes(currency.code)}
                        onToggle={() => handleCurrencyToggle(currency.code)}
                        isDarkMode={isDarkMode}
                        multiSelect={multiSelect}
                        colors={colors}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredCurrencies.length === 0 && (
                <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  No se encontraron monedas
                </div>
              )}
            </div>

            {/* Footer con confirmación */}
            <div className={`p-4 border-t ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
              <button
                onClick={() => setShowAllCurrencies(false)}
                className={`w-full py-3 rounded-xl font-semibold text-white ${colors.button}`}
              >
                Confirmar ({selectedCurrencies.length} seleccionada{selectedCurrencies.length !== 1 ? "s" : ""})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

interface CurrencyItemProps {
  currency: Currency
  isSelected: boolean
  onToggle: () => void
  isDarkMode: boolean
  multiSelect: boolean
  colors: {
    selected: string
    selectedText: string
    selectedDark: string
    selectedTextDark: string
    check: string
  }
}

function CurrencyItem({ currency, isSelected, onToggle, isDarkMode, multiSelect, colors }: CurrencyItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
        isSelected
          ? isDarkMode ? colors.selectedDark : colors.selected
          : isDarkMode 
            ? "hover:bg-gray-700" 
            : "hover:bg-gray-50"
      }`}
    >
      <span className="text-xl">{currency.flag}</span>
      <div className="flex-1 text-left">
        <p className={`font-semibold text-sm ${
          isSelected 
            ? isDarkMode ? colors.selectedTextDark : colors.selectedText
            : isDarkMode ? "text-white" : "text-gray-900"
        }`}>
          {currency.code}
        </p>
        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          {currency.name}
        </p>
      </div>
      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
        {currency.symbol}
      </span>
      {multiSelect && (
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          isSelected
            ? `${isDarkMode ? "border-emerald-500 bg-emerald-500" : "border-emerald-500 bg-emerald-500"}`
            : isDarkMode ? "border-gray-500" : "border-gray-300"
        }`}>
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
      )}
      {!multiSelect && isSelected && (
        <Check className={`w-5 h-5 ${colors.check}`} />
      )}
    </button>
  )
}
