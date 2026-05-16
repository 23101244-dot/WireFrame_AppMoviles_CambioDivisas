import { MobileFrame } from "@/components/mobile-frame"
import { BottomNavigation } from "@/components/bottom-navigation"
import { WalletCarousel } from "@/components/wallet-carousel"
import { QuickActions } from "@/components/quick-actions"
import { MarketChart } from "@/components/market-chart"

export default function Dashboard() {
  return (
    <MobileFrame>
      {/* Contenido scrolleable */}
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

      {/* Navegación inferior fija */}
      <BottomNavigation />
    </MobileFrame>
  )
}
