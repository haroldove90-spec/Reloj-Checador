import React from 'react';
import { ArrowLeft, MapPin, Utensils, LogIn, LogOut, Coffee, Check, Clock } from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { MovementType } from '../../types';

export const ScreenRegisterMovement: React.FC = () => {
  const {
    pendingMovement,
    confirmMovementPunch,
    cancelMovementPunch,
    currentTimeString,
  } = useAttendance();

  // If accessed directly without pending, fallback defaults
  const type: MovementType = pendingMovement?.type || 'inicio_comida';
  const label = pendingMovement?.label || 'Inicio de comida';
  const time = pendingMovement?.time || currentTimeString;
  const location = pendingMovement?.locationName || 'Oficina Principal';

  const getMovementIcon = () => {
    switch (type) {
      case 'inicio_comida':
        return <Utensils className="w-14 h-14 text-blue-600 stroke-[2.2]" />;
      case 'fin_comida':
        return <Coffee className="w-14 h-14 text-amber-600 stroke-[2.2]" />;
      case 'entrada':
        return <LogIn className="w-14 h-14 text-emerald-600 stroke-[2.2]" />;
      case 'salida':
        return <LogOut className="w-14 h-14 text-rose-600 stroke-[2.2]" />;
    }
  };

  const getCircleBg = () => {
    switch (type) {
      case 'inicio_comida':
        return 'bg-blue-100/70 border-blue-200';
      case 'fin_comida':
        return 'bg-amber-100/70 border-amber-200';
      case 'entrada':
        return 'bg-emerald-100/70 border-emerald-200';
      case 'salida':
        return 'bg-rose-100/70 border-rose-200';
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white text-slate-800 pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <button
          onClick={cancelMovementPunch}
          className="p-2 -ml-2 rounded-full text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors"
          aria-label="Regresar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-base font-bold text-slate-800">Registrar movimiento</h2>
        <div className="w-8"></div> {/* spacer */}
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        {/* Big Circular Icon */}
        <div className={`w-32 h-32 rounded-full ${getCircleBg()} border flex items-center justify-center shadow-inner mb-6 transition-all`}>
          {getMovementIcon()}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 mb-2">{label}</h3>

        {/* Giant Time Display */}
        <div className="text-6xl font-extrabold tracking-tight text-slate-900 font-mono-time my-3">
          {time}
        </div>

        {/* Location Pin */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200/70 rounded-full text-xs font-medium text-slate-600 mt-2 mb-8">
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          <span>{location}</span>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-3 mt-auto max-w-sm">
          <button
            onClick={confirmMovementPunch}
            className="w-full py-4 bg-[#1e60d5] hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 text-base"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>Confirmar</span>
          </button>

          <button
            onClick={cancelMovementPunch}
            className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold rounded-2xl transition-all text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
