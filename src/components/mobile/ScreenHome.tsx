import React from 'react';
import { 
  Menu, 
  MapPin, 
  Utensils, 
  LogOut, 
  Calendar, 
  FileText, 
  Fingerprint, 
  CheckCircle2, 
  Navigation,
  ChevronRight
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

interface ScreenHomeProps {
  onOpenDrawer: () => void;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({ onOpenDrawer }) => {
  const {
    employee,
    currentTimeString,
    currentDateDisplay,
    isWithinGeofence,
    gpsCoords,
    prepareMovementPunch,
    navigateTo,
    toggleDrawer,
  } = useAttendance();

  // Dynamic next recommended action based on employee status
  const getPrimaryAction = () => {
    switch (employee.status) {
      case 'salio':
      case 'ausente':
        return {
          type: 'entrada' as const,
          label: 'Registrar entrada',
          bgClass: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white',
          desc: 'Iniciar jornada laboral',
        };
      case 'en_trabajo':
        return {
          type: 'salida' as const,
          label: 'Registrar salida',
          bgClass: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white',
          desc: 'Finalizar jornada laboral',
        };
      case 'en_comida':
        return {
          type: 'fin_comida' as const,
          label: 'Fin de comida',
          bgClass: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white',
          desc: 'Reanudar turno de trabajo',
        };
      default:
        return {
          type: 'entrada' as const,
          label: 'Registrar entrada',
          bgClass: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white',
          desc: 'Iniciar jornada',
        };
    }
  };

  const primaryAction = getPrimaryAction();

  const handleOpenDrawer = () => {
    if (onOpenDrawer) onOpenDrawer();
    else toggleDrawer();
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 text-slate-800 pb-24 w-full">
      {/* Top App Header with full width gradient */}
      <div className="bg-[#104ba9] text-white px-4 sm:px-6 lg:px-8 pt-3 pb-6 shadow-sm w-full">
        <div className="max-w-5xl mx-auto">
          {/* Top Bar with Functional Hamburger Menu */}
          <div className="flex items-center justify-between py-1">
            <button 
              onClick={handleOpenDrawer}
              aria-label="Abrir menú de navegación" 
              className="p-2 -ml-2 rounded-xl hover:bg-white/15 active:bg-white/25 transition-colors flex items-center space-x-2"
              title="Abrir menú"
            >
              <Menu className="w-6 h-6 text-white stroke-[2.2]" />
              <span className="text-xs font-semibold hidden sm:inline text-white/90">Menú</span>
            </button>
            
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">Mi Checador</h1>

            <button 
              onClick={() => navigateTo('summary')} 
              className="relative p-1 rounded-full hover:ring-2 hover:ring-white/40 transition-all"
              aria-label="Ver perfil de Carlos Martínez"
            >
              <img 
                src={employee.avatarUrl} 
                alt={employee.name} 
                className="w-9 h-9 rounded-full object-cover border-2 border-white/80" 
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#104ba9] rounded-full"></span>
            </button>
          </div>

          {/* Big Navy Blue Hero Attendance Card */}
          <div className="mt-3 bg-gradient-to-b from-[#1859c7] to-[#0d3f94] rounded-2xl p-5 sm:p-6 text-center text-white shadow-md border border-blue-400/20">
            <p className="text-xs sm:text-sm text-blue-100 font-medium tracking-wide">
              {currentDateDisplay}
            </p>
            
            <div className="my-2 flex items-center justify-center space-x-1">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono-time drop-shadow-sm">
                {currentTimeString}
              </span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-emerald-300 border border-emerald-400/30">
              <span className={`w-2 h-2 rounded-full ${isWithinGeofence ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>
                {isWithinGeofence ? 'Dentro del área permitida' : 'Fuera de zona asignada'}
              </span>
            </div>
            <p className="text-xs text-blue-200 mt-1.5 font-normal">
              {gpsCoords.address.split('(')[0].trim()}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area: Responsive Grid on Desktop */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-3 space-y-4">
        {/* Main Biometric Punch Button Card */}
        <button
          onClick={() => prepareMovementPunch(primaryAction.type)}
          className={`w-full ${primaryAction.bgClass} rounded-2xl p-4 sm:p-5 shadow-lg shadow-emerald-700/20 active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-3.5 border border-white/15 cursor-pointer`}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Fingerprint className="w-7 h-7 text-white stroke-[2]" />
          </div>
          <div className="text-left">
            <div className="text-lg sm:text-xl font-bold leading-tight">{primaryAction.label}</div>
            <div className="text-xs text-white/85 font-normal">{primaryAction.desc}</div>
          </div>
        </button>

        {/* Responsive Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Comida */}
          <button
            onClick={() => {
              if (employee.status === 'en_comida') {
                prepareMovementPunch('fin_comida');
              } else {
                prepareMovementPunch('inicio_comida');
              }
            }}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col items-center justify-center space-y-2.5 active:bg-blue-50/50 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-[#1e60d5] transition-colors">
              <Utensils className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
              {employee.status === 'en_comida' ? 'Fin comida' : 'Comida'}
            </span>
          </button>

          {/* Card 2: Salida */}
          <button
            onClick={() => prepareMovementPunch('salida')}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col items-center justify-center space-y-2.5 active:bg-rose-50/50 hover:border-rose-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center text-rose-600 transition-colors">
              <LogOut className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-rose-700">
              Salida
            </span>
          </button>

          {/* Card 3: Mis registros */}
          <button
            onClick={() => navigateTo('records')}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col items-center justify-center space-y-2.5 active:bg-sky-50/50 hover:border-sky-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 group-hover:bg-sky-100 flex items-center justify-center text-sky-600 transition-colors">
              <Calendar className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-sky-700">
              Mis registros
            </span>
          </button>

          {/* Card 4: Solicitudes */}
          <button
            onClick={() => navigateTo('request_modal')}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex flex-col items-center justify-center space-y-2.5 active:bg-indigo-50/50 hover:border-indigo-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 flex items-center justify-center text-indigo-600 transition-colors">
              <FileText className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700">
              Solicitudes
            </span>
          </button>
        </div>

        {/* Location & Remote Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Current Location Card */}
          <div 
            onClick={() => navigateTo('remote_check')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                <MapPin className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Ubicación actual
                </div>
                <div className="text-sm font-bold text-slate-800 truncate">
                  {gpsCoords.address.split(',')[0]}
                </div>
                <div className="text-xs text-slate-500 font-mono-time truncate">
                  Lat: {gpsCoords.lat.toFixed(4)}, Long: {gpsCoords.lng.toFixed(4)}
                </div>
              </div>
              <div className="text-blue-600 flex items-center text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
              </div>
            </div>
          </div>

          {/* Remote Check-in Quick Link Banner */}
          <div 
            onClick={() => navigateTo('remote_check')}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-blue-900">¿Trabajando fuera de oficina?</div>
                <div className="text-xs text-blue-700">Checar remotamente con GPS</div>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-2xs shrink-0">
              Abrir mapa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
