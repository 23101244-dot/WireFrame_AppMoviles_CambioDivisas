"use client"

import { ArrowDownToLine, Send, RefreshCw, QrCode } from "lucide-react"

interface QuickActionsProps {
  onDeposit: () => void
  onExchange: () => void
}

interface QuickAction {
  icon: React.ElementType
  label: string
  color: string
  bgColor: string
  action: "deposit" | "send" | "exchange" | "qr"
}

const actions: QuickAction[] = [
  { icon: ArrowDownToLine, label: "Depositar", color: "text-emerald-600", bgColor: "bg-emerald-50", action: "deposit" },
  { icon: Send, label: "Enviar", color: "text-blue-600", bgColor: "bg-blue-50", action: "send" },
  { icon: RefreshCw, label: "Cambiar", color: "text-orange-600", bgColor: "bg-orange-50", action: "exchange" },
  { icon: QrCode, label: "QR", color: "text-purple-600", bgColor: "bg-purple-50", action: "qr" },
]

export function QuickActions({ onDeposit, onExchange }: QuickActionsProps) {
  const handleClick = (actionType: QuickAction["action"]) => {
    switch (actionType) {
      case "deposit":
        onDeposit()
        break
      case "exchange":
        onExchange()
        break
      case "send":
        // TODO: Implementar envío
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
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
          >
            <div className={`w-11 h-11 ${action.bgColor} rounded-full flex items-center justify-center`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="text-[10px] font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
