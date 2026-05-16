"use client"

import { useRef } from "react"

interface WalletCard {
  currency: string
  symbol: string
  balance: number
  flag: string
  color: string
}

const wallets: WalletCard[] = [
  { currency: "PEN", symbol: "S/.", balance: 2450.75, flag: "🇵🇪", color: "from-red-500 to-red-600" },
  { currency: "USD", symbol: "$", balance: 658.32, flag: "🇺🇸", color: "from-emerald-500 to-emerald-600" },
  { currency: "EUR", symbol: "€", balance: 320.50, flag: "🇪🇺", color: "from-blue-500 to-blue-600" },
  { currency: "GBP", symbol: "£", balance: 185.20, flag: "🇬🇧", color: "from-indigo-500 to-indigo-600" },
]

export function WalletCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-800">Mi Billetera</h2>
        <button className="text-xs text-emerald-600 font-medium">Ver todo</button>
      </div>
      
      {/* Carrusel horizontal con snap */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {wallets.map((wallet) => (
          <div
            key={wallet.currency}
            className={`flex-shrink-0 w-[85%] snap-center bg-gradient-to-br ${wallet.color} rounded-2xl p-4 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{wallet.flag}</span>
                <span className="text-sm font-medium opacity-90">{wallet.currency}</span>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            
            <div className="mb-1">
              <p className="text-xs opacity-75">Saldo disponible</p>
              <p className="text-2xl font-bold">
                {wallet.symbol} {wallet.balance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </p>
            </div>
            
            <div className="flex items-center gap-1 mt-3">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <p className="text-[10px] opacity-75">Cuenta principal</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Indicadores de página */}
      <div className="flex justify-center gap-1.5 mt-3">
        {wallets.map((wallet, index) => (
          <div
            key={wallet.currency}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === 0 ? "bg-emerald-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
