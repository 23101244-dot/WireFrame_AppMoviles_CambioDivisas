"use client"

import { Moon, Sun, Shield, User, Bell, Lock, HelpCircle, LogOut } from "lucide-react"

interface SettingsScreenProps {
  isDarkMode: boolean
  onToggleDarkMode: () => void
  onSwitchToAdmin: () => void
}

export function SettingsScreen({ isDarkMode, onToggleDarkMode, onSwitchToAdmin }: SettingsScreenProps) {
  return (
    <div className={`flex-1 overflow-y-auto pb-20 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className={`px-4 py-6 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Ajustes</h1>
        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Personaliza tu experiencia</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Apartado Visual - US-003 */}
        <div className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h2 className={`text-sm font-semibold mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Apariencia
          </h2>
          
          {/* Toggle Modo Oscuro */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className={`w-5 h-5 ${isDarkMode ? "text-yellow-400" : "text-gray-600"}`} />
              ) : (
                <Sun className={`w-5 h-5 ${isDarkMode ? "text-yellow-400" : "text-yellow-500"}`} />
              )}
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>Modo Oscuro</p>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {isDarkMode ? "Activado" : "Desactivado"}
                </p>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={onToggleDarkMode}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                isDarkMode ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isDarkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Opciones de Cuenta */}
        <div className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h2 className={`text-sm font-semibold mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Cuenta
          </h2>
          
          <div className="space-y-3">
            <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
              <User className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`flex-1 text-left ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Editar Perfil
              </span>
              <svg className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
              <Bell className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`flex-1 text-left ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Notificaciones
              </span>
              <svg className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
              <Lock className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`flex-1 text-left ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Seguridad
              </span>
              <svg className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cambio de Rol - US-018, US-019 */}
        <div className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h2 className={`text-sm font-semibold mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Administracion
          </h2>
          
          <button
            onClick={onSwitchToAdmin}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg"
          >
            <Shield className="w-6 h-6" />
            <div className="flex-1 text-left">
              <p className="font-semibold">Cambiar a Perfil Administrador</p>
              <p className="text-xs text-purple-200">Acceder al panel de control</p>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Soporte */}
        <div className={`rounded-xl p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <h2 className={`text-sm font-semibold mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Soporte
          </h2>
          
          <div className="space-y-3">
            <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
              <HelpCircle className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              <span className={`flex-1 text-left ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Centro de Ayuda
              </span>
              <svg className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className={`w-full flex items-center gap-3 p-3 rounded-lg text-red-500 transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-red-50"
            }`}>
              <LogOut className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">Cerrar Sesion</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center pt-4">
          <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
            ExchangeApp v1.0.0
          </p>
        </div>
      </div>
    </div>
  )
}
