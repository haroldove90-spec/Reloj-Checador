import React, { useState } from 'react';
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  LogIn, 
  LogOut, 
  Utensils, 
  Coffee,
  CheckCircle,
  Menu
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { MovementRecord, MovementType } from '../../types';

export const ScreenRecords: React.FC = () => {
  const {
    daysAttendance,
    navigateTo,
    selectedHistoryDay,
    setSelectedHistoryDay,
    toggleDrawer,
  } = useAttendance();

  const [activeFilter, setActiveFilter] = useState<'all' | 'entrada' | 'salida' | 'comida'>('all');
  const [selectedRecordDetail, setSelectedRecordDetail] = useState<MovementRecord | null>(null);
  const [currentMonth] = useState('Septiembre 2026');

  const weekDays = [
    { day: 'L', num: 23, dateStr: '2026-09-23' },
    { day: 'M', num: 24, dateStr: '2026-09-24' },
    { day: 'M', num: 25, dateStr: '2026-09-25' },
    { day: 'J', num: 26, dateStr: '2026-09-26' },
    { day: 'V', num: 27, dateStr: '2026-09-27' },
    { day: 'S', num: 28, dateStr: '2026-09-28' },
    { day: 'D', num: 29, dateStr: '2026-09-29' },
  ];

  const getMovementIcon = (type: MovementType) => {
    switch (type) {
      case 'entrada':
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <LogIn className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'inicio_comida':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Utensils className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'fin_comida':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Coffee className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
      case 'salida':
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <LogOut className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
    }
  };

  const filterMovements = (movements: MovementRecord[]) => {
    if (activeFilter === 'all') return movements;
    if (activeFilter === 'entrada') return movements.filter(m => m.type === 'entrada');
    if (activeFilter === 'salida') return movements.filter(m => m.type === 'salida');
    if (activeFilter === 'comida') return movements.filter(m => m.type === 'inicio_comida' || m.type === 'fin_comida');
    return movements;
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 text-slate-800 pb-24 w-full">
      {/* Top Header */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between border-b border-slate-200/80 sticky top-0 z-10 w-full shadow-2xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Regresar"
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

        <h2 className="text-base sm:text-lg font-bold text-slate-800">Mis registros</h2>
        
        <button 
          onClick={() => {
            const next = activeFilter === 'all' ? 'entrada' : activeFilter === 'entrada' ? 'salida' : activeFilter === 'salida' ? 'comida' : 'all';
            setActiveFilter(next);
          }}
          className="p-2 -mr-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors relative"
          title={`Filtro actual: ${activeFilter}`}
        >
          <SlidersHorizontal className="w-5 h-5 text-slate-600" />
          {activeFilter !== 'all' && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
          )}
        </button>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-5">
        {/* Calendar Strip Container */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          {/* Month Selector */}
          <div className="flex items-center justify-between mb-3 px-2">
            <button className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm sm:text-base font-bold text-slate-800">{currentMonth}</span>
            <button className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Week Day Pills */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center">
            {weekDays.map(item => {
              const isSelected = selectedHistoryDay === item.num;
              return (
                <button
                  key={item.num}
                  onClick={() => setSelectedHistoryDay(item.num)}
                  className="flex flex-col items-center py-2 rounded-xl transition-all group cursor-pointer"
                >
                  <span className="text-xs font-semibold text-slate-400 mb-1">
                    {item.day}
                  </span>
                  <span
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all ${
                      isSelected
                        ? 'bg-[#1e60d5] text-white shadow-md shadow-blue-500/30'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter indicator */}
        {activeFilter !== 'all' && (
          <div className="px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-700 font-medium">
            <span>Filtrando por: <b>{activeFilter.toUpperCase()}</b></span>
            <button 
              onClick={() => setActiveFilter('all')} 
              className="underline font-bold hover:text-blue-900"
            >
              Quitar filtro
            </button>
          </div>
        )}

        {/* Days List */}
        <div className="space-y-5">
          {daysAttendance.map(day => {
            const dayMovements = filterMovements(day.movements);
            if (dayMovements.length === 0 && activeFilter !== 'all') return null;

            return (
              <div key={day.dateString} className="space-y-2">
                {/* Day Header */}
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-600 tracking-wide uppercase">
                    {day.displayDate}
                  </h3>
                  {day.totalWorkedHours && day.totalWorkedHours !== '00:00' && (
                    <span className="text-xs font-medium text-slate-500">
                      Total: {day.totalWorkedHours} hrs
                    </span>
                  )}
                </div>

                {/* List of Movements for this Day */}
                {dayMovements.length === 0 ? (
                  <div className="bg-white rounded-2xl p-4 text-center text-xs text-slate-400 border border-slate-200">
                    Sin registros en este día
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl divide-y divide-slate-100 border border-slate-200 shadow-2xs overflow-hidden">
                    {dayMovements.map(mov => (
                      <div
                        key={mov.id}
                        onClick={() => setSelectedRecordDetail(mov)}
                        className="px-4 sm:px-6 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3.5">
                          {getMovementIcon(mov.type)}
                          <div>
                            <div className="text-sm font-semibold text-slate-800">
                              {mov.label}
                            </div>
                            <div className="text-xs text-slate-400 flex items-center space-x-1.5">
                              <span>{mov.locationName}</span>
                              {mov.method === 'gps_remote' && (
                                <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold">GPS</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-sm sm:text-base font-bold font-mono-time text-slate-800">
                            {mov.time}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Movement Detail Sheet Modal */}
      {selectedRecordDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                {getMovementIcon(selectedRecordDetail.type)}
                <div>
                  <h4 className="font-bold text-slate-800">{selectedRecordDetail.label}</h4>
                  <p className="text-xs text-slate-500">Detalle de registro</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecordDetail(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Hora registrada:</span>
                <span className="font-bold font-mono-time text-slate-800">{selectedRecordDetail.time} hrs</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Método:</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {selectedRecordDetail.method === 'biometric' ? 'Huella dactilar (Biométrico)' : 'GPS Remoto verificado'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Ubicación:</span>
                <span className="font-semibold text-slate-800 text-right">{selectedRecordDetail.locationName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Coordenadas:</span>
                <span className="font-mono-time text-slate-600">
                  {selectedRecordDetail.coords.lat}, {selectedRecordDetail.coords.lng}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Validación de seguridad:</span>
                <span className="text-emerald-600 font-bold inline-flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Autenticado</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecordDetail(null)}
              className="w-full mt-2 py-3 bg-[#1e60d5] text-white font-semibold rounded-xl text-xs sm:text-sm"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
