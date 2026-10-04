import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CalendarCheck, 
  CalendarX, 
  Palmtree, 
  FileText, 
  ChevronRight, 
  Building,
  Menu
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export const ScreenSummary: React.FC = () => {
  const {
    employee,
    navigateTo,
    toggleDrawer,
    solicitudes,
  } = useAttendance();

  const [showWeeklyDetailModal, setShowWeeklyDetailModal] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-slate-50 text-slate-800 pb-24 w-full">
      {/* Top Header */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between border-b border-slate-200/80 sticky top-0 z-10 w-full shadow-2xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Regresar al inicio"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Abrir menú"
            title="Abrir menú"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-slate-800">Mi resumen</h2>
        
        <div className="w-8"></div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-6">
        {/* Employee Profile Header */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={employee.avatarUrl}
                  alt={employee.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-blue-500 shadow-xs"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {employee.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Área: {employee.department} • {employee.position}
                </p>
                <div className="inline-flex items-center space-x-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>ID: {employee.id}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ● Turno Activo
              </span>
            </div>
          </div>
        </div>

        {/* Section: Esta semana */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-800">Esta semana</h4>
            <span className="text-xs font-semibold text-slate-500">23 - 29 Sep 2026</span>
          </div>

          {/* 4 Cards Grid: 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Horas trabajadas */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono-time">
                  {employee.weeklyWorkedHours}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-tight">
                  Horas trabajadas
                </div>
              </div>
            </div>

            {/* Card 2: Horas extra */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-emerald-600 font-mono-time">
                  {employee.weeklyExtraHours}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-tight">
                  Horas extra
                </div>
              </div>
            </div>

            {/* Card 3: Asistencias */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <CalendarCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono-time">
                  {employee.weeklyAttendances}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-tight">
                  Asistencias
                </div>
              </div>
            </div>

            {/* Card 4: Faltas */}
            <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <CalendarX className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-extrabold text-rose-600 font-mono-time">
                  {employee.weeklyAbsences}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-tight">
                  Faltas
                </div>
              </div>
            </div>
          </div>

          {/* Link button: Ver detalle semanal */}
          <button
            onClick={() => setShowWeeklyDetailModal(true)}
            className="w-full mt-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Ver detalle semanal</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Section: Solicitudes */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-800">Solicitudes</h4>
            <span 
              className="text-xs font-semibold text-blue-600 cursor-pointer hover:underline" 
              onClick={() => navigateTo('request_modal')}
            >
              + Nueva solicitud
            </span>
          </div>

          <div className="bg-white rounded-2xl divide-y divide-slate-100 border border-slate-200 shadow-2xs overflow-hidden">
            {/* Vacaciones */}
            <div
              onClick={() => navigateTo('request_modal')}
              className="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Palmtree className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-800">Vacaciones</span>
                  <div className="text-xs text-slate-400">8 días disponibles en 2026</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Permisos */}
            <div
              onClick={() => navigateTo('request_modal')}
              className="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-800">Permisos</span>
                  <div className="text-xs text-slate-400">1 permiso pendiente</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Horas extra */}
            <div
              onClick={() => navigateTo('request_modal')}
              className="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-800">Horas extra</span>
                  <div className="text-xs text-slate-400">2.5 horas autorizadas</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>

        {/* Company & Shift Info Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 text-xs sm:text-sm space-y-2.5 shadow-2xs">
          <div className="flex items-center space-x-2 text-slate-800 font-bold">
            <Building className="w-4 h-4 text-blue-600" />
            <span>Sucursal y Horario asignado</span>
          </div>
          <div className="text-slate-600 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-100">
            <div><b>Sucursal:</b> {employee.branch}</div>
            <div><b>Jornada:</b> {employee.schedule}</div>
            <div><b>Tolerancia:</b> 15 minutos en entrada</div>
          </div>
        </div>
      </div>

      {/* Weekly Detail Modal */}
      {showWeeklyDetailModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-base">Resumen Semanal Detallado</h4>
              <button
                onClick={() => setShowWeeklyDetailModal(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Periodo:</span>
                <span className="font-bold text-slate-800">23 al 29 Sep 2026</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Horas ordinarias:</span>
                <span className="font-bold font-mono-time text-slate-800">40:15 hrs</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Horas extra aprobadas:</span>
                <span className="font-bold font-mono-time text-emerald-600">02:30 hrs</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Puntualidad:</span>
                <span className="font-bold text-emerald-600">100% (Sin retardos)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Estado de nómina:</span>
                <span className="font-bold text-blue-600">Al corriente</span>
              </div>
            </div>

            <button
              onClick={() => setShowWeeklyDetailModal(false)}
              className="w-full py-3 bg-[#1e60d5] text-white font-semibold rounded-xl text-xs sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
