import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Palmtree, 
  FileText, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Clock3, 
  XCircle,
  Send
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';
import { Solicitud } from '../../types';

export const ScreenRequests: React.FC = () => {
  const {
    solicitudes,
    createSolicitud,
    navigateTo,
  } = useAttendance();

  const [activeTab, setActiveTab] = useState<'historial' | 'nueva'>('historial');
  const [formType, setFormType] = useState<Solicitud['type']>('vacaciones');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-22');
  const [daysOrHours, setDaysOrHours] = useState('5 días');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    let typeLabel = 'Vacaciones';
    if (formType === 'permisos') typeLabel = 'Permiso especial';
    if (formType === 'horas_extra') typeLabel = 'Horas extra';

    createSolicitud({
      type: formType,
      typeLabel,
      startDate,
      endDate,
      daysOrHours: daysOrHours || '1 día',
      reason,
    });

    setReason('');
    setActiveTab('historial');
  };

  const getStatusBadge = (status: Solicitud['status']) => {
    switch (status) {
      case 'aprobada':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="w-3 h-3" />
            <span>Aprobada</span>
          </span>
        );
      case 'pendiente':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
            <Clock3 className="w-3 h-3" />
            <span>Pendiente</span>
          </span>
        );
      case 'rechazada':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
            <XCircle className="w-3 h-3" />
            <span>Rechazada</span>
          </span>
        );
    }
  };

  const getTypeIcon = (type: Solicitud['type']) => {
    switch (type) {
      case 'vacaciones':
        return <Palmtree className="w-4 h-4 text-blue-600" />;
      case 'permisos':
        return <FileText className="w-4 h-4 text-indigo-600" />;
      case 'horas_extra':
        return <Clock className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 text-slate-800 pb-20">
      {/* Top Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200/80 sticky top-0 z-10">
        <button
          onClick={() => navigateTo('home')}
          className="p-2 -ml-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Regresar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-base font-bold text-slate-800">Solicitudes</h2>
        <div className="w-8"></div>
      </div>

      {/* Segmented Control */}
      <div className="px-4 pt-3">
        <div className="bg-slate-200/70 p-1 rounded-xl flex">
          <button
            onClick={() => setActiveTab('historial')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'historial'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mis Solicitudes ({solicitudes.length})
          </button>
          <button
            onClick={() => setActiveTab('nueva')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
              activeTab === 'nueva'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Crear nueva</span>
          </button>
        </div>
      </div>

      {activeTab === 'historial' ? (
        <div className="p-4 space-y-3">
          {solicitudes.map(sol => (
            <div
              key={sol.id}
              className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/70 space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getTypeIcon(sol.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{sol.typeLabel}</h4>
                    <span className="text-[10px] text-slate-400">Creada el {sol.createdAt}</span>
                  </div>
                </div>
                {getStatusBadge(sol.status)}
              </div>

              <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Fechas:</span>
                  <span className="font-semibold text-slate-700">{sol.startDate} al {sol.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tiempo solicitado:</span>
                  <span className="font-semibold text-slate-700">{sol.daysOrHours}</span>
                </div>
                {sol.reason && (
                  <div className="pt-1 border-t border-slate-200/60 text-slate-600 italic">
                    "{sol.reason}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/70 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tipo de solicitud
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'vacaciones', label: 'Vacaciones' },
                  { id: 'permisos', label: 'Permiso' },
                  { id: 'horas_extra', label: 'Horas extra' },
                ].map(opt => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => {
                      setFormType(opt.id as Solicitud['type']);
                      if (opt.id === 'vacaciones') setDaysOrHours('5 días');
                      if (opt.id === 'permisos') setDaysOrHours('4 horas');
                      if (opt.id === 'horas_extra') setDaysOrHours('2 horas');
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                      formType === opt.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-2xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Fecha inicio
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full text-xs font-medium px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Fecha fin
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full text-xs font-medium px-2.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Cantidad de días u horas
              </label>
              <input
                type="text"
                placeholder="Ej. 3 días o 4 horas"
                value={daysOrHours}
                onChange={e => setDaysOrHours(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Motivo / Justificación
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe el motivo de tu solicitud..."
                value={reason}
                onChange={e => setReason(e.target.value)}
                className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#1e60d5] hover:bg-blue-700 text-white font-bold rounded-2xl shadow-md shadow-blue-500/20 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Enviar a Recursos Humanos</span>
          </button>
        </form>
      )}
    </div>
  );
};
