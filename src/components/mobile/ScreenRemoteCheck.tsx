import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw,
  Menu
} from 'lucide-react';
import { useAttendance } from '../../context/AttendanceContext';

export const ScreenRemoteCheck: React.FC = () => {
  const {
    navigateTo,
    prepareMovementPunch,
    toggleDrawer,
  } = useAttendance();

  const [currentAddress, setCurrentAddress] = useState('Av. Reforma 123, Ciudad de México');
  const [gpsAccuracy, setGpsAccuracy] = useState('± 4 metros');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);

  const handleRefreshGps = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setGpsAccuracy('± 3 metros (Óptima)');
    }, 800);
  };

  const handlePunchRemote = (type: 'entrada' | 'salida') => {
    prepareMovementPunch(type, true);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-800 pb-24 w-full">
      {/* Top Header with Blue Gradient Banner */}
      <div className="bg-[#104ba9] text-white pt-3 pb-8 px-4 sm:px-6 lg:px-8 w-full shadow-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateTo('home')}
                className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Regresar"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Abrir menú"
                title="Abrir menú"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <h2 className="text-base sm:text-lg font-bold text-white">Checar remotamente</h2>
            <div className="w-8"></div>
          </div>

          {/* Floating Location Card inside Header */}
          <div className="bg-white text-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-100">
            <div className="flex items-start space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Ubicación actual
                  </span>
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>GPS detectado</span>
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 truncate">
                  {currentAddress}
                </h4>
                <p className="text-xs text-slate-500 font-mono-time">
                  Precisión: {gpsAccuracy} • Lat: 19.4270, Long: -99.1677
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-4 space-y-4">
        {/* Interactive Vector Map Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-300/80 bg-[#e5e9f0] h-[340px] sm:h-[400px] flex items-center justify-center">
          {/* Stylized Vector Map Graphic */}
          <svg 
            viewBox="0 0 500 400" 
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: `scale(${mapZoom})` }}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="#e8edf3" />
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5dde8" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="500" height="400" fill="url(#grid)" />

            {/* Park / Green Area */}
            <path d="M 20 20 L 140 30 L 160 120 L 30 110 Z" fill="#cbe8d2" stroke="#a9d6b3" strokeWidth="1.5" />
            <text x="50" y="70" fill="#4d7c58" fontSize="10" fontWeight="600">Parque Alameda</text>

            {/* Major Avenues */}
            <path d="M -50 320 L 550 80" stroke="#ffffff" strokeWidth="22" strokeLinecap="round" />
            <path d="M -50 320 L 550 80" stroke="#f6bd60" strokeWidth="3" strokeDasharray="6 6" />
            <text x="210" y="190" fill="#848e9c" fontSize="11" fontWeight="700" transform="rotate(-21 210 190)">
              Av. Paseo de la Reforma
            </text>

            <path d="M 270 -20 L 230 420" stroke="#ffffff" strokeWidth="18" />
            <path d="M 270 -20 L 230 420" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
            <text x="245" y="340" fill="#848e9c" fontSize="9" fontWeight="700" transform="rotate(84 245 340)">
              Av. Insurgentes Sur
            </text>

            <path d="M 40 180 L 460 180" stroke="#ffffff" strokeWidth="10" />
            <path d="M 380 20 L 380 380" stroke="#ffffff" strokeWidth="10" />
            <path d="M 120 20 L 120 380" stroke="#ffffff" strokeWidth="8" />

            {/* City Buildings (Blocks) */}
            <rect x="170" y="60" width="70" height="50" rx="4" fill="#d9e2ec" stroke="#bcccdc" />
            <rect x="290" y="50" width="60" height="60" rx="4" fill="#d9e2ec" stroke="#bcccdc" />
            <rect x="150" y="220" width="65" height="70" rx="4" fill="#d9e2ec" stroke="#bcccdc" />
            <rect x="280" y="210" width="80" height="60" rx="4" fill="#d9e2ec" stroke="#bcccdc" />
            <rect x="400" y="120" width="70" height="90" rx="4" fill="#d9e2ec" stroke="#bcccdc" />

            {/* Authorized Geofence Circle */}
            <circle cx="245" cy="200" r="85" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5 5" />
            <text x="250" y="275" fill="#2563eb" fontSize="9" fontWeight="700" textAnchor="middle">
              Zona Autorizada (Radio 200m)
            </text>

            {/* Center Pin & Radar Pulse */}
            <circle cx="245" cy="200" r="14" fill="#2563eb" fillOpacity="0.3" className="radar-pulse" />
            <circle cx="245" cy="200" r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
          </svg>

          {/* Map Floating Tools */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button
              onClick={() => setMapZoom(prev => (prev >= 1.4 ? 1 : prev + 0.2))}
              className="w-9 h-9 rounded-xl bg-white shadow-md text-slate-700 flex items-center justify-center font-bold text-lg hover:bg-slate-50 active:scale-95 cursor-pointer"
              title="Zoom in"
            >
              +
            </button>
            <button
              onClick={() => setMapZoom(prev => (prev <= 0.8 ? 1 : prev - 0.2))}
              className="w-9 h-9 rounded-xl bg-white shadow-md text-slate-700 flex items-center justify-center font-bold text-lg hover:bg-slate-50 active:scale-95 cursor-pointer"
              title="Zoom out"
            >
              -
            </button>
            <button
              onClick={handleRefreshGps}
              className={`w-9 h-9 rounded-xl bg-white shadow-md text-slate-700 flex items-center justify-center hover:bg-slate-50 active:scale-95 cursor-pointer ${
                isRefreshing ? 'animate-spin text-blue-600' : ''
              }`}
              title="Calibrar GPS"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Geofence verified pill */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs flex items-center space-x-2 text-xs font-semibold text-slate-700 border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Geocerca activa</span>
          </div>
        </div>

        {/* Action Buttons: Registrar Entrada & Salida */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handlePunchRemote('entrada')}
            className="w-full py-4 bg-[#16a34a] hover:bg-[#15803d] active:bg-[#166534] text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 active:scale-[0.99] transition-all text-base flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Registrar entrada</span>
          </button>

          <button
            onClick={() => handlePunchRemote('salida')}
            className="w-full py-4 bg-white hover:bg-slate-50 active:bg-slate-100 text-[#1e60d5] border-2 border-blue-200 font-bold rounded-2xl shadow-xs transition-all text-base flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Registrar salida</span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 pt-1 leading-relaxed">
          Se registrará tu ubicación para validar el punto de checado.
        </p>
      </div>
    </div>
  );
};
