import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CalendarDays, 
  FileBarChart, 
  FileText, 
  Building2, 
  MapPin, 
  Settings, 
  Search, 
  Plus, 
  Bell, 
  ChevronDown, 
  Utensils, 
  UserCheck, 
  UserX, 
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';
import { ALL_EMPLOYEES, WEEK_CHART_DATA } from '../../data/mockData';
import { EmployeeDetailModal } from './EmployeeDetailModal';
import { ReportsView } from './ReportsView';
import { Employee } from '../../types';

interface AdminDashboardProps {
  onSwitchToMobile: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSwitchToMobile }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployeeForDetail, setSelectedEmployeeForDetail] = useState<Employee | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Responsive sidebar drawer for mobile and desktop toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredEmployees = ALL_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Employee['status']) => {
    switch (status) {
      case 'en_trabajo':
      case 'presente':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>En trabajo</span>
          </span>
        );
      case 'salio':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 whitespace-nowrap">
            <span>Salió</span>
          </span>
        );
      case 'en_comida':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>En comida</span>
          </span>
        );
      case 'ausente':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 whitespace-nowrap">
            <span>Ausente</span>
          </span>
        );
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'empleados', label: 'Empleados', icon: Users },
    { id: 'asistencias', label: 'Asistencias', icon: Clock },
    { id: 'horarios', label: 'Horarios', icon: CalendarDays },
    { id: 'reportes', label: 'Reportes', icon: FileBarChart },
    { id: 'solicitudes', label: 'Solicitudes', icon: FileText },
    { id: 'departamentos', label: 'Departamentos', icon: Building2 },
    { id: 'sucursales', label: 'Sucursales', icon: MapPin },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f4f7fb] text-slate-800 overflow-hidden font-sans relative">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation (Overlay drawer on mobile, static column on desktop) */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0d213f] text-slate-300 flex flex-col shrink-0 select-none shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-blue-900/40">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-[#1e60d5] flex items-center justify-center text-white mr-3 shadow-md shadow-blue-500/20">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Control de Asistencia
            </span>
          </div>

          {/* Close button inside sidebar on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            aria-label="Cerrar barra lateral"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1e60d5] text-white shadow-sm'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile App Quick Switcher in Sidebar */}
        <div className="p-4 border-t border-blue-900/40 bg-[#09182d]">
          <button
            onClick={onSwitchToMobile}
            className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Ver App Móvil</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-blue-300" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 gap-3">
          <div className="flex items-center space-x-3 flex-1 max-w-md">
            {/* Hamburger Button to Open/Close Sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label="Abrir o cerrar barra de navegación"
              title="Alternar barra de navegación"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>

            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar empleado..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-blue-500 transition-all text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => {
                setSelectedEmployeeForDetail(ALL_EMPLOYEES[0]);
                setIsDetailModalOpen(true);
              }}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors hidden sm:block"
              title="Añadir rápido"
            >
              <Plus className="w-5 h-5" />
            </button>

            <button 
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors relative"
              title="Notificaciones"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            <div className="h-7 w-[1px] bg-slate-200 hidden sm:block"></div>

            {/* Admin User */}
            <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer p-1 rounded-xl hover:bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                AD
              </div>
              <span className="text-xs font-bold text-slate-800 hidden md:inline">Administrador</span>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {activeMenu === 'dashboard' ? 'Dashboard' : activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
              </h2>
              <p className="text-xs text-slate-500">
                Resumen operativo y control biométrico en tiempo real
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedEmployeeForDetail(ALL_EMPLOYEES[0]);
                  setIsDetailModalOpen(true);
                }}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs flex items-center space-x-1.5 transition-all"
              >
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Ver Carlos Martínez</span>
              </button>
            </div>
          </div>

          {/* 4 KPI Cards Matching Screenshot */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 48 Empleados */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900">48</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Empleados</div>
              </div>
            </div>

            {/* 42 Presentes */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-600">42</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Presentes</div>
              </div>
            </div>

            {/* 3 Ausentes */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <UserX className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-rose-600">3</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Ausentes</div>
              </div>
            </div>

            {/* 2 En comida */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200 flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-amber-600">2</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">En comida</div>
              </div>
            </div>
          </div>

          {/* Charts Row Matching Screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Chart: Asistencias de la semana (Bar chart) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-slate-200 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h3 className="text-sm font-bold text-slate-800">Asistencias de la semana</h3>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#1e60d5]"></span>
                    <span className="text-slate-600 font-medium">Entradas</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#16a34a]"></span>
                    <span className="text-slate-600 font-medium">Salidas</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart Graphic matching mockup */}
              <div className="h-56 flex items-end justify-between pt-6 px-2 overflow-x-auto min-w-[320px]">
                {WEEK_CHART_DATA.map((item, idx) => {
                  const maxVal = 60;
                  const entradaHeight = (item.entradas / maxVal) * 100;
                  const salidaHeight = (item.salidas / maxVal) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center group px-1">
                      <div className="w-full flex items-end justify-center space-x-1.5 h-44 border-b border-slate-100">
                        {/* Entrada Bar */}
                        <div
                          style={{ height: `${entradaHeight}%` }}
                          className="w-3 sm:w-3.5 bg-[#1e60d5] rounded-t-xs hover:bg-blue-700 transition-all relative"
                          title={`Entradas: ${item.entradas}`}
                        />
                        {/* Salida Bar */}
                        <div
                          style={{ height: `${salidaHeight}%` }}
                          className="w-3 sm:w-3.5 bg-[#16a34a] rounded-t-xs hover:bg-emerald-700 transition-all relative"
                          title={`Salidas: ${item.salidas}`}
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 mt-2">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Donut Chart: Distribución de asistencia */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-slate-200 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Distribución de asistencia</h3>

              <div className="flex items-center justify-center my-3 relative">
                {/* SVG Donut */}
                <svg className="w-36 h-36" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                  
                  {/* Presentes 87% (Green) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="12"
                    strokeDasharray="207 238"
                    strokeDashoffset="60"
                    strokeLinecap="round"
                  />
                  {/* Ausentes (Red) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="12"
                    strokeDasharray="18 238"
                    strokeDashoffset="-148"
                  />
                  {/* En comida (Orange) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="12 238"
                    strokeDashoffset="-168"
                  />
                </svg>

                {/* Donut Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono-time">87%</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]"></span>
                    <span className="text-slate-600">Presentes</span>
                  </div>
                  <span className="font-bold text-slate-800 font-mono-time">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                    <span className="text-slate-600">Ausentes</span>
                  </div>
                  <span className="font-bold text-slate-800 font-mono-time">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                    <span className="text-slate-600">En comida</span>
                  </div>
                  <span className="font-bold text-slate-800 font-mono-time">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                    <span className="text-slate-600">Otros</span>
                  </div>
                  <span className="font-bold text-slate-800 font-mono-time">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Row Matching Screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Table: Últimos registros */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">Últimos registros</h3>
                <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">
                  Ver todos
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[480px]">
                  <thead>
                    <tr className="text-slate-400 font-semibold border-b border-slate-100">
                      <th className="pb-3 px-3">Empleado</th>
                      <th className="pb-3 px-3">Fecha</th>
                      <th className="pb-3 px-3">Entrada</th>
                      <th className="pb-3 px-3">Salida</th>
                      <th className="pb-3 px-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEmployees.slice(0, 4).map(emp => (
                      <tr 
                        key={emp.id}
                        onClick={() => {
                          setSelectedEmployeeForDetail(emp);
                          setIsDetailModalOpen(true);
                        }}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-3 font-semibold text-slate-800">
                          {emp.name}
                        </td>
                        <td className="py-3 px-3 text-slate-500 font-mono-time">
                          29/09/2026
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-mono-time font-semibold">
                          {emp.lastMovementTime || '08:00'}
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-mono-time">
                          {emp.status === 'salio' ? '18:05' : '-'}
                        </td>
                        <td className="py-3 px-3">
                          {getStatusBadge(emp.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Table: Horas extra esta semana */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-4 sm:p-5 shadow-2xs border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Horas extra esta semana</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[240px]">
                  <thead>
                    <tr className="text-slate-400 font-semibold border-b border-slate-100">
                      <th className="pb-3 px-3">Empleado</th>
                      <th className="pb-3 px-3 text-right">Horas extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono-time">
                    {filteredEmployees.slice(0, 4).map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-sans font-semibold text-slate-800">
                          {emp.name}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-slate-900">
                          {emp.weeklyExtraHours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Reports Section matching bottom right of laptop mockup */}
          <ReportsView />
        </main>
      </div>

      {/* Employee Detail Modal */}
      <EmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
};
