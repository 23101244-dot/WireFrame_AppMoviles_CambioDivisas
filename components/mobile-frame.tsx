"use client"

import type { ReactNode } from "react"

interface MobileFrameProps {
  children: ReactNode
}

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Marco físico del celular */}
      <div className="relative max-w-[400px] w-full h-[844px] bg-white rounded-[40px] shadow-2xl border border-gray-200 overflow-hidden">
        {/* Notch del iPhone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-50" />
        
        {/* Barra de estado */}
        <div className="h-[44px] bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-between px-6 pt-2">
          <span className="text-white text-xs font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3C7.46 3 3.34 4.78 0.29 7.67C0.11 7.85 0 8.1 0 8.38C0 8.66 0.11 8.91 0.29 9.09L1.77 10.57C1.95 10.75 2.2 10.86 2.48 10.86C2.76 10.86 3.01 10.75 3.19 10.57C5.5 8.28 8.59 6.93 12 6.93C15.41 6.93 18.5 8.28 20.81 10.57C20.99 10.75 21.24 10.86 21.52 10.86C21.8 10.86 22.05 10.75 22.23 10.57L23.71 9.09C23.89 8.91 24 8.66 24 8.38C24 8.1 23.89 7.85 23.71 7.67C20.66 4.78 16.54 3 12 3Z"/>
            </svg>
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2 22h20V2z"/>
            </svg>
            <div className="flex items-center">
              <div className="w-6 h-3 border border-white rounded-sm relative">
                <div className="absolute inset-[2px] bg-white rounded-[1px]" style={{ width: '80%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="h-[calc(100%-44px)] flex flex-col relative">
          {children}
        </div>
      </div>
    </div>
  )
}
