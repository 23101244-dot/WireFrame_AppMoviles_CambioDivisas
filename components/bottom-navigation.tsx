"use client"

import { Home, Wallet, Coins, ArrowLeftRight, History } from "lucide-react"

interface NavItem {
  icon: React.ElementType
  label: string
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: Home, label: "Inicio", active: true },
  { icon: Wallet, label: "Billetera" },
  { icon: Coins, label: "Monedas" },
  { icon: ArrowLeftRight, label: "Transacciones" },
  { icon: History, label: "Historial" },
]

export function BottomNavigation() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 pb-6">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex flex-col items-center gap-0.5 min-w-[56px] ${
              item.active ? "text-emerald-600" : "text-gray-400"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
