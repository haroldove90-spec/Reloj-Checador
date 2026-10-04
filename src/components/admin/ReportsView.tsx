import React, { useState } from 'react';
import { 
  Calendar, 
  FileSpreadsheet, 
  FileText, 
  Eye, 
  Download, 
  Check, 
  Printer,
  ChevronDown
} from 'lucide-react';
import { ALL_EMPLOYEES } from '../../data/mockData';

export const ReportsView: React.FC = () => {
  const [dateRange, setDateRange] = useState('01/09/2026 - 30/09/2026');
  const [department, setDepartment] = useState('Todos');
  const [employeeSelect, setEmployeeSelect] = useState('Todos');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const handleGenerate = () => {
    setReportGenerated(true);
  };

  const handleDownloadExcel = () => {
    setIsDownloading('excel');
    setTimeout(() => {
      setIsDownloading(null);
      // Generate CSV download
      const headers = ['Empleado', 'Departamento', 'Fecha', 'Entrada', 'Comida Inicio', 'Comida Fin', 'Salida', 'Total Horas', 'Extra'];
      const rows = [
        ['Carlos Martínez', 'Operaciones', '29/09/2026', '08:02', '13:00', '14:00', '18:05', '09:03', '00:30'],
        ['Ana López', 'Operaciones', '29/09/2026', '07:55', '13:00', '14:00', '17:00', '08:05', '00:00'],
        ['Luis Herrera', 'Sistemas', '29/09/2026', '08:10', '13:15', '14:15', '17:50', '08:40', '00:40'],
        ['María Torres', 'Recursos Humanos', '29/09/2026', '08:05', '14:00', '15:00', '17:35', '08:30', '00:00'],
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Reporte_Asistencia_${dateRange.replace(/[\/\s]/g, '_')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  const handleDownloadPDF = () => {
    setIsDownloading('pdf');
    setTimeout(() => {
      setIsDownloading(null);
      window.print();
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-2xs border border-slate-200">
      <h3 className="text-base font-bold text-slate-800 mb-4">Reportes</h3>

      {/* Filter Row matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* Rango de fechas */}
        <div className="md:col-span-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Rango de fechas
          </label>
          <div className="relative">
            <input
              type="text"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="w-full text-xs font-medium pl-3 pr-9 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-blue-500"
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Departamento */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Departamento
          </label>
          <div className="relative">
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full appearance-none text-xs font-medium pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-blue-500"
            >
              <option value="Todos">Todos</option>
              <option value="Operaciones">Operaciones</option>
              <option value="Sistemas">Sistemas</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Ventas">Ventas</option>
              <option value="Finanzas">Finanzas</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Empleado */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Empleado
          </label>
          <div className="relative">
            <select
              value={employeeSelect}
              onChange={e => setEmployeeSelect(e.target.value)}
              className="w-full appearance-none text-xs font-medium pl-3 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-blue-500"
            >
              <option value="Todos">Todos</option>
              {ALL_EMPLOYEES.map(emp => (
                <option key={emp.id} value={emp.name}>{emp.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Generar reporte button */}
        <div className="md:col-span-2">
          <button
            onClick={handleGenerate}
            className="w-full py-2.5 bg-[#1e60d5] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Generar reporte</span>
          </button>
        </div>
      </div>

      {/* Export Action Buttons Row matching screenshot */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
        {/* Excel Button (Green) */}
        <button
          onClick={handleDownloadExcel}
          disabled={isDownloading === 'excel'}
          className="px-5 py-2.5 bg-[#16a34a] hover:bg-[#15803d] active:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-2"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>{isDownloading === 'excel' ? 'Descargando...' : 'Excel'}</span>
        </button>

        {/* PDF Button (Red) */}
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading === 'pdf'}
          className="px-5 py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] active:bg-[#991b1b] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-2"
        >
          <FileText className="w-4 h-4" />
          <span>{isDownloading === 'pdf' ? 'Preparando...' : 'PDF'}</span>
        </button>

        {/* Vista previa Button */}
        <button
          onClick={() => setReportGenerated(true)}
          className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl shadow-2xs transition-all flex items-center space-x-2"
        >
          <Eye className="w-4 h-4 text-slate-500" />
          <span>Vista previa</span>
        </button>

        {reportGenerated && (
          <span className="text-xs text-emerald-600 font-medium ml-auto flex items-center space-x-1">
            <Check className="w-3.5 h-3.5" />
            <span>Reporte listo para 48 registros</span>
          </span>
        )}
      </div>
    </div>
  );
};
