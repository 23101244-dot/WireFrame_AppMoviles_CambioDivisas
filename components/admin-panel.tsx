"use client"

import { useState } from "react"
import { 
  Shield, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  UserCheck,
  UserX,
  LogOut,
  Search,
  MoreVertical
} from "lucide-react"

interface AdminPanelProps {
  isDarkMode: boolean
  onExitAdmin: () => void
}

interface UserData {
  id: number
  name: string
  email: string
  status: "activo" | "restringido"
  volume: string
  transactions: number
  joinDate: string
}

const initialUsers: UserData[] = [
  { id: 1, name: "Maria Garcia", email: "maria@email.com", status: "activo", volume: "$12,450", transactions: 45, joinDate: "15 Ene 2024" },
  { id: 2, name: "Juan Rodriguez", email: "juan@email.com", status: "activo", volume: "$8,320", transactions: 32, joinDate: "22 Feb 2024" },
  { id: 3, name: "Ana Martinez", email: "ana@email.com", status: "restringido", volume: "$2,100", transactions: 8, joinDate: "10 Mar 2024" },
  { id: 4, name: "Carlos Lopez", email: "carlos@email.com", status: "activo", volume: "$15,780", transactions: 67, joinDate: "05 Dic 2023" },
  { id: 5, name: "Sofia Hernandez", email: "sofia@email.com", status: "activo", volume: "$5,600", transactions: 21, joinDate: "18 Abr 2024" },
  { id: 6, name: "Pedro Sanchez", email: "pedro@email.com", status: "restringido", volume: "$890", transactions: 3, joinDate: "01 May 2024" },
]

export function AdminPanel({ isDarkMode, onExitAdmin }: AdminPanelProps) {
  const [users, setUsers] = useState<UserData[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "activo" ? "restringido" : "activo"
        }
      }
      return user
    }))
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeUsers = users.filter(u => u.status === "activo").length
  const restrictedUsers = users.filter(u => u.status === "restringido").length

  return (
    <div className={`flex-1 flex flex-col ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Header Admin */}
      <div className={`px-4 py-4 ${isDarkMode ? "bg-gradient-to-r from-purple-900 to-indigo-900" : "bg-gradient-to-r from-purple-600 to-indigo-600"}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-white" />
            <div>
              <h1 className="text-lg font-bold text-white">Panel Administrativo</h1>
              <p className="text-xs text-purple-200">Gestion del sistema</p>
            </div>
          </div>
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Metricas Clave - US-018 */}
        <div className="px-4 py-4">
          <h2 className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Metricas Clave
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Usuarios Registrados */}
            <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-blue-900/50" : "bg-blue-100"}`}>
                  <Users className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>1,247</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Usuarios registrados</p>
              <p className="text-xs text-emerald-500 mt-1">+12% este mes</p>
            </div>

            {/* Volumen Total */}
            <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-emerald-900/50" : "bg-emerald-100"}`}>
                  <DollarSign className={`w-4 h-4 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>$2.4M</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Volumen total</p>
              <p className="text-xs text-emerald-500 mt-1">+8% este mes</p>
            </div>

            {/* Transacciones Hoy */}
            <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-purple-900/50" : "bg-purple-100"}`}>
                  <Activity className={`w-4 h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>342</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Transacciones hoy</p>
              <p className="text-xs text-emerald-500 mt-1">+5% vs ayer</p>
            </div>

            {/* Tasa de Conversion */}
            <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-orange-900/50" : "bg-orange-100"}`}>
                  <TrendingUp className={`w-4 h-4 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
                </div>
              </div>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>3.72</p>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>USD/PEN actual</p>
              <p className="text-xs text-red-500 mt-1">-0.02% hoy</p>
            </div>
          </div>
        </div>

        {/* Estado de Usuarios */}
        <div className="px-4 mb-4">
          <div className="flex gap-3">
            <div className={`flex-1 p-3 rounded-xl ${isDarkMode ? "bg-emerald-900/30 border border-emerald-800" : "bg-emerald-50 border border-emerald-200"}`}>
              <div className="flex items-center gap-2">
                <UserCheck className={`w-4 h-4 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                <span className={`text-sm font-medium ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                  {activeUsers} Activos
                </span>
              </div>
            </div>
            <div className={`flex-1 p-3 rounded-xl ${isDarkMode ? "bg-red-900/30 border border-red-800" : "bg-red-50 border border-red-200"}`}>
              <div className="flex items-center gap-2">
                <UserX className={`w-4 h-4 ${isDarkMode ? "text-red-400" : "text-red-600"}`} />
                <span className={`text-sm font-medium ${isDarkMode ? "text-red-400" : "text-red-700"}`}>
                  {restrictedUsers} Restringidos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Usuarios - US-019 */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className={`text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Gestion de Usuarios
            </h2>
          </div>

          {/* Buscador */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <Search className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 bg-transparent text-sm outline-none ${isDarkMode ? "text-white placeholder:text-gray-500" : "text-gray-900 placeholder:text-gray-400"}`}
            />
          </div>

          {/* Lista */}
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                      user.status === "activo" ? "bg-emerald-500" : "bg-red-500"
                    }`}>
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {user.name}
                      </p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button className={`p-1 rounded ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                    <MoreVertical className={`w-4 h-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                      Vol: <span className={isDarkMode ? "text-white" : "text-gray-900"}>{user.volume}</span>
                    </span>
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                      Txs: <span className={isDarkMode ? "text-white" : "text-gray-900"}>{user.transactions}</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      user.status === "activo"
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                    }`}
                  >
                    {user.status === "activo" ? "Restringir" : "Habilitar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
