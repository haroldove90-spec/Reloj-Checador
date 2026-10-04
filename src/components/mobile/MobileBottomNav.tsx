import React from 'react';
import { Home, Calendar, FileText, User } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { MobileTab } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAttendance();

  const navItems: { id: MobileTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'registros', label: 'Registros', icon: Calendar },
    { id: 'solicitudes', label: 'Solicitudes', icon: FileText },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav 
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all group cursor-pointer ${
                isActive ? 'text-[#1e60d5]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-blue-50' : 'group-hover:bg-slate-100'}`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'stroke-[2.5] text-[#1e60d5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[11px] sm:text-xs mt-0.5 transition-all ${isActive ? 'font-bold text-[#1e60d5]' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
