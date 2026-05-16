"use client"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"

interface AdminValidationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isDarkMode?: boolean
}

export function AdminValidationModal({ isOpen, onClose, onConfirm, isDarkMode = false }: AdminValidationModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validar campos vacios
    if (!email.trim() || !password.trim()) {
      setError("Acceso no autorizado")
      return
    }

    // Validar credenciales (simulación)
    setLoading(true)
    setTimeout(() => {
      if (email === "admin@cambiop2p.com" && password === "admin123") {
        setLoading(false)
        setEmail("")
        setPassword("")
        onConfirm()
        onClose()
      } else {
        setLoading(false)
        setError("Acceso no autorizado")
      }
    }, 500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className={`w-full max-w-sm rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-200 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Validación de Acceso
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <X className={`w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
          </button>
        </div>

        {/* Description */}
        <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          Ingresa tus credenciales de administrador para acceder al panel de control.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message */}
          {error && (
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${
              isDarkMode
                ? "bg-red-900/30 border-red-700 text-red-400"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Correo o Usuario
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cambiop2p.com"
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors disabled:opacity-50 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors disabled:opacity-50 ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Validando...
                </>
              ) : (
                "Confirmar"
              )}
            </button>
          </div>
        </form>

        {/* Info Note */}
        <div className={`mt-4 p-3 rounded-lg text-xs ${
          isDarkMode
            ? "bg-blue-900/20 text-blue-400"
            : "bg-blue-50 text-blue-700"
        }`}>
          Credenciales de prueba: <strong>admin@cambiop2p.com</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  )
}
