"use client"

import { ArrowDownToLine, Send, RefreshCw, QrCode } from "lucide-react"

interface QuickAction {
  icon: React.ElementType
  label: string
  color: string
  bgColor: string
}

const actions: QuickAction[] = [
  { icon: ArrowDownToLine, label: "Depositar", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { icon: Send, label: "Enviar", color: "text-blue-600", bgColor: "bg-blue-50" },
  { icon: RefreshCw, label: "Cambiar", color: "text-orange-600", bgColor: "bg-orange-50" },
  { icon: QrCode, label: "QR", color: "text-purple-600", bgColor: "bg-purple-50" },
]

export function QuickActions() {
  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-gray-50 transition-colors"
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
