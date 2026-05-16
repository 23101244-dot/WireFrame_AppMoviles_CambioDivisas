"use client"

import { ArrowDownToLine, Send, RefreshCw, QrCode } from "lucide-react"

interface QuickActionsProps {
  onDeposit: () => void
  onSend: () => void
  onExchange: () => void
  isDarkMode?: boolean
}

interface QuickAction {
  icon: React.ElementType
  label: string
  color: string
  bgColor: string
  darkBgColor: string
  action: "deposit" | "send" | "exchange" | "qr"
}

const actions: QuickAction[] = [
  { icon: ArrowDownToLine, label: "Depositar", color: "text-emerald-600", bgColor: "bg-emerald-50", darkBgColor: "bg-emerald-900/40", action: "deposit" },
  { icon: Send, label: "Enviar", color: "text-blue-600", bgColor: "bg-blue-50", darkBgColor: "bg-blue-900/40", action: "send" },
  { icon: RefreshCw, label: "Cambiar", color: "text-orange-600", bgColor: "bg-orange-50", darkBgColor: "bg-orange-900/40", action: "exchange" },
  { icon: QrCode, label: "QR", color: "text-purple-600", bgColor: "bg-purple-50", darkBgColor: "bg-purple-900/40", action: "qr" },
]

export function QuickActions({ onDeposit, onSend, onExchange, isDarkMode = false }: QuickActionsProps) {
  const handleClick = (actionType: QuickAction["action"]) => {
    switch (actionType) {
      case "deposit":
        onDeposit()
        break
      case "send":
        onSend()
        break
      case "exchange":
        onExchange()
        break
      case "qr":
        // TODO: Implementar QR
        break
    }
  }

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleClick(action.action)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl active:scale-95 transition-all ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
            }`}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
              isDarkMode ? action.darkBgColor : action.bgColor
            }`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className={`text-[10px] font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
