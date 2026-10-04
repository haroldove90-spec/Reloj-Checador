import React, { useState } from 'react';
import { AttendanceProvider, useAttendance } from './context/AttendanceContext';
import { MobileApp } from './components/mobile/MobileApp';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { 
  Smartphone, 
  Monitor, 
  MapPin, 
  RotateCcw, 
  Menu
} from 'lucide-react';
import { MobileScreen } from './types';

const MainAppContent: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    prepareMovementPunch, 
    isWithinGeofence, 
    toggleGeofence,
    resetAllData,
    toggleDrawer
  } = useAttendance();

  // Mode: mobile app or admin web dashboard
  const [viewMode, setViewMode] = useState<'mobile' | 'admin'>('mobile');

  const mobileScreens: { id: MobileScreen; label: string }[] = [
    { id: 'home', label: '1. Inicio' },
    { id: 'register_movement', label: '2. Movimiento' },
    { id: 'records', label: '3. Registros' },
    { id: 'remote_check', label: '4. GPS Remoto' },
    { id: 'summary', label: '5. Mi Resumen' },
  ];

  const handleSelectScreen = (screen: MobileScreen) => {
    setViewMode('mobile');
    if (screen === 'register_movement') {
      prepareMovementPunch('inicio_comida');
    } else {
      navigateTo(screen);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Utility Header - Ultra Responsive */}
      <header className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sticky top-0 z-40 shadow-2xs w-full">
        {/* Left: Hamburger Menu + Logo */}
        <div className="flex items-center space-x-2">
          {viewMode === 'mobile' && (
            <button
              onClick={toggleDrawer}
              className="p-1.5 -ml-1 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
              aria-label="Abrir menú de navegación"
              title="Abrir menú"
            >
              <Menu className="w-5 h-5 text-slate-700 stroke-[2.2]" />
            </button>
          )}

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#1e60d5] flex items-center justify-center text-white shadow-xs font-bold text-xs sm:text-sm shrink-0">
            MC
          </div>
          
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-sm sm:text-base text-slate-900 tracking-tight whitespace-nowrap">
              Mi Checador
            </span>
          </div>
        </div>

        {/* Center: Mode Switcher (App Móvil / Panel Admin) */}
        <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-white text-[#1e60d5] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">App Móvil</span>
            <span className="xs:hidden">Móvil</span>
          </button>

          <button
            onClick={() => setViewMode('admin')}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'admin'
                ? 'bg-white text-[#1e60d5] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Panel Web</span>
            <span className="xs:hidden">Admin</span>
          </button>
        </div>

        {/* Right: GPS Geofence & Reset buttons */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={toggleGeofence}
            className={`text-xs px-2 sm:px-2.5 py-1.5 rounded-lg border font-semibold flex items-center space-x-1 transition-colors cursor-pointer ${
              isWithinGeofence
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
            }`}
            title="Alternar ubicación GPS (En oficina vs Fuera)"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isWithinGeofence ? 'En Oficina' : 'Remoto'}</span>
          </button>

          <button
            onClick={resetAllData}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Reiniciar datos iniciales"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Screen Presets Bar (Quick navigation between the 5 sample screens) */}
      {viewMode === 'mobile' && (
        <div className="bg-white/80 backdrop-blur-xs border-b border-slate-200/90 px-3 sm:px-6 py-2 flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto text-xs shrink-0 w-full">
          <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider mr-1 hidden lg:inline whitespace-nowrap">
            Muestra de pantallas:
          </span>
          {mobileScreens.map(scr => {
            const isActive = currentScreen === scr.id;
            return (
              <button
                key={scr.id}
                onClick={() => handleSelectScreen(scr.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1 cursor-pointer ${
                  isActive
                    ? 'bg-[#1e60d5] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{scr.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Full-Screen App Content (Spanning 100% of viewport, perfectly responsive) */}
      <div className="flex-1 w-full flex flex-col">
        {viewMode === 'mobile' ? (
          <MobileApp onSwitchToAdmin={() => setViewMode('admin')} />
        ) : (
          <AdminDashboard onSwitchToMobile={() => setViewMode('mobile')} />
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AttendanceProvider>
      <MainAppContent />
    </AttendanceProvider>
  );
}
