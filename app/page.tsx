"use client"

import { useState } from "react"
import { MobileFrame } from "@/components/mobile-frame"
import { BottomNavigation, type TabType } from "@/components/bottom-navigation"
import { WalletCarousel } from "@/components/wallet-carousel"
import { QuickActions } from "@/components/quick-actions"
import { MarketChart } from "@/components/market-chart"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawModal } from "@/components/withdraw-modal"
import { CurrenciesScreen } from "@/components/currencies-screen"
import { TransactionsScreen } from "@/components/transactions-screen"
import { HistoryScreen } from "@/components/history-screen"
import { SettingsScreen } from "@/components/settings-screen"
import { AdminPanel } from "@/components/admin-panel"

function PlaceholderScreen({ title, isDarkMode }: { title: string; isDarkMode: boolean }) {
  return (
    <div className={`flex-1 flex items-center justify-center ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="text-center p-6">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-200"
        }`}>
          <svg className={`w-8 h-8 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>[Pantalla en desarrollo]</p>
        <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>{title}</p>
      </div>
    </div>
  )
}

interface DashboardContentProps {
  onDeposit: () => void
  onSend: () => void
  onExchange: () => void
  isDarkMode: boolean
}

function DashboardContent({ onDeposit, onSend, onExchange, isDarkMode }: DashboardContentProps) {
  return (
    <div className={`flex-1 overflow-y-auto pb-20 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header con saludo */}
      <div className={`px-4 pt-2 pb-6 ${isDarkMode ? "bg-gradient-to-r from-emerald-800 to-emerald-700" : "bg-gradient-to-r from-emerald-600 to-emerald-500"}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-xs">Bienvenido de vuelta</p>
            <h1 className="text-white text-lg font-bold">Carlos Mendoza</h1>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Curva decorativa */}
      <div className={`h-4 ${isDarkMode ? "bg-gradient-to-r from-emerald-800 to-emerald-700" : "bg-gradient-to-r from-emerald-600 to-emerald-500"} relative`}>
        <div className={`absolute inset-0 rounded-t-3xl ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`} />
      </div>

      {/* Carrusel de Billetera */}
      <WalletCarousel isDarkMode={isDarkMode} />

      {/* Botones de Accion Rapida */}
      <QuickActions onDeposit={onDeposit} onSend={onSend} onExchange={onExchange} isDarkMode={isDarkMode} />

      {/* Grafico del Mercado */}
      <MarketChart isDarkMode={isDarkMode} />
    </div>
  )
}

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState<TabType>("inicio")
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)

  const handleDeposit = () => {
    setIsDepositOpen(true)
  }

  const handleSend = () => {
    setIsWithdrawOpen(true)
  }

  const handleExchange = () => {
    setCurrentTab("monedas")
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleSwitchToAdmin = () => {
    setIsAdminMode(true)
  }

  const handleExitAdmin = () => {
    setIsAdminMode(false)
    setCurrentTab("ajustes")
  }

  const renderContent = () => {
    // Si esta en modo admin, mostrar el panel administrativo
    if (isAdminMode) {
      return <AdminPanel isDarkMode={isDarkMode} onExitAdmin={handleExitAdmin} />
    }

    switch (currentTab) {
      case "inicio":
        return <DashboardContent onDeposit={handleDeposit} onSend={handleSend} onExchange={handleExchange} isDarkMode={isDarkMode} />
      case "billetera":
        return <HistoryScreen isDarkMode={isDarkMode} />
      case "monedas":
        return <CurrenciesScreen isDarkMode={isDarkMode} />
      case "transacciones":
        return <TransactionsScreen isDarkMode={isDarkMode} />
      case "ajustes":
        return (
          <SettingsScreen 
            isDarkMode={isDarkMode} 
            onToggleDarkMode={handleToggleDarkMode}
            onSwitchToAdmin={handleSwitchToAdmin}
          />
        )
      default:
        return <DashboardContent onDeposit={handleDeposit} onSend={handleSend} onExchange={handleExchange} isDarkMode={isDarkMode} />
    }
  }

  return (
    <MobileFrame isDarkMode={isDarkMode}>
      {renderContent()}
      {!isAdminMode && (
        <BottomNavigation currentTab={currentTab} onTabChange={setCurrentTab} isDarkMode={isDarkMode} />
      )}
      <DepositModal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} isDarkMode={isDarkMode} />
      <WithdrawModal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} isDarkMode={isDarkMode} />
    </MobileFrame>
  )
}
