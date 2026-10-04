import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  X, 
  Printer, 
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react';
import { CURRENT_EMPLOYEE } from '../../data/mockData';
import { useAttendance } from '../../context/AttendanceContext';

interface EmployeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ isOpen, onClose }) => {
  const { employee, daysAttendance } = useAttendance();
  const [activeTab, setActiveTab] = useState<'registros' | 'resumen' | 'horas_extra' | 'solicitudes'>('registros');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      window.print();
    }, 500);
  };

  // Mock records table matching screenshot
  const detailedRecords = [
    {
      fecha: '29/09/2026',
      entrada: '08:02',
      comidaInicio: '13:00',
      comidaFin: '14:00',
      salida: '18:05',
      horas: '09:03',
      extra: '00:30',
    },
    {
      fecha: '28/09/2026',
      entrada: '07:55',
      comidaInicio: '12:45',
      comidaFin: '13:35',
      salida: '18:10',
      horas: '09:10',
      extra: '00:40',
    },
    {
      fecha: '27/09/2026',
      entrada: '08:10',
      comidaInicio: '13:05',
      comidaFin: '14:00',
      salida: '18:00',
      horas: '08:45',
      extra: '00:15',
    },
    {
      fecha: '26/09/2026',
      entrada: '07:58',
      comidaInicio: '13:00',
      comidaFin: '14:05',
      salida: '18:20',
      horas: '09:22',
      extra: '00:52',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header matching screenshot */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              aria-label="Regresar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900">Detalle de empleado</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Employee Banner */}
        <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center space-x-3">
            <img
              src={employee.avatarUrl}
              alt={employee.name}
              className="w-13 h-13 rounded-full object-cover border border-slate-200 shadow-2xs"
            />
            <div>
              <h4 className="text-base font-bold text-slate-900 leading-tight">
                {employee.name}
              </h4>
              <p className="text-xs text-slate-500 font-medium">{employee.department}</p>
              <p className="text-[11px] text-slate-400 font-mono">ID: {employee.id} • {employee.position}</p>
            </div>
          </div>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-2 bg-[#1e60d5] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-all self-start sm:self-center"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generando...' : 'Exportar PDF'}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-slate-200 flex space-x-6 text-xs font-semibold">
          {[
            { id: 'registros', label: 'Registros' },
            { id: 'resumen', label: 'Resumen' },
            { id: 'horas_extra', label: 'Horas extra' },
            { id: 'solicitudes', label: 'Solicitudes' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#1e60d5] text-[#1e60d5] font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on tab */}
        <div className="p-6">
          {activeTab === 'registros' && (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-4">Fecha</th>
                    <th className="py-2.5 px-4">Entrada</th>
                    <th className="py-2.5 px-4">Comida (Inicio)</th>
                    <th className="py-2.5 px-4">Comida (Fin)</th>
                    <th className="py-2.5 px-4">Salida</th>
                    <th className="py-2.5 px-4">Horas</th>
                    <th className="py-2.5 px-4">Extra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-time">
                  {detailedRecords.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-sans font-semibold text-slate-800">{row.fecha}</td>
                      <td className="py-3 px-4 text-emerald-600 font-semibold">{row.entrada}</td>
                      <td className="py-3 px-4 text-amber-600">{row.comidaInicio}</td>
                      <td className="py-3 px-4 text-amber-600">{row.comidaFin}</td>
                      <td className="py-3 px-4 text-rose-600 font-semibold">{row.salida}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{row.horas}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">{row.extra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'resumen' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-slate-400 font-semibold">Total horas mes:</div>
                <div className="text-2xl font-bold font-mono-time text-slate-900 mt-1">168:30</div>
                <div className="text-emerald-600 font-medium text-[11px] mt-1">✓ Jornada cumplida</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-slate-400 font-semibold">Horas extras acumuladas:</div>
                <div className="text-2xl font-bold font-mono-time text-blue-600 mt-1">08:45</div>
                <div className="text-slate-500 text-[11px] mt-1">En proceso de nómina</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-slate-400 font-semibold">Índice de puntualidad:</div>
                <div className="text-2xl font-bold text-emerald-600 mt-1">98.4%</div>
                <div className="text-slate-500 text-[11px] mt-1">0 retardos en el periodo</div>
              </div>
            </div>
          )}

          {activeTab === 'horas_extra' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Cierre mensual de inventario (29/09/2026)</div>
                  <div className="text-slate-500 text-[11px]">Autorizado por Ing. Roberto Sánchez</div>
                </div>
                <span className="font-mono-time font-bold text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                  +02:30 hrs
                </span>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Auditoría nocturna logística (26/09/2026)</div>
                  <div className="text-slate-500 text-[11px]">Autorizado por Dirección General</div>
                </div>
                <span className="font-mono-time font-bold text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-blue-200">
                  +00:52 hrs
                </span>
              </div>
            </div>
          )}

          {activeTab === 'solicitudes' && (
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">Vacaciones anuales periodo 2026</div>
                  <div className="text-slate-400 text-[11px]">15 al 22 de Octubre de 2026 (5 días)</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                  Aprobada
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
