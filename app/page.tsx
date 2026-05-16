"use client"

import { useState } from "react"
import { MobileFrame } from "@/components/mobile-frame"
import { BottomNavigation, type TabType } from "@/components/bottom-navigation"
import { WalletCarousel } from "@/components/wallet-carousel"
import { QuickActions } from "@/components/quick-actions"
import { MarketChart } from "@/components/market-chart"

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm font-medium">[Pantalla en desarrollo]</p>
        <p className="text-gray-400 text-xs mt-1">{title}</p>
      </div>
    </div>
  )
}

function DashboardContent() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      {/* Header con saludo */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 pt-2 pb-6">
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
      <div className="h-4 bg-gradient-to-r from-emerald-600 to-emerald-500 relative">
        <div className="absolute inset-0 bg-gray-50 rounded-t-3xl" />
      </div>

      {/* Carrusel de Billetera */}
      <WalletCarousel />

      {/* Botones de Acción Rápida */}
      <QuickActions />

      {/* Gráfico del Mercado */}
      <MarketChart />
    </div>
  )
}

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState<TabType>("inicio")

  const renderContent = () => {
    switch (currentTab) {
      case "inicio":
        return <DashboardContent />
      case "billetera":
        return <PlaceholderScreen title="Gestiona tus billeteras y saldos" />
      case "monedas":
        return <PlaceholderScreen title="Lista de criptomonedas y divisas" />
      case "transacciones":
        return <PlaceholderScreen title="Realiza cambios y transferencias" />
      case "historial":
        return <PlaceholderScreen title="Historial de operaciones" />
      default:
        return <DashboardContent />
    }
  }

  return (
    <MobileFrame>
      {renderContent()}
      <BottomNavigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </MobileFrame>
  )
}
