"use client"

import { Home, Wallet, Coins, ArrowLeftRight, History } from "lucide-react"

export type TabType = "inicio" | "billetera" | "monedas" | "transacciones" | "historial"

interface NavItem {
  icon: React.ElementType
  label: string
  id: TabType
}

const navItems: NavItem[] = [
  { icon: Home, label: "Inicio", id: "inicio" },
  { icon: Wallet, label: "Billetera", id: "billetera" },
  { icon: Coins, label: "Monedas", id: "monedas" },
  { icon: ArrowLeftRight, label: "Transacciones", id: "transacciones" },
  { icon: History, label: "Historial", id: "historial" },
]

interface BottomNavigationProps {
  currentTab: TabType
  onTabChange: (tab: TabType) => void
}

export function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 pb-6">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-0.5 min-w-[56px] transition-colors ${
              currentTab === item.id ? "text-emerald-600" : "text-gray-400"
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
