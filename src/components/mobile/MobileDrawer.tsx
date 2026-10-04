import React from 'react';
import { 
  X, 
  Home, 
  Calendar, 
  MapPin, 
  FileText, 
  User, 
  Settings, 
  RefreshCw, 
  ShieldCheck, 
  Briefcase,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToAdmin?: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onSwitchToAdmin }) => {
  const {
    employee,
    navigateTo,
    isWithinGeofence,
    toggleGeofence,
    resetAllData,
  } = useAttendance();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Body */}
      <aside 
        aria-label="Menú de navegación"
        className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-250 border-r border-slate-200"
      >
        <div>
          {/* Header Profile */}
          <div className="bg-[#104ba9] text-white p-5 pt-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:bg-white/20 active:bg-white/30 transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3.5 mt-1">
              <img
                src={employee.avatarUrl}
                alt={employee.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/80 shadow-md shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-bold text-base text-white truncate">{employee.name}</h3>
                <p className="text-xs text-blue-200 truncate">{employee.position}</p>
                <div className="inline-flex items-center space-x-1 mt-1 px-2 py-0.5 rounded-full bg-white/15 text-[10px] text-blue-100 font-mono">
                  <span>{employee.id}</span>
                  <span>•</span>
                  <span>{employee.department}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick status bar */}
          <div className="px-5 py-3 bg-blue-50/80 border-b border-blue-100 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Ubicación GPS:</span>
            <button
              onClick={toggleGeofence}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-2xs ${
                isWithinGeofence 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              {isWithinGeofence ? '✓ En oficina' : '⚡ Fuera de zona'}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-3 px-3 space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Navegación
            </div>

            <button
              onClick={() => { navigateTo('home'); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-blue-50 text-sm font-semibold transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Home className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Inicio (Mi Checador)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => { navigateTo('records'); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-blue-50 text-sm font-semibold transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Calendar className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Mis registros de asistencia</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => { navigateTo('remote_check'); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-blue-50 text-sm font-semibold transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <MapPin className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Checar remotamente (GPS)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => { navigateTo('request_modal'); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-blue-50 text-sm font-semibold transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Solicitudes y permisos</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => { navigateTo('summary'); onClose(); }}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-blue-50 text-sm font-semibold transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <User className="w-4 h-4 stroke-[2.2]" />
                </div>
                <span>Mi resumen y métricas</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {onSwitchToAdmin && (
              <button
                onClick={() => { onSwitchToAdmin(); onClose(); }}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-[#1e60d5] bg-blue-50/70 hover:bg-blue-100 text-sm font-bold transition-colors mt-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                    <Monitor className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span>Ir al Panel Web (Admin)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
            )}
          </div>

          <div className="border-t border-slate-100 my-2 pt-2 px-3 space-y-1">
            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Simulador y pruebas
            </div>

            <button
              onClick={toggleGeofence}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs"
            >
              <span className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Alternar zona permitida</span>
              </span>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">Cambiar</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('¿Reiniciar todos los registros a los valores iniciales de la muestra?')) {
                  resetAllData();
                  onClose();
                }
              }}
              className="w-full flex items-center space-x-2 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold"
            >
              <RefreshCw className="w-4 h-4 text-rose-500" />
              <span>Reiniciar datos iniciales</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 space-y-1 bg-slate-50">
          <div className="font-semibold text-slate-600">Mi Checador v2.6.4</div>
          <div>Control de Asistencia Laboral</div>
        </div>
      </aside>
    </div>
  );
};
