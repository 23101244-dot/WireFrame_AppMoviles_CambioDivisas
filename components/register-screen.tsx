"use client"

import { useState } from "react"
import { Mail, Lock, User, Eye, EyeOff, ChevronLeft } from "lucide-react"

interface RegisterScreenProps {
  onRegisterSuccess: () => void
  onSwitchToLogin: () => void
}

export function RegisterScreen({ onRegisterSuccess, onSwitchToLogin }: RegisterScreenProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Por favor completa todos los campos")
      return
    }

    // Validar longitud de usuario
    if (username.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres")
      return
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un email válido")
      return
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    // Si todo es válido, permitir acceso
    onRegisterSuccess()
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-emerald-600 to-emerald-500 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400 rounded-full -mr-20 -mt-20 opacity-20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-300 rounded-full -ml-16 -mb-16 opacity-20" />

      {/* Contenido */}
      <div className="flex-1 flex flex-col justify-between relative z-10 p-6 overflow-y-auto">
        {/* Header con botón atrás */}
        <div>
          <button
            onClick={onSwitchToLogin}
            className="flex items-center gap-2 text-white/80 hover:text-white transition mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Volver</span>
          </button>

          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-white text-3xl font-bold text-center mb-2">CambioPeP</h1>
          <p className="text-emerald-50 text-center text-sm">Únete a nuestra comunidad</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Crear Cuenta</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="tu_usuario"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl mt-6"
            >
              Registrarse
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div />
      </div>
    </div>
  )
}
